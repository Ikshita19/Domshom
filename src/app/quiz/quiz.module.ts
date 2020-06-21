import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizRoutingModule } from './quiz-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  imports: [
    CommonModule, QuizRoutingModule, SharedModule
  ],
  declarations: [QuizRoutingModule.components]
  
})
export class QuizModule { }
