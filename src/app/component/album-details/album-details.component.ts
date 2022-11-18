import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { stringify } from 'querystring';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css']
})
export class AlbumDetailsComponent implements OnInit {

  albumId: String;

  constructor(private route: ActivatedRoute) {   }

  ngOnInit(): void {
    this.route.paramMap.subscribe( params=>{
      this.albumId = params.get('albumId');
      console.log("Get albumID : ",this.albumId);
    });
  }

}
