package com.focus.weborder.services.ordergrp;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name= "ORDER_GRP")
public class OrderGrp {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="ORDER_GRP_ID")
	private Long orderGrpId;
	@Column(name="COMPANY")
	private String company;
	@Column(name="CUST_ID")
	private Long custId;
	@Column(name="PERIODE_ORDER")
	private String periodeOrder;
	@Column(name="ORDER_TYPE")
	private String orderType;
	@Column(name="ORDER_BY")
	private String orderBy;
	@Column(name="LEAD_TIME")
	private Long leadTime;
	@Column(name="TOTAL_ORDER")
	private Long totalOrder;
	@Column(name="JUMLAH_ORDER")
	private Long jumlahOrder;
	@Column(name="TOTAL_PRICE")
	private Long totalPrice;
	@Column(name="SISA_LIMIT")
	private Long sisaLimit;
	@Column(name="SUBMIT_STATUS")
	private String submitStatus;
	@Column(name="CREATE_TIME")
	private Date createTime;
	@Column(name="UPDATE_TIME")
	private Date updateTime;
	
	public OrderGrp() {
		
	}
	
	public OrderGrp( Long orderGrpId, String company, Long custId,
			String periodeOrder, String orderType, String orderBy,
			Long leadTime, Long totalOrder, Long totalPrice,
			Long sisaLimit, String submitStatus, Date createTime,
			Date updateTime) {
		
		super();
		this.orderGrpId = orderGrpId;
		this.company = company;
		this.custId = custId;
		this.periodeOrder = periodeOrder;
		this.orderType = orderType;
		this.orderBy = orderBy;
		this.leadTime = leadTime;
		this.totalOrder = totalOrder;
		this.totalPrice = totalPrice;
		this.periodeOrder = periodeOrder;
		this.sisaLimit = sisaLimit;
		this.submitStatus = submitStatus;
		this.createTime = createTime;
		this.updateTime = updateTime;
		
	}

	public Long getOrderGrpId() {
		return orderGrpId;
	}

	public void setOrderGrpId(Long orderGrpId) {
		this.orderGrpId = orderGrpId;
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

	public String getPeriodeOrder() {
		return periodeOrder;
	}

	public void setPeriodeOrder(String periodeOrder) {
		this.periodeOrder = periodeOrder;
	}

	public String getOrderType() {
		return orderType;
	}

	public void setOrderType(String orderType) {
		this.orderType = orderType;
	}

	public String getOrderBy() {
		return orderBy;
	}

	public void setOrderBy(String orderBy) {
		this.orderBy = orderBy;
	}

	public Long getLeadTime() {
		return leadTime;
	}

	public void setLeadTime(Long leadTime) {
		this.leadTime = leadTime;
	}

	public Long getTotalOrder() {
		return totalOrder;
	}

	public void setTotalOrder(Long totalOrder) {
		this.totalOrder = totalOrder;
	}

	public Long getJumlahOrder() {
		return jumlahOrder;
	}

	public void setJumlahOrder(Long jumlahOrder) {
		this.jumlahOrder = jumlahOrder;
	}

	public Long getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(Long totalPrice) {
		this.totalPrice = totalPrice;
	}

	public Long getSisaLimit() {
		return sisaLimit;
	}

	public void setSisaLimit(Long sisaLimit) {
		this.sisaLimit = sisaLimit;
	}

	public String getSubmitStatus() {
		return submitStatus;
	}

	public void setSubmitStatus(String submitStatus) {
		this.submitStatus = submitStatus;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
}
