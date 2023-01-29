import { Component } from '@angular/core';
import { Action } from 'rxjs/internal/scheduler/Action';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent {
  quizzes: any = [];

  constructor(private _quiz: QuizService) {

  }
  ngOnInit() {
    this._quiz.quizzes().subscribe((data: any) => {
      this.quizzes = data;
      // console.log(this.quizzes);

    },
      (error) => {
        console.log(error);
        Swal.fire('Error!!', 'Error in loading data', 'error');
      }
    );
  }
  deleteQuiz(qId: any) {
  
  Swal.fire({
    icon:'warning',
    title:'Are you sure?',
    confirmButtonText:'Delete',
    confirmButtonColor:'red',
    showCancelButton:true,
    cancelButtonText:'Cancel',
    cancelButtonColor:'blue'
  }).then((result)=>{
    if(result.isConfirmed){
      //delete quiz
      this._quiz.deleteQuiz(qId).subscribe((data: any) => {
    
        Swal.fire('Success!!', 'Delete Quiz successfully', 'success');
        this.quizzes = this.quizzes.filter((quiz: any) => quiz.qId!== qId);
  
      },
        (error) => {
          console.log(error);
          Swal.fire('Error!!', 'Error in deleting quiz', 'error');
        }
      );
    }else{
      //cancel Delete
    }
  });
}
}
