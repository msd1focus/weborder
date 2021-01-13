package com.focus.weborder.services.orderdetail;

import java.util.Date;

public class OrderDetailDto {

	private Long orderDetailId;
	private Long orderId;
	private String productCode;
	private String productDesc;
	private String uom;
	private Double unitPrice;
	private Double totalPrice;
	private Long jumlah;
	private Long nomorCo;
	private String tanggalCo;
	private Long qtyCo;
	private String orderStatus;
	private Long nomorSo;
	private String tanggalSo;
	private String orderDetailStatus;
	private Long qtySo;
	private String nomorDo;
	private String tanggalDo;
	private Long qtyDo;
	
	public OrderDetailDto (OrderDetail orderDetail) {
		this.orderDetailId = orderDetail.getOrderDetailId();
		this.orderId = orderDetail.getOrderId(); 
		this.productCode =  orderDetail.getProductCode();
		this.productDesc = orderDetail.getProductDesc();
		this.uom = orderDetail.getUom();
		this.unitPrice = orderDetail.getUnitPrice();
		this.jumlah = orderDetail.getJumlah();
		this.totalPrice = orderDetail.getTotalPrice();
		this.nomorCo = null;
		this.tanggalCo = null;
		this.qtyCo = null;
		this.orderStatus = "";
		this.nomorSo = null;
		this.tanggalSo = null;
		this.orderDetailStatus = "";
		this.qtySo = null;
		this.nomorDo = null;
		this.tanggalDo = null;
		this.qtyDo = null;

	}
	
	public void add (OrderStatusEbs orderEbs) {
		this.nomorCo = orderEbs.getCoNo();
		this.tanggalCo = orderEbs.getCoTgl();
		this.qtyCo = orderEbs.getCoQty();
		this.orderStatus = orderEbs.getOrderStatus();
		this.nomorSo = orderEbs.getSoNo();
		this.tanggalSo = orderEbs.getSoTgl();
		this.orderDetailStatus = orderEbs.getOrderDetailStatus();
		this.qtySo = orderEbs.getSoQty();
		this.nomorDo = orderEbs.getDoNo();
		this.tanggalDo = orderEbs.getDoTgl();
		this.qtyDo = orderEbs.getDoQty();
		
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
	public Double getUnitPrice() {
		return unitPrice;
	}
	public void setUnitPrice(Double unitPrice) {
		this.unitPrice = unitPrice;
	}
	public Double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(Double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public Long getJumlah() {
		return jumlah;
	}
	public void setJumlah(Long jumlah) {
		this.jumlah = jumlah;
	}
	public Long getNomorCo() {
		return nomorCo;
	}
	public void setNomorCo(Long nomorCo) {
		this.nomorCo = nomorCo;
	}
	public String getTanggalCo() {
		return tanggalCo;
	}
	public void setTanggalCo(String tanggalCo) {
		this.tanggalCo = tanggalCo;
	}
	public Long getQtyCo() {
		return qtyCo;
	}
	public void setQtyCo(Long qtyCo) {
		this.qtyCo = qtyCo;
	}
	public String getOrderStatus() {
		return orderStatus;
	}
	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}
	public Long getNomorSo() {
		return nomorSo;
	}
	public void setNomorSo(Long nomorSo) {
		this.nomorSo = nomorSo;
	}
	public String getTanggalSo() {
		return tanggalSo;
	}
	public void setTanggalSo(String tanggalSo) {
		this.tanggalSo = tanggalSo;
	}
	public String getOrderDetailStatus() {
		return orderDetailStatus;
	}
	public void setOrderDetailStatus(String orderDetailStatus) {
		this.orderDetailStatus = orderDetailStatus;
	}
	public Long getQtySo() {
		return qtySo;
	}
	public void setQtySo(Long qtySo) {
		this.qtySo = qtySo;
	}
	public String getNomorDo() {
		return nomorDo;
	}
	public void setNomorDo(String nomorDo) {
		this.nomorDo = nomorDo;
	}
	public String getTanggalDo() {
		return tanggalDo;
	}
	public void setTanggalDo(String tanggalDo) {
		this.tanggalDo = tanggalDo;
	}
	public Long getQtyDo() {
		return qtyDo;
	}
	public void setQtyDo(Long qtyDo) {
		this.qtyDo = qtyDo;
	}
	
	
}
