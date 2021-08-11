import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostService } from 'src/app/services/post.service';
import { Requests } from 'src/app/services/Requests';
import { PostViewComponent } from '../post-view/post-view.component';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent implements OnInit {
  postsList: any = [];
  usernameArray:any;
  noOfFollowers: any;
  noOfFollowing: any;
  statusUser: any;
  aboutUser: any;

  constructor(private mainService:PostService, private request:Requests, private matDialog: MatDialog) { }

  images: any[] = [
    'https://images-na.ssl-images-amazon.com/images/I/51DR2KzeGBL._AC_.jpg',
    'https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg',
    'https://torange.biz/photofx/93/8/light-vivid-colors-fragment-love-background-rain-fall-cover-93412.jpg',
    'https://cdn.pixabay.com/photo/2017/07/18/18/24/dove-2516641_960_720.jpg',
    'https://c0.wallpaperflare.com/preview/956/761/225/5be97da101a3f.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/9/9a/Swepac_FB_465%2C_RV70%2C_with_passing_lorry.jpg'
  ];

  ngOnInit(): void {
    let jsonStatus = {
      "username":localStorage.getItem("username")
    }
    this.mainService.getStatusRequestMethod(jsonStatus).subscribe((response)=>{
      let userResponse:any = response
      this.statusUser = userResponse.status
      this.aboutUser = userResponse.about
    })
    let myMediaPayload = this.mainService.copyObject(this.request.usersMediaRequest);
    myMediaPayload.username = localStorage.getItem("username");
    this.mainService.usersMediaRequestMethod(myMediaPayload).subscribe((response) =>{
      console.log(response);
      this.postsList = response;
      for(let data of this.postsList){
        if(data.singleMediaEntity.postImage!=null){
          let imageModifier = data.singleMediaEntity.postImage;
          data.singleMediaEntity.postImage = this.mainService.copyObject('data:image/jpeg;base64,' + imageModifier);
        }
      }
    });

    this.usernameArray = [];
    let userjson = {
      "username":localStorage.getItem("username")
    }
    this.usernameArray.push(userjson);
    this.mainService.getFollowersCountMethod(this.usernameArray).subscribe((response)=>{
      let responseArray = response
      this.noOfFollowers = responseArray[0].count;
    });
    this.mainService.getFollowingCountMethod(this.usernameArray).subscribe((response)=>{
      let responseArray = response
      this.noOfFollowing = responseArray[0].count;
    })

  }

  getImageData(postRow){
    const dialogRef = this.matDialog.open(PostViewComponent, {
      role: 'dialog',
      height: '800px',
      width: '800px',
      data: {
        "postData": postRow
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      return;
    });
  }

}
