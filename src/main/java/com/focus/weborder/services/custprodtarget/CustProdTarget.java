package com.focus.weborder.services.custprodtarget;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "CUST_PROD_TARGET")
public class CustProdTarget {
	
	@Column(name="COMPANY")
	private String company;
	@Id
	@Column(name="PRODUCT_CODE")
	private String productCode;
	@Column(name="CUST_NUMBER")
	private String custNumber;
	@Column(name="CUST_ID")
	private Long custId;
	@Column(name="PERIODE_TARGET")
	private String periodeTarget;
	@Column(name="PERIODE_STOCK")
	private String periodeStock;
	@Column(name="TARGET_SALES")
	private Long targetSales;
	@Column(name="END_STOCK")
	private Long endStock;
	
	public CustProdTarget() {
		
	}
	
	public CustProdTarget(String company, String productCode, String custNumber,
			Long custId, String periodeTarget, String periodeStock,
			Long targetSales, Long endStock) {
		super();
		this.company = company;
		this.productCode = productCode;
		this.custNumber = custNumber;
		this.custId = custId;
		this.periodeTarget = periodeTarget;
		this.periodeStock = periodeStock;
		this.targetSales = targetSales;
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

	public String getPeriodeTarget() {
		return periodeTarget;
	}

	public void setPeriodeTarget(String periodeTarget) {
		this.periodeTarget = periodeTarget;
	}

	public String getPeriodeStock() {
		return periodeStock;
	}

	public void setPeriodeStock(String periodeStock) {
		this.periodeStock = periodeStock;
	}

	public Long getTargetSales() {
		return targetSales;
	}

	public void setTargetSales(Long targetSales) {
		this.targetSales = targetSales;
	}

	public Long getEndStock() {
		return endStock;
	}

	public void setEndStock(Long endStock) {
		this.endStock = endStock;
	}
	
}