package com.focus.weborder.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focus.weborder.security.model.User;

@Repository("userRepository")
public interface UserRepository extends JpaRepository<User, Long> {
	 //User findByEmail(String email);
	 User findByName(String name);
}
