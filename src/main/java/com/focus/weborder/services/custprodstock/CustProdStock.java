package com.focus.weborder.services.custprodstock;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "CUST_PROD_STOCK")
public class CustProdStock {

	@Column(name="COMPANY")
	private String company;
	@Id
	@Column(name="PRODUCT_CODE")
	private String productCode;
	@Column(name="CUST_NUMBER")
	private String custNumber;
	@Column(name="CUST_ID")
	private Long custId;
	@Column(name="PERIODE_STOCK")
	private String periodeStock;
	@Column(name="END_STOCK")
	private Double endStock;
	
	public CustProdStock() {
		
	}

	public CustProdStock(
			String company, String productCode, String custNumber,
			Long custId, String periodeStock,
			Double endStock) {
		super();
		this.company = company;
		this.productCode = productCode;
		this.custNumber = custNumber;
		this.custId = custId;
		this.periodeStock = periodeStock;
		this.endStock = endStock;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getProductCode() {
		return productCode;
	}

	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}

	public String getCustNumber() {
		return custNumber;
	}

	public void setCustNumber(String custNumber) {
		this.custNumber = custNumber;
	}

	public Long getCustId() {
		return custId;
	}

	public void setCustId(Long custId) {
		this.custId = custId;
	}

	public String getPeriodeStock() {
		return periodeStock;
	}

	public void setPeriodeStock(String periodeStock) {
		this.periodeStock = periodeStock;
	}

	public Double getEndStock() {
		return endStock;
	}

	public void setEndStock(Double endStock) {
		this.endStock = endStock;
	}
	
}
