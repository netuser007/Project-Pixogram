import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Requests } from 'src/app/services/Requests';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {
  followersResponse: any;
  followersArray: any[];
  followingResponse: any;
  followingArray: any[];
  accountFollowersArray: any;
  accountFollowingArray: any;
  followingCountArrayFollowers: any;
  followerCountArrayFollowers: any;
  followingCountArrayFollowing: any;
  followerCountArrayFollowing: any;

  constructor(private mainService:PostService, private request:Requests) { }

  images: any[] = [
    'https://images-na.ssl-images-amazon.com/images/I/51DR2KzeGBL._AC_.jpg',
    'https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg',
    'https://torange.biz/photofx/93/8/light-vivid-colors-fragment-love-background-rain-fall-cover-93412.jpg',
    'https://cdn.pixabay.com/photo/2017/07/18/18/24/dove-2516641_960_720.jpg',
    'https://c0.wallpaperflare.com/preview/956/761/225/5be97da101a3f.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/9/9a/Swepac_FB_465%2C_RV70%2C_with_passing_lorry.jpg'
  ];

  ngOnInit(): void {

    let getFollowingPayload = this.mainService.copyObject(this.request.getfollowingRequest);
    
    getFollowingPayload.username = localStorage.getItem("username");

    this.mainService.getFollowingRequestMethod(getFollowingPayload).subscribe((response) => {
      console.log(response);
      this.followingResponse = response;
      this.followingArray = [];
      for(let data of this.followingResponse){
        let json = {
          "username":data.following
        }
        this.followingArray.push(json);
      }

      let getUsersByIdPayload = this.mainService.copyObject(this.request.usersByIdRequest);
      getUsersByIdPayload.usernameList = this.followingArray;

      this.mainService.getAccountsById(this.followingArray).subscribe((accountsResponse)=>{
        console.log(accountsResponse);
        this.accountFollowingArray = accountsResponse;
        for(let data of this.accountFollowingArray){
          let base64Data = this.mainService.copyObject(data.profileImage);
          data.profileImage = 'data:image/jpeg;base64,' + base64Data;
        }
        this.mainService.getFollowingCountMethod(this.accountFollowingArray).subscribe((responseFollowingCount)=>{
          this.followingCountArrayFollowing = responseFollowingCount;
          this.mainService.getFollowersCountMethod(this.accountFollowingArray).subscribe((responseFollowerCount)=>{
            this.followerCountArrayFollowing = responseFollowerCount;
            this.attachFollowersFollowingFollowing();
          })
        })
        this.getFollowers();
      })
    })
    

    
  }

  attachFollowersFollowingFollowing() {
    for(let data of this.accountFollowingArray){
      for(let followerData of this.followerCountArrayFollowing){
        if(data.username==followerData.username){
          data.followers = followerData.count;
          break;
        }
      }

      for(let followingData of this.followingCountArrayFollowing){
        if(data.username==followingData.username){
          data.following = followingData.count;
          break;
        }
      }
    }
  }

  getFollowers() {
    let getFollowersPayload = this.mainService.copyObject(this.request.getfollowersRequest);
    getFollowersPayload.username = localStorage.getItem("username");
    this.mainService.getFollowersRequestMethod(getFollowersPayload).subscribe((response) => {
      this.followersResponse = response;
      this.followersArray = [];
      console.log(response);
      for(let data of this.followersResponse){
        let json = {
          "username":data.username
        }
        this.followersArray.push(json);
      }

      let getUsersByIdPayload = this.mainService.copyObject(this.request.usersByIdRequest);
      getUsersByIdPayload.usernameList = this.followersArray;

      this.mainService.getAccountsById(this.followersArray).subscribe((accountsResponse)=>{
        this.accountFollowersArray = accountsResponse;
        for(let data of this.accountFollowersArray){
          let base64Data = this.mainService.copyObject(data.profileImage);
          data.profileImage = 'data:image/jpeg;base64,' + base64Data;
        }
        this.mainService.getFollowingCountMethod(this.accountFollowersArray).subscribe((responseFollowingCount)=>{
          this.followingCountArrayFollowers = responseFollowingCount;
          this.mainService.getFollowersCountMethod(this.accountFollowersArray).subscribe((responseFollowerCount)=>{
            this.followerCountArrayFollowers = responseFollowerCount;
            this.attachFollowersFollowingFollowers();
          })
        })
      })
      
    });
  }

  attachFollowersFollowingFollowers() {
    for(let data of this.accountFollowersArray){
      for(let followerData of this.followerCountArrayFollowers){
        if(data.username==followerData.username){
          data.followers = followerData.count;
          break;
        }
      }

      for(let followingData of this.followingCountArrayFollowers){
        if(data.username==followingData.username){
          data.following = followingData.count;
          break;
        }
      }
    }
  }

  unFollowUser(userRow){
    let unFollowUserPayload = this.mainService.copyObject(this.request.unfollowRequest);
    unFollowUserPayload.username = localStorage.getItem("username");
    unFollowUserPayload.following = userRow.username;
    this.mainService.unFollowRequestMethod(unFollowUserPayload).subscribe((response) => {
      console.log(response);
      setTimeout(() => { this.ngOnInit() }, 1000);
    })
  }

  checkButton(userCheck){
    for(let data of this.accountFollowingArray){
      if(data.username==userCheck.username){
        return true;
      }
    }
    return false;
  }

  followUser(user){
    let followRequest = this.mainService.copyObject(this.request.addFollowingRequest);
    followRequest.username = localStorage.getItem("username");
    followRequest.following = user.username;
    this.mainService.addFollowingRequestMethod(followRequest).subscribe((response) => {
      console.log(response);
      setTimeout(() => { this.ngOnInit() }, 1000);
    });
  }

  blockUser(user){
    let blockPayload = this.mainService.copyObject(this.request.blockUserRequest);
    blockPayload.username = localStorage.getItem("username");
    blockPayload.blockusername = user.username;
    this.mainService.blockUsernameRequestMethod(blockPayload).subscribe((response) => {
      console.log(response);
      setTimeout(() => { this.ngOnInit() }, 1000);
    })
  }

}
