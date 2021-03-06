package com.focus.weborder.services.orderdetail;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.focus.weborder.security.service.UserService;

@RestController
@RequestMapping("/rest")
public class OrderDetailController {

	@Autowired
	private OrderDetailService orderDetailService;
	@Autowired
	private UserService userService;
	
	@RequestMapping("/orderdetails")
	public List<OrderDetail> getAllOrderDetails() {
		return orderDetailService.getAllOrderDetails();
	}
	
	@RequestMapping("/orderdetail")
	public List<OrderDetailDto> getOrderDetail(@RequestParam String orderid){
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();

		String company = userService.findUserByUsername(auth.getName()).getCompany();

		return orderDetailService.getByOrderid(company, orderid);
	}
	
	@RequestMapping("/orderdetail/productcode")
	public OrderDetail getByOrderidProductcode(
			@RequestParam Long orderid,
			@RequestParam String productcode){
		return orderDetailService.getByOrderidProductcode(orderid, productcode);
	}
	
	@RequestMapping(method=RequestMethod.POST, value="/orderdetail")
	public void addOrderDetail(@RequestBody OrderDetail orderdetail){
		orderDetailService.addOrderDetail(orderdetail);
	}
	
	@RequestMapping(method=RequestMethod.PUT, value="/orderdetail")
	public Integer updateOrderDetail(@RequestBody List<OrderDetail> orderdetails){
		for(OrderDetail orderdetail: orderdetails) {
			orderDetailService.updateOrderDetail(orderdetail);
		}
		return orderdetails.size();
	}
	
	@RequestMapping(method=RequestMethod.DELETE, value="/orderdetail")
	public void deleteOrderDetail(@RequestBody List<Long> orderdetailids){
		for(Long orderdetailid: orderdetailids) {
			orderDetailService.deleteOrderDetail(orderdetailid);
		}
	}

}
