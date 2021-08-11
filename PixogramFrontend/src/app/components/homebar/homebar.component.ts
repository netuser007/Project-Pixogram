import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PostService} from '../../services/post.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-homebar',
  templateUrl: './homebar.component.html',
  styleUrls: ['./homebar.component.scss']
})
export class HomebarComponent implements OnInit {
  profileImage:any;
  constructor(private postService: PostService,
    private authService: AuthService,private router: Router) { }

    searchText:any;
    username_string:string;

  ngOnInit(): void {
    this.username_string = "Username"
    this.username_string = localStorage.getItem("username");
    this.profileImage = localStorage.getItem("profileImage");
  }

  logout(): void {
    // this.authService.Logout();
    localStorage.removeItem("username");
    localStorage.removeItem("profileImage");
    this.router.navigateByUrl('/login');
  }

  redirectToHome(){
    this.router.navigateByUrl('/home');
  }

  redirectToFollowers(){
    this.router.navigateByUrl('/followers');
  }

  redirectToSettings(tabNumber){
    if(this.router.url=="/settings"){
      window.location.reload();
    }
    localStorage.setItem("settingsTab",tabNumber);
    this.router.navigateByUrl('/settings');
  }

  redirectToMyProfile(){
    this.router.navigateByUrl('/myprofile');
  }

  redirectToAllUsersPage(){
    this.router.navigateByUrl('/allusers');
  }

  addPhotos(tabNumber){
    if(this.router.url=="/upload"){
      window.location.reload();
    }
    localStorage.setItem("uploadTab",tabNumber);
    this.router.navigateByUrl('/upload');
  }

}
