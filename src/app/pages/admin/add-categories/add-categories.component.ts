import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent {

  category = {
    title: '',
    description: ''
  };

  constructor(private _category: CategoryService, private _snack: MatSnackBar) { }

  ngOnInit() {

  }

  formSubmit() {
    if (this.category.title.trim() == '' || this.category.title == null) {
      this._snack.open('Title require!!', '', {
        duration: 3000,
      });
      return;
    }

    //all done 

    this._category.addCategory(this.category).subscribe( (data: any) => {
      this.category.title='';
      this.category.description='';
      Swal.fire('Success!!', 'New Category added successfully','success');
    },
    (error) => {
      console.log(error);
      Swal.fire('Error!!', 'Server Error','error');
    }
    );
  }

}
