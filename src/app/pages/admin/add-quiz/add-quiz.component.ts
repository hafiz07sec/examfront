import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent {
  categories: any = [];
  quizData = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: 'true',
    category: {
      cid: '',
    },
  };

  constructor(private _categories: CategoryService, public _snak: MatSnackBar, private _quiz: QuizService) { }

  ngOnInit() {
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

  addQuiz() {

    //validation check
    if (this.quizData.title.trim() == '' || this.quizData.title == null) {
      this._snak.open('Title required!!', '', {
        duration: 300
      });
      return;
    }
    else if (this.quizData.description.trim() == '' || this.quizData.description == null) {
      this._snak.open('Description required!!', '', {
        duration: 300
      });
      return;
    }
    else if (this.quizData.maxMarks.trim() == '' || this.quizData.maxMarks == null) {
      this._snak.open('Maximum Marks are required!!', '', {
        duration: 300
      });
      return;
    }
    else if (this.quizData.numberOfQuestions.trim() == '' || this.quizData.numberOfQuestions == null) {
      this._snak.open('Number of  Questions are required!!', '', {
        duration: 300
      });
      return;
    }
    else if (this.quizData.category.cid == '' || this.quizData.category.cid == null) {
      this._snak.open('Category Selection is required!!', '', {
        duration: 300
      });
      return;
    }

    //call server
    this._quiz.addQuiz(this.quizData).subscribe((data: any) => {
      //quiz load
      Swal.fire('Success!!',"Successfully store quiz",'success');
      this.quizData = {
        title: '',
        description: '',
        maxMarks: '',
        numberOfQuestions: '',
        active: 'true',
        category: {
          cid: '',
        },
      };
    },
      (error) => {
        //Error in sending data
        console.log(error);
        Swal.fire('Error!', 'Error while adding Quiz', 'error');
      });

  }
}



