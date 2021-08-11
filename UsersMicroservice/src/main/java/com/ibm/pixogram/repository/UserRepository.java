package com.ibm.pixogram.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ibm.pixogram.bean.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

	@Query(value = "select * from user where username!=:username", nativeQuery=true)
	List<User> getAllUsers(@Param(value="username") String username);
	
	@Query(value = "select * from user where username LIKE %:username%", nativeQuery=true)
	List<User> getPostBySearch(@Param(value="username") String username);
}
