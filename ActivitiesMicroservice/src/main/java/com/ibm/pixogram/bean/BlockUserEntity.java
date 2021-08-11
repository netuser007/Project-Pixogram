package com.ibm.pixogram.bean;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
public class BlockUserEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	int Id;

	String username;
	
	String blockusername;
}
