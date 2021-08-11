import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PostService} from '../../services/post.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { Requests } from 'src/app/services/Requests';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  images: any[] = [
    'https://images-na.ssl-images-amazon.com/images/I/51DR2KzeGBL._AC_.jpg',
    'https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg',
    'https://torange.biz/photofx/93/8/light-vivid-colors-fragment-love-background-rain-fall-cover-93412.jpg',
    'https://cdn.pixabay.com/photo/2017/07/18/18/24/dove-2516641_960_720.jpg',
    'https://c0.wallpaperflare.com/preview/956/761/225/5be97da101a3f.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/9/9a/Swepac_FB_465%2C_RV70%2C_with_passing_lorry.jpg'
  ];
  subs: Subscription[] = [];
  posts:any = [];
  isActive: boolean = false;
  isActiveBlack:boolean = false;
  today= new Date();
  putComment:boolean = false;
  currentComment:any;
  titlePost:any;

  todaysDataTime = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
  commentsToShow: any[] = [];
  lenOfComments: number = 3;
  profileImage: string;

  constructor(private mainService: PostService,
              private authService: AuthService,private router: Router, private request:Requests) {
  }

  ngOnInit(){
    this.profileImage = localStorage.getItem("profileImage");
    this.mainService.allPostsRequestMethod(localStorage.getItem("username")).subscribe((response) => {
      console.log(response);
      this.posts = response;
      for(let data of this.posts){
          if(data.singleMediaEntity.postImage!=null){
             let imageModifier = data.singleMediaEntity.postImage;
             data.singleMediaEntity.postImage = this.mainService.copyObject('data:image/jpeg;base64,' + imageModifier);
          }
      }
    })

  }

  updateTitle(title){
    this.titlePost = title;
  }

  likeUnlike(){
    console.log("liked")
    this.isActive = !this.isActive;
  }

  postMessage(form: NgForm): void {
    this.today = new Date();
    const {message} = form.value;
    console.log(form.value);
    let postMediaRequest = this.mainService.copyObject(this.request.postMediaRequest);
    postMediaRequest.title = this.titlePost;
    postMediaRequest.description = form.value.message;
    postMediaRequest.timeStamp = this.mainService.getTimeStamp();
    postMediaRequest.postId = this.mainService.getUniqueId();
    postMediaRequest.username = localStorage.getItem("username");
    console.log(postMediaRequest);
    this.titlePost = undefined;
    this.mainService.postMessageRequestMethod(postMediaRequest).subscribe((response) => {
      console.log(response);
    });
    form.resetForm();
  }

  logout(): void {
    // this.authService.Logout();
    this.router.navigateByUrl('/login');
  }

  comment(){
    console.log("comment");
    this.putComment = !this.putComment;
  }

  coming(){
    console.log("working");
  }

  postComment(row,currentComment){
    let commentPayload = this.mainService.copyObject(this.request.commentOnPostRequest);
    commentPayload.username = localStorage.getItem("username");
    commentPayload.postId = row.singleMediaEntity.postId;
    commentPayload.comment = currentComment;
    commentPayload.timeStamp = this.mainService.getTimeStamp();
    row.commentsList.push(commentPayload);
    this.mainService.commentOnPostRequestMethod(commentPayload).subscribe((response)=>{
      console.log(response);
    })
    this.currentComment = undefined;
    let enterNewsFeedPayload = this.mainService.copyObject(this.request.enterNewsFeedRequest);
      enterNewsFeedPayload.username = localStorage.getItem("username");
      enterNewsFeedPayload.timeStamp = this.mainService.getTimeStamp();
      enterNewsFeedPayload.description = "You commented on post shared by " + row.singleMediaEntity.username + " with the description as " + currentComment;
      this.mainService.enterNewsFeedRequestMethod(enterNewsFeedPayload).subscribe((response)=>{
        console.log(response);
      })
  }

  addPhotos(){
    console.log("add")
    localStorage.setItem("uploadTab","0");
    this.router.navigateByUrl('/upload');
  }

  addEmotions(){
    console.log("emotions")
  }

  redirectToHome(){
    this.router.navigateByUrl('/homeBar');
  }

  likeUnlikeBlack(){
    this.isActiveBlack = !this.isActiveBlack;
  }

  showCommentSection(row){
    if(row.showComments == undefined){
      row.showComments = true;
    }
    else{
      row.showComments = !row.showComments;
    } 
  }

  likePost(row){    
    let likePayload = this.mainService.copyObject(this.request.likePostRequest)
    likePayload.postId = row.singleMediaEntity.postId;
    likePayload.username = localStorage.getItem("username");
    row.likesList.push(likePayload);
    this.mainService.likePostRequestMethod(likePayload).subscribe((response) => {
      console.log(response);
    })

    let enterNewsFeedPayload = this.mainService.copyObject(this.request.enterNewsFeedRequest);
      enterNewsFeedPayload.username = localStorage.getItem("username");
      enterNewsFeedPayload.timeStamp = this.mainService.getTimeStamp();
      enterNewsFeedPayload.description = "You liked the post shared by " + row.singleMediaEntity.username;
      this.mainService.enterNewsFeedRequestMethod(enterNewsFeedPayload).subscribe((response)=>{
        console.log(response);
      })
  }

  unlikePost(row){
    let counter = 0;
    for(let data of row.likesList){
      if(data.postId==row.singleMediaEntity.postId && data.username==localStorage.getItem("username")){
        row.likesList.splice(counter,1);
        break;
      }
      else{
        counter = counter + 1;
      }
    }
    let unlikePayload = this.mainService.copyObject(this.request.dislikePostRequest);
    unlikePayload.postId = row.singleMediaEntity.postId;
    unlikePayload.username = localStorage.getItem("username");
    this.mainService.dislikePostRequestMethod(unlikePayload).subscribe((response)=>{
      console.log(response);
    })
  }

  likePresent(row){
    for(let data of row.likesList){
      if(data.username==localStorage.getItem("username")){
        return true;
      }
    }
    return false;
  }

  handleSelection(event){
    console.log(event);
  }

}
