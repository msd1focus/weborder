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
	
	public List<OrderGrp> getOrderGrpDraft(String company, Long custId) {
		return orderGrpRepository.getByCompanyCustidDraft(company, custId);
	}
	
	public List<OrderGrp> getOrderGrpSubmitted(
			String company, Long custId,
			String periodeOrder) {
		return orderGrpRepository.getOrderGrpSubmitted(
				company, custId, periodeOrder);
	}
	
	public void addOrderGrp(OrderGrp orderGrp) {
		//orderGrpRepository.save(orderGrp);
	}
	
	public Long updateOrderGrp(OrderGrp orderGrp) {
		orderGrpRepository.save(orderGrp);
		return orderGrp.getOrderGrpId();
		/*orderGrpRepository.updateByCompanyCustidGrpid(
				orderGrp.getOrderGrpId(), 
				orderGrp.getCompany(),
				orderGrp.getCustId(),
				orderGrp.getPeriodeOrder(),
				orderGrp.getOrderType(),
				orderGrp.getOrderBy(),
				orderGrp.getLeadTime(),
				orderGrp.getTotalOrder(),
				orderGrp.getJumlahOrder(),
				orderGrp.getTotalPrice(),
				orderGrp.getSisaLimit(),
				orderGrp.getSubmitStatus(),
				orderGrp.getCreateTime(),
				orderGrp.getUpdateTime());*/
		
	}
	
	public void deleteOrderGrp(Long groupId) {
		//orderGrpRepository.delete(groupId);
	}

}
