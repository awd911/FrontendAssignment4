import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  
  title = 'Profile Page';

  imageURL = "https://cdn-icons-png.flaticon.com/512/1250/1250689.png";

  viewCount = 0;
  name="default";

  list = ["item 1", "item 2", "item 3"];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCurrentUserProfile().subscribe(
      userProfile =>{
        this.user = <User>userProfile;
        console.log("Got user profile, user name, user profilepic", this.user,this.user.name,this.user.profilePhotoUrl);

      }
    );
  }

  incrementCount(){
    this.viewCount ++;
  }

}
