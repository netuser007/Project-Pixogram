import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PostService} from '../../services/post.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  constructor(private postService: PostService,
    private authService: AuthService,private router: Router) { }

    selectedIndex:any = 0;

  ngOnInit(): void {
    this.selectedIndex = localStorage.getItem("uploadTab");
  }

  logout(): void {
    // this.authService.Logout();
    this.router.navigateByUrl('/login');
  }

  redirectToHome(){
    this.router.navigateByUrl('/home');
  }

  postMessage(data){
    console.log(data);
  }

}
