import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Requests } from 'src/app/services/Requests';
import { SearchResultComponent } from '../search-result/search-result.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  blockedUsersArray:any
  blockedAccountsResponse: any;
  blockedArray: any;
  newsFeedArray: any;

  @ViewChild('searchResult') public searchResult: SearchResultComponent;
 

  constructor(private mainService:PostService, private request:Requests) { }

  searchInput:any;

  selectedIndex:any = 0;

  images: any[] = [
    'https://images-na.ssl-images-amazon.com/images/I/51DR2KzeGBL._AC_.jpg',
    'https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg',
    'https://torange.biz/photofx/93/8/light-vivid-colors-fragment-love-background-rain-fall-cover-93412.jpg',
    'https://cdn.pixabay.com/photo/2017/07/18/18/24/dove-2516641_960_720.jpg',
    'https://c0.wallpaperflare.com/preview/956/761/225/5be97da101a3f.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/9/9a/Swepac_FB_465%2C_RV70%2C_with_passing_lorry.jpg'
  ];

  ngOnInit(): void {
    
    this.selectedIndex = localStorage.getItem("settingsTab");
    let getNewsFeedPayload = this.mainService.copyObject(this.request.getNewsFeedRequest);
    getNewsFeedPayload.username = localStorage.getItem("username");
    this.mainService.getNewsFeedRequestMethod(getNewsFeedPayload).subscribe((response)=>{
      this.newsFeedArray = response;
    })
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


      this.mainService.getAccountsById(this.blockedArray).subscribe((accountsResponse)=>{
        console.log(accountsResponse);
        this.blockedUsersArray = accountsResponse;
        for(let data of this.blockedUsersArray){
          let base64Data = this.mainService.copyObject(data.profileImage);
          data.profileImage = 'data:image/jpeg;base64,' + base64Data;
        }
      })
    })
  }

  update(filter){
    console.log(filter)
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

  updateAccountDetails(details){
    console.log(details);
    let accountUpdateJson :any ={}
    if(details.fname.trim().length>0){
      accountUpdateJson.firstName = details.fname;
    }
    if(details.lname.trim().length>0){
      accountUpdateJson.lastName = details.lname;
    }
    if(details.password.trim().length>0){
      accountUpdateJson.password = details.password;
      accountUpdateJson.confirmPassword = details.password;
    }
    if(details.email.trim().length>0){
      accountUpdateJson.email = details.email;
    }
    accountUpdateJson.username =localStorage.getItem("username");
    console.log(accountUpdateJson);
    this.mainService.accountUpdateRequestMethod(accountUpdateJson).subscribe((response)=>{
      console.log(response);
    })
  }

  updateStatus(details){
    let statusUpdate:any = {}
    if(details.about.trim().length>0){
      statusUpdate.about = details.about;
    }
    if(details.status.trim().length>0){
      statusUpdate.status = details.status;
    }
    statusUpdate.username = localStorage.getItem("username");
    this.mainService.statusUpdateRequestMethod(statusUpdate).subscribe((response)=>{
      console.log(response);
    })
  }

  doGlobalSearch(inputText){
    this.searchResult.doSearch(this.searchInput);
  }

}
