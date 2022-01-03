package com.focus.weborder.controller;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
//import java.util.Properties;
import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.focus.weborder.properties.WebOrderProperties;
import com.focus.weborder.security.model.User;
import com.focus.weborder.security.service.UserService;
import com.focus.weborder.services.order.Order;
import com.focus.weborder.services.order.OrderService;
import com.focus.weborder.services.ordergrp.OrderGrp;
import com.focus.weborder.services.ordergrp.OrderGrpService;
import com.focus.weborder.utility.PropertiesReader;
//import com.focus.weborder.utility.PropertiesReader;

@Controller
public class HistoryController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private OrderGrpService orderGrpService;
	
	@Autowired
	WebOrderProperties webOrderProperties;
	
//	@Value("${filterDate.start}")
//	private String startDate;
//	@Value("${filterDate.end}")
//	private String endDate;
	
	@GetMapping("/history")
	public ModelAndView orderHistory(){
		
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		ModelAndView modelAndView = new ModelAndView();
		List<Order> orders = new ArrayList<Order>();
		OrderGrp orderGrp = null;
		User user = new User();
		String company = "";
		Long custId = (long)0;
		
		String woFileDir = webOrderProperties.getWeborder();
		
		PropertiesReader pr = new PropertiesReader();
		Properties prop = pr.readProperties(woFileDir);
		String startDate = prop.getProperty("FilterDate.Start");
		String endDate = prop.getProperty("FilterDate.End");
		
		Date startOrderDate = Date.valueOf(startDate);
		Date endOrderDate = Date.valueOf(endDate);
		Date startInvoiceDate = Date.valueOf(startDate);
		Date endInvoiceDate = Date.valueOf(endDate);
		
		if (auth != null) {
			user = userService.findUserByUsername(auth.getName());
			company = user.getCompany();
			custId = user.getCustId();
			//orders = orderService.getOrdersByCompanyAndCustid(user.getCompany(), user.getCustId());
			orders = orderService.getByCompanyCustidStartEndorderdate(
					company, custId, startOrderDate, endOrderDate);
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
		modelAndView.addObject("startOrderDate", startOrderDate);
		modelAndView.addObject("endOrderDate", endOrderDate);
		modelAndView.addObject("startInvoiceDate", startInvoiceDate);
		modelAndView.addObject("endInvoiceDate", endInvoiceDate);
		modelAndView.setViewName("history");
		return modelAndView;
	}
	
	@GetMapping("/historyall")
	public String orderhistoryAll(Model model){
		model.addAttribute("customername");
		model.addAttribute("companyname");
		model.addAttribute("company", "");
		model.addAttribute("custId", "");
		model.addAttribute("startOrderDate", "Start Order Date");
		model.addAttribute("endOrderDate", "End Order Date");
		model.addAttribute("startInvoiceDate", "Start Invoice Date");
		model.addAttribute("endInvoiceDate", "End Invoice Date");
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
		
		Long custId = (long)0;
		
		String woFileDir = webOrderProperties.getWeborder();
		
		PropertiesReader pr = new PropertiesReader();
		Properties prop = pr.readProperties(woFileDir);
		String startDate = prop.getProperty("FilterDate.Start");
		String endDate = prop.getProperty("FilterDate.End");
		
		Date startOrderDate = Date.valueOf(startDate);
		Date endOrderDate = Date.valueOf(endDate);
		Date startInvoiceDate = Date.valueOf(startDate);
		Date endInvoiceDate = Date.valueOf(endDate);
		
		if(user!=null) {
			custId = user.getCustId();
			//orders = orderService.getOrdersByCompanyAndCustid(user.getCompany(), user.getCustId());
			orders = orderService.getByCompanyCustidStartEndorderdate(
					company, custId, startOrderDate, endOrderDate);
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
		modelAndView.addObject("custId", custId);
		modelAndView.addObject("company", company);
		modelAndView.addObject("startOrderDate", startOrderDate);
		modelAndView.addObject("endOrderDate", endOrderDate);
		modelAndView.addObject("startInvoiceDate", startInvoiceDate);
		modelAndView.addObject("endInvoiceDate", endInvoiceDate);
		modelAndView.setViewName("historyall");
		return modelAndView;
	}

}
