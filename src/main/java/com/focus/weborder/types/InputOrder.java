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
	private String poNumber1CurrentMonth;
	private String poNumber2CurrentMonth;
	private String poNumber3CurrentMonth;
	private String poNumber4CurrentMonth;
	private String poNumber5CurrentMonth;
	private String poNumber1NextMonth;
	private String poNumber2NextMonth;
	private String poNumber3NextMonth;
	private String poNumber4NextMonth;
	private String poNumber5NextMonth;
	
	public InputOrder() {
		
	}
	
	public InputOrder(OrderGrp orderGrp, Order order1, Order order2,
			Order order3, Order order4, Order order5,String poNumber1NextMonth,
			String poNumber1CurrentMonth,
			String poNumber2CurrentMonth,
			String poNumber3CurrentMonth,
			String poNumber4CurrentMonth,
			String poNumber5CurrentMonth,
			String poNumber2NextMonth,
			String poNumber3NextMonth,
			String poNumber4NextMonth,
			String poNumber5NextMonth) {
		super();
		this.orderGrp = orderGrp;
		this.order1 = order1;
		this.order2 = order2;
		this.order3 = order3;
		this.order4 = order4;
		this.order5 = order5;
		this.poNumber1CurrentMonth = poNumber1CurrentMonth;
		this.poNumber2CurrentMonth = poNumber2CurrentMonth;
		this.poNumber3CurrentMonth = poNumber3CurrentMonth;
		this.poNumber4CurrentMonth = poNumber4CurrentMonth;
		this.poNumber5CurrentMonth = poNumber5CurrentMonth;
		this.poNumber1NextMonth = poNumber1NextMonth;
		this.poNumber2NextMonth = poNumber2NextMonth;
		this.poNumber3NextMonth = poNumber3NextMonth;
		this.poNumber4NextMonth = poNumber4NextMonth;
		this.poNumber5NextMonth = poNumber5NextMonth;
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

	public String getPoNumber1CurrentMonth() {
		return poNumber1CurrentMonth;
	}

	public void setPoNumber1CurrentMonth(String poNumber1CurrentMonth) {
		this.poNumber1CurrentMonth = poNumber1CurrentMonth;
	}

	public String getPoNumber2CurrentMonth() {
		return poNumber2CurrentMonth;
	}

	public void setPoNumber2CurrentMonth(String poNumber2CurrentMonth) {
		this.poNumber2CurrentMonth = poNumber2CurrentMonth;
	}

	public String getPoNumber3CurrentMonth() {
		return poNumber3CurrentMonth;
	}

	public void setPoNumber3CurrentMonth(String poNumber3CurrentMonth) {
		this.poNumber3CurrentMonth = poNumber3CurrentMonth;
	}

	public String getPoNumber4CurrentMonth() {
		return poNumber4CurrentMonth;
	}

	public void setPoNumber4CurrentMonth(String poNumber4CurrentMonth) {
		this.poNumber4CurrentMonth = poNumber4CurrentMonth;
	}

	public String getPoNumber5CurrentMonth() {
		return poNumber5CurrentMonth;
	}

	public void setPoNumber5CurrentMonth(String poNumber5CurrentMonth) {
		this.poNumber5CurrentMonth = poNumber5CurrentMonth;
	}

	public String getPoNumber1NextMonth() {
		return poNumber1NextMonth;
	}

	public void setPoNumber1NextMonth(String poNumber1NextMonth) {
		this.poNumber1NextMonth = poNumber1NextMonth;
	}

	public String getPoNumber2NextMonth() {
		return poNumber2NextMonth;
	}

	public void setPoNumber2NextMonth(String poNumber2NextMonth) {
		this.poNumber2NextMonth = poNumber2NextMonth;
	}

	public String getPoNumber3NextMonth() {
		return poNumber3NextMonth;
	}

	public void setPoNumber3NextMonth(String poNumber3NextMonth) {
		this.poNumber3NextMonth = poNumber3NextMonth;
	}

	public String getPoNumber4NextMonth() {
		return poNumber4NextMonth;
	}

	public void setPoNumber4NextMonth(String poNumber4NextMonth) {
		this.poNumber4NextMonth = poNumber4NextMonth;
	}

	public String getPoNumber5NextMonth() {
		return poNumber5NextMonth;
	}

	public void setPoNumber5NextMonth(String poNumber5NextMonth) {
		this.poNumber5NextMonth = poNumber5NextMonth;
	}

}
