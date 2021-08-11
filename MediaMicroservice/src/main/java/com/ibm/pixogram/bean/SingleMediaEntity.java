package com.ibm.pixogram.bean;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class SingleMediaEntity {

	@Id
	public String postId;
	
	public String username;
	
//	@Column(name = "avatar",length = 1000000000)
//	public byte[] avatar;
	
	public String title;
	
	public String description;
	
	public String tags;
	
	public String timeStamp;
	
	@Column(name = "postImage",length = 1000000000)
	public byte[] postImage;
	
	@Column(name = "date")
	private Date dateoperation = new Date();
	
//	public List<UserComments> comments;
//	
//	class UserComments{
//		public String usernameCommentor;
//		@Column(name = "avatarCommentor",length = 1000000000)
//		public byte[] avatarCommentor;
//		public String timeStampCommentor;
//		public String commentCommentor;
//	}
}
