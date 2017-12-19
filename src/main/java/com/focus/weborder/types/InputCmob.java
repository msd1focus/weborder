package com.focus.weborder.types;

public class InputCmob {

	private String company;
	private Long custId;
	private String productCode;
	private String periode;
	private Integer leadTime;
	private Double primaryUomRate;
	private Double selectedUomRate;
	private Double outstandingSo;
	private Double outstandingQuote;
	
	public InputCmob() {
		
	}
	
	public InputCmob(
			String company,
			Long custId,
			String productCode,
			String periode,
			Integer leadTime,
			Double primaryUomRate,
			Double selectedUomRate,
			Double outstandingSo,
			Double outstandingQuote) {
		super();
		this.company = company;
		this.custId = custId;
		this.productCode = productCode;
		this.periode = periode;
		this.leadTime = leadTime;
		this.primaryUomRate = primaryUomRate;
		this.selectedUomRate = selectedUomRate;
		this.outstandingSo = outstandingSo;
		this.outstandingQuote = outstandingQuote;
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

	public String getProductCode() {
		return productCode;
	}

	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}

	public String getPeriode() {
		return periode;
	}

	public void setPeriode(String periode) {
		this.periode = periode;
	}

	public Integer getLeadTime() {
		return leadTime;
	}

	public void setLeadTime(Integer leadTime) {
		this.leadTime = leadTime;
	}

	public Double getPrimaryUomRate() {
		return primaryUomRate;
	}

	public void setPrimaryUomRate(Double primaryUomRate) {
		this.primaryUomRate = primaryUomRate;
	}

	public Double getSelectedUomRate() {
		return selectedUomRate;
	}

	public void setSelectedUomRate(Double selectedUomRate) {
		this.selectedUomRate = selectedUomRate;
	}

	public Double getOutstandingSo() {
		return outstandingSo;
	}

	public void setOutstandingSo(Double outstandingSo) {
		this.outstandingSo = outstandingSo;
	}

	public Double getOutstandingQuote() {
		return outstandingQuote;
	}

	public void setOutstandingQuote(Double outstandingQuote) {
		this.outstandingQuote = outstandingQuote;
	}
	
}
