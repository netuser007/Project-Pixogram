package com.ibm.pixogram.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibm.pixogram.bean.BlockUserEntity;
import com.ibm.pixogram.bean.FollowingUserEntity;
import com.ibm.pixogram.bean.NewsFeedEntity;
import com.ibm.pixogram.bean.ResponseMessage;
import com.ibm.pixogram.repository.BlockUserRepo;
import com.ibm.pixogram.repository.FollowingRepo;
import com.ibm.pixogram.repository.NewsFeedRepo;

@Service
public class ActivityService {
	
	@Autowired
	FollowingRepo followingRepo;
	
	@Autowired
	BlockUserRepo blockUserRepo;
	
	@Autowired
	ResponseMessage responseMessage;
	
	@Autowired
	NewsFeedRepo newsFeedRepo;
	
	public ResponseMessage followUser(FollowingUserEntity following) {
		followingRepo.save(following);
		responseMessage.setMessage("Follow Operation Successful");
		return responseMessage;
	}

	public ResponseMessage unFollowUser(FollowingUserEntity following) {
		FollowingUserEntity resultBean = followingRepo.findIdByDetails(following.getUsername(), following.getFollowing());
		if(resultBean!=null) {
			followingRepo.deleteById(resultBean.getId());
		}
		responseMessage.setMessage("Unfollow Operation Successful");
		return responseMessage;
	}

	public ResponseMessage blockUser(BlockUserEntity block) {
		blockUserRepo.save(block);
		FollowingUserEntity unFollowBean = new FollowingUserEntity();
		unFollowBean.setUsername(block.getUsername());
		unFollowBean.setFollowing(block.getBlockusername());
		unFollowUser(unFollowBean);
		responseMessage.setMessage("Block Operation Successful");
		return responseMessage;
	}

	public ResponseMessage unBlockUser(BlockUserEntity block) {
		BlockUserEntity resultBean = blockUserRepo.findIdByDetails(block.getUsername(), block.getBlockusername());
		if(resultBean!=null) {
			blockUserRepo.deleteById(resultBean.getId());
		}
		responseMessage.setMessage("Unblock Operation Successful");
		return responseMessage;
	}

	public List<FollowingUserEntity> getFollowers(FollowingUserEntity following) {
		List<FollowingUserEntity> listOfFollowers = followingRepo.findFollowersByDetails(following.getUsername());
		return listOfFollowers;
	}

	public List<FollowingUserEntity> getFollowing(FollowingUserEntity following) {
		List<FollowingUserEntity> listOfFollowing = followingRepo.findFollowingByDetails(following.getUsername());
		return listOfFollowing;
	}

	public List<BlockUserEntity> getblockers(BlockUserEntity block) {
		List<BlockUserEntity> listOfBlockers = blockUserRepo.findBlockersByDetails(block.getUsername());
		return listOfBlockers;
	}

	public List<ResponseMessage> getFollowersCount(List<FollowingUserEntity> followingList) {
		List<ResponseMessage> responseList = new ArrayList<ResponseMessage>();
		for(FollowingUserEntity beanRequest:followingList) {
			int count = followingRepo.getFollowersCount(beanRequest.getUsername());
			ResponseMessage responseBean = new ResponseMessage();
			responseBean.setUsername(beanRequest.getUsername());
			responseBean.setCount(count);
			responseList.add(responseBean);
		}
		return responseList;
		
	}

	public List<ResponseMessage> getFollowingCount(List<FollowingUserEntity> followingList) {
		List<ResponseMessage> responseList = new ArrayList<ResponseMessage>();
		for(FollowingUserEntity beanRequest:followingList) {
			int count = followingRepo.getFollowingCount(beanRequest.getUsername());
			ResponseMessage responseBean = new ResponseMessage();
			responseBean.setUsername(beanRequest.getUsername());
			responseBean.setCount(count);
			responseList.add(responseBean);
		}
		return responseList;
	}

	public ResponseMessage enterFeed(NewsFeedEntity newsFeedBean) {
		newsFeedRepo.save(newsFeedBean);
		responseMessage.setMessage("Newsfeed entered");
		return responseMessage;
	}

	public List<NewsFeedEntity> getNewsFeed(NewsFeedEntity newsFeedBean) {
		List<NewsFeedEntity> newsFeedResult = newsFeedRepo.getNewsFeedsById(newsFeedBean.getUsername());
		return newsFeedResult;
	}

}
