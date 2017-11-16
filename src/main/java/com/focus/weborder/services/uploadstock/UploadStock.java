package com.focus.weborder.services.uploadstock;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "UPLOADSTOCK")
public class UploadStock {

	@Column(name="TRANSACTIONDATE")
	private Date transctionDate;
	@Column(name="COMPANY")
	private String company;
	@Column(name="OUTLET_ID")
	private String outletId;
	@Id
	@Column(name="ITEM_ID")
	private String itemId;
	@Column(name="SALES_QTY")
	private String salesQty;
	
	public UploadStock() {
	}
	
	public UploadStock(
			Date transactionDate, String company, String outletId,
			String itemId, String salesQty) {
		super();
		this.transctionDate = transactionDate;
		this.company = company;
		this.outletId = outletId;
		this.itemId = itemId;
		this.salesQty = salesQty;
	}

}
