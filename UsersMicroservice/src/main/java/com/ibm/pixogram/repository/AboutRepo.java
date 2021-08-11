package com.ibm.pixogram.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ibm.pixogram.bean.AboutUser;

public interface AboutRepo extends JpaRepository<AboutUser, String> {

}
