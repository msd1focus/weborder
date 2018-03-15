package com.focus.weborder.types;

public class OutputCmob {

	private String productCode;
	private Long quantity;
	private Double lastStock;
	private Double salesForecast;
	private Double averageSales;
	private Double bufferStock;
	private Double outstandingOrder;
	
	public OutputCmob() {
		
	}
	
	public OutputCmob(
			String productCode,
			Long quantity,
			Double lastStock,
			Double salesForecast,
			Double averageSales,
			Double bufferStock,
			Double outstandingOrder) {
		super();
		this.productCode = productCode;
		this.quantity = quantity;
		this.lastStock = lastStock;
		this.salesForecast = salesForecast;
		this.averageSales = averageSales;
		this.bufferStock = bufferStock;
		this.outstandingOrder = outstandingOrder;
	}

	public String getProductCode() {
		return productCode;
	}

	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}

	public Long getQuantity() {
		return quantity;
	}

	public void setQuantity(Long quantity) {
		this.quantity = quantity;
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
