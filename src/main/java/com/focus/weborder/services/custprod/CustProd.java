package com.focus.weborder.services.custprod;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "CUST_PROD")
public class CustProd {
	
	@Column(name="COMPANY")
	private String company;
	@Id
	@Column(name="PRODUCT_CODE")
	private String productCode;
	@Column(name="CUST_ID")
	private Long custId;
	@Column(name="STATUS")
	private String status;
	@Column(name="CURRENCY")
	private String currency;
	@Column(name="PRICE")
	private Double price;
	@Column(name="PRICE_UOM")
	private String priceUom;
	@Column(name="LAST_UPDATE")
	private Date lastUpdate;
	@Column(name="OUTSTANDING_SO")
	private Double outstandingSo;
	@Column(name="OUTSTANDING_QUOTE")
	private Double outstandingQuote;
	
	public CustProd() {
		
	}
	
	public CustProd(String company, String productCode, Long custId,
			String status, String currency, Double price,
			String priceUom,
			Date lastUpdate, Double outstandingSo, Double outstandingQuote) {
		super();
		this.company = company;
		this.custId = custId;
		this.productCode = productCode;
		this.status = status;
		this.currency = currency;
		this.price = price;
		this.priceUom = priceUom; 
		this.lastUpdate = lastUpdate;
		this.outstandingSo = outstandingSo;
		this.outstandingQuote = outstandingQuote;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public Long getCustId() {
		return custId;
	}

	public void setCustId(Long custId) {
		this.custId = custId;
	}

	public String getProductCode() {
		return productCode;
	}

	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public String getPriceUom() {
		return priceUom;
	}

	public void setPriceUom(String priceUom) {
		this.priceUom = priceUom;
	}

	public Date getLastUpdate() {
		return lastUpdate;
	}

	public void setLastUpdate(Date lastUpdate) {
		this.lastUpdate = lastUpdate;
	}

	public Double getOutstandingSo() {
		return outstandingSo;
	}

	public void setOutstandingSo(Double outstandingSo) {
		this.outstandingSo = outstandingSo;
	}

	public Double getOutstandingQuote() {
		return outstandingQuote;
	}

	public void setOutstandingQuote(Double outstandingQuote) {
		this.outstandingQuote = outstandingQuote;
	}

}