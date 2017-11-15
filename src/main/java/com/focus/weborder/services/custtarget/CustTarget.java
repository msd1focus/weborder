package com.focus.weborder.services.custtarget;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "CUST_PROD_TARGET")
public class CustTarget {
	
	@Column(name="COMPANY")
	private String company;
	@Id
	@Column(name="PRODUCT_CODE")
	private String productCode;
	@Column(name="CUST_ID")
	private Long custId;
	@Column(name="PERIODE")
	private String periode;
	@Column(name="TARGET_SALES")
	private Long targetSales;
	@Column(name="CURRENT_STOCK")
	private Long currentStock;
	@Column(name="STOCK_LAST_UPDATE")
	private Date stockLastUpdate;
	@Column(name="AVG_SALES")
	private String avgSales;
	@Column(name="AVG_SALES_LAST_UPDATE")
	private String avgSalesLastUpdate;
	
	public CustTarget() {
		
	}
	
	public CustTarget(String company, String productCode, Long custId,
			String periode, Long targetSales, Long currentStock,
			Date stockLastUpdate, String avgSales, String avgSalesLastUpdate) {
		super();
		this.company = company;
		this.productCode = productCode;
		this.custId = custId;
		this.periode = periode;
		this.targetSales = targetSales;
		this.currentStock = currentStock;
		this.stockLastUpdate = stockLastUpdate;
		this.avgSales = avgSales;
		this.avgSalesLastUpdate = avgSalesLastUpdate;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getProductCode() {
		return productCode;
	}

	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}

	public Long getCustId() {
		return custId;
	}

	public void setCustId(Long custId) {
		this.custId = custId;
	}

	public String getPeriode() {
		return periode;
	}

	public void setPeriode(String periode) {
		this.periode = periode;
	}

	public Long getTargetSales() {
		return targetSales;
	}

	public void setTargetSales(Long targetSales) {
		this.targetSales = targetSales;
	}

	public Long getCurrentStock() {
		return currentStock;
	}

	public void setCurrentStock(Long currentStock) {
		this.currentStock = currentStock;
	}

	public Date getStockLastUpdate() {
		return stockLastUpdate;
	}

	public void setStockLastUpdate(Date stockLastUpdate) {
		this.stockLastUpdate = stockLastUpdate;
	}

	public String getAvgSales() {
		return avgSales;
	}

	public void setAvgSales(String avgSales) {
		this.avgSales = avgSales;
	}

	public String getAvgSalesLastUpdate() {
		return avgSalesLastUpdate;
	}

	public void setAvgSalesLastUpdate(String avgSalesLastUpdate) {
		this.avgSalesLastUpdate = avgSalesLastUpdate;
	}
}