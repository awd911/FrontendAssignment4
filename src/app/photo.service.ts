import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private router: Router, private http: HttpClient) { }


  setProfilePhoto(photoUrl: string){
    var headers = this.getHeaders();
    var params = new HttpParams().set('profilePhotoUrl',<string>photoUrl);
    console.log("The params/request body, ", params," URL: ", photoUrl);

    return this.http.put<any>(environment.API_BASE_URL+"/user/me/profilePhoto",params,{headers})
  }

  getPhoto(photoId: String){
    var headers = this.getHeaders();

    return this.http.get(environment.API_BASE_URL+"/photo/"+photoId,{headers})
  }

  getComments(photoId: String){
    var headers = this.getHeaders();

    return this.http.get(environment.API_BASE_URL+"/photo/"+photoId+"/comments",{headers})

  }

  getHeaders(){
    var headers ={
      'idToken': localStorage.getItem('userIdToken'),
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Headers":  "Content-Type, X-Auth-Token, Authorization, Origin",
    // "Access-Control-Allow-Methods":  "POST, PUT, GET"
    };

    return headers;
  }


}
