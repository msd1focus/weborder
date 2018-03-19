package com.focus.weborder.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.focus.weborder.security.model.User;
import com.focus.weborder.security.service.UserService;
import com.focus.weborder.services.customer.Customer;

@Controller
public class ReportController {

	@Autowired
	private UserService userService;
	
	@GetMapping("/report")
    public String report(Model model) {
    	
    	Customer customer = new Customer();
    	
    	Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (auth != null) {
			if(auth.getName() != null) {
				User user = 
						userService.findUserByUsername(auth.getName());
				customer.setCompany(user.getCompany());
		    	customer.setCustId(user.getCustId());	
			}
		}
		model.addAttribute("customer", customer);
        return "report";
    }

}
