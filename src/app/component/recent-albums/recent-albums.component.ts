import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/model/Album';
import { Photo } from 'src/app/model/Photo';
import { AlbumService } from 'src/app/service/album.service';
import { PhotoDetailsComponent } from '../photo-details/photo-details.component';



@Component({
  selector: 'app-recent-albums',
  templateUrl: './recent-albums.component.html',
  styleUrls: ['./recent-albums.component.css']
})
export class RecentAlbumsComponent implements OnInit {
  //public RecentAlbums: Album[];


  
  albums: Album[];
  photos: Photo[];
  

  constructor(private albumService: AlbumService) { }

  ngOnInit(): void {
    console.log("Calling albumService from component");
    this.albumService.getAllAlbums().subscribe(
      response =>{
        this.albums = <Album[]>response;
        console.log("Got all album response: ",this.albums);
        
        this.albumService.getPhotos(this.albums[0].id).subscribe(
          photoResponse =>{
            this.photos = <Photo[]>photoResponse;

            console.log("Got all Photos response: ",this.photos);
            
            console.log("The two data object lists are Albums: ",this.albums," And Photos: ",this.photos);
          }
        );
      }
    );
    console.log("OUTSIDE Albums: ",this.albums," And Photos: ",this.photos);
  }


}

