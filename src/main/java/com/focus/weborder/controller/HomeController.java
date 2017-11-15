package com.focus.weborder.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

	@RequestMapping("/home")
    public String home(Model model){
		//Order order = new Order();
		//model.addAttribute("order", order);  
		//model.addAttribute("orders", orderService.getAllOrders());
        return "home";
    }

}
