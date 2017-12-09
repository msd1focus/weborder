package com.focus.weborder.services.orderdetail;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest")
public class OrderDetailController {

	@Autowired
	private OrderDetailService orderDetailService;
	
	@RequestMapping("/orderdetails")
	public List<OrderDetail> getAllOrderDetails() {
		return orderDetailService.getAllOrderDetails();
	}
	
	@RequestMapping("/orderdetail")
	public List<OrderDetail> getOrderDetail(@RequestParam Long orderid){
		return orderDetailService.getByOrderid(orderid);
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
	public void updateOrderDetail(@RequestBody List<OrderDetail> orderdetails){
		for(OrderDetail orderdetail: orderdetails) {
			orderDetailService.updateOrderDetail(orderdetail);
		}
	}
	
	@RequestMapping(method=RequestMethod.DELETE, value="/orderdetail")
	public void deleteOrderDetail(@RequestParam Long orderdetailid){
		orderDetailService.deleteOrderDetail(orderdetailid);
	}

}
