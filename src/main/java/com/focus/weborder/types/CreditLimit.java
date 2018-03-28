package com.focus.weborder.types;

public class CreditLimit {

	private String overallCreditLimitText;
	private String sisaArText;
	private String outstandingSoText;
	private String outstandingCo1Text;
	private String outstandingCo2Text;
	private String sisaLimitText;
	private Double sisaLimit;
	
	public CreditLimit() {
	}
	
	public CreditLimit(
			String overallCreditLimitText,
			String sisaArText,
			String outstandingSoText,
			String outstandingCo1Text,
			String outstandingCo2Text,
			String sisaLimitText,
			Double sisaLimit) {
		super();
		this.overallCreditLimitText = overallCreditLimitText;
		this.sisaArText = sisaArText;
		this.outstandingSoText = outstandingSoText;
		this.outstandingCo1Text = outstandingCo1Text;
		this.outstandingCo2Text = outstandingCo2Text;
		this.sisaLimitText = sisaLimitText;
		this.sisaLimit = sisaLimit;
	}

	public String getOverallCreditLimitText() {
		return overallCreditLimitText;
	}

	public void setOverallCreditLimitText(String overallCreditLimitText) {
		this.overallCreditLimitText = overallCreditLimitText;
	}

	public String getSisaArText() {
		return sisaArText;
	}

	public void setSisaArText(String sisaArText) {
		this.sisaArText = sisaArText;
	}

	public String getOutstandingSoText() {
		return outstandingSoText;
	}

	public void setOutstandingSoText(String outstandingSoText) {
		this.outstandingSoText = outstandingSoText;
	}

	public String getOutstandingCo1Text() {
		return outstandingCo1Text;
	}

	public void setOutstandingCo1Text(String outstandingCo1Text) {
		this.outstandingCo1Text = outstandingCo1Text;
	}

	public String getOutstandingCo2Text() {
		return outstandingCo2Text;
	}

	public void setOutstandingCo2Text(String outstandingCo2Text) {
		this.outstandingCo2Text = outstandingCo2Text;
	}

	public String getSisaLimitText() {
		return sisaLimitText;
	}

	public void setSisaLimitText(String sisaLimitText) {
		this.sisaLimitText = sisaLimitText;
	}

	public Double getSisaLimit() {
		return sisaLimit;
	}

	public void setSisaLimit(Double sisaLimit) {
		this.sisaLimit = sisaLimit;
	}

}
