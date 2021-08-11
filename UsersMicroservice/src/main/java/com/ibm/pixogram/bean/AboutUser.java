package com.ibm.pixogram.bean;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class AboutUser {

	@Id
	public String username;
	
	public String about;
	
	public String status;
	
}
