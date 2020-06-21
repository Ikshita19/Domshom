import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/core/services/quiz.service';
import { Quiz } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-take-quiz',
  templateUrl: './take-quiz.component.html',
  styleUrls: ['./take-quiz.component.css']
})
export class TakeQuizComponent implements OnInit {

  constructor(public route: ActivatedRoute,  public router: Router, public quizService: QuizService) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        console.log(params);
        this.quizService.fetchAllQuizByTitle(params.title)
          .subscribe((res: any) => {
            console.log(res)
            if(res.success){
              this.quizService.quiz = res.data[0];
              this.quizService.quiz.currentIndex = 0;
              this.quizService.quiz.currentQuestion = this.quizService.quiz.questions[this.quizService.quiz.currentIndex]
            }
            
          });

      });
  }


  public nextQuestion() {
    console.log('Previous index was :' + this.quizService.quiz.currentIndex);
    // this.attempt(this.quizService.quiz.currentIndex);
    this.quizService.quiz.currentQuestion =
      this.quizService.quiz.questions[++this.quizService.quiz.currentIndex];
  }
  public previousQuestion() {
    console.log('Previous index was :' + this.quizService.quiz.currentIndex);
    // this.attempt(this.quizService.quiz.currentIndex);
    this.quizService.quiz.currentQuestion =
      this.quizService.quiz.questions[--this.quizService.quiz.currentIndex];
  }

  public goToQuestion(index) {
    console.log('Previous index was :' + this.quizService.quiz.currentIndex);
    console.log('Index changing to :' + index);
    // this.attempt(this.quizService.quiz.currentIndex);
    this.quizService.quiz.currentIndex = index;
    this.quizService.quiz.currentQuestion = this.quizService.quiz.questions[index];
    //            this.attempt(this.quizService.quiz.currentIndex);
    //            console.dir(this.quizService.quiz.currentQuestion.answers);
  }

  navigate(path:string){
    console.log("navigating to path", path, )
    this.router.navigate([path]);
  }


  submitTest() {
    console.clear();
    console.log(this.quizService.quiz);
    this.navigate('quiz/result')
  }

}
