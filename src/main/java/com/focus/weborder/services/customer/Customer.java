package com.focus.weborder.services.customer;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

@Entity @IdClass(CustomerId.class)
@Table(name = "CUSTOMER")
public class Customer {
	
	@Id
	@Column(name="COMPANY")
	private String company;
	@Id
	@Column(name="CUST_ID")
	private Long custId;
	@Column(name="CUST_COMPANY_ID")
	private String custCompanyId;
	@Column(name="CUSTOMER_NUMBER")
	private String customerNumber;
	@Column(name="CUSTOMER_NAME")
	private String customerName;
	@Column(name="EMAIL_ADDR")
	private String emailAddr;
	@Column(name="CUST_AREA")
	private String custArea;
	@Column(name="CUST_ADDRESS")
	private String custAddress;
	@Column(name="CUST_LOCATION")
	private String custLocation;
	@Column(name="CUST_REGION")
	private String custRegion;
	@Column(name="UPDATE_TIME")
	private Date updateTime;
	@Column(name="CREDIT_LIMIT")
	private Long creditLimit;
	
	public Customer() {
		
	}
	
	public Customer(
			String company, Long custId, String custCompanyId,
			String customerNumber,
			String customerName, String emailAddr, 
			String custArea, String custAddress, 
			String locationName, String custLocation, String custRegion,
			Date updateTime, Long creditLimit) {
		super();
		this.company = company;
		this.custId = custId;
		this.custCompanyId = custCompanyId;
		this.customerNumber = customerNumber;
		this.customerName = customerName;
		this.emailAddr = emailAddr;
		this.custArea = custArea;
		this.custAddress = custAddress;
		this.custLocation = custLocation;
		this.custRegion = custRegion;
		this.updateTime = updateTime;
		this.creditLimit = creditLimit;
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

	public String getCustCompanyId() {
		return custCompanyId;
	}

	public void setCustCompanyId(String custCompanyId) {
		this.custCompanyId = custCompanyId;
	}

	public String getCustomerNumber() {
		return customerNumber;
	}

	public void setCustomerNumber(String customerNumber) {
		this.customerNumber = customerNumber;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getCustArea() {
		return custArea;
	}

	public void setCustArea(String custArea) {
		this.custArea = custArea;
	}

	public String getEmailAddr() {
		return emailAddr;
	}

	public void setEmailAddr(String emailAddr) {
		this.emailAddr = emailAddr;
	}

	public String getCustAddress() {
		return custAddress;
	}

	public void setCustAddress(String custAddress) {
		this.custAddress = custAddress;
	}

	public String getCustLocation() {
		return custLocation;
	}

	public void setCustLocation(String custLocation) {
		this.custLocation = custLocation;
	}

	public String getCustRegion() {
		return custRegion;
	}

	public void setCustRegion(String custRegion) {
		this.custRegion = custRegion;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public Long getCreditLimit() {
		return creditLimit;
	}

	public void setCreditLimit(Long creditLimit) {
		this.creditLimit = creditLimit;
	}

}

class CustomerId implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	String company;
	Long custId;
}