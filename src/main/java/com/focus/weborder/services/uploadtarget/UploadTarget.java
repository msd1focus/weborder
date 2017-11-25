package com.focus.weborder.services.uploadtarget;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "UPLOADTARGET")
public class UploadTarget {

	@Column(name="TRANSACTIONDATE")
	private Date transactionDate;
	@Column(name="COMPANY")
	private String company;
	@Column(name="OUTLET_ID")
	private String outletId;
	@Id
	@Column(name="ITEM_ID")
	private String itemId;
	@Column(name="SALES_QTY")
	private String salesQty;
	
	public UploadTarget() {
		
	}
	
	public UploadTarget(
			Date transactionDate, String company, String outletId,
			String itemId, String salesQty
			) {
		super();
		this.transactionDate = transactionDate;
		this.company = company;
		this.outletId = outletId;
		this.itemId = itemId;
		this.salesQty = salesQty;
	}

	public Date getTransactionDate() {
		return transactionDate;
	}

	public void setTransactionDate(Date transactionDate) {
		this.transactionDate = transactionDate;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getOutletId() {
		return outletId;
	}

	public void setOutletId(String outletId) {
		this.outletId = outletId;
	}

	public String getItemId() {
		return itemId;
	}

	public void setItemId(String itemId) {
		this.itemId = itemId;
	}

	public String getSalesQty() {
		return salesQty;
	}

	public void setSalesQty(String salesQty) {
		this.salesQty = salesQty;
	}
}
