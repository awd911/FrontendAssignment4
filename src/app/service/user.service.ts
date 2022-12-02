import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { User } from '../model/User';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { querystring } from '@firebase/util';
// import { stringLength } from '@firebase/util';



@Injectable({
  providedIn: 'root'
})

export class UserService implements CanActivate {

  user: Observable<any>;
  userIdToken: String;
  defaultProfilePhoto: string = "www.picsum.photos/200/300";
  currentEmail: string = "placeholder";

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private http: HttpClient,
  ) 
  { 
    this.user = this.angularFireAuth.user; 

    console.log("User ID Token at the constructor of UserService: " , localStorage.getItem('userIdToken'))

    this.user.subscribe(
      userInfo => {
        if(userInfo != null)
        {
          console.log("User Info is available", userInfo);
          this.storeIdToken(userInfo.getIdToken());
        }
      }
    );

    this.angularFireAuth.onAuthStateChanged(user =>{
      if(user){
        console.log(user.email + " is Logged in!");
      } else {
        console.log ("User is Logged Out");
      }
    })
  }

  storeIdToken(idToken: Promise<string>){
    idToken.then(
      idTokenValue => {
        localStorage.setItem('userIdToken', idTokenValue);
        console.log("Id Token is available: ", localStorage.getItem('userIdToken'));
      }
    );
  }

  logInUser(email: string, password: string) {
    this.angularFireAuth.signInWithEmailAndPassword(email, password).then(
      (value) => {

        this.currentEmail = email;
        console.log('log in successfull', value , " current users email - ",this.currentEmail);
        this.router.navigate(['/albums/recent'])
      },
      error => {
        console.log('error logging in: ', error);
      }
    )
  }

  signUpUser(email: string, password: string, name: string) {
    this.angularFireAuth.createUserWithEmailAndPassword(email, password).then(
      (value) => {
        this.currentEmail = email;
        console.log('user sign up successfull', value);
        this.registerUser(email, name);
      },
      error => {
        console.log('user sign up error');
      }
    )
  }

  registerUser(email: string, name: string){

    var user :User = {
      id: Date.now().toString(),
      name: name,
      email: email,
      profilePhotoUrl: this.defaultProfilePhoto,
      
    };
    console.log("User being registered, ", user);
    this.http.post(environment.API_BASE_URL+"/user/register",user)
    .subscribe( response=>{
      console.log('Registration successfull');
      this.router.navigate(['/albums/recent']);
    });

  }

  logOutUser() {

    localStorage.clear();

    this.angularFireAuth.signOut().then(
      ()=> {
        console.log('user sign out');
        this.router.navigate(['/login']);
      },
      error => {
        console.log('Error logging out');
      }
    )
  }


  canActivate(): boolean{
    if(this.angularFireAuth.currentUser != null){
      console.log("User can Navigate");
      return true;
    }
    else{
      console.log("User not allowed to Navigate");

      this.router.navigate(['login']);
      return false;
    }
  }

  getHeaders(){
    var headers ={
      'idToken': localStorage.getItem('userIdToken'),
      'email':this.currentEmail
    };

    return headers;
  }

  getCurrentUserProfile(){
    var headers = this.getHeaders();
    console.log("This users email : ",this.currentEmail);

    
    return this.http.get(environment.API_BASE_URL+"/user",{headers})
  }
}
