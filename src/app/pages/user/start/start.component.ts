import { LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { parse } from 'path';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent {

  qid: any;
  questions: any;
  marksGot: any = 0;
  correctAns: any = 0;
  attempted: any = 0;
  isSubmit=false;
  timer:any;
 

  constructor(private locationSt: LocationStrategy, private _route: ActivatedRoute, private _question: QuestionService) { }

  ngOnInit() {
    this.preventBackButton();
    this.qid = this._route.snapshot.params['qid'];
    // console.log(this.qid);
    this.loadQuestion();
  }

  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }

  loadQuestion() {
    this._question.getQuestionOfQuizForTest(this.qid).subscribe((data) => {
      this.questions = data;
      this.timer=this.questions.length * 2 * 60;
     

      console.log(this.questions);

     this.strtTimer();

    }, (error) => {
      Swal.fire("Error", "Error in loading test question!!", 'error');
    });
  }
  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the Quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon: 'info'
    }).then((result) => {
      if (result.isConfirmed) {
        this.evalQuiz();
        
      } else if (result.isDenied) {
        Swal.fire('Cancel Submit', '', 'info')
      }
    })
  }

  strtTimer(){
   let t= window.setInterval(()=>{
      if(this.timer <=0){
        this.evalQuiz();
        clearInterval(t);
      }
      else{
        this.timer--;
      }
    }, 1000);
  }
  getFormattesTime(){
    let mm= Math.floor(this.timer/60);
    let ss=this.timer-mm*60;
    return `${mm} min : ${ss} sec`;
  }
  evalQuiz(){
    //     //calculation

    // Call server to check question
    this._question.evalQuiz(this.questions).subscribe((data:any)=>{
      this.attempted = data.attempted;
      this.marksGot = Math.round(data.marksGot);
      this.correctAns = data.correctAns;
      this.isSubmit = true;
      console.log(data);
     
    },(error)=>{
      console.log(error);
      
    });

    //     this.questions.forEach((q: any) => {
    //       if (q.givenAns == q.answer) {
    //         this.correctAns++;
    //         let markSingle = this.questions[0].quiz.maxMarks / this.questions.length;
    //         this.marksGot +=markSingle;

    //       }
    //       if(q.givenAns.trim() != ''){
    //         this.attempted++;
    //       }

    //     });
        // console.log("Total marks:",this.marksGot);
  }

  printPage(){
    window.print();
  }

}
