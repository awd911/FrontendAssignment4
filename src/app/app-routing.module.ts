import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { ProfileComponent } from './component/profile/profile.component';
import { MyAlbumsComponent } from './component/my-albums/my-albums.component';
import { CreateAlbumComponent } from './component/create-album/create-album.component';
import { AlbumDetailsComponent } from './component/album-details/album-details.component';
import { UploadPictureComponent } from './component/upload-picture/upload-picture.component';
import { PhotoDetailsComponent } from './component/photo-details/photo-details.component';
import { RecentAlbumsComponent } from './component/recent-albums/recent-albums.component';
import { UserService } from './service/user.service';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';

const adminOnly = () => hasCustomClaim('admin');
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['items']);
const belongsToAccount = (next) => hasCustomClaim(`account-${next.params.id}`);

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'home', component: HomeComponent },
  { path: 'albums/recent', component: RecentAlbumsComponent,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path:'profile/:profileId', component: ProfileComponent,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path:'albums/me', component: MyAlbumsComponent,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path:'create', component: CreateAlbumComponent },
  { path:'album/:albumId', component: AlbumDetailsComponent },
  { path:'upload/:albumId', component: UploadPictureComponent },
  { path:'photo/:photoId', component: PhotoDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
