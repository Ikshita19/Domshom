import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { NgForm, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import {  catchError } from 'rxjs/operators';

const confirmedValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const cpassword = control.get('cpassword');
  console.log(password.value, cpassword.value)
  return password && cpassword && password.value != cpassword.value ? {confirmedValidator: true} : null;
};


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isLoading = false;

  signUpForm: FormGroup;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {

    this.signUpForm = new FormGroup({
  
      email: new FormControl(null , {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl(null , {
        validators: [Validators.required, Validators.minLength(6)]
      }),
      cpassword: new FormControl(null , {
        validators: [Validators.required, Validators.minLength(6)]
      })

    }, {validators: confirmedValidator} )
   

  }


  onSignup() {
    if (this.signUpForm.invalid) {
      return;
    }
    console.log(this.signUpForm.value)
    this.isLoading = true;
    this.authService.createUser(this.signUpForm.value.email, this.signUpForm.value.password)
    this.isLoading = false;
  }


  

  

}
