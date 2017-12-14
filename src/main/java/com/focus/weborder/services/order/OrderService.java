package com.focus.weborder.services.order;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
		//Double totalPrice = order.getTotalPrice();
		//Double tonaseOrder = order.getTonaseOrder();
		//System.out.println("tonaseOrder: " + tonaseOrder);
		orderRepository.save(order);
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
