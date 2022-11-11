import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/compat';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signInFormVisible = true;
  email: string;
  password: string;
  

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  logIn() {
    this.userService.logInUser(this.email, this.password);

    this.email="";
    this.password="";
  }

  makeSignInFormVisible(){
    this.signInFormVisible = true;
  }

  makeSignUpFormVisible(){
    this.signInFormVisible = false;
  }

}
