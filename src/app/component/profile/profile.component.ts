import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  title = 'Profile Page';

  imageURL = "https://cdn-icons-png.flaticon.com/512/1250/1250689.png";

  viewCount = 0;
  name="default";

  list = ["item 1", "item 2", "item 3"];

  constructor() { }

  ngOnInit(): void {
  }

  incrementCount(){
    this.viewCount ++;
  }

}
