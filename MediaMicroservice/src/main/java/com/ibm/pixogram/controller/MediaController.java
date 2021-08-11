package com.ibm.pixogram.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.ibm.pixogram.bean.BlockUserEntity;
import com.ibm.pixogram.bean.CommentEntity;
import com.ibm.pixogram.bean.FollowingUserEntity;
import com.ibm.pixogram.bean.LikeEntity;
import com.ibm.pixogram.bean.ResponseMedia;
import com.ibm.pixogram.bean.ResponseMessage;
import com.ibm.pixogram.bean.SingleMediaEntity;
import com.ibm.pixogram.service.MediaService;
import com.ibm.pixogram.utilities.ImageTransformation;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/pixogram")
public class MediaController {
	
	@Autowired
	MediaService mediaService;
	
	@Autowired
	ImageTransformation imageTransformation;
	
	@RequestMapping(method = RequestMethod.POST, value="/postmedia")
	public ResponseMessage postMedia(@RequestParam("media") MultipartFile files1,@RequestParam("mediaData") String mediaData) throws IOException {
		Gson g = new Gson();  
		System.out.println(mediaData);
		SingleMediaEntity mediaBean = g.fromJson(mediaData, SingleMediaEntity.class) ;
		mediaBean.setPostImage(imageTransformation.compressBytes(files1.getBytes()));
		return mediaService.createPost(mediaBean);
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/postmessage")
	public ResponseMessage postMessage(@RequestBody SingleMediaEntity mediaData) throws IOException {
		return mediaService.createPost(mediaData);
	}
	
	
	@RequestMapping(method = RequestMethod.POST, value="/getallposts")
	public List<ResponseMedia> getAllPosts(@RequestBody String username) {
		List<SingleMediaEntity> resultList =  mediaService.getAllPosts(username);
		if(resultList!=null) {
			for(SingleMediaEntity entityMedia:resultList) {
				SingleMediaEntity dummyData = entityMedia;
				if(dummyData.getPostImage()!=null) {
					entityMedia.setPostImage(imageTransformation.decompressBytes(dummyData.getPostImage()));
				}
			}
		}
		return mediaService.addLikesComments(resultList);
		
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/getmyposts")
	public List<ResponseMedia> getMyPosts(@RequestBody SingleMediaEntity data) {
		List<SingleMediaEntity> resultList =  mediaService.getMyPosts(data.getUsername());
		List<SingleMediaEntity> showList = new ArrayList<>();
		if(resultList!=null) {
			for(SingleMediaEntity entityMedia:resultList) {
				SingleMediaEntity dummyData = entityMedia;
				if(dummyData.getPostImage()!=null) {
					entityMedia.setPostImage(imageTransformation.decompressBytes(dummyData.getPostImage()));
					showList.add(entityMedia);
				}
			}
		}
		return mediaService.addLikesComments(showList);
		
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/likepost")
	public ResponseMessage likePost(@RequestBody LikeEntity likeBean) {
		return mediaService.likePost(likeBean);
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/unlikepost")
	public ResponseMessage unlikePost(@RequestBody LikeEntity likeBean) {
		return mediaService.unlikePost(likeBean);
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/commentpost")
	public ResponseMessage postComment(@RequestBody CommentEntity commentBean) {
		return mediaService.postComment(commentBean);
	}
	
	
	@RequestMapping(method = RequestMethod.POST, value="/searchresult")
	public List<ResponseMedia> getSearchRestul(@RequestBody SingleMediaEntity mediaEntity) {
		return mediaService.getSearchRestul(mediaEntity);
	}
	
	
	
	
	
	

}
