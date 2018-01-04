package com.focus.weborder.services.order;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest")
public class OrderController {

	@Autowired
	private OrderService orderService;
	
	@RequestMapping("/orders")
	public List<Order> getAllOrders() {
		return orderService.getAllOrders();
	}
	
	@RequestMapping("/order")
	public List<Order> getByCompanyCustidGrpid(
			@RequestParam String company,
			@RequestParam Long custid,
			@RequestParam Long ordergrpid){
		return orderService.getByCompanyCustidGrpid(
				ordergrpid, custid, company);
	}
	
	@RequestMapping("/order/ponumber")
	public Order getByCompanyCustidGrpidPonumber(
			@RequestParam String company,
			@RequestParam Long custid,
			@RequestParam Long ordergrpid,
			@RequestParam String ponumber){
		return orderService.getByCompanyCustidGrpidPonumber(
				ordergrpid, custid, company, ponumber);
	}
	
	@RequestMapping("/order/expedisi")
	public List<String> getExpedisiByCompanyCustid(
			@RequestParam String company,
			@RequestParam Long custid){
		return orderService.getExpedisiByCompanyCustid(company, custid);
	}
	
	@RequestMapping(method=RequestMethod.POST, value="/order")
	public void addOrder(@RequestBody Order order){
		orderService.addOrder(order);
	}
	
	@RequestMapping(method=RequestMethod.PUT, value="/order")
	public Long updateOrder(@RequestBody Order order){
		return orderService.updateOrder(order);
	}
	
	@RequestMapping(method=RequestMethod.DELETE, value="/order")
	public void deleteOrder(@RequestBody List<Long> orderids){
		for(Long orderid: orderids) {
			orderService.deleteOrder(orderid);		
		}
	}
	
}
