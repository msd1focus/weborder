package com.focus.weborder.security.service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.focus.weborder.security.model.Role;
import com.focus.weborder.security.model.User;
import com.focus.weborder.security.repository.RoleRepository;
import com.focus.weborder.security.repository.UserRepository;

@Service("userService")
public class UserServiceImpl implements UserService{

	@Autowired
	private UserRepository userRepository;
	@Autowired
    private RoleRepository roleRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	/*@Override
	public User findUserByEmail(String email) {
		return userRepository.findByEmail(email);
	}*/
    
    @Override
	public List<User> getAll() {
		return userRepository.getAll();
	}
    
    @Override
	public User findUserByName(String name) {
		return userRepository.findByName(name);
	}
    
	@Override
	public User findUserByUsername(String username) {
		return userRepository.findByUsername(username);
	}

	@Override
	public void saveUser(User user) {
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setActive(1);
        Role userRole = roleRepository.findByRole("USER");
        user.setRoles(new HashSet<Role>(Arrays.asList(userRole)));
		userRepository.save(user);
	}

}
