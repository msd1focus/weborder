package com.focus.weborder.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.focus.weborder.services.order.Order;
import com.focus.weborder.services.order.OrderService;

@Controller
public class IndexController {
	
	@Autowired
	private OrderService orderService;
	
	@RequestMapping("/")
    public String index(Model model){
		Order order = new Order();
		model.addAttribute("order", order);  
		model.addAttribute("orders", orderService.getAllOrders());
        return "index";
    }
	
	@PostMapping("/")
    public String greetingSubmit(@ModelAttribute Order order, Model model) {
		orderService.addOrder(order);
		model.addAttribute("orders", orderService.getAllOrders());
        return "index";
    }
	
}
