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
	private Double unitPrice;
	@Column(name="TOTAL_PRICE")
	private Double totalPrice;
	@Column(name="LAST_STOCK")
	private Double lastStock;
	@Column(name="SALES_FORECAST")
	private Double salesForecast;
	@Column(name="AVERAGE_SALES")
	private Double averageSales;
	@Column(name="BUFFER_STOCK")
	private Double bufferStock;
	@Column(name="OUTSTANDING_ORDER")
	private Double outstandingOrder;
	
	public OrderDetail() {
		
	}
	
	public OrderDetail(Long orderDetailId, Long orderId, String productCode, 
			String productDesc, String uom, Long jumlah,
			Double unitPrice, Double totalPrice, Double lastStock,
			Double salesForecast, Double averageSales, Double bufferStock,
			Double outstandingOrder) {
		
		super();
		this.orderDetailId = orderDetailId;
		this.orderId = orderId;
		this.productCode = productCode;
		this.productDesc = productDesc;
		this.uom = uom;
		this.jumlah = jumlah;
		this.unitPrice = unitPrice;
		this.totalPrice = totalPrice;
		this.lastStock = lastStock;
		this.salesForecast = salesForecast;
		this.averageSales = averageSales;
		this.bufferStock = bufferStock;
		this.outstandingOrder = outstandingOrder;
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

	public Double getLastStock() {
		return lastStock;
	}

	public void setLastStock(Double lastStock) {
		this.lastStock = lastStock;
	}

	public Double getSalesForecast() {
		return salesForecast;
	}

	public void setSalesForecast(Double salesForecast) {
		this.salesForecast = salesForecast;
	}

	public Double getAverageSales() {
		return averageSales;
	}

	public void setAverageSales(Double averageSales) {
		this.averageSales = averageSales;
	}

	public Double getBufferStock() {
		return bufferStock;
	}

	public void setBufferStock(Double bufferStock) {
		this.bufferStock = bufferStock;
	}

	public Double getOutstandingOrder() {
		return outstandingOrder;
	}

	public void setOutstandingOrder(Double outstandingOrder) {
		this.outstandingOrder = outstandingOrder;
	}

}
