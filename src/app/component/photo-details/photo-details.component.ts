import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from 'src/app/model/Photo';
import { Comment } from 'src/app/model/Comment';
import { PhotoService } from 'src/app/photo.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})


export class PhotoDetailsComponent implements OnInit {

  photoId: String;
  photo: Photo;
  allComments: Comment[];

  constructor(private route: ActivatedRoute, private photoService:PhotoService) {   }

  ngOnInit(): void {
    this.route.paramMap.subscribe( params=>{
      this.photoId = params.get('photoId');
      console.log("Get photoId : ",this.photoId);

      this.loadPhoto(this.photoId);
      this.loadComments(this.photoId);
    });
  }

  loadPhoto(photoId: String){
    this.photoService.getPhoto(photoId).subscribe(
      photo =>{
        this.photo = <Photo>photo;
        console.log("Loaded Photo details : ",this.photo);
      }
    )
  }

  loadComments(photoId: String){
    this.photoService.getComments(photoId).subscribe(
      comments =>{
        this.allComments = (<Comment[]>comments).reverse();
        console.log("Loaded Comments : ",this.allComments);
      }
    )
  }

  makeProfilePhoto(){
    console.log("The URL at the time", this.photo.photoUrl);
    this.photoService.setProfilePhoto(this.photo.photoUrl).subscribe(
      response =>{
        console.log ("Profile Photo Updated!! ", response);
      }
    );
  }

  makeAlbumPhoto(){
    console.log("The Albums ID ", this.photo.albumId, " The new album URL: ", this.photo.photoUrl);
    this.photoService.setAlbumPhoto(this.photo.photoUrl,this.photo.albumId).subscribe(
      response =>{
        console.log ("Album Photo Updated!! ", response);
      }
    );
  }
}