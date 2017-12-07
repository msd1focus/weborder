package com.focus.weborder.security.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.focus.weborder.security.model.User;

@Repository("userRepository")
public interface UserRepository extends JpaRepository<User, Long> {
	 //User findByEmail(String email);
	
	@Query("SELECT u FROM User u")
    List<User> getAll();
	
	 User findByName(String name);
	 User findByUsername(String username);
}
