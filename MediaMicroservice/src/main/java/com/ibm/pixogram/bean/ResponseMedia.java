package com.ibm.pixogram.bean;

import java.util.List;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Component
@Setter
@Getter
public class ResponseMedia {

	SingleMediaEntity singleMediaEntity;
	
	List<LikeEntity> likesList;
	
	List<CommentEntity> commentsList;
}
