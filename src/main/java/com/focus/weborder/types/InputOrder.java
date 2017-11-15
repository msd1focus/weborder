package com.focus.weborder.types;

import com.focus.weborder.services.order.Order;
import com.focus.weborder.services.ordergrp.OrderGrp;

public class InputOrder {
	
	private OrderGrp orderGrp;
	private Order order1;
	private Order order2;
	private Order order3;
	private Order order4;
	private Order order5;
	
	public InputOrder() {
		
	}
	
	public InputOrder(OrderGrp orderGrp, Order order1, Order order2,
			Order order3, Order order4, Order order5) {
		super();
		this.orderGrp = orderGrp;
		this.order1 = order1;
		this.order2 = order2;
		this.order3 = order3;
		this.order4 = order4;
		this.order5 = order5;
	}

	public OrderGrp getOrderGrp() {
		return orderGrp;
	}

	public void setOrderGrp(OrderGrp orderGrp) {
		this.orderGrp = orderGrp;
	}

	public Order getOrder1() {
		return order1;
	}

	public void setOrder1(Order order1) {
		this.order1 = order1;
	}

	public Order getOrder2() {
		return order2;
	}

	public void setOrder2(Order order2) {
		this.order2 = order2;
	}

	public Order getOrder3() {
		return order3;
	}

	public void setOrder3(Order order3) {
		this.order3 = order3;
	}

	public Order getOrder4() {
		return order4;
	}

	public void setOrder4(Order order4) {
		this.order4 = order4;
	}

	public Order getOrder5() {
		return order5;
	}

	public void setOrder5(Order order5) {
		this.order5 = order5;
	}

}
