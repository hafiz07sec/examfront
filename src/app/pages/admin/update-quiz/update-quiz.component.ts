import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent {

  qId: any = '';
  quiz: any;
  categories: any = [];
  constructor(private _route: ActivatedRoute,
    private _quiz: QuizService,
    private _categories: CategoryService,
    public _router:Router) { }

  ngOnInit() {
    this.qId = this._route.snapshot.params['qid'];
    this._quiz.getQuiz(this.qId).subscribe((data) => {
      this.quiz = data;
      // console.log(this.quiz)
    }, (error) => {
      console.log("Error in loading data from server");

    });

    this._categories.categories().subscribe((data: any) => {
      //cattegories load
      this.categories = data;
    },
      (error) => {
        //Error in loading data
        console.log(error);
        Swal.fire('Error!', 'Error in Loading categories', 'error');
      });

  }

  updateQuiz() {
    this._quiz.updateQuiz(this.quiz).subscribe((data: any) => {
      Swal.fire('Update!', 'Quiz updated', 'success').then((e)=>{
        this._router.navigate(['/admin/quizzes']);
      });

    },
      (error) => {
        //Error in loading data
        console.log(error);
        Swal.fire('Error!', 'Error in Updating Category', 'error');
      });


  }

}
