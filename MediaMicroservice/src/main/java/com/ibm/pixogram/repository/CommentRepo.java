package com.ibm.pixogram.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ibm.pixogram.bean.CommentEntity;
import com.ibm.pixogram.bean.LikeEntity;

public interface CommentRepo extends JpaRepository<CommentEntity, Integer> {
	
	@Query(value = "select * from comment_entity n where n.post_id =:postId", nativeQuery=true)
	List<CommentEntity> getCommentsForPostId(@Param(value="postId") String postId);

}
