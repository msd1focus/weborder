package com.focus.weborder.types;

import java.util.List;

import com.focus.weborder.services.customer.Customer;
import com.focus.weborder.services.listmobil.ListMobil;

public class InputWebOrder {

	private Customer customer;
	private InputOrder inputOrder;
	private List<InputProduct> inputProducts;
	private List<ListMobil> listMobils;
	
	public InputWebOrder() {
		
	}
	
	public InputWebOrder(
			Customer customer,
			InputOrder inputOrder,
			List<InputProduct> inputProducts,
			List<ListMobil> listMobils
			) {
		super();
		this.customer = customer;
		this.inputOrder = inputOrder;
		this.inputProducts = inputProducts;
		this.listMobils = listMobils;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public InputOrder getInputOrder() {
		return inputOrder;
	}

	public void setInputOrder(InputOrder inputOrder) {
		this.inputOrder = inputOrder;
	}

	public List<InputProduct> getInputProducts() {
		return inputProducts;
	}

	public void setInputProducts(List<InputProduct> inputProducts) {
		this.inputProducts = inputProducts;
	}

	public List<ListMobil> getListMobils() {
		return listMobils;
	}

	public void setListMobils(List<ListMobil> listMobils) {
		this.listMobils = listMobils;
	}

}
