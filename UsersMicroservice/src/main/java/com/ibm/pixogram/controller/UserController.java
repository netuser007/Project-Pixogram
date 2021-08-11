package com.ibm.pixogram.controller;

import java.io.ByteArrayOutputStream;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ser.impl.StringArraySerializer;
import com.google.gson.Gson;
import com.ibm.pixogram.bean.AboutUser;
import com.ibm.pixogram.bean.ResponseMessage;
import com.ibm.pixogram.bean.User;
import com.ibm.pixogram.service.UserService;
import com.ibm.pixogram.utilities.ImageTransformation;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/pixogram")
public class UserController {

	
	@Autowired
	UserService userService;
	//@RequestParam("profileImage") 
	
	@Autowired
	ImageTransformation imageTransformation;
	
	@RequestMapping(method = RequestMethod.POST, value="/register")
	public ResponseMessage register(@RequestParam("profileImage") MultipartFile files, @RequestParam("userData") String userData) throws IOException {
		System.out.println(userData);
		Gson g = new Gson();  
		User userBean = g.fromJson(userData, User.class) ;
		userBean.setProfileImage(imageTransformation.compressBytes(files.getBytes()));
		return userService.createAccount(userBean);
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/login")
	public User login(@RequestBody User userBean) {
		User resultBean =  userService.loginAccount(userBean);
		User responseBean = resultBean;
		if(resultBean!=null) {
			responseBean.setProfileImage(imageTransformation.decompressBytes(resultBean.getProfileImage()));
		}
		return responseBean;
		
	}
	
	@RequestMapping(method= RequestMethod.POST, value="/getallusers")
	public List<User> getAllUsers(@RequestBody User data){
		List<User> resultBean = userService.getAllUsers(data.getUsername());
		for(User userBean:resultBean) {
			userBean.setProfileImage(imageTransformation.decompressBytes(userBean.getProfileImage()));
		}
		return resultBean;
	}
	
	@RequestMapping(method= RequestMethod.POST, value="/getallusersbyid")
	public List<User> getAllUsersById(@RequestBody List<User> dataList){
		List<User> resultBean = userService.getAllUsersById(dataList);
		for(User userBean:resultBean) {
			userBean.setProfileImage(imageTransformation.decompressBytes(userBean.getProfileImage()));
		}
		return resultBean;
	}
	
	@RequestMapping(method=RequestMethod.PUT, value="/updatedetails")
	public ResponseMessage updateDetails(@RequestBody User data) {
		return userService.updateDetails(data);
	}
	
	@RequestMapping(method=RequestMethod.POST, value="/updatestatus")
	public ResponseMessage updateStatus(@RequestBody AboutUser data) {
		return userService.updateStatus(data);
	}
	
	@RequestMapping(method=RequestMethod.POST, value="/getstatus")
	public AboutUser getStatus(@RequestBody AboutUser data) {
		return userService.getStatus(data);
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/searchresult")
	public List<User> getSearchRestul(@RequestBody User user) {
		return userService.getSearchResult(user);
	}
		
	

}
