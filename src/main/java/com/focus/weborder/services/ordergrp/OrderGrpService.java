package com.focus.weborder.services.ordergrp;

import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
	
	public OrderGrp getOrderGrpOrdergrpid(
			String company, Long custId, Long orderGrpId) {
		return orderGrpRepository.getByCompanyCustidOrdergrpid(
				company, custId, orderGrpId);
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
		
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (auth != null) {
			Calendar c = Calendar.getInstance();
			System.out.println();
			System.out.print("[WebOrder-POST-OrderGrp]"
					+ c.get(Calendar.YEAR) 
					+ "/"
					+ (c.get(Calendar.MONTH) + 1)
					+ "/"
					+ c.get(Calendar.DAY_OF_MONTH)
					+ " "
					+ c.get(Calendar.HOUR)
					+ ":"
					+ c.get(Calendar.MINUTE)
					+ ":"
					+ c.get(Calendar.SECOND)
					+ "."
					+ c.get(Calendar.MILLISECOND)
					+ " by " 
					+ auth.getName()
					+ " with role: "
					+ auth.getAuthorities());
			System.out.print("; company: " + orderGrp.getCompany());
			System.out.print("; custId: " + orderGrp.getCustId());
			System.out.print("; periodeOrder: " + orderGrp.getPeriodeOrder());
			System.out.print("; orderType: " + orderGrp.getOrderType());
			System.out.print("; orderBy: " + orderGrp.getOrderBy());
			System.out.print("; leadTime: " + orderGrp.getLeadTime());
			System.out.print("; totalOrder: " + orderGrp.getTotalOrder());
			System.out.print("; jumlahOrder: " + orderGrp.getJumlahOrder());
			System.out.print("; sisaLimit: " + orderGrp.getSisaLimit());
			System.out.print("; submitStatus: " + orderGrp.getSubmitStatus());
			System.out.print("; createTime: " + orderGrp.getCreateTime());
			System.out.print("; updateTime: " + orderGrp.getUpdateTime() + ";");
		}
		
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
