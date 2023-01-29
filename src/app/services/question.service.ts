import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }

  //get questionS from api
  public getQuestionsOfQuiz(qid:any){
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }

  //get question from api
  public getQuestionOfQuiz(quesId:any){
    return this._http.get(`${baseUrl}/question/${quesId}`);
  }

   //get question from api
   public getQuestionOfQuizForTest(quesId:any){
    return this._http.get(`${baseUrl}/question/quiz/${quesId}`);
  }

  //add question from api
  public addQuestion(question:any){
    return this._http.post(`${baseUrl}/question/`,question);
  }

  //delete question
  public deleteQuestion(questionId:any){
    return this._http.delete(`${baseUrl}/question/${questionId}`);
  }

    //update singe Question

    public updateQuestion(quesId:any){
      return this._http.put(`${baseUrl}/question/`,quesId);
    }

    //eval quiz
    public evalQuiz(questions:any){
      return this._http.post(`${baseUrl}/question/eval-quiz`,questions);
    }
}
