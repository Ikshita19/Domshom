import { NgModule } from '@angular/core';
import { ViewQuizComponent } from './components/view-quiz/view-quiz.component';
import { Routes, RouterModule } from '@angular/router';
import { TakeQuizComponent } from './components/take-quiz/take-quiz.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ResultQuizComponent } from './components/result-quiz/result-quiz.component';




const routes: Routes = [
  {
    path: '',
    component: QuizComponent,
    children: [
      { path: '', component: ViewQuizComponent },
      { path: 'takequiz/:title', component: TakeQuizComponent },
      { path: 'result', component: ResultQuizComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule {
  static components = [ViewQuizComponent, TakeQuizComponent, QuizComponent, ResultQuizComponent];
}
