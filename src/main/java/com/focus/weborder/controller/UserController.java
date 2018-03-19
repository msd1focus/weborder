package com.focus.weborder.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.focus.weborder.security.model.User;
import com.focus.weborder.security.service.UserService;

@Controller
public class UserController {


	@Autowired
	private UserService userService;
	
	@GetMapping("/login")
    public String login() {
        return "/login";
    }
	
	@RequestMapping(value="/resetpassword", method = RequestMethod.GET)
	public ModelAndView resetpassword(){
		ModelAndView modelAndView = new ModelAndView();
		User user = new User();
		modelAndView.addObject("user", user);
		modelAndView.setViewName("resetpassword");
		return modelAndView;
	}
    
    @RequestMapping(value = "/resetpassword", method = RequestMethod.POST)
	public ModelAndView resetpassword(
			Model model) {

		ModelAndView modelAndView = new ModelAndView();
		
       	Authentication auth = SecurityContextHolder.getContext().getAuthentication();
       	
       	Boolean isAdmin = false;
		
		if (auth != null) {	
			for(GrantedAuthority ga: auth.getAuthorities()) {
				String role = ga.getAuthority();
				if(role != null) {
					if(role.equals("ADMIN")) {
						
						isAdmin = true;
						
						List<User> users = userService.getAll();
						
						for(User u: users) {
							u.setPassword("password");
							userService.changePassword(u);
						}
						
						User user = new User();
						modelAndView.addObject("user", user);
						modelAndView.addObject("successMessage", "Success");
						modelAndView.setViewName("resetpassword");
					}
				}
			}
		}
		
		if(!isAdmin) {
			User user = new User();
			modelAndView.addObject("user", user);
			modelAndView.addObject("successMessage", "Failed");
			modelAndView.setViewName("resetpassword");
		}
		
		return modelAndView;
	}
    
    @RequestMapping(value="/registration", method = RequestMethod.GET)
	public ModelAndView registration(){
		ModelAndView modelAndView = new ModelAndView();
		User user = new User();
		modelAndView.addObject("user", user);
		modelAndView.setViewName("registration");
		return modelAndView;
	}
	
	@RequestMapping(value = "/registration", method = RequestMethod.POST)
	public ModelAndView createNewUser(@Valid User user, BindingResult bindingResult) {
		ModelAndView modelAndView = new ModelAndView();
		User userExists = userService.findUserByUsername(user.getUsername());
		if (userExists != null) {
			bindingResult
					.rejectValue("name", "error.user",
							"There is already a user registered with the name provided");
		}
		if (bindingResult.hasErrors()) {
			modelAndView.setViewName("registration");
		} else {
			userService.saveUser(user);
			modelAndView.addObject("successMessage", "User has been registered successfully");
			modelAndView.addObject("user", new User());
			modelAndView.setViewName("registration");
			
		}
		return modelAndView;
	}
	
	@RequestMapping(value="/changepassword", method = RequestMethod.GET)
    public String changePassword() {
        return "/changepassword";
    }
    
    @RequestMapping(value = "/changepassword", method = RequestMethod.POST)
	public ModelAndView changePassword(
	        @RequestParam(value="newpassword", required=true) String newpassword) {
    	
       	Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String message = "Failed";
		if (auth != null) {
			if(auth.getName() != null) {
				User user = 
						userService.findUserByUsername(auth.getName());
				user.setPassword(newpassword);
				userService.changePassword(user);
				message = "Success";
			}
		}
			
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("messageInfo", message);
		modelAndView.setViewName("changepassword");
		return modelAndView;
	}

	@GetMapping("/changepassworduser")
    public String changepassworduser() {
        return "/changepassworduser";
    }
	
	@RequestMapping(value = "/changepassworduser", method = RequestMethod.POST)
	public ModelAndView changePasswordUser(
	        @RequestParam(value="username", required=true) String username,
	        @RequestParam(value="newpassword", required=true) String newpassword) {
    	
       	Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String message = "Failed";
		if (auth != null) {
			for(GrantedAuthority ga: auth.getAuthorities()) {
				String role = ga.getAuthority();
				if(role != null) {
					if(role.equals("ADMIN")) {
						User user = 
								userService.findUserByUsername(username);
						user.setPassword(newpassword);
						userService.changePassword(user);
						message = "Success";
					}
				}
			}
		}
			
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("messageInfo", message);
		modelAndView.setViewName("changepassworduser");
		return modelAndView;
	}

}
