package com.ibm.pixogram.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ibm.pixogram.bean.BlockUserEntity;
import com.ibm.pixogram.bean.FollowingUserEntity;
import com.ibm.pixogram.bean.NewsFeedEntity;
import com.ibm.pixogram.bean.ResponseMessage;
import com.ibm.pixogram.repository.NewsFeedRepo;
import com.ibm.pixogram.service.ActivityService;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/pixogram")
public class ActivityController {
	
	@Autowired
	ActivityService activityService;
	
	@RequestMapping(method = RequestMethod.POST, value="/followuser")
	public ResponseMessage followUser(@RequestBody FollowingUserEntity following) {
		return activityService.followUser(following);
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/unfollowuser")
	public ResponseMessage unFollowUser(@RequestBody FollowingUserEntity following) {
		return activityService.unFollowUser(following);
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/blockuser")
	public ResponseMessage blockUser(@RequestBody BlockUserEntity block) {
		return activityService.blockUser(block);
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/unblockuser")
	public ResponseMessage unBlockUser(@RequestBody BlockUserEntity block) {
		return activityService.unBlockUser(block);
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/getfollowers")
	public List<FollowingUserEntity> getFollowers(@RequestBody FollowingUserEntity following) {
		return activityService.getFollowers(following);
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/getfollowing")
	public List<FollowingUserEntity> getFollowing(@RequestBody FollowingUserEntity following) {
		return activityService.getFollowing(following);
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/getblockers")
	public List<BlockUserEntity> getblockers(@RequestBody BlockUserEntity block) {
		return activityService.getblockers(block);
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/getfollowerscount")
	public List<ResponseMessage> getFollowersCount(@RequestBody List<FollowingUserEntity> followingList) {
		return activityService.getFollowersCount(followingList);
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/getfollowingcount")
	public List<ResponseMessage> getFollowingCount(@RequestBody List<FollowingUserEntity> followingList) {
		return activityService.getFollowingCount(followingList);
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/enternewsfeed")
	public ResponseMessage enterFeed(@RequestBody NewsFeedEntity newsFeedBean) {
		return activityService.enterFeed(newsFeedBean);
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/getnewsfeed")
	public List<NewsFeedEntity> getNewsFeed(@RequestBody NewsFeedEntity newsFeedBean) {
		return activityService.getNewsFeed(newsFeedBean);
	}
	
	

}
