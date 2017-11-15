package com.focus.weborder.services.ordergrp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderGrpService {

	@Autowired
	private OrderGrpRepository orderGrpRepository;
	
	public List<OrderGrp> getAllOrderGrps() {
		List<OrderGrp> orderGrps = 
				orderGrpRepository.getAll();
		return orderGrps;		
	}
	
	public OrderGrp getOrderGrpDraft(String company, Long custId) {
		return orderGrpRepository.getByCompanyCustidDraft(company, custId);
	}
	
	public List<OrderGrp> getOrderGrpSubmitted(String company, Long custId) {
		return orderGrpRepository.getOrderGrpSubmitted(company, custId);
	}
	
	public void addOrderGrp(OrderGrp orderGrp) {
		orderGrpRepository.save(orderGrp);
	}
	
	public void updateOrderGrp(OrderGrp orderGrp) {
		orderGrpRepository.save(orderGrp);
	}
	
	public void deleteOrderGrp(Long groupId) {
		orderGrpRepository.delete(groupId);
	}

}
