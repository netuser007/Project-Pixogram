import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { EndPoints } from './EndPoints';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  createAccountUrl: string;
  loginAccountUrl: string;
  pipe = new DatePipe('en-US');
  postMediaUrl: string;
  allPostsUrl: string;
  postMessageUrl: string;
  usersMediaUrl: string;
  getAllUsersUrl: string;
  getAccountsByIdUrl: string;
  getFollowersUrl: string;
  getBlockedUrl: string;
  addFollowingUrl: string;
  unfollowUrl: string;
  blockUsernameUrl: string;
  getFollowingUrl:string;
  unblockUsernameUrl:string;
  getFollowersCountUrl: string;
  getFollowingCountUrl: string;
  likePostUrl: string;
  dislikePostUrl: string;
  commentOnPostUrl: string;
  accountUpdateUrl: string;
  statusUpdateUrl: string;
  getStatusUrl: string;
  enterNewsFeedUrl: string;
  getNewsFeedUrl: string;
  globalSearchTagsUrl: string;
  globalSearchUsersUrl: string;

  constructor(private http: HttpClient, private authService: AuthService, private endPoints:EndPoints) {
    this.createAccountUrl = this.endPoints.createAccountUrl;
    this.loginAccountUrl = this.endPoints.loginAccountUrl;
    this.postMediaUrl = this.endPoints.postMediaUrl;
    this.allPostsUrl = this.endPoints.allPostsUrl;
    this.postMessageUrl = this.endPoints.postMessageUrl;
    this.usersMediaUrl = this.endPoints.usersMediaUrl;
    this.getAllUsersUrl = this.endPoints.getAllUsersUrl;
    this.getAccountsByIdUrl = this.endPoints.getAccountsById;
    this.getFollowersUrl = this.endPoints.getFollowersUrl;
    this.getFollowingUrl = this.endPoints.getFollowingUrl;
    this.getBlockedUrl = this.endPoints.getBlockedUrl;
    this.addFollowingUrl = this.endPoints.addFollowingUrl;
    this.unfollowUrl = this.endPoints.unfollowUrl;
    this.blockUsernameUrl = this.endPoints.blockUsernameUrl;
    this.unblockUsernameUrl = this.endPoints.unblockUsernameUrl;
    this.getFollowersCountUrl = this.endPoints.getFollowersCountUrl;
    this.getFollowingCountUrl = this.endPoints.getFollowingCountUrl;
    this.likePostUrl = this.endPoints.likePostUrl;
    this.dislikePostUrl = this.endPoints.dislikePostUrl;
    this.commentOnPostUrl = this.endPoints.commentOnPostUrl;
    this.accountUpdateUrl = this.endPoints.accountUpdateUrl;
    this.statusUpdateUrl = this.endPoints.statusUpdateUrl;
    this.getStatusUrl = this.endPoints.getStatusUrl;
    this.enterNewsFeedUrl = this.endPoints.enterNewsFeedUrl;
    this.getNewsFeedUrl = this.endPoints.getNewsFeedUrl;
    this.globalSearchTagsUrl = this.endPoints.globalSearchTagsUrl;
    this.globalSearchUsersUrl = this.endPoints.globalSearchUsersUrl;
  }

  copyObject(data){
    return JSON.parse(JSON.stringify(data));
  }

  loginAccountRequestMethod(data){
    return this.http.post(this.loginAccountUrl, data)
  }

  createAccountRequestMethod(data){
    return this.http.post(this.createAccountUrl, data);
  }

  userDataRequestMethod(url,data){
    return this.http.post(url, data)
    {
      "username"
      "avatar"
      "followersCount"
      "followingCount"
      "abount"
      "status"
    }
  }

  allPostsRequestMethod(data){
    return this.http.post(this.allPostsUrl, data)
  }

  postMessageRequestMethod(data) {
    return this.http.post(this.postMessageUrl, data);
  }

  usersMediaRequestMethod(data){
    return this.http.post(this.usersMediaUrl, data)
  }

  getAccountsById(data){
    return this.http.post(this.getAccountsByIdUrl,data);
  }

  getFollowersRequestMethod(data){
    return this.http.post(this.getFollowersUrl,data);
  }

  getFollowingRequestMethod(data){
    return this.http.post(this.getFollowingUrl, data);
  }

  getBlockerRequestMethod(data){
    return this.http.post(this.getBlockedUrl, data);
  }

  addFollowingRequestMethod(data){
    return this.http.post(this.addFollowingUrl, data)
  }

  unFollowRequestMethod(data){
    return this.http.post(this.unfollowUrl, data)
  }

  blockUsernameRequestMethod(data){
    return this.http.post(this.blockUsernameUrl, data)
  }

  unblockUsernameRequestMethod(data){
    return this.http.post(this.unblockUsernameUrl, data)
  }

  postMediaRequestMethod(data){
    return this.http.post(this.postMediaUrl, data)
  }

  getFollowersCountMethod(data){
    return this.http.post(this.getFollowersCountUrl,data)
  }

  getFollowingCountMethod(data){
    return this.http.post(this.getFollowingCountUrl,data)
  }

  likePostRequestMethod(data){
    return this.http.post(this.likePostUrl, data)
  }

  dislikePostRequestMethod(data){
    return this.http.post(this.dislikePostUrl, data)
  }

  commentOnPostRequestMethod(data){
    return this.http.post(this.commentOnPostUrl, data)
  }

  enterNewsFeedRequestMethod(data){
    return this.http.post(this.enterNewsFeedUrl, data)
  }

  getNewsFeedRequestMethod(data){
    return this.http.post(this.getNewsFeedUrl, data)
  }

  accountUpdateRequestMethod(data){
    return this.http.put(this.accountUpdateUrl, data)
  }

  statusUpdateRequestMethod(data){
    return this.http.post(this.statusUpdateUrl,data);
  }

  getStatusRequestMethod(data){
    return this.http.post(this.getStatusUrl,data);
  }

  globalSearchTagsRequestMethod(data){
    return this.http.post(this.globalSearchTagsUrl, data)
  }

  globalSearchUsersRequestMethod(data){
    return this.http.post(this.globalSearchUsersUrl, data)
  }

  getAllUsersMethod(data){
    return this.http.post(this.getAllUsersUrl,data);
  }

  handleError(error: HttpErrorResponse) {
    let errMsg = [];
    if (error.error && error.error.length) {
      for (let item of error.error) {
        if (item.message) {
          errMsg.push(item.message);
        }
      }
    }
    let errorMessage = (errMsg.length) ? errMsg.join(',') : error.message;
    return Observable.throw(error.message || 'Server error');
  }

  getUniqueId(){
    let dateTime = new Date();
    let timestamp = localStorage.getItem("username");
    timestamp += dateTime.getFullYear().toString(); // 2011
    timestamp += dateTime.getMonth().toString(); // JS months are 0-based, so +1 and pad with 0's
    timestamp += dateTime.getDate().toString();
    timestamp += dateTime.getHours().toString();
    timestamp += dateTime.getMinutes().toString();
    timestamp += dateTime.getSeconds().toString();
    timestamp += dateTime.getMilliseconds().toString();
    return timestamp;
  }

  getTimeStamp(){
    let now = Date.now();
    let formattedDate = this.pipe.transform(now, 'medium');
    return formattedDate;
  }


}
