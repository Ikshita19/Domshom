import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/core/services/quiz.service';
import { Router } from '@angular/router';
import { Quiz } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrls: ['./view-quiz.component.css']
})
export class ViewQuizComponent implements OnInit {

  constructor(private quizService: QuizService, public authService: AuthService, 
    // public dialog: MatDialog, 
     private router: Router) { }

  quizzes: Array<Quiz> = []

  ngOnInit() {
    this.quizService.fetchAllQuiz()
    .subscribe((res: any) => {
      console.log(res)
      if(res.success)
        this.quizzes = res.data
    });
  }

  showDialog(path:string, title:string){
    this.router.navigate([path, title]);
    // console.log(path)
    // const dialogRef = this.dialog.open(QuizDialogComponent, {
    //   width: '500px',
    //   height: '650px',
    //   data: {name: "this.name", animal: "this.animal"}
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed', result);
    //   if(result){
    //     this.router.navigate([path, title]);
    //   }
    //   else{
    //     this.router.navigate([path]);
    //   }
    // });
    // return false;
  }

  startQuiz(path: string, title: string){
    console.log('navigating to path', path, title);
    this.showDialog(path, title);
  }
}
