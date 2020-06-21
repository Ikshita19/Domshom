import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { CoreRoutingModule } from './core-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';



const declarables = [ LoginComponent, SignupComponent, ProfileComponent, ForgotpasswordComponent, ResetpasswordComponent]

@NgModule({
  declarations: declarables,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,CoreRoutingModule, SharedModule
  ],
  
  exports: declarables

})
export class CoreModule { }
