package com.focus.weborder.services.ordergrp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/rest")
public class OrderGrpController {

	@Autowired
	private OrderGrpService orderGrpService;
	
	@RequestMapping("/ordergrps")
	public List<OrderGrp> getAllOrderGroups() {
		return orderGrpService.getAllOrderGrps();
	}
	
	@RequestMapping("/ordergrp")
	public List<OrderGrp> getOrderGroupDraft(@RequestParam String company,
			@RequestParam Long custid){
		return orderGrpService.getOrderGrpDraft(company, custid);
	}
	
	@RequestMapping(method=RequestMethod.POST, value="/ordergrp")
	public void addOrderGrp(@RequestBody OrderGrp orderGrp){
		orderGrpService.addOrderGrp(orderGrp);
	}
	
	@RequestMapping(method=RequestMethod.PUT, value="/ordergrp")
	public void updateOrderGrp(@RequestBody OrderGrp orderGrp){
		orderGrpService.updateOrderGrp(orderGrp);
	}
	
	@RequestMapping(method=RequestMethod.DELETE, value="/ordergrps/{groupId}")
	public void deleteOrderGrp(@PathVariable Long groupId){
		orderGrpService.deleteOrderGrp(groupId);
	}

}
