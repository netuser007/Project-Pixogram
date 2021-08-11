package com.ibm.pixogram.bean;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Component
public class ResponseMessage {
	
	
	public String message;
	
	public String username;
	
	public int count;
}
