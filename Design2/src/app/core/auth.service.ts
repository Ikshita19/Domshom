import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { AuthData } from './auth-data.model';
import { environment } from './../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { SnackbarService } from '../shared/components/snackbar.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{

  private isAuthenticated = false;
  public profileImagePath = '';
  private isAdmin = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private adminStatusListener = new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router, private snackBarService: SnackbarService) { 
   
    // setTimeout(()=>{
      this.autoAuthUser();
    // },1000)
  }

  ngOnInit(){
    console.log('never calleed ****')
   
  }

  getProfile() {
    return this.http
      .get(environment.baseUrl + 'auth/me')
      .pipe(map((res: any) => {
        console.log('In Map');
        console.log(res);
        res.data.photo = environment.base + 'uploads/' + res.data.photo;
        this.profileImagePath = res.data.photo;
        return res;
      }));

  }

  updateProfileDetails(obj: any) {
    return this.http.put(environment.baseUrl + 'auth/updatedetails', obj);
  }

  createOrder(obj: any) {
    return this.http.post(environment.baseUrl + 'auth/order', obj);
  }
  verifyOrder(obj: any) {
    return this.http.post(environment.baseUrl + 'auth/verify-txn', obj);
  }

  changePassword(obj: any) {
    return this.http.put(environment.baseUrl + 'auth/updatepassword', obj);
  }

  


  uploadPhoto(image: File) {
    const postData = new FormData();
    // postData.append('title', title);
    // postData.append('content', content);
    // postData.append('image', image, 'title');
    postData.append('file', image);
    return this.http
      .put(
        environment.baseUrl + 'auth/photo',
        postData
      )
      .pipe(map((res: any) => {
        console.log('In Map');
        console.log(res);
        res.data = environment.base + 'uploads/' + res.data;
        this.profileImagePath = res.data;
        this.authStatusListener.next(true);
        return res;
      }));

  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getIsAdmin() {
    return this.isAdmin;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  getAdminStatusListener() {
    return this.adminStatusListener.asObservable();
  }



  createUser(email: string, password: string) {
    const authData: AuthData = { email, password, name: 'default' };
    this.http.post(environment.baseUrl + 'auth/register', authData)
      .subscribe((response) => {
        console.log(response);
        this.afterLoginOrSignUp(response);
      },
        (error) => {
          // console.log('Something went wrong!');
          console.log(error.error);
          // console.log(JSON.parse(error))
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);

          if (error.status === 422) {
            this.snackBarService.show('Email already in use. Try using another email.');
          }
          else {
            this.snackBarService.show('Not able to register. Try after some time.');
          }

        });

  }

  afterLoginOrSignUp(response) {
    // console.log(response);
    const token = response.token;
    this.token = token;
    if (token) {
      console.log('Decoding token');
      const tokenInfo = this.getDecodedAccessToken(token);
      console.log('Decoded token');
      console.log(tokenInfo);
      if (response.imagePath) {
        this.profileImagePath = environment.base + 'uploads/' + response.imagePath
      }
      if (tokenInfo.role === 'admin') {
        this.isAdmin = true;
      }
      else {
        this.isAdmin = false;
      }
      const expiresInDuration = response.expiresIn;
      this.setAuthTimer(expiresInDuration);
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      this.adminStatusListener.next(this.isAdmin);
      const now = new Date();
      console.log(`Time right now ${now.getTime()}`)
      
      const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
      console.log(`Time right now ${expirationDate.getTime()}`)
      console.log(expirationDate);
      this.saveAuthData(token, expirationDate,this.profileImagePath) ;
      this.router.navigate(['/videos']);

    }
  }

  login(email: string, password: string) {
    const authData: AuthData = { email, password };
    this.http
      .post<{ token: string; expiresIn: number }>(
        environment.baseUrl + 'auth/login',
        authData
      )
      .subscribe((response: any) => {
        this.afterLoginOrSignUp(response);
      },
        (error) => {
          if (error.status === 401) {
            this.snackBarService.show(`${error.error.error}`);
          }
          else {
            this.snackBarService.show('Not able to login. Try after some time.');
          }
        }
      );
  }


  forgotPassword(email: string) {
    const authData: any = { email };
    this.http
      .post(
        environment.baseUrl + 'auth/forgotpassword',
        authData
      )
      .subscribe((response: any) => {
        if(response.success){
          this.snackBarService.show("Reset password mail sent to your account.")
          
        }
        
      },
        (error) => {
          if (error.status === 404) {
            this.snackBarService.show(`${error.error.error}`);
          }
          else {
            this.snackBarService.show('Not able to process request. Try after some time.');
          }
        }
      );

  }

  resetPassword(password: string, token: string) {
    const authData: any = { password };
    this.http
      .put(
        environment.baseUrl + 'auth/resetpassword/' + token,
        authData
      )
      .subscribe((response: any) => {
        if(response.success){
          this.snackBarService.show("Password reset successful")
          this.afterLoginOrSignUp(response);
          
        }
        
      },
        (error) => {
          if (error.status === 404) {
            this.snackBarService.show(`${error.error.error}`);
          }
          else {
            this.snackBarService.show('Not able to process request. Try after some time.');
          }
        }
      );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.profileImagePath = authInformation.profileImagePath
      const tokenInfo = this.getDecodedAccessToken(this.token);
      console.log('Decoded token');
      console.log(tokenInfo);
      this.isAuthenticated = true;

      setTimeout(()=>{
        this.authStatusListener.next(true);
      }, 100)
    }
      
      
    
      
      // this.isAdmin = true;
      // this.setAuthTimer(expiresIn / 1000);
      
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.http.get(environment.baseUrl + 'auth/logout')
      .subscribe((res: any) => {
        if (res.success) {
          this.router.navigate(['/']);
        }
      });


  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, profileImagePath: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('profileImagePath', profileImagePath);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const profileImagePath = localStorage.getItem('profileImagePath');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      profileImagePath: profileImagePath
    };
  }
}
