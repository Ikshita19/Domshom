import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/core/services/quiz.service';

@Component({
  selector: 'app-result-quiz',
  templateUrl: './result-quiz.component.html',
  styleUrls: ['./result-quiz.component.css']
})
export class ResultQuizComponent implements OnInit {

  constructor(public quizService: QuizService) { }

  resultPercentage: number

  ngOnInit() {
    console.log('On reults page: ')
    console.log(this.quizService.quiz)
    // console.log(this.quizService.user)

    let totalScore = this.quizService.quiz.questions.length;
    console.log(totalScore);
    let initialScore = 0;
    this.quizService.quiz.questions.forEach((question) => {
      if (question.correctIndex === question.correctAnswer) {
        initialScore++;
      }
    });
    console.log(initialScore, totalScore)
    this.resultPercentage = (initialScore / totalScore) * 100;

    // var result = {
    //   name: this.quizService.user.name, email: this.quizService.user.email,phone: this.quizService.user.phone,
    //   total: totalScore, score: initialScore, quizName: this.quizService.quiz.title
    // }

    // this.categoryService.addResult(result).subscribe(res=>console.log(result))
    // console.log('Result is sent ...',  result)

  }


}
