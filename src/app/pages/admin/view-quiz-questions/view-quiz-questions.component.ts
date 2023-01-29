import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent {

  qId: any;
  qTitle: any;
  questions: any = [];

  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _snak: MatSnackBar,


  ) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.qId = params['id'];
    });
    console.log(this.qId)
    this.qTitle = this._route.snapshot.params['title'];
    this._question.getQuestionsOfQuiz(this.qId).subscribe((data) => {
      console.log(data);
      this.questions = data;
    }, (error) => {
      console.log(error);
    })
  }

  deleteQuestion(qid: any) {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure, want ot delete this Question?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: 'red',
      cancelButtonText: 'Cancel',
      cancelButtonColor: 'blue'
    }).then((result) => {
      if (result.isConfirmed) {
        this._question.deleteQuestion(qid).subscribe((data) => {
          this._snak.open('Successfully delete the question', '', {
            duration: 3000,
          });
          this.questions = this.questions.filter((q: any) => q.quesId != qid);
        }, (error) => {
          this._snak.open('Error in deleting the question', '', {
            duration: 3000,
          });
          console.log(error);
        });
      }
    });
  }

}
