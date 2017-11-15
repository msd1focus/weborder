package com.focus.weborder.custshipto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "CUST_SHIP_TO")
public class CustShipTo {

	@Column(name="COMPANY")
	private String company;
	@Column(name="CUST_ID")
	private Long custId;
	@Id
	@Column(name="SHIP_TO_ID")
	private Long shipToId;
	@Column(name="SHIP_TO_ADDR")
	private String shipToAddr;
	@Column(name="SHIP_TO_LOCATION")
	private String shipToLocation;
	@Column(name="SHIP_TO_CITY")
	private String shipToCity;

	public CustShipTo() {
		
	}
	
	public CustShipTo(String company, Long custId, Long shipToId, 
			String shipToAddr, String shipToLocation, String shipToCity) {
		super();
		this.company = company;
		this.custId = custId;
		this.shipToId = shipToId;
		this.shipToAddr = shipToAddr;
		this.shipToLocation = shipToLocation;
		this.shipToCity = shipToCity;
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

	public Long getShipToId() {
		return shipToId;
	}

	public void setShipToId(Long shipToId) {
		this.shipToId = shipToId;
	}

	public String getShipToAddr() {
		return shipToAddr;
	}

	public void setShipToAddr(String shipToAddr) {
		this.shipToAddr = shipToAddr;
	}

	public String getShipToLocation() {
		return shipToLocation;
	}

	public void setShipToLocation(String shipToLocation) {
		this.shipToLocation = shipToLocation;
	}

	public String getShipToCity() {
		return shipToCity;
	}

	public void setShipToCity(String shipToCity) {
		this.shipToCity = shipToCity;
	}
}
