package com.focus.weborder.services.order;

import java.sql.Date;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
	
	@Autowired
	private OrderRepository orderRepository;
	
	public List<Order> getOrdersByCompanyAndCustid(String company, Long custId) {
		List<Order> orders = 
				orderRepository.findOrderByCompanyAndCustId(company, custId);
		return orders;		
	}
	
	public List<Order> getByCompanyCustidStartEndorderdate(
			String company,
			Long custId,
			Date startOrderDate,
			Date endOrderDate) {
		List<Order> orders = 
				orderRepository.getByCompanyCustidStartEndorderdate(
						company, custId, startOrderDate, endOrderDate);
		return orders;		
	}
	
	public List<Order> getAllOrders() {
		List<Order> orders = 
				orderRepository.getAll();
		return orders;		
	}
	
	public List<String> getExpedisiByCompanyCustid(
			String company, Long custId) {
		return orderRepository.getExpedisiByCompanyCustid(
				company, custId);
	}
	
	public List<Order> getByCompanyCustidGrpid(
			Long orderGrpId, Long custId, String company) {
		return orderRepository.getByCompanyCustidGrpid(
				orderGrpId, custId, company);
	}
	
	public Order getByCompanyCustidGrpidPonumber(
			Long orderGrpId, Long custId, String company,
			String poNumber) {
		return orderRepository.getByCompanyCustidGrpidPonumber(
				orderGrpId, custId, company, poNumber);
	}
	
	public Order getByOrderid(Long orderId) {
		//return orderRepository.findOne(orderId);
		return null;
	}
	
	public Long addOrder(Order order) {
		
		orderRepository.save(order);
		
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (auth != null) {
			Calendar c = Calendar.getInstance();
			System.out.println();
			System.out.print("[WebOrder-POST-Order]"
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
			System.out.print("; company: " + order.getCompany());
			System.out.print("; custId: " + order.getCustId());
			System.out.print("; orderGrpId: " + order.getOrderGrpId());
			System.out.print("; poNumber: " + order.getPoNumber());
			System.out.print("; orderDate: " + order.getOrderDate());
			System.out.print("; shipTo: " + order.getShipTo());
			System.out.print("; expedisi: " + order.getExpedisi());
			System.out.print("; jenisMobil: " + order.getJenisMobil());
			System.out.print("; tonaseMobil: " + order.getTonaseMobil());
			System.out.print("; tonaseOrder: " + order.getTonaseOrder());
			System.out.print("; totalPrice: " + order.getTotalPrice());
			System.out.print("; periode: " + order.getPeriode());
			System.out.print("; notes: " + order.getNotes() + ";");
		}
		
		return order.getOrderId();
		
		/*orderRepository.insert(
				order.getOrderId(), order.getOrderGrpId(), 
				order.getCompany(), order.getCustId(),
				order.getPoNumber(),
				order.getOrderDate(), order.getShipTo(), 
				order.getExpedisi(), order.getJenisMobil(), 
				order.getTonaseMobil(), order.getTonaseOrder(),
				order.getSelisihTonase(), order.getTotalPrice(), 
				order.getPeriode(), order.getEbsSubmitStatus(),
				order.getEbsSubmitDate(), 
				order.getSoNumber(), order.getSoStatus(),
				order.getSoDate(), order.getInvoiceStatus(), 
				order.getInvoiceDate());*/
	}
	
	public Long updateOrder(Order order) {
		
		orderRepository.save(order);
		
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (auth != null) {
			Calendar c = Calendar.getInstance();
			System.out.println();
			System.out.print("[WebOrder-POST-Order]"
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
			System.out.print("; company: " + order.getCompany());
			System.out.print("; custId: " + order.getCustId());
			System.out.print("; orderGrpId: " + order.getOrderGrpId());
			System.out.print("; poNumber: " + order.getPoNumber());
			System.out.print("; orderDate: " + order.getOrderDate());
			System.out.print("; shipTo: " + order.getShipTo());
			System.out.print("; expedisi: " + order.getExpedisi());
			System.out.print("; jenisMobil: " + order.getJenisMobil());
			System.out.print("; tonaseMobil: " + order.getTonaseMobil());
			System.out.print("; tonaseOrder: " + order.getTonaseOrder());
			System.out.print("; totalPrice: " + order.getTotalPrice());
			System.out.print("; periode: " + order.getPeriode());
			System.out.print("; notes: " + order.getNotes() + ";");
		}
		
		return order.getOrderId();
		
		/*orderRepository.updateByCompanyCustidGrpidOrderid(
				order.getOrderId(), order.getOrderGrpId(), 
				order.getCompany(), order.getCustId(), 
				order.getPoNumber(),
				order.getOrderDate(), order.getShipTo(), 
				order.getExpedisi(), order.getJenisMobil(), 
				order.getTonaseMobil(), order.getTonaseOrder(),
				order.getSelisihTonase(), order.getTotalPrice(), 
				order.getPeriode(), order.getEbsSubmitStatus(),
				order.getEbsSubmitDate(), 
				order.getSoNumber(), order.getSoStatus(),
				order.getSoDate(), order.getInvoiceStatus(), 
				order.getInvoiceDate(), order.getNotes());*/
	}
	
	public void deleteOrder(Long orderId) {
		orderRepository.delete(orderId);;
	}
	
}
