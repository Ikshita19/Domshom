import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {


  resetToken: string;
  isLoading = false;

  constructor(public authService: AuthService, public route: ActivatedRoute,  public router: Router) {}

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.resetPassword(form.value.password, this.resetToken);
    this.isLoading = false;
  }

  ngOnInit(): void {

    this.route.params
      .subscribe(params => {
        console.log(params);
        this.resetToken = params.resettoken
      })
  }

}
