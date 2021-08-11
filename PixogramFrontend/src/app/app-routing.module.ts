import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import { UploadComponent } from './components/upload/upload.component';
import { HomebarComponent } from './components/homebar/homebar.component';
import { FollowersComponent } from './components/followers/followers.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { FileBrowserComponent } from './components/file-browser/file-browser.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: HomeComponent,
  // },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'upload',
    component: UploadComponent
  },
  {
    path: 'homeBar',
    component: HomebarComponent
  },
  {
    path: 'followers',
    component: FollowersComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'myprofile',
    component: MyprofileComponent
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'filebrowser',
    component: FileBrowserComponent
  },
  {
    path: 'allusers',
    component: AllUsersComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }

];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
