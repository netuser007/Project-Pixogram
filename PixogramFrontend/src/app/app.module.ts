import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './shared/material.module';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './components/login/login.component';
import {FormsModule} from '@angular/forms';
import {environment} from '../environments/environment';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UploadComponent } from './components/upload/upload.component';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { HomebarComponent } from './components/homebar/homebar.component';
import { MatTabsModule } from '@angular/material/tabs';
import { UploadPhotoComponent } from './components/upload-photo/upload-photo.component';
import { UploadVideoComponent } from './components/upload-video/upload-video.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { FollowersComponent } from './components/followers/followers.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { FileBrowserComponent } from './components/file-browser/file-browser.component';
import { HttpClientModule } from "@angular/common/http";
import { Requests } from './services/Requests';
import { EndPoints } from './services/EndPoints';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { PostViewComponent } from './components/post-view/post-view.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PopupDisplayComponent } from './components/popup-display/popup-display.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UploadComponent,
    HomebarComponent,
    HomeComponent,
    UploadPhotoComponent,
    UploadVideoComponent,
    SettingsComponent,
    MyprofileComponent,
    FollowersComponent,
    FileBrowserComponent,
    AllUsersComponent,
    SearchResultComponent,
    PostViewComponent,
    PopupDisplayComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    CommonModule,
    MaterialModule,
    MatBadgeModule,
    MatMenuModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatProgressBarModule,
    FileUploadModule,
    HttpClientModule,
    ScrollingModule,
  ],
  providers: [Requests,EndPoints],
  bootstrap: [AppComponent]
})
export class AppModule {
}
