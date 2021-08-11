package com.ibm.pixogram.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ibm.pixogram.bean.LikeEntity;

public interface LikeRepo  extends JpaRepository<LikeEntity, Integer> {

	@Query(value = "select id from like_entity n where n.username =:username && n.post_id =:postId", nativeQuery=true)
	int getPostId(@Param(value="username") String username, @Param(value="postId") String postId);
	
	@Query(value = "select * from like_entity n where n.post_id =:postId", nativeQuery=true)
	List<LikeEntity> getLikesForPostId(@Param(value="postId") String postId);
	
}
