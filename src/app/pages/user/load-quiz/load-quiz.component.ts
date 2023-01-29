import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent {

  catId:any;
  quizzes:any;
  constructor(private _route:ActivatedRoute, private _quiz:QuizService){}

  ngOnInit(){
    this._route.params.subscribe((param:any)=>{
      this.catId=param.catId;
      if(this.catId==0){
        this._quiz.getActiveQuizzes().subscribe((data)=>{
          this.quizzes=data;
          console.log(this.quizzes);
        },(error)=>{
          console.log(error);
        });
  
      }
      else{
        // console.log('specific');
        this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe((data)=>{
          this.quizzes=data;
        },(error)=>{
          console.log(error);
        });

      }

      // console.log(this.catId)
    })
  }


}
