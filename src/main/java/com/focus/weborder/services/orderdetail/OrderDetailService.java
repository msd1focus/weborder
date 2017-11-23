package com.focus.weborder.services.orderdetail;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderDetailService {

	@Autowired
	private OrderDetailRepository orderDetailRepository;
	
	public List<OrderDetail> getAllOrderDetails() {
		List<OrderDetail> orderDetails = 
				orderDetailRepository.getAll();
		return orderDetails;		
	}
	
	public OrderDetail getByOrderdetailid(Long orderDetailId) {
		return orderDetailRepository.findOne(orderDetailId);
	}
	
	public List<OrderDetail> getByOrderid(Long orderId) {
		return orderDetailRepository.getByOrderid(orderId);
	}
	
	public OrderDetail getByOrderidProductcode(
			Long orderId, String productCode) {
		return orderDetailRepository.getByOrderidProductcode(orderId, productCode);
	}
	
	public void addOrderDetail(OrderDetail orderDetail) {
		orderDetailRepository.insert(
				orderDetail.getOrderDetailId(), orderDetail.getOrderId(), 
				orderDetail.getProductCode(), orderDetail.getProductDesc(), 
				orderDetail.getUom(), orderDetail.getJumlah(), 
				orderDetail.getUnitPrice(), orderDetail.getTotalPrice());
	}
	
	public void updateOrderDetail(OrderDetail orderDetail) {
		orderDetailRepository.save(orderDetail);
		/*orderDetailRepository.update(
				orderDetail.getOrderDetailId(), orderDetail.getOrderId(), 
				orderDetail.getProductCode(), orderDetail.getProductDesc(), 
				orderDetail.getUom(), orderDetail.getJumlah(), 
				orderDetail.getUnitPrice(), orderDetail.getTotalPrice());*/
	}
	
	public void deleteOrderDetail(Long orderDetailId) {
		orderDetailRepository.deleteByOrderdetailid(orderDetailId);
	}

}
