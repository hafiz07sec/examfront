import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent {

  quesId:any='';
  qId:any='';
  qTitle:any;
  question:any={};

  constructor(private _route:ActivatedRoute, private _question:QuestionService,   public _router:Router){}

  ngOnInit(){
    this.quesId = this._route.snapshot.params['quesId'];
    // console.log(this.qTitle)
    this._question.getQuestionOfQuiz(this.quesId).subscribe((data) => {
      this.question = data;
      //  console.log(this.question.quiz.title)
      this.qTitle=this.question.quiz.title;
      this.qId=this.question.quiz.qId;
    }, (error) => {
      console.log("Error in loading Question from server");
      console.log(error);

    });
  }

  updateQuestion(){
    this._question.updateQuestion(this.question).subscribe((data: any) => {
      Swal.fire('Update!', 'Question updated', 'success').then((e)=>{
        this._router.navigate(["/admin/view-question/",this.qId , this.qTitle]);
      });

    },
      (error:any) => {
        //Error in loading data
        console.log(error);
        Swal.fire('Error!', 'Error in Updating Category', 'error');
      });


  }

}
