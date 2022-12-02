import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from 'src/app/model/Photo';
import { AlbumService } from 'src/app/service/album.service';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css']
})
export class AlbumDetailsComponent implements OnInit {

  albumId: String;
  photos : Photo[];
  photoHTTP: String;

  constructor(private route: ActivatedRoute, private albumService: AlbumService){}

  

  ngOnInit(): void {
    this.route.paramMap.subscribe( params=>{
      this.albumId = params.get('albumId');
      console.log("Get albumID : ",this.albumId);
      this.albumService.getPhotos(this.albumId).subscribe(
          photos => {
            this.photos = <Photo[]>photos;
            console.log("Get photos for this album : ",this.photos);
  
          }
      );
    });
  }

}
