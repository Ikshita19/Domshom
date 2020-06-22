import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';



@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit, OnDestroy {

  slides: Array<Object> = [
    {title: 'Angular', subtitle: 'UI Framework from Google!!', description: 'loresdklkg jslkdjg kjskldgj lksdjlgk jslkdj gkljdsl gjsdl jgklsdj lkgjlkdsklsdgjkm', imageUrl:'../../../images/angular.png', link:'slides/angular.html'},
    {title: 'Java 11', subtitle: 'Latest features of Java language', description: 'loresdklkg jslkdjg kjskldgj lksdjlgk jslkdj gkljdsl gjsdl jgklsdj lkgjlkdsklsdgjkm' ,  imageUrl:'../../../images/java.jpg', link:'slides/java8.html'},
    {title: 'React', subtitle: 'UI Library from Facebook!!', description: 'loresdklkg jslkdjg kjskldgj lksdjlgk jslkdj gkljdsl gjsdl jgklsdj lkgjlkdsklsdgjkm', imageUrl:'../../../images/react.png', link:'slides/reactjs.html'},
    {title: 'HTML 5', subtitle: 'New ways to structure', description: 'loresdklkg jslkdjg kjskldgj lksdjlgk jslkdj gkljdsl gjsdl jgklsdj lkgjlkdsklsdgjkm',  imageUrl:'../../../images/html5.png', link:'slides/html5.html'},
    {title: 'CSS 3', subtitle: 'A whole lot more', description: 'loresdklkg jslkdjg kjskldgj lksdjlgk jslkdj gkljdsl gjsdl jgklsdj lkgjlkdsklsdgjkm',  imageUrl:'../../../images/css3.jpg', link:'slides/css3.html'},
    {title: 'HTML', subtitle: 'Basic HTML', description: 'loresdklkg jslkdjg kjskldgj lksdjlgk jslkdj gkljdsl gjsdl jgklsdj lkgjlkdsklsdgjkm',  imageUrl:'../../../images/html5.png', link:'slides/html.html'}
  ]

  userIsAdmin = false;
  userIsAuthenticated = false;
  profileImagePath : string = null;
  private authListenerSubs: Subscription;
  private adminListenerSubs: Subscription;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.userIsAdmin = this.authService.getIsAdmin();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        console.log('*** ng On Init ----', this.userIsAuthenticated)
        console.log('Image file fetched: ', this.authService.profileImagePath)
        this.profileImagePath =  this.authService.profileImagePath;
      })
      this.adminListenerSubs = this.authService
      .getAdminStatusListener()
      .subscribe(isAdmin => {
        this.userIsAdmin = isAdmin;
        console.log('*** ng On Init +++++', this.userIsAdmin)
      })

      console.log('*** ng On Init ****' , this.userIsAuthenticated , this.userIsAdmin)
  }

  onLogout() {
    this.profileImagePath = null;
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
    this.adminListenerSubs.unsubscribe();
    // this.unsubscribe();
  }

}
