import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  mediaArray: any;
  usersArray: any;
  followingCountArray: any;
  followerCountArray: any;

  constructor(private mainService:PostService) { }

  ngOnInit(): void {
  }

  doSearch(searchString){
    let tagSearchPayload = {
      "tags":searchString
    }

    let userSearchPayload = {
      "username":searchString
    }

    this.mainService.globalSearchTagsRequestMethod(tagSearchPayload).subscribe((response)=>{
      this.mediaArray = response;
      for(let data of this.mediaArray){
        if(data.singleMediaEntity.postImage!=null){
           let imageModifier = data.singleMediaEntity.postImage;
           data.singleMediaEntity.postImage = this.mainService.copyObject('data:image/jpeg;base64,' + imageModifier);
        }
      }
      console.log(this.mediaArray);
    })

    this.mainService.globalSearchUsersRequestMethod(userSearchPayload).subscribe((response)=>{
      this.usersArray = response;
      for(let data of this.usersArray){
        let base64Data = this.mainService.copyObject(data.profileImage);
        data.profileImage = 'data:image/jpeg;base64,' + base64Data;
      }
      this.mainService.getFollowingCountMethod(this.usersArray).subscribe((responseFollowingCount)=>{
        this.followingCountArray = responseFollowingCount;
        this.mainService.getFollowersCountMethod(this.usersArray).subscribe((responseFollowerCount)=>{
          this.followerCountArray = responseFollowerCount;
          this.attachFollowersFollowing();
        })
      })
      console.log(this.usersArray);
    })

  }

  attachFollowersFollowing() {
    for(let data of this.usersArray){
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

}
