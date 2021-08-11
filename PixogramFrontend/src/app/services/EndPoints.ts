export class EndPoints {
    loginAccountUrl:string = "http://localhost:8081/pixogram/login";
    createAccountUrl:string = "http://localhost:8081/pixogram/register";
    getAccountsById:string = "http://localhost:8081/pixogram/getallusersbyid";
    allPostsUrl:string = "http://localhost:8082/pixogram/getallposts";
    usersMediaUrl:string = "http://localhost:8082/pixogram/getmyposts";
    getFollowersUrl:string = "http://localhost:8083/pixogram/getfollowers";
    getFollowingUrl:string = "http://localhost:8083/pixogram/getfollowing";
    getBlockedUrl:string = "http://localhost:8083/pixogram/getblockers";
    addFollowingUrl:string = "http://localhost:8083/pixogram/followuser";
    unfollowUrl:string = "http://localhost:8083/pixogram/unfollowuser";
    blockUsernameUrl:string = "http://localhost:8083/pixogram/blockuser";
    unblockUsernameUrl:string = "http://localhost:8083/pixogram/unblockuser";
    postMediaUrl:string = "http://localhost:8082/pixogram/postmedia";
    postMessageUrl:string = "http://localhost:8082/pixogram/postmessage";
    getFollowersCountUrl:string = "http://localhost:8083/pixogram/getfollowerscount"
    getFollowingCountUrl:string = "http://localhost:8083/pixogram/getfollowingcount"
    likePostUrl:string = "http://localhost:8082/pixogram/likepost";
    dislikePostUrl:string = "http://localhost:8082/pixogram/unlikepost";
    commentOnPostUrl:string = "http://localhost:8082/pixogram/commentpost";
    enterNewsFeedUrl:string = "http://localhost:8083/pixogram/enternewsfeed";
    getNewsFeedUrl:string = "http://localhost:8083/pixogram/getnewsfeed";
    accountUpdateUrl:string = "http://localhost:8081/pixogram/updatedetails";
    statusUpdateUrl:string = "http://localhost:8081/pixogram/updatestatus";
    getStatusUrl:string = "http://localhost:8081/pixogram/getstatus";
    globalSearchTagsUrl:string = "http://localhost:8082/pixogram/searchresult";
    globalSearchUsersUrl:string = "http://localhost:8081/pixogram/searchresult";
    getAllUsersUrl:string = "http://localhost:8081/pixogram/getallusers";
    
}