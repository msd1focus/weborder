package com.focus.weborder.security.service;

import com.focus.weborder.security.model.User;

public interface UserService {
	//public User findUserByEmail(String email);
	public void saveUser(User user);
	public User findUserByName(String name);
}
