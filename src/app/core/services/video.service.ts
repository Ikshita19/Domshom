import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IMedia } from 'src/app/shared/interfaces';
import { Observable, forkJoin } from 'rxjs';
import {map} from 'rxjs/operators';
import { identifierModuleUrl } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class VideoService {
  
  media: IMedia;
  // user: User;

  constructor(private http: HttpClient) { 
    console.log(environment.baseUrl)
  }


  enrollUser(id){
    return this.http.get(environment.baseUrl + 'uservideos/' + id + '/enroll');
  }
  

  updateCompletionStatus(id, sectionid, videoid, status){
    return this.http.put(environment.baseUrl + 'uservideos/' + id + '/section/' + sectionid + '/video/' +videoid , status);
  }
  fetchVideoByTitle(title){
    return this.http.get(environment.baseUrl + 'videos/view/' + title);
  }

   fetchAllVideos(){
    return this.http.get(environment.baseUrl + 'videos?select=title,description,poster,totallectures,hours,level,totalenrolled,price,discount');
  }

   fetchAllVideosAuth(){
    // const combined = forkJoin(
    //   this.http.get(environment.baseUrl + 'videos?select=title,description'),
      
    // )
    return this.http.get(environment.baseUrl + 'uservideos?select=title,description,poster,totallectures,hours,level,totalenrolled,price,discount');
  }

  fetchVideoByTitleAuth(title){
    return this.http.get(environment.baseUrl + 'uservideos/view/' + title);
    // return this.http.get(environment.baseUrl + 'uservideos?title=' + title);
  }
  // addQuestion(value: any) {
  //   return this.http.post(environment.baseUrl + 'questions', value);
  // }

  // fetchAllQuestionsGroupedByCategory() {
  //   return this.http.get(environment.baseUrl + 'questionsbycategory');
  // }

  // deleteCategory(id:any) {
  //   return this.http.delete(environment.baseUrl + 'questions/' + id);
  // }

  // addQuiz(value: any){
  //   return this.http.post(environment.baseUrl + 'quiz' , value);
  // }
  // fetchAllQuiz(){
  //   return this.http.get(environment.baseUrl + 'quizzes?select=title,description');
  // }


  // addResult(value: any) {
  //   return this.http.post(environment.baseUrl + 'result/', value);
  // }

}
