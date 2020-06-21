import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Quiz, User } from 'src/app/shared/interfaces';
@Injectable({
  providedIn: 'root'
})
export class QuizService {
  
  quiz: Quiz;
  // user: User;

  constructor(private http: HttpClient) { 
    console.log(environment.baseUrl)
  }
  addQuestion(value: any) {
    return this.http.post(environment.baseUrl + 'questions', value);
  }

  fetchAllQuestionsGroupedByCategory() {
    return this.http.get(environment.baseUrl + 'questionsbycategory');
  }

  deleteCategory(id:any) {
    return this.http.delete(environment.baseUrl + 'questions/' + id);
  }

  addQuiz(value: any){
    return this.http.post(environment.baseUrl + 'quiz' , value);
  }
  fetchAllQuiz(){
    return this.http.get(environment.baseUrl + 'quizzes?select=title,description');
  }
  fetchAllQuizByTitle(title){
    return this.http.get(environment.baseUrl + 'quizzes?title=' + title);
  }

  addResult(value: any) {
    return this.http.post(environment.baseUrl + 'result/', value);
  }

}
