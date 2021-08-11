import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostService } from 'src/app/services/post.service';
import { Requests } from 'src/app/services/Requests';
import { FileBrowserComponent } from '../file-browser/file-browser.component';
import { PopupDisplayComponent } from '../popup-display/popup-display.component';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.scss']
})
export class UploadVideoComponent implements OnInit {
  imagePath: any;
  url: string | ArrayBuffer;
  divisions:any = [];
  componentId:number = 0;

  constructor(private request: Requests, private mainService:PostService, private matDialog: MatDialog) { }

  @ViewChild('fileBrowser') public fileBrowser: FileBrowserComponent;

  caption:any;
  
  ngOnInit(): void {
  }

  confirmFiles(event,component){
    console.log("received files");
    console.log(event);
    console.log(component);
    let data  = event[0];
    console.log(data);
    component.media = event[0];
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

    addComponent(){
      this.componentId = this.componentId + 1;
      let mediaRequest = this.mainService.copyObject(this.request.postMediaRequest);
      let postID = this.mainService.getUniqueId();
      let currentDate = this.mainService.getTimeStamp();
      mediaRequest.postId = postID;
      mediaRequest.username = localStorage.getItem("username");
      mediaRequest.avatar = localStorage.getItem("profileImage");
      mediaRequest.timeStamp = currentDate
      // let json = {
      //   "postid": this.componentId
      // };
      this.divisions.push(mediaRequest);
    }

    discardFiles(){
      this.url = undefined;
      this.fileBrowser.uploadedFiles = [];
      this.fileBrowser.refreshChild()
      this.divisions = []
    }

    uploadAll(){
      console.log(this.divisions);
      for(let data of this.divisions){
        let selectedFile = data.media;
        const uploadMediaPayload = new FormData();
        uploadMediaPayload.append("media",selectedFile);
        delete data['media'];
        uploadMediaPayload.append("mediaData",JSON.stringify(data));
        this.mainService.postMediaRequestMethod(uploadMediaPayload).subscribe((response) => {
          console.log(response);

        });

        let enterNewsFeedPayload = this.mainService.copyObject(this.request.enterNewsFeedRequest);
        enterNewsFeedPayload.username = localStorage.getItem("username");
        enterNewsFeedPayload.timeStamp = this.mainService.getTimeStamp();
        enterNewsFeedPayload.description = "You shared post with title " + data.title + ", description " + data.description + " and tags "+data.tags;
        this.mainService.enterNewsFeedRequestMethod(enterNewsFeedPayload).subscribe((response)=>{
          console.log(response);
        })
      }
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
    }

}
