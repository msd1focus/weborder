package com.focus.weborder.security.service;

import java.util.List;

import com.focus.weborder.security.model.User;

public interface UserService {
	//public User findUserByEmail(String email);
	public List<User> getAll();
	public void saveUser(User user);
	public User findUserByName(String name);
	public User findUserByUsername(String username);
}
