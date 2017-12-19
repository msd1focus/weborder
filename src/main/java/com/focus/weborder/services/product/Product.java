package com.focus.weborder.services.product;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "PRODUCT")
public class Product {
	
	@Column(name="COMPANY")
	private String company;
	@Id
	@Column(name="PRODUCT_CODE")
	private String productCode;
	@Column(name="PRODUCT_NAME")
	private String productName;
	@Column(name="PRODUCT_NAME2")
	private String productName2;
	@Column(name="PRODUCT_CAT1")
	private String productCat1;
	@Column(name="PRODUCT_CAT2")
	private String productCat2;
	@Column(name="PROD_UOM1")
	private String prodUom1;
	@Column(name="PROD_UOM2")
	private String prodUom2;
	@Column(name="DIMENSION_UOM_CODE")
	private String dimensionUomCode;
	@Column(name="PROD_WIDTH")
	private Long prodWidth;
	@Column(name="PROD_LENGTH")
	private Long prodLength;
	@Column(name="PROD_HEIGHT")
	private Long prodHeight;
	@Column(name="UPDATE_TIME")
	private Date updateTime;
	
	public Product() {
		
	}
	
	public Product(
			String company, String productCode, String productName,
			String productName2,
			String productCat1, String productCat2, String prodUom1, 
			String prodUom2, String dimensionUomCode, Long prodWidth, 
			Long prodLength, Long prodHeight, Date updateTime) {
		super();
		this.company = company;
		this.productCode = productCode;
		this.productName = productName;
		this.productName2 = productName2;
		this.productCat1 = productCat1;
		this.productCat2 = productCat2;
		this.prodUom1 = prodUom1;
		this.prodUom2 = prodUom2;
		this.dimensionUomCode = dimensionUomCode;
		this.prodWidth = prodWidth;
		this.prodLength = prodLength;
		this.prodHeight = prodHeight;
		this.updateTime = updateTime;
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

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getProductName2() {
		return productName2;
	}

	public void setProductName2(String productName2) {
		this.productName2 = productName2;
	}

	public String getProductCat1() {
		return productCat1;
	}

	public void setProductCat1(String productCat1) {
		this.productCat1 = productCat1;
	}

	public String getProductCat2() {
		return productCat2;
	}

	public void setProductCat2(String productCat2) {
		this.productCat2 = productCat2;
	}

	public String getProdUom1() {
		return prodUom1;
	}

	public void setProdUom1(String prodUom1) {
		this.prodUom1 = prodUom1;
	}

	public String getProdUom2() {
		return prodUom2;
	}

	public void setProdUom2(String prodUom2) {
		this.prodUom2 = prodUom2;
	}

	public String getDimensionUomCode() {
		return dimensionUomCode;
	}

	public void setDimensionUomCode(String dimensionUomCode) {
		this.dimensionUomCode = dimensionUomCode;
	}

	public Long getProdWidth() {
		return prodWidth;
	}

	public void setProdWidth(Long prodWidth) {
		this.prodWidth = prodWidth;
	}

	public Long getProdLength() {
		return prodLength;
	}

	public void setProdLength(Long prodLength) {
		this.prodLength = prodLength;
	}

	public Long getProdHeight() {
		return prodHeight;
	}

	public void setProdHeight(Long prodHeight) {
		this.prodHeight = prodHeight;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

}