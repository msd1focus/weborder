package com.focus.weborder.services.orderdetail;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ORDER_DETAIL")
public class OrderDetail {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="ORDER_DETAIL_ID")
	private Long orderDetailId;
	@Column(name="ORDER_ID")
	private Long orderId;
	@Column(name="PRODUCT_Code")
	private String productCode;
	@Column(name="PRODUCT_DESC")
	private String productDesc;
	@Column(name="UOM")
	private String uom;
	@Column(name="JUMLAH")
	private Long jumlah;
	@Column(name="UNIT_PRICE")
	private Long unitPrice;
	@Column(name="TOTAL_PRICE")
	private Long totalPrice;
	
	public OrderDetail() {
		
	}
	
	public OrderDetail(Long orderDetailId, Long orderId, String productCode, 
			String productDesc, String uom, Long jumlah,
			Long unitPrice, Long totalPrice) {
		
		super();
		this.orderDetailId = orderDetailId;
		this.orderId = orderId;
		this.productCode = productCode;
		this.productDesc = productDesc;
		this.uom = uom;
		this.jumlah = jumlah;
		this.unitPrice = unitPrice;
		this.totalPrice = totalPrice;
	}

	public Long getOrderDetailId() {
		return orderDetailId;
	}

	public void setOrderDetailId(Long orderDetailId) {
		this.orderDetailId = orderDetailId;
	}

	public Long getOrderId() {
		return orderId;
	}

	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}

	public String getProductCode() {
		return productCode;
	}

	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}

	public String getProductDesc() {
		return productDesc;
	}

	public void setProductDesc(String productDesc) {
		this.productDesc = productDesc;
	}

	public String getUom() {
		return uom;
	}

	public void setUom(String uom) {
		this.uom = uom;
	}

	public Long getJumlah() {
		return jumlah;
	}

	public void setJumlah(Long jumlah) {
		this.jumlah = jumlah;
	}

	public Long getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(Long unitPrice) {
		this.unitPrice = unitPrice;
	}

	public Long getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(Long totalPrice) {
		this.totalPrice = totalPrice;
	}

}
