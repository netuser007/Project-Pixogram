package com.ibm.pixogram.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ibm.pixogram.bean.BlockUserEntity;
import com.ibm.pixogram.bean.FollowingUserEntity;

public interface BlockUserRepo extends JpaRepository<BlockUserEntity, Integer>{
	
	@Query(value = "select * from block_user_entity n where n.username =:username && n.blockusername =:blockusername", nativeQuery=true)
	BlockUserEntity findIdByDetails(@Param(value="username") String username, @Param(value="blockusername") String blockusername);
	
	@Query(value = "select * from block_user_entity n where n.username =:username", nativeQuery=true)
	List<BlockUserEntity> findBlockersByDetails(@Param(value="username") String username);

}
