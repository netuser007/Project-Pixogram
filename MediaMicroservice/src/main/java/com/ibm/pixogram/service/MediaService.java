package com.ibm.pixogram.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibm.pixogram.bean.BlockUserEntity;
import com.ibm.pixogram.bean.CommentEntity;
import com.ibm.pixogram.bean.FollowingUserEntity;
import com.ibm.pixogram.bean.LikeEntity;
import com.ibm.pixogram.bean.ResponseMedia;
import com.ibm.pixogram.bean.ResponseMessage;
import com.ibm.pixogram.bean.SingleMediaEntity;
import com.ibm.pixogram.repository.BlockUserRepo;
import com.ibm.pixogram.repository.CommentRepo;
import com.ibm.pixogram.repository.FollowingRepo;
import com.ibm.pixogram.repository.LikeRepo;
import com.ibm.pixogram.repository.SingleMediaRepo;
import com.ibm.pixogram.utilities.ImageTransformation;

@Service
public class MediaService {
	
	@Autowired
	SingleMediaRepo singleMediaRepo;
	
	@Autowired
	LikeRepo likeRepo;
	
	@Autowired
	CommentRepo commentRepo;
	
	@Autowired
	ResponseMessage responseMessage;
	
	@Autowired
	ResponseMedia responseMedia;
	
	@Autowired
	ImageTransformation imageTransformation;

	public ResponseMessage createPost(SingleMediaEntity mediaBean) {
		singleMediaRepo.save(mediaBean);
		responseMessage.setMessage("Posted Successfully");
		return responseMessage;
	}

	public List<SingleMediaEntity> getAllPosts(String username) {
		return singleMediaRepo.getAllPosts();
		//return singleMediaRepo.findAll();
	}

	public List<SingleMediaEntity> getMyPosts(String username) {
		return singleMediaRepo.findPostsById(username);
	}

	public ResponseMessage likePost(LikeEntity likeBean) {
		likeRepo.save(likeBean);
		responseMessage.setMessage("Post: " + likeBean.getPostId() + " liked");
		return responseMessage;
	}
	
	public ResponseMessage unlikePost(LikeEntity likeBean) {
		int postId = likeRepo.getPostId(likeBean.getUsername(),likeBean.getPostId());
		likeRepo.deleteById(postId);
		responseMessage.setMessage("Post: " + likeBean.getPostId() + " unliked");
		return responseMessage;
	}
	
	public ResponseMessage postComment(CommentEntity commentBean) {
		commentRepo.save(commentBean);
		responseMessage.setMessage("Post: " + commentBean.getPostId() + " commented");
		return responseMessage;
	}

	public List<ResponseMedia> addLikesComments(List<SingleMediaEntity> resultList) {
		List<ResponseMedia> responseMediaList = new ArrayList<>();
		for(SingleMediaEntity singleBean:resultList) {
			ResponseMedia responseMedia1 = new ResponseMedia();
			List<LikeEntity> likes = likeRepo.getLikesForPostId(singleBean.getPostId());
			List<CommentEntity> comments = commentRepo.getCommentsForPostId(singleBean.getPostId());
			responseMedia1.setSingleMediaEntity(singleBean);
			responseMedia1.setLikesList(likes);
			responseMedia1.setCommentsList(comments);
			responseMediaList.add(responseMedia1);
		}
		return responseMediaList;
		
	}

	public List<ResponseMedia> getSearchRestul(SingleMediaEntity mediaEntity) {
		List<SingleMediaEntity> mediaFiles = singleMediaRepo.getPostBySearch(mediaEntity.getTags());
		if(mediaFiles!=null) {
			for(SingleMediaEntity entityMedia:mediaFiles) {
				SingleMediaEntity dummyData = entityMedia;
				if(dummyData.getPostImage()!=null) {
					entityMedia.setPostImage(imageTransformation.decompressBytes(dummyData.getPostImage()));
				}
			}
		}
		List<ResponseMedia> finalList = addLikesComments(mediaFiles);
		return finalList;
		
	}

	

}
