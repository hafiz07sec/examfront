import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http:HttpClient) { }

  //get quiz
  public quizzes(){
    return this._http.get(`${baseUrl}/quiz/`);
  }

  //add quiz
  public addQuiz(quiz:any){
    return this._http.post(`${baseUrl}/quiz/`,quiz);
  }

  //delete Quiz

  public deleteQuiz(qId:any){
    return this._http.delete(`${baseUrl}/quiz/${qId}`);
  }

  //get singe quiz

  public getQuiz(qId:any){
    return this._http.get(`${baseUrl}/quiz/${qId}`);
  }

   //update singe quiz

   public updateQuiz(qId:any){
    return this._http.put(`${baseUrl}/quiz/`,qId);
  }

  //get Quizzes of category

  public getQuizzesOfCategory(cid:any){
    return this._http.get(`${baseUrl}/quiz/category/${cid}`);
  }

  //get active quizzes

  public getActiveQuizzes(){
     return this._http.get(`${baseUrl}/quiz/active`);
  }
  //get active quizzes of category

  public getActiveQuizzesOfCategory(cid:any){
     return this._http.get(`${baseUrl}/quiz/category/active/${cid}`);
  }

}
