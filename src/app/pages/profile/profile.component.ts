import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: any;
  constructor(private login: LoginService) { }

  ngOnInit() {
    this.user = this.login.getUser();
    //   this.login.getCurrentUser().subscribe((user:any)=>{
    //     this.user = user;
    //   },(error)=>{
    //     alert("Error in loading API")
    //   });
  }

}
