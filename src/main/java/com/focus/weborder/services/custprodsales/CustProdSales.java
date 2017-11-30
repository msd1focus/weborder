package com.focus.weborder.services.custprodsales;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "CUST_PROD_SALES")
public class CustProdSales {


	@Id
	@Column(name="CUST_PROD_SALES_ID")
	private Long custProdSalesId;
	@Column(name="COMPANY")
	private String company;
	@Column(name="PRODUCT_CODE")
	private String productCode;
	@Column(name="CUST_ID")
	private Long custId;
	@Column(name="PERIODE")
	private String periode;
	@Column(name="AVG_SALES")
	private Double avgSales;
	@Column(name="AVG_SALES_LAST_UPDATE")
	private Date avgSalesLastUpdate;
	
	public CustProdSales() {
	}
	
	public CustProdSales(
			Long custProdSalesId,
			String company, String productCode, Long custId,
			String periode, Double avgSales, Date avgSalesLastUpdate) {
		super();
		this.custProdSalesId = custProdSalesId;
		this.company = company;
		this.productCode = productCode;
		this.custId = custId;
		this.periode = periode;
		this.avgSales = avgSales;
		this.avgSalesLastUpdate = avgSalesLastUpdate;
	}

	public Long getCustProdSalesId() {
		return custProdSalesId;
	}

	public void setCustProdSalesId(Long custProdSalesId) {
		this.custProdSalesId = custProdSalesId;
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

	public Double getAvgSales() {
		return avgSales;
	}

	public void setAvgSales(Double avgSales) {
		this.avgSales = avgSales;
	}

	public Date getAvgSalesLastUpdate() {
		return avgSalesLastUpdate;
	}

	public void setAvgSalesLastUpdate(Date avgSalesLastUpdate) {
		this.avgSalesLastUpdate = avgSalesLastUpdate;
	}
	
}
