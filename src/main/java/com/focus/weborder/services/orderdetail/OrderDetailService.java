package com.focus.weborder.services.orderdetail;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class OrderDetailService {

	@Autowired
	private OrderDetailRepository orderDetailRepository;
	
	@Value("${external.orderdetail.urlfdn}")
	private String urlfdn;
	@Value("${external.orderdetail.urlfdi}")
	private String urlfdi;

	
	public List<OrderDetail> getAllOrderDetails() {
		List<OrderDetail> orderDetails = 
				orderDetailRepository.getAll();
		return orderDetails;		
	}
	
	public OrderDetail getByOrderdetailid(Long orderDetailId) {
		return orderDetailRepository.findOne(orderDetailId);
	}
	
	private List<OrderStatusEbs> getOrderStatus (String company, String orderId) {
		RestTemplate restTemplate = new RestTemplate();
		String url = "";
		if (company.equals("FDI")) url = urlfdi + "?orderid=" + orderId;
		else url=urlfdn + "?orderid=" + orderId;

		OrderStatusEbs[] dtls = restTemplate.getForObject(url, OrderStatusEbs[].class);
		return Arrays.asList(dtls);
	}
	
	public List<OrderDetailDto> getByOrderid(String company, String orderId) {
		Long oid = Long.parseLong(orderId);
		List<OrderDetail> orderDetails = orderDetailRepository.getByOrderid(oid);
		
		List<OrderStatusEbs> ordersStatus = getOrderStatus(company, orderId);

		List<OrderDetailDto> orderDetailList = new ArrayList<>();
		for (OrderDetail od : orderDetails) {
			OrderDetailDto detailDto = new OrderDetailDto (od);
			for (OrderStatusEbs ordEbs : ordersStatus)  {
				if (ordEbs.getOrderDetailId().equals(od.getOrderDetailId().toString())) {
					detailDto.add(ordEbs);
				}
			}
			orderDetailList.add(detailDto);
		}
		
		return orderDetailList;
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
				orderDetail.getUnitPrice(), orderDetail.getTotalPrice(),
				orderDetail.getLastStock(), orderDetail.getSalesForecast(),
				orderDetail.getAverageSales(), orderDetail.getBufferStock(),
				orderDetail.getOutstandingOrder());
	}
	
	public void updateOrderDetail(OrderDetail orderDetail) {
		//System.out.println("orderDetail.getJumlah(): " + orderDetail.getJumlah());
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
