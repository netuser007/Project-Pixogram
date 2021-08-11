import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostService } from 'src/app/services/post.service';
import { Requests } from 'src/app/services/Requests';
import { FileBrowserComponent } from '../file-browser/file-browser.component';
import { PopupDisplayComponent } from '../popup-display/popup-display.component';

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.scss']
})
export class UploadPhotoComponent implements OnInit {
  imagePath: any;
  url: string | ArrayBuffer;
  titleModel:any;
  descriptionModel:any;
  tagsModel:any;
  selectedImage:any;

  @ViewChild('fileBrowser') public fileBrowser: FileBrowserComponent;

  constructor(private request: Requests, private mainService:PostService, private matDialog: MatDialog) { }

  caption:any;
  pipe = new DatePipe('en-US');

  ngOnInit(): void {
    
  }

  confirmFiles(event){
    console.log("received files");
    console.log(event);
    this.selectedImage = event[0];
    console.log(this.selectedImage);
    //this.show(event);
  }

  show(event){
      const mimeType = event[0].type;
      console.log(mimeType);
      // if (mimeType.match(/image\/*/) == null) {
      //   this.message = "Only images are supported.";
      //   return;
      // }
      const reader = new FileReader();
      this.imagePath = event;
      reader.readAsDataURL(event[0]); 
      reader.onload = (_event) => { 
        this.url = reader.result; 
      }
    }

    updateDetails(event){
      console.log(event);
    }

    discardFiles(){
      this.url = undefined;
      this.fileBrowser.uploadedFiles = undefined;
      this.fileBrowser.refreshChild()
    }

    uploadMedia(){
      let postId = this.mainService.getUniqueId();
      let currentDate = this.mainService.getTimeStamp();
      const uploadMediaPayload = new FormData();
      let uploadMediaRequest = this.mainService.copyObject(this.request.postMediaRequest);
      uploadMediaRequest.username = localStorage.getItem("username");
      //uploadMediaRequest.avatar = localStorage.getItem("profileImage");
      uploadMediaRequest.title = this.titleModel;
      uploadMediaRequest.description = this.descriptionModel;
      uploadMediaRequest.tags = this.tagsModel;
      uploadMediaRequest.timeStamp = currentDate;
      uploadMediaRequest.postId = postId;
      console.log(uploadMediaRequest);
      let stringData = JSON.stringify(uploadMediaRequest);
      uploadMediaPayload.append("media",this.selectedImage);
      uploadMediaPayload.append("mediaData",stringData);
      this.mainService.postMediaRequestMethod(uploadMediaPayload).subscribe((response) =>
      {
        console.log(response);

        const dialogRef = this.matDialog.open(PopupDisplayComponent, {
          role: 'dialog',
          height: '100px',
          width: '300px',
          backdropClass: 'backdropBackground',
          data: {
            "message": "Posted Succesfully",
            "color":"green"
          }
        });
    
        dialogRef.afterClosed().subscribe(result => {
          return;
        });

      });

      let enterNewsFeedPayload = this.mainService.copyObject(this.request.enterNewsFeedRequest);
      enterNewsFeedPayload.username = localStorage.getItem("username");
      enterNewsFeedPayload.timeStamp = this.mainService.getTimeStamp();
      enterNewsFeedPayload.description = "You shared post with title " + this.titleModel + ", description " + this.descriptionModel + " and tags "+this.tagsModel;
      this.mainService.enterNewsFeedRequestMethod(enterNewsFeedPayload).subscribe((response)=>{
        console.log(response);
      })

    }



}
