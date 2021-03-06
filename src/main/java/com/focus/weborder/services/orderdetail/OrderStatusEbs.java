package com.focus.weborder.services.orderdetail;

public class OrderStatusEbs {

	private String orderDetailId;
	
	private String OrderId;
	
	private String orderSource;
	private String orderSourceReference;
	private String orderSourceLineRef;		
	private String custPoNo;
	private String productCode;
	
	private Long coNo;
	private String coTgl;
	private Long coQty;
	private String coStatus;

	private Long soNo;
	private String soTgl;
	private Long soQty;
	private String soStatus;
	
	private String soDetailStatus;
	
	private String doNo;
	private String doTgl;
	private Long doQty;
	
	public String getOrderDetailId() {
		return orderDetailId;
	}
	public void setOrderDetailId(String orderDetailId) {
		this.orderDetailId = orderDetailId;
	}
	public String getOrderId() {
		return OrderId;
	}
	public void setOrderId(String orderId) {
		OrderId = orderId;
	}
	public String getOrderSource() {
		return orderSource;
	}
	public void setOrderSource(String orderSource) {
		this.orderSource = orderSource;
	}
	public String getOrderSourceReference() {
		return orderSourceReference;
	}
	public void setOrderSourceReference(String orderSourceReference) {
		this.orderSourceReference = orderSourceReference;
	}
	public String getOrderSourceLineRef() {
		return orderSourceLineRef;
	}
	public void setOrderSourceLineRef(String orderSourceLineRef) {
		this.orderSourceLineRef = orderSourceLineRef;
	}
	public String getCustPoNo() {
		return custPoNo;
	}
	public void setCustPoNo(String custPoNo) {
		this.custPoNo = custPoNo;
	}
	public String getProductCode() {
		return productCode;
	}
	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}
	public String getCoStatus() {
		return coStatus;
	}
	public void setCoStatus(String coStatus) {
		this.coStatus = coStatus;
	}
	public Long getCoNo() {
		return coNo;
	}
	public void setCoNo(Long coNo) {
		this.coNo = coNo;
	}
	public String getCoTgl() {
		return coTgl;
	}
	public void setCoTgl(String coTgl) {
		this.coTgl = coTgl;
	}
	public Long getCoQty() {
		return coQty;
	}
	public void setCoQty(Long coQty) {
		this.coQty = coQty;
	}

	public String getSoStatus() {
		return soStatus;
	}
	public void setSoStatus(String soStatus) {
		this.soStatus = soStatus;
	}
	
	public Long getSoNo() {
		return soNo;
	}
	public void setSoNo(Long soNo) {
		this.soNo = soNo;
	}
	public String getSoTgl() {
		return soTgl;
	}
	public void setSoTgl(String soTgl) {
		this.soTgl = soTgl;
	}
	public Long getSoQty() {
		return soQty;
	}
	public void setSoQty(Long soQty) {
		this.soQty = soQty;
	}
	public String getSoDetailStatus() {
		return soDetailStatus;
	}
	public void setSoDetailStatus(String soDetailStatus) {
		this.soDetailStatus = soDetailStatus;
	}
	public String getDoNo() {
		return doNo;
	}
	public void setDoNo(String doNo) {
		this.doNo = doNo;
	}
	public String getDoTgl() {
		return doTgl;
	}
	public void setDoTgl(String doTgl) {
		this.doTgl = doTgl;
	}
	public Long getDoQty() {
		return doQty;
	}
	public void setDoQty(Long doQty) {
		this.doQty = doQty;
	}

	
}
