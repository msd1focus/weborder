package com.focus.weborder.types;

public class OutputCmob {

	private String productCode;
	private Long quantity;
	
	public OutputCmob() {
		
	}
	
	public OutputCmob(
			String productCode,
			Long quantity) {
		super();
		this.productCode = productCode;
		this.quantity = quantity;
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

}
