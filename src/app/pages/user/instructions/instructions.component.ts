import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent {
  marks:number=0;
  qid: any;
  quiz: any='';
  constructor(private _route: ActivatedRoute, private _quiz: QuizService, private _router:Router) { }

  ngOnInit() {
    this.qid = this._route.snapshot.params['qId'];
    // console.log(this.qid);
    this._quiz.getQuiz(this.qid).subscribe((data: any) => {
      this.quiz=data;
       this.marks=Math.trunc(this.quiz.maxMarks/this.quiz.numberOfQuestions);
      console.log(this.quiz);
    },(error)=>{
      console.log(error);
    })
  }

  startQuiz(){
    Swal.fire({
      title: 'Do you want to start the Quiz?',
      showCancelButton: true,
      confirmButtonText: 'Start',
      icon:'info'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
       this._router.navigate(['/start/'+ this.qid])
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })

  }

}
