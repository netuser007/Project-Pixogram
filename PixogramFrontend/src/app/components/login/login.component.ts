import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {RegisterComponent} from '../register/register.component';
import { HomeComponent } from '../home/home.component';
import { Requests } from 'src/app/services/Requests';
import { PostService } from 'src/app/services/post.service';
import { PopupDisplayComponent } from '../popup-display/popup-display.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  retrieveResonse: any;
  base64Data: any;
  retrievedImage: string;

  constructor(
              private authService: AuthService,
              private router: Router,
              private matDialog: MatDialog, private request: Requests, private mainService:PostService) {
  }

  ngOnInit(): void {
    // this.subs.push(this.authService.userData.subscribe(data => {
    //   if (data) {
    //     this.router.navigateByUrl('/').then();
    //   }
    // }));


  }

  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
  }

  login(form: NgForm): void {
    const {username, password} = form.value;

    if (!form.valid) {
      return;
    }
    let loginRequestPayload = this.mainService.copyObject(this.request.loginRequest);
    loginRequestPayload.username = username;
    loginRequestPayload.password = password;
    this.mainService.loginAccountRequestMethod(loginRequestPayload).subscribe((response) => {
      if(response!=null){
        this.retrieveResonse = response;
        this.base64Data = this.retrieveResonse.profileImage;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        localStorage.setItem("profileImage",this.retrievedImage);
        //console.log(this.retrievedImage);
        //localStorage.setItem("profileImage",this.retrieveResonse.profileImage);
        localStorage.setItem("username",this.retrieveResonse.username);
        //console.log(this.retrieveResonse.profileImage);
        this.router.navigateByUrl('/home');
        form.resetForm();
        
      }
      else{
        console.log("invalid credentials");
        const dialogRef = this.matDialog.open(PopupDisplayComponent, {
          role: 'dialog',
          height: '100px',
          width: '300px',
          backdropClass: 'backdropBackground',
          data: {
            "message": "Invalid credentials",
            "color":"red"
          }
        });
      }
    });
    
  }

  openRegister(){
    // const dialogRef = this.matDialog.open(RegisterComponent, {
    //   role: 'dialog',
    //   height: '700px',
    //   width: '700px'
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   const {fname, lname, email, password, avatar} = result;

    //   return;
    // });
    this.router.navigateByUrl('/register');
  }


}
