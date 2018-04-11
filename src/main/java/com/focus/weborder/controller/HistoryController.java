package com.focus.weborder.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.focus.weborder.security.model.User;
import com.focus.weborder.security.service.UserService;
import com.focus.weborder.services.order.Order;
import com.focus.weborder.services.order.OrderService;
import com.focus.weborder.services.ordergrp.OrderGrp;
import com.focus.weborder.services.ordergrp.OrderGrpService;

@Controller
public class HistoryController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private OrderGrpService orderGrpService;
	
	@GetMapping("/history")
	public ModelAndView orderHistory(){
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		ModelAndView modelAndView = new ModelAndView();
		List<Order> orders = new ArrayList<Order>();
		OrderGrp orderGrp = null;
		User user = new User();
		String company = "";
		Long custId = (long)0;
		if (auth != null) {
			user = userService.findUserByUsername(auth.getName());
			company = user.getCompany();
			custId = user.getCustId();
			orders = orderService.getOrdersByCompanyAndCustid(user.getCompany(), user.getCustId());
			for(Order order: orders) {

				if(orderGrp!=null) {
					if(orderGrp.getOrderGrpId()!=order.getOrderGrpId()) {
						orderGrp = orderGrpService.getOrderGrpOrdergrpid(
										order.getCompany(), 
										order.getCustId(),
										order.getOrderGrpId());
					}
				}
				else {
					orderGrp = orderGrpService.getOrderGrpOrdergrpid(
									order.getCompany(), 
									order.getCustId(),
									order.getOrderGrpId());
				}
				order.setInvoiceStatus(orderGrp.getSubmitStatus());
				
			}
		}
		modelAndView.addObject("orders", orders);
		modelAndView.addObject("custId", custId);
		modelAndView.addObject("company", company);
		modelAndView.setViewName("history");
		return modelAndView;
	}
	
	@GetMapping("/historyall")
	public String orderhistoryAll(Model model){
		model.addAttribute("customername");
		model.addAttribute("companyname");
		return "/historyall";
	}
	
	@RequestMapping(value = "/historyall", method = RequestMethod.POST)
	public ModelAndView orderHistoryAll(
			@RequestParam(value="companyname", required=false) String companyname,
			@RequestParam(value="customername", required=false) String customername){
		ModelAndView modelAndView = new ModelAndView();
		List<Order> orders = new ArrayList<Order>();
		OrderGrp orderGrp = null;
		User user = new User();
		String company = companyname;
		String customer = customername;
		user = userService.findUserByUsername(companyname + customername);
		if(user!=null) {
			orders = orderService.getOrdersByCompanyAndCustid(user.getCompany(), user.getCustId());
			for(Order order: orders) {
				if(orderGrp!=null) {
					if(orderGrp.getOrderGrpId()!=order.getOrderGrpId()) {
						orderGrp = orderGrpService.getOrderGrpOrdergrpid(
										order.getCompany(), 
										order.getCustId(),
										order.getOrderGrpId());
					}
				}
				else {
					orderGrp = orderGrpService.getOrderGrpOrdergrpid(
									order.getCompany(), 
									order.getCustId(),
									order.getOrderGrpId());
				}
				order.setInvoiceStatus(orderGrp.getSubmitStatus());
				
			}
		}
		modelAndView.addObject("orders", orders);
		modelAndView.addObject("customername", customer);
		modelAndView.addObject("companyname", company);
		modelAndView.setViewName("historyall");
		return modelAndView;
	}

}
