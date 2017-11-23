package com.focus.weborder.types;

import java.util.List;

import com.focus.weborder.services.custprod.CustProd;
import com.focus.weborder.services.product.Product;
import com.focus.weborder.services.produom.ProdUom;

public class InputProduct {
	
	private CustProd custProd;
	private Product product;
	private List<ProdUom> prodUoms;
	private String orderQty1;
	private String orderQty2;
	private String orderQty3;
	private String orderQty4;
	private String orderQty5;

	public InputProduct() {
		
	}
	
	public InputProduct(
			CustProd custProd, Product product, 
			List<ProdUom> prodUoms,
			String orderQty1, String orderQty2, 
			String orderQty3, String orderQty4,
			String orderQty5) {
		super();
		this.custProd = custProd;
		this.product = product;
		this.prodUoms = prodUoms;
		this.orderQty1 = orderQty1;
		this.orderQty2 = orderQty2;
		this.orderQty3 = orderQty3;
		this.orderQty4 = orderQty4;
		this.orderQty5 = orderQty5;
	}

	public CustProd getCustProd() {
		return custProd;
	}

	public void setCustProd(CustProd custProd) {
		this.custProd = custProd;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public List<ProdUom> getProdUoms() {
		return prodUoms;
	}

	public void setProdUoms(List<ProdUom> prodUoms) {
		this.prodUoms = prodUoms;
	}

	public String getOrderQty1() {
		return orderQty1;
	}

	public void setOrderQty1(String orderQty1) {
		this.orderQty1 = orderQty1;
	}

	public String getOrderQty2() {
		return orderQty2;
	}

	public void setOrderQty2(String orderQty2) {
		this.orderQty2 = orderQty2;
	}

	public String getOrderQty3() {
		return orderQty3;
	}

	public void setOrderQty3(String orderQty3) {
		this.orderQty3 = orderQty3;
	}

	public String getOrderQty4() {
		return orderQty4;
	}

	public void setOrderQty4(String orderQty4) {
		this.orderQty4 = orderQty4;
	}

	public String getOrderQty5() {
		return orderQty5;
	}

	public void setOrderQty5(String orderQty5) {
		this.orderQty5 = orderQty5;
	}

}
