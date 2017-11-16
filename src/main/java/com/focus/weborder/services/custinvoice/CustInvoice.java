package com.focus.weborder.services.custinvoice;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "CUST_INVOICE")
public class CustInvoice {
	
	@Column(name="COMPANY")
	private String company;
	@Column(name="CUST_ID")
	private Long custId;
	@Column(name="SHIP_TO_ID")
	private Long ShipToId;
	@Column(name="TRX_NUMBER")
	private String trxNumber;
	@Id
	@Column(name="TRX_ID")
	private Long trxId;
	@Column(name="TRX_DATE")
	private Date trxDate;
	@Column(name="PRODUCT_CODE")
	private String productCode;
	@Column(name="UOM_CODE")
	private String uomCode;
	@Column(name="QTY")
	private Long qty;
	@Column(name="INV_TYPE")
	private String invType;
	
	public CustInvoice() {
		
	}
	
	public CustInvoice(
			String company, Long custId, Long ShipToId,
			String trxNumber, Long trxId, Date trxDate,
			String productCode, String uomCode, Long qty,
			String invType) {
		super();
		this.company = company;
		this.custId = custId;
		this.ShipToId = ShipToId;
		this.trxNumber = trxNumber;
		this.trxId = trxId;
		this.trxDate = trxDate;
		this.productCode = productCode;
		this.uomCode = uomCode;
		this.qty = qty;
		this.invType = invType;
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
		return ShipToId;
	}

	public void setShipToId(Long shipToId) {
		ShipToId = shipToId;
	}

	public String getTrxNumber() {
		return trxNumber;
	}

	public void setTrxNumber(String trxNumber) {
		this.trxNumber = trxNumber;
	}

	public Long getTrxId() {
		return trxId;
	}

	public void setTrxId(Long trxId) {
		this.trxId = trxId;
	}

	public Date getTrxDate() {
		return trxDate;
	}

	public void setTrxDate(Date trxDate) {
		this.trxDate = trxDate;
	}

	public String getProductCode() {
		return productCode;
	}

	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}

	public String getUomCode() {
		return uomCode;
	}

	public void setUomCode(String uomCode) {
		this.uomCode = uomCode;
	}

	public Long getQty() {
		return qty;
	}

	public void setQty(Long qty) {
		this.qty = qty;
	}

	public String getInvType() {
		return invType;
	}

	public void setInvType(String invType) {
		this.invType = invType;
	}

}
