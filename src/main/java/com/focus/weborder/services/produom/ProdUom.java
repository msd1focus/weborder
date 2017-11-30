package com.focus.weborder.services.produom;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "PROD_UOM")
public class ProdUom {

	@Id
	@Column(name="PROD_UOM_ID")
	private String prodUomId;
	@Column(name="PROD_CODE")
	private String prodCode;
	@Column(name="UOM_CODE")
	private String uomCode;
	@Column(name="CONVERSION_RATE")
	private Double conversionRate;
	@Column(name="COMPANY")
	private String company;
	
	public ProdUom() {
		
	}
	
	public ProdUom(String prodCode, String uomCode, 
			Double conversionRate, String company) {
		super();
		this.prodCode = prodCode;
		this.uomCode = uomCode;
		this.conversionRate = conversionRate;
		this.company = company;
	}

	public String getProdCode() {
		return prodCode;
	}

	public void setProdCode(String prodCode) {
		this.prodCode = prodCode;
	}

	public String getUomCode() {
		return uomCode;
	}

	public void setUomCode(String uomCode) {
		this.uomCode = uomCode;
	}

	public Double getConversionRate() {
		return conversionRate;
	}

	public void setConversionRate(Double conversionRate) {
		this.conversionRate = conversionRate;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

}
