import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { HomeComponent } from './component/home/home.component';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { environment } from 'src/environments/environment';
import { MyAlbumsComponent } from './component/my-albums/my-albums.component';
import { ProfileComponent } from './component/profile/profile.component';
import { CreateAlbumComponent } from './component/create-album/create-album.component';
import { AlbumDetailsComponent } from './component/album-details/album-details.component';
import { UploadPictureComponent } from './component/upload-picture/upload-picture.component';
import { PhotoDetailsComponent } from './component/photo-details/photo-details.component';
import { RecentAlbumsComponent } from './component/recent-albums/recent-albums.component';
import { UserService } from './service/user.service';
import { AlbumService } from './service/album.service';

import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    MyAlbumsComponent,
    ProfileComponent,
    CreateAlbumComponent,
    AlbumDetailsComponent,
    UploadPictureComponent,
    PhotoDetailsComponent,
    RecentAlbumsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    HttpClientModule,
  ],
  providers: [ UserService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
