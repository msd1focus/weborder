package com.focus.weborder.types;

public class OutputCmob {

	private String productCode;
	private Long quantity;
	private Double lastStock;
	
	public OutputCmob() {
		
	}
	
	public OutputCmob(
			String productCode,
			Long quantity,
			Double lastStock) {
		super();
		this.productCode = productCode;
		this.quantity = quantity;
		this.lastStock = lastStock;
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

}
