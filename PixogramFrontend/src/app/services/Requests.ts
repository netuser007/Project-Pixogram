export class Requests {

    loginRequest = {
        "username":null,
        "password":null,
    }

    createAccountRequest = {
        "firstName":null,
        "lastName":null,
        "username":null,
        "email":null,
        "dateOfBirth":null,
        "password":null,
        "confirmPassword":null
    }

    userDataRequest = {
        "username":null
    }

    allPostsRequest = {
        "username":null
    }

    usersMediaRequest = {
        "username":null
    }

    usersByIdRequest = {
        "usernameList":null
    }

    getfollowersRequest = {
        "username":null
    }

    getfollowingRequest = {
        "username":null,
    }

    getBlockedRequest = {
        "username":null,
    }

    addFollowingRequest = {
        "username":null,
        "following":null
    }

    unfollowRequest = {
        "username":null,
        "following":null
    }

    blockUserRequest = {
        "username":null,
        "blockusername":null
    }

    unblockUserRequest = {
        "username":null,
        "blockUsername":null
    }

    postMediaRequest = {
        "username":null,
        "postId":null,
        "title":null,
        "description":null,
        "tags":null,
        "timeStamp":null
    }

    likePostRequest  = {
        "username":null,
        "postId":null
    }

    dislikePostRequest  = {
        "username":null,
        "postId":null
    }

    commentOnPostRequest = {
        "username":null,
        "postId":null,
        "comment":null,
        "timeStamp":null
    }

    enterNewsFeedRequest = {
        "username":null,
        "description":null,
        "timeStamp":null
    }

    getNewsFeedRequest = {
        "username":null
    }

    blockedAccountsRequest = {
        "username":null
    }

    accountUpdateRequest = {
        "firstName":null,
        "lastName":null,
        "username":null,
        "email":null,
        "password":null,
        "confirmPassword":null
    }

    stausUpdateRequest = {
        "username":null,
        "about":null,
        "status":null
    }

    globalSearchRequest = {
        "username":null,
        "searchString":null,
    }

    getAllUsersRequest = {
        "usernamae":null
    }



}