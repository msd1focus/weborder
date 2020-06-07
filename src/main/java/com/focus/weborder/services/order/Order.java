package com.focus.weborder.services.order;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ORDERS")
public class Order {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="ORDER_ID")
	private Long orderId;
	@Column(name="ORDER_GRP_ID")
	private Long orderGrpId;
	@Column(name="COMPANY")
	private String company;
	@Column(name="CUST_ID")
	private Long custId;
	@Column(name="PO_NUMBER")
	private String poNumber;
	@Column(name="ORDER_DATE")
	private Date orderDate;
	@Column(name="SHIP_TO")
	private String shipTo;
	@Column(name="SHIP_DATE")
	private Date shipDate;
	@Column(name="EXPEDISI")
	private String expedisi;
	@Column(name="JENIS_MOBIL")
	private String jenisMobil;
	@Column(name="TONASE_MOBIL")
	private Double tonaseMobil;
	@Column(name="TONASE_ORDER")
	private Double tonaseOrder;
	@Column(name="SELISIH_TONASE")
	private Double selisihTonase;
	@Column(name="TOTAL_PRICE")
	private Double totalPrice;
	@Column(name="PERIODE")
	private String periode;
	@Column(name="EBS_SUBMIT_STATUS")
	private String ebsSubmitStatus;
	@Column(name="EBS_SUBMIT_DATE")
	private Date ebsSubmitDate;
	@Column(name="SO_NUMBER")
	private String soNumber;
	@Column(name="SO_STATUS")
	private String soStatus;
	@Column(name="SO_DATE")
	private Date soDate;
	@Column(name="INVOICE_NUMBER")
	private String invoiceNumber;
	@Column(name="INVOICE_STATUS")
	private String invoiceStatus;
	@Column(name="INVOICE_DATE")
	private Date invoiceDate;
	@Column(name="NOTES")
	private String notes;


	public Order() {

	}

	public Order(
			Long orderId, Long orderGrpId, String company,
			Long custId, String poNumber, Date orderDate, String shipTo,
			Date shipDate,
			String expedisi, String jenisMobil, Double tonaseMobil,
			Double tonaseOrder, Double selisihTonase, Double totalPrice,
			String periode, String ebsSubmitStatus, Date ebsSubmitDate,
			String soNumber, String soStatus, Date soDate,
			String invoiceNumber,
			String invoiceStatus,
			Date invoiceDate, String notes) {

		super();
		this.orderId = orderId;
		this.orderGrpId = orderGrpId;
		this.company = company;
		this.custId = custId;
		this.poNumber = poNumber;
		this.orderDate = orderDate;
		this.shipTo = shipTo;
		this.shipDate = shipDate;
		this.expedisi = expedisi;
		this.jenisMobil = jenisMobil;
		this.tonaseMobil = tonaseMobil;
		this.tonaseOrder = tonaseOrder;
		this.selisihTonase = selisihTonase;
		this.totalPrice = totalPrice;
		this.periode = periode;
		this.ebsSubmitStatus = ebsSubmitStatus;
		this.ebsSubmitDate = ebsSubmitDate;
		this.soNumber = soNumber;
		this.soStatus = soStatus;
		this.soDate = soDate;
		this.invoiceNumber = invoiceNumber;
		this.invoiceStatus = invoiceStatus;
		this.invoiceDate = invoiceDate;
		this.notes = notes;
	}

	public Long getOrderId() {
		return orderId;
	}

	public void setOrderId(Long orderId) {
		this.orderId = orderId;
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

	public String getPoNumber() {
		return poNumber;
	}

	public void setPoNumber(String poNumber) {
		this.poNumber = poNumber;
	}

	public Date getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(Date orderDate) {
		this.orderDate = orderDate;
	}

	public String getShipTo() {
		return shipTo;
	}

	public void setShipTo(String shipTo) {
		this.shipTo = shipTo;
	}

	public Date getShipDate() {
		return shipDate;
	}

	public void setShipDate(Date shipDate) {
		this.shipDate = shipDate;
	}

	public String getExpedisi() {
		return expedisi;
	}

	public void setExpedisi(String expedisi) {
		this.expedisi = expedisi;
	}

	public String getJenisMobil() {
		return jenisMobil;
	}

	public void setJenisMobil(String jenisMobil) {
		this.jenisMobil = jenisMobil;
	}

	public Double getTonaseMobil() {
		return tonaseMobil;
	}

	public void setTonaseMobil(Double tonaseMobil) {
		this.tonaseMobil = tonaseMobil;
	}

	public Double getTonaseOrder() {
		return tonaseOrder;
	}

	public void setTonaseOrder(Double tonaseOrder) {
		this.tonaseOrder = tonaseOrder;
	}

	public Double getSelisihTonase() {
		return selisihTonase;
	}

	public void setSelisihTonase(Double selisihTonase) {
		this.selisihTonase = selisihTonase;
	}

	public Double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(Double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public String getPeriode() {
		return periode;
	}

	public void setPeriode(String periode) {
		this.periode = periode;
	}

	public String getEbsSubmitStatus() {
		return ebsSubmitStatus;
	}

	public void setEbsSubmitStatus(String ebsSubmitStatus) {
		this.ebsSubmitStatus = ebsSubmitStatus;
	}

	public Date getEbsSubmitDate() {
		return ebsSubmitDate;
	}

	public void setEbsSubmitDate(Date ebsSubmitDate) {
		this.ebsSubmitDate = ebsSubmitDate;
	}

	public String getSoNumber() {
		return soNumber;
	}

	public void setSoNumber(String soNumber) {
		this.soNumber = soNumber;
	}

	public String getSoStatus() {
		return soStatus;
	}

	public void setSoStatus(String soStatus) {
		this.soStatus = soStatus;
	}

	public Date getSoDate() {
		return soDate;
	}

	public void setSoDate(Date soDate) {
		this.soDate = soDate;
	}

	public String getInvoiceNumber() {
		return invoiceNumber;
	}

	public void setInvoiceNumber(String invoiceNumber) {
		this.invoiceNumber = invoiceNumber;
	}

	public String getInvoiceStatus() {
		return invoiceStatus;
	}

	public void setInvoiceStatus(String invoiceStatus) {
		this.invoiceStatus = invoiceStatus;
	}

	public Date getInvoiceDate() {
		return invoiceDate;
	}

	public void setInvoiceDate(Date invoiceDate) {
		this.invoiceDate = invoiceDate;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}
}
