package com.ibm.pixogram.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ibm.pixogram.bean.NewsFeedEntity;

public interface NewsFeedRepo extends JpaRepository<NewsFeedEntity, Integer> {

	@Query(value = "select * from news_feed_entity n where n.username =:username ORDER BY date DESC", nativeQuery=true)
	List<NewsFeedEntity>getNewsFeedsById(@Param(value="username") String username);
}
