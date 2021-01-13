package com.focus.weborder.ebs.creditlimit;


public class CreditLimitEbsDto {
	private Long id;
	private String company;
	private Long custId;
	private String customerName;
	private String customerNumber;
	private String headers;
	private Double overallCreditLimit;
	private Double sisaAr;
	private Double outstandingSo;
	private Double outstandingCo1;
	private Double outstandingCo2;
	private Double sisaLimit;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
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
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public String getCustomerNumber() {
		return customerNumber;
	}
	public void setCustomerNumber(String customerNumber) {
		this.customerNumber = customerNumber;
	}
	public String getHeaders() {
		return headers;
	}
	public void setHeaders(String headers) {
		this.headers = headers;
	}
	public Double getOverallCreditLimit() {
		return overallCreditLimit;
	}
	public void setOverallCreditLimit(Double overallCreditLimit) {
		this.overallCreditLimit = overallCreditLimit;
	}
	public Double getSisaAr() {
		return sisaAr;
	}
	public void setSisaAr(Double sisaAr) {
		this.sisaAr = sisaAr;
	}
	public Double getOutstandingSo() {
		return outstandingSo;
	}
	public void setOutstandingSo(Double outstandingSo) {
		this.outstandingSo = outstandingSo;
	}
	public Double getOutstandingCo1() {
		return outstandingCo1;
	}
	public void setOutstandingCo1(Double outstandingCo1) {
		this.outstandingCo1 = outstandingCo1;
	}
	public Double getOutstandingCo2() {
		return outstandingCo2;
	}
	public void setOutstandingCo2(Double outstandingCo2) {
		this.outstandingCo2 = outstandingCo2;
	}
	public Double getSisaLimit() {
		return sisaLimit;
	}
	public void setSisaLimit(Double sisaLimit) {
		this.sisaLimit = sisaLimit;
	}

	
}
