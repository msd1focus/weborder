package com.focus.weborder.types;

import java.util.List;

import com.focus.weborder.services.custinvoice.CustInvoice;
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
	private Double averageSales3MonthBefore;
	private Double averageSales2MonthBefore;
	private Double averageSales1MonthBefore;
	private Double averageSalesCurrentMonth; //cust_prod_sales.avg_sales
	private Long targetCustomerCurrentMonth; //cust_prod_target.target_sales
	private Long targetCustomerNextMonth; //cust_prod_target.target_sales
	private Long qtyOnHand; //cust_prod_target.end_stock
	private List<CustInvoice> custInvoices; //cust_invoice

	public InputProduct() {
		
	}
	
	public InputProduct(
			CustProd custProd, Product product, 
			List<ProdUom> prodUoms,
			String orderQty1, String orderQty2, 
			String orderQty3, String orderQty4,
			String orderQty5,
			Double averageSales3MonthBefore,
			Double averageSales2MonthBefore,
			Double averageSales1MonthBefore,
			Double averageSalesCurrentMonth,
			Long targetCustomerCurrentMonth,
			Long targetCustomerNextMonth,
			Long qtyOnHand, List<CustInvoice> custInvoices
			) {
		super();
		this.custProd = custProd;
		this.product = product;
		this.prodUoms = prodUoms;
		this.orderQty1 = orderQty1;
		this.orderQty2 = orderQty2;
		this.orderQty3 = orderQty3;
		this.orderQty4 = orderQty4;
		this.orderQty5 = orderQty5;
		this.averageSales3MonthBefore = averageSales3MonthBefore;
		this.averageSales2MonthBefore = averageSales2MonthBefore;
		this.averageSales1MonthBefore = averageSales1MonthBefore;
		this.averageSalesCurrentMonth = averageSalesCurrentMonth;
		this.targetCustomerCurrentMonth = targetCustomerCurrentMonth;
		this.targetCustomerNextMonth = targetCustomerNextMonth;
		this.qtyOnHand = qtyOnHand;
		this.custInvoices = custInvoices;
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
	
	public Double getAverageSales3MonthBefore() {
		return averageSales3MonthBefore;
	}

	public void setAverageSales3MonthBefore(Double averageSales3MonthBefore) {
		this.averageSales3MonthBefore = averageSales3MonthBefore;
	}

	public Double getAverageSales2MonthBefore() {
		return averageSales2MonthBefore;
	}

	public void setAverageSales2MonthBefore(Double averageSales2MonthBefore) {
		this.averageSales2MonthBefore = averageSales2MonthBefore;
	}

	public Double getAverageSales1MonthBefore() {
		return averageSales1MonthBefore;
	}

	public void setAverageSales1MonthBefore(Double averageSales1MonthBefore) {
		this.averageSales1MonthBefore = averageSales1MonthBefore;
	}

	public Double getAverageSalesCurrentMonth() {
		return averageSalesCurrentMonth;
	}

	public void setAverageSalesCurrentMonth(Double averageSalesCurrentMonth) {
		this.averageSalesCurrentMonth = averageSalesCurrentMonth;
	}

	public Long getTargetCustomerCurrentMonth() {
		return targetCustomerCurrentMonth;
	}

	public void setTargetCustomerCurrentMonth(Long targetCustomerCurrentMonth) {
		this.targetCustomerCurrentMonth = targetCustomerCurrentMonth;
	}

	public Long getTargetCustomerNextMonth() {
		return targetCustomerNextMonth;
	}

	public void setTargetCustomerNextMonth(Long targetCustomerNextMonth) {
		this.targetCustomerNextMonth = targetCustomerNextMonth;
	}

	public Long getQtyOnHand() {
		return qtyOnHand;
	}

	public void setQtyOnHand(Long qtyOnHand) {
		this.qtyOnHand = qtyOnHand;
	}

	public List<CustInvoice> getCustInvoices() {
		return custInvoices;
	}

	public void setCustInvoices(List<CustInvoice> custInvoices) {
		this.custInvoices = custInvoices;
	}
}
