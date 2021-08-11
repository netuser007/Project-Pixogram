import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Requests } from 'src/app/services/Requests';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  selectedFile: any;
  message: string;
  selectedFiles: any;
  currentFileUpload: any;
  showMessage: any;

  // fname:any;
  // lname:any;
  //public dialogRef: MatDialogRef<RegisterComponent>,
  constructor(private router: Router, private request: Requests, private mainService:PostService) { }

  ngOnInit(): void {
  }

  goToLogin(){
    this.router.navigateByUrl('/login');
  }

  public onFileChanged(newFiles: FileList) {
    console.log("coming here");
    console.log(event);
    this.selectedFile = newFiles;
    this.selectedFiles = newFiles;
  }

  registerPut(){
    console.log(this.selectedFile.item(0));
    let file : File = this.selectedFile.item(0); 
    var fd = new FormData();
    fd.append('file', file, 'test');

    console.log(fd);
    console.log(JSON.stringify(fd));
  }

  register(data){
    let file : File = this.selectedFile.item(0); 
    var formData = new FormData();
    const registerPayload = new FormData();
    let registerRequest = this.mainService.copyObject(this.request.createAccountRequest);
    let formattedDt = formatDate(data.date, 'dd-MM-yyyy', 'en_US')
    console.log(formattedDt);
    registerRequest.firstName = data.fname
    registerRequest.lastName = data.lname
    registerRequest.username = data.username
    registerRequest.email = data.email
    registerRequest.dateOfBirth = formattedDt
    registerRequest.password = data.password
    registerRequest.confirmPassword = data.confirmPassword
    let registerRequestString = JSON.stringify(this.mainService.copyObject(registerRequest));
    registerPayload.append('profileImage', file);
    registerPayload.append('userData', registerRequestString);
    console.log(data);
    console.log(registerPayload);
    console.log(JSON.stringify(registerPayload))
    console.log(registerRequest);
    this.mainService.createAccountRequestMethod(registerPayload).subscribe((response) =>{
      console.log(response);
      this.showMessage = response;
      this.showMessage = this.showMessage.message;
      if(this.showMessage=="Registered"){
        setTimeout(() => { this.goToLogin() }, 3000);
      }
    });
    // this.router.navigateByUrl('/home');
  }

  uploadFileEvt(event){
    console.log(event.value);
    console.log(event);
  }

  upload(event){
    console.log(event);
  }

  uploadFiles(event){
    console.log(event);
  }

}
