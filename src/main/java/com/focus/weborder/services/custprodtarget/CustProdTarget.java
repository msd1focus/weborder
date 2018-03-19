package com.focus.weborder.services.custprodtarget;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;


@Entity @IdClass(CustProdTargetId.class)
@Table(name = "CUST_PROD_TARGET")
public class CustProdTarget {
	
	@Id
	@Column(name="COMPANY")
	private String company;
	@Id
	@Column(name="PRODUCT_CODE")
	private String productCode;
	@Column(name="CUST_NUMBER")
	private String custNumber;
	@Id
	@Column(name="CUST_ID")
	private Long custId;
	@Id
	@Column(name="PERIODE_TARGET")
	private String periodeTarget;
	@Column(name="TARGET_SALES")
	private Double targetSales;
	
	public CustProdTarget() {
		
	}
	
	public CustProdTarget(
			String company, String productCode, String custNumber,
			Long custId, String periodeTarget,
			Double targetSales) {
		super();
		this.company = company;
		this.productCode = productCode;
		this.custNumber = custNumber;
		this.custId = custId;
		this.periodeTarget = periodeTarget;
		this.targetSales = targetSales;
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

	public Double getTargetSales() {
		return targetSales;
	}

	public void setTargetSales(Double targetSales) {
		this.targetSales = targetSales;
	}
}

class CustProdTargetId implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	String company;
	Long custId;
	String productCode;
	String periodeTarget;
}