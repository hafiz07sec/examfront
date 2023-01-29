import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { from } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',

  };
  constructor(private userService: UserService, private _snackBar: MatSnackBar) {

  }

  formSubmit() {
    console.log(this.user);
    if (this.user.username == '' || this.user.username == null) {
      // alert("Username required...!!!");
      this._snackBar.open("Username required...!!!", "", {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    }


    //add user: UserService
    this.userService.addUser(this.user).subscribe(
      (data: any) => {
        // success
        console.log(data);
        // alert("Success");
        Swal.fire(
          'Successfully resgistered',
          'User id ' + data.id,
          'success',

        );

        //set all value to null after success
        this.user = {
          username: '',
          password: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
        };

      },
      (error) => {
        //error
        console.log(error);
        // alert("Something went wrong");
        this._snackBar.open("Something went wrong", "", {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });

      }
    );


  }

}
