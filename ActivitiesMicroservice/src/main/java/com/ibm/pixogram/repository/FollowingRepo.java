package com.ibm.pixogram.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ibm.pixogram.bean.FollowingUserEntity;

public interface FollowingRepo extends JpaRepository<FollowingUserEntity, Integer>{
	
	@Query(value = "select * from following_user_entity n where n.username =:username && n.following =:following", nativeQuery=true)
	FollowingUserEntity findIdByDetails(@Param(value="username") String username, @Param(value="following") String following);
	
	@Query(value = "select * from following_user_entity n where n.following =:following and NOT EXISTS (SELECT * FROM block_user_entity WHERE block_user_entity.blockusername = n.username)", nativeQuery=true)
	List<FollowingUserEntity> findFollowersByDetails(@Param(value="following") String following);
	
	@Query(value = "select * from following_user_entity n where n.username =:username", nativeQuery=true)
	List<FollowingUserEntity> findFollowingByDetails(@Param(value="username") String username);
	
	@Query(value = "select count(*) from following_user_entity n where n.username =:username", nativeQuery=true)
	int getFollowingCount(@Param(value="username") String username);
	
	@Query(value = "select count(*) from following_user_entity n where n.following =:username", nativeQuery=true)
	int getFollowersCount(@Param(value="username") String username);

}
