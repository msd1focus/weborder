package com.focus.weborder.services.custmobil;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "CUST_MOBIL")
public class CustMobil {

	@Id
	@Column(name="CUST_MOBIL_ID")
	private Long custMobilId;
	@Column(name="COMPANY")
	private String company;
	@Column(name="CUST_ID")
	private Long custId;
	@Column(name="MOBIL_ID")
	private Long mobilId;
	
	public CustMobil() {
	}
	
	public CustMobil(
			Long custMobilId,
			String company,
			Long custId,
			Long mobilId) {
		super();
		this.custMobilId = custMobilId;
		this.company = company;
		this.custId = custId;
		this.mobilId = mobilId;
	}

	public Long getCustMobilId() {
		return custMobilId;
	}

	public void setCustMobilId(Long custMobilId) {
		this.custMobilId = custMobilId;
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

	public Long getMobilId() {
		return mobilId;
	}

	public void setMobilId(Long mobilId) {
		this.mobilId = mobilId;
	}

}
