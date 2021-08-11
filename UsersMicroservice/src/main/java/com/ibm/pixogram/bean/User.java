package com.ibm.pixogram.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class User {

	@Id
	@Column(name = "username")
	public String username;
	
	@Column(name = "firstName")
	public String firstName;
	
	@Column(name = "lastName")
	public String lastName;
	
	@Column(name = "email")
	public String email;
	
	@Column(name = "password")
	public String password;
	
	@Column(name = "confirmPassword")
	public String confirmPassword;
	
	@Column(name = "dateOfBirth")
	public String dateOfBirth;
	
	@Column(name = "creationDateTime")
	public String creationDateTime;
	
	@Column(name = "profileImage", length = 1000000000)
	public byte[] profileImage;
}

