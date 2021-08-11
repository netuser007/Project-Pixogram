package com.ibm.pixogram.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibm.pixogram.bean.AboutUser;
import com.ibm.pixogram.bean.ResponseMessage;
import com.ibm.pixogram.bean.User;
import com.ibm.pixogram.repository.AboutRepo;
import com.ibm.pixogram.repository.UserRepository;
import com.ibm.pixogram.utilities.ImageTransformation;

@Service
public class UserService {
	
	@Autowired
	UserRepository repo;
	
	@Autowired
	AboutRepo aboutRepo;
	
	@Autowired
	ImageTransformation imageTransformation;
	
	

	public boolean checkAccount(User userBean) {
		Optional<User> beanResult = repo.findById(userBean.getUsername());
		if(beanResult.isEmpty()) {
			return true;
		}
		else {
			return false;
		}
	}

	public ResponseMessage createAccount(User userBean) {
		ResponseMessage messageBean= new ResponseMessage();
		if(checkAccount(userBean)) {
			if(userBean.getPassword().equalsIgnoreCase(userBean.getConfirmPassword())) {
				repo.save(userBean);
				messageBean.setMessage("Registered");
				return messageBean;
			}
			else {
				messageBean.setMessage("Passwords do not match");
				return messageBean;
			}
			
		}
		else {
			messageBean.setMessage("User already exists");
			return messageBean;
		}
	}

	public User loginAccount(User userBean) {
		if(!checkAccount(userBean)) {
			Optional<User> beanResult = repo.findById(userBean.getUsername());
			User userResult = beanResult.get();
			if(userResult.getUsername().equalsIgnoreCase(userBean.getUsername()) && userResult.getPassword().equalsIgnoreCase(userBean.getPassword())) {
				return userResult;
			}
			else {
				return null;
			}
		}
		else {
			return null;
		}
	}

	public List<User> getAllUsers(String username) {
		return repo.getAllUsers(username);
	}

	public List<User> getAllUsersById(List<User> dataList) {
		List<String> idList = new ArrayList<>();
		for(User user:dataList) {
			idList.add(user.getUsername());
		}
		return repo.findAllById(idList);
	}

	public ResponseMessage updateDetails(User data) {
		Optional<User> userResult = repo.findById(data.getUsername());
		User userBean = userResult.get();
		if(data.getFirstName()!=null) {
			userBean.setFirstName(data.getFirstName());
		}
		if(data.getLastName()!=null) {
			userBean.setLastName(data.getLastName());
		}
		if(data.getEmail()!=null) {
			userBean.setEmail(data.getEmail());
		}
		if(data.getPassword()!=null) {
			userBean.setPassword(data.getPassword());
		}
		if(data.getConfirmPassword()!=null) {
			userBean.setConfirmPassword(data.getConfirmPassword());
		}
		repo.save(userBean);
		ResponseMessage messageBean= new ResponseMessage();
		messageBean.setMessage("Details updated");
		return messageBean;
	}

	public ResponseMessage updateStatus(AboutUser data) {
//		Optional<AboutUser> userBean =  aboutRepo.findById(data.getUsername());
//		AboutUser bean =  userBean.get();
//		if(data.getAbout()!=null) {
//			bean.setAbout(data.getAbout());
//		}
//		if(data.getStatus()!=null) {
//			bean.setStatus(data.getStatus());
//		}
		aboutRepo.save(data);
		ResponseMessage messageBean= new ResponseMessage();
		messageBean.setMessage("Details updated");
		return messageBean;
		
	}

	public AboutUser getStatus(AboutUser data) {
		Optional<AboutUser> userBean =  aboutRepo.findById(data.getUsername());
		return userBean.get();
	}

	public List<User> getSearchResult(User user) {
		List<User> usersResult = repo.getPostBySearch(user.getUsername());
		for(User userBean:usersResult) {
			userBean.setProfileImage(imageTransformation.decompressBytes(userBean.getProfileImage()));
		}
		return usersResult;
	}

}
