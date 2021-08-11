import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Requests } from 'src/app/services/Requests';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {

  usersList:any = []
  base64Data: any;
  followingResponse: any;
  followingArray: any[];
  blockedAccountsResponse: any;
  blockedArray: any[];
  followingCountArray: any;
  followerCountArray: any;

  constructor(private mainService:PostService, private request:Requests) { }

  ngOnInit(): void {
    let getBlockedUsersPayload = this.mainService.copyObject(this.request.getBlockedRequest);
    getBlockedUsersPayload.username = localStorage.getItem("username");
    this.mainService.getBlockerRequestMethod(getBlockedUsersPayload).subscribe((response) => {
      this.blockedAccountsResponse = response;
      this.blockedArray = []
      for(let data of this.blockedAccountsResponse){
        let json = {
          "username":data.blockusername
        }
        this.blockedArray.push(json);
      }
      this.getFollowers();
    }) 
  }

  getFollowers() {
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
      this.getAllUsers();

    })
  }

  getAllUsers() {
    let usersPayload = this.mainService.copyObject(this.request.getAllUsersRequest);
    usersPayload.username = localStorage.getItem("username");
    this.mainService.getAllUsersMethod(usersPayload).subscribe((response)=>{
      this.usersList = response
      for(let data of this.usersList){
          this.base64Data = this.mainService.copyObject(data.profileImage);
          data.profileImage = 'data:image/jpeg;base64,' + this.base64Data;
      }

      this.mainService.getFollowingCountMethod(this.usersList).subscribe((responseFollowingCount)=>{
        console.log("following");
        console.log(responseFollowingCount);
        this.followingCountArray = responseFollowingCount;
        this.mainService.getFollowersCountMethod(this.usersList).subscribe((responseFollowerCount)=>{
          console.log("followers");
          console.log(responseFollowerCount);
          this.followerCountArray = responseFollowerCount;
          this.attachFollowersFollowing();
        })
      })


      
    });
  }

  attachFollowersFollowing() {
    for(let data of this.usersList){
      for(let followerData of this.followerCountArray){
        if(data.username==followerData.username){
          data.followers = followerData.count;
          break;
        }
      }

      for(let followingData of this.followingCountArray){
        if(data.username==followingData.username){
          data.following = followingData.count;
          break;
        }
      }
    }
  }

  unFollowUser(userRow){
    console.log(userRow);
    let unFollowUserPayload = this.mainService.copyObject(this.request.unfollowRequest);
    unFollowUserPayload.username = localStorage.getItem("username");
    unFollowUserPayload.following = userRow.username;
    this.mainService.unFollowRequestMethod(unFollowUserPayload).subscribe((response) => {
      console.log(response);
      setTimeout(() => { this.ngOnInit() }, 1000);
    })
  }

  checkButton(userCheck){
    for(let data of this.followingArray){
      if(data.username==userCheck.username){
        return true;
      }
    }
    return false;
  }

  followUser(user){
    console.log(user);
    let followRequest = this.mainService.copyObject(this.request.addFollowingRequest);
    followRequest.username = localStorage.getItem("username");
    followRequest.following = user.username;
    this.mainService.addFollowingRequestMethod(followRequest).subscribe((response) => {
      console.log(response);
      setTimeout(() => { this.ngOnInit() }, 1000);
    });
    
  }

  checkBlock(userCheck){
    for(let data of this.blockedArray){
      if(data.username==userCheck.username){
        return true;
      }
    }
    return false;
  }

  unBlockUser(user){
    let unBlockUserPayload = this.mainService.copyObject(this.request.unblockUserRequest);
    unBlockUserPayload.username = localStorage.getItem("username");
    unBlockUserPayload.blockusername = user.username;
    this.mainService.unblockUsernameRequestMethod(unBlockUserPayload).subscribe((response) => {
      console.log(response);
      setTimeout(() => { this.ngOnInit() }, 1000);
    })
  }

}
