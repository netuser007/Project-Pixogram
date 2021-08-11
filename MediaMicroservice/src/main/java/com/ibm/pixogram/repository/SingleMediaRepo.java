package com.ibm.pixogram.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ibm.pixogram.bean.SingleMediaEntity;


@Repository
public interface SingleMediaRepo extends JpaRepository<SingleMediaEntity, String>{
	
	@Query(value = "select * from single_media_entity n where n.username =:username", nativeQuery=true)
	List<SingleMediaEntity> findPostsById(@Param(value="username") String username);
	
	@Query(value = "select * from single_media_entity ORDER BY date DESC", nativeQuery=true)
	List<SingleMediaEntity> getAllPosts();
	
	@Query(value = "select * from single_media_entity where tags LIKE %:tags%", nativeQuery=true)
	List<SingleMediaEntity> getPostBySearch(@Param(value="tags") String tags);

}
