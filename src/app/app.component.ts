import { Component } from '@angular/core';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'firebase-demo';

  email:string;
  password:string;
  name:string;

  constructor(public userService:UserService){}

  signup(){
    this.userService.signUpUser(this.email,this.password,this.name);
    this.email = this.password = this.name ='';
  }

  login(){
    this.userService.logInUser(this.email,this.password);
    this.email = this.password = '';
  }

  logout(){
    this.userService.logOutUser();
  }
}
