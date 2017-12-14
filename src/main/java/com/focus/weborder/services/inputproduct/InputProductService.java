package com.focus.weborder.services.inputproduct;

import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.focus.weborder.services.custinvoice.CustInvoice;
import com.focus.weborder.services.custinvoice.CustInvoiceService;
import com.focus.weborder.services.custprod.CustProd;
import com.focus.weborder.services.custprod.CustProdService;
import com.focus.weborder.services.custprodsales.CustProdSales;
import com.focus.weborder.services.custprodsales.CustProdSalesService;
import com.focus.weborder.services.custprodtarget.CustProdTarget;
import com.focus.weborder.services.custprodtarget.CustProdTargetService;
import com.focus.weborder.services.orderdetail.OrderDetail;
import com.focus.weborder.services.orderdetail.OrderDetailService;
import com.focus.weborder.services.product.Product;
import com.focus.weborder.services.product.ProductService;
import com.focus.weborder.services.produom.ProdUom;
import com.focus.weborder.services.produom.ProdUomService;
import com.focus.weborder.types.InputProduct;

@Service
public class InputProductService {

	@Autowired
	private CustProdService custProdService;
	
	@Autowired
	private ProdUomService prodUomService;
	
	@Autowired
	private ProductService productService;

	@Autowired
	private OrderDetailService orderDetailService;

	@Autowired
	private CustProdSalesService custProdSalesService;

	@Autowired
	private CustProdTargetService custProdTargetService;

	@Autowired
	private CustInvoiceService custInvoiceService;
	
	public List<InputProduct> getInputProduct(
			String company,
			Long custId,
			Long orderId1,
			Long orderId2,
			Long orderId3,
			Long orderId4,
			Long orderId5,
			String periodeCurrent) {
		
		Calendar c = Calendar.getInstance();
		Integer year = c.get(Calendar.YEAR);
		Integer month = c.get(Calendar.MONTH) + 1;
		String monthName = getMonthName(month);

		List<String> periodes = new ArrayList<>();
		periodes.add(monthName + " " + year);
		
		Integer monthNext = month;
		Integer month1Before = month-1;
		Integer month2Before = month-2;
		Integer month3Before = month-3;
		Integer yearNext = year;		
		Integer year1MonthBefore = year;
		Integer year2MonthBefore = year;
		Integer year3MonthBefore = year;

		if(month==1) {
			month1Before = 12;
			month2Before = 11;
			month3Before = 10;
			year1MonthBefore -= 1;
			year2MonthBefore -= 1;
			year3MonthBefore -= 1;
		}
		else if(month==2) {
			month2Before = 12;
			month3Before = 11;
			year2MonthBefore -= 1;
			year3MonthBefore -= 1;
		}
		else if(month==3) {
			month3Before = 12;
			year3MonthBefore = year-1;
		}
		else if(month==12) {
			monthNext = 1;
			yearNext += 1;
		}
		else {
			monthNext += 1;
		}
		String monthNameNext = getMonthName(monthNext);
		periodes.add(monthNameNext + " " + yearNext);
		
		String periodeCurrentOracle =
				getMonthNameOracle(month)
				+ "-"
				+ year;
		String periodeNextOracle =
				getMonthNameOracle(monthNext)
				+ "-"
				+ yearNext;
		String periode1BeforeOracle =
				getMonthNameOracle(month1Before)
				+ "-"
				+ year1MonthBefore;
		String periode2BeforeOracle =
				getMonthNameOracle(month2Before)
				+ "-"
				+ year2MonthBefore;
		String periode3BeforeOracle =
				getMonthNameOracle(month3Before)
				+ "-"
				+ year3MonthBefore;
		
		List<InputProduct> inputProducts =
				new ArrayList<>();
		
		List<CustProd> custProds = custProdService.getCustProd(
				company, custId);
		System.out.println("custProds.size(): " + custProds.size());
		for(CustProd custProd: custProds) {
			
			String productCode = custProd.getProductCode();
			InputProduct inputProduct = new InputProduct();

			List<ProdUom> prodUoms = prodUomService.getProdUom(
					company, productCode);
			
			Boolean isProductOumExist = false;
			for(ProdUom prodUom: prodUoms) {
				if(prodUom.getUomCode().equals(
						custProd.getPriceUom())) {
					isProductOumExist = true;
					break;
				}
			}
			
			if(isProductOumExist) {
				
				inputProduct.setProdUoms(prodUoms);	
				inputProduct.setCustProd(custProd);
				Product product = productService.getProduct(
						company, productCode);
				inputProduct.setProduct(product);
				
				OrderDetail orderDetail1 = null;
				/*if(orderId1!=null) {
					orderDetail1 = orderDetailService.getByOrderidProductcode(
							orderId1,
							custProd.getProductCode());
				}*/		
				
				if(orderDetail1!=null) {
					inputProduct.setOrderDetailId1(
							orderDetail1.getOrderDetailId());
					inputProduct.setOrderQty1(
							formatText(orderDetail1.getJumlah()));
				}
				else {

					inputProduct.setOrderQty1("0");
				}
				
				OrderDetail orderDetail2 = null;
				/*if(orderId2!=null) {
					orderDetail2 = orderDetailService.getByOrderidProductcode(
							orderId2,  
							custProd.getProductCode());
				}	*/
				
				if(orderDetail2!=null) {
					inputProduct.setOrderDetailId2(
							orderDetail2.getOrderDetailId());
					inputProduct.setOrderQty2(
							formatText(orderDetail2.getJumlah()));
				}
				else {

					inputProduct.setOrderQty2("0");
				}
				
				OrderDetail orderDetail3 = null;
				/*if(orderId3!=null) {
					orderDetail3 = orderDetailService.getByOrderidProductcode(
							orderId3,
							custProd.getProductCode());
				}	*/
				
				if(orderDetail3!=null) {
					inputProduct.setOrderDetailId3(
							orderDetail3.getOrderDetailId());
					inputProduct.setOrderQty3(
							formatText(orderDetail3.getJumlah()));
				}
				else {

					inputProduct.setOrderQty3("0");
				}
				
				OrderDetail orderDetail4 = null;
				/*if(orderId4!=null) {
					orderDetail4 = orderDetailService.getByOrderidProductcode(
							orderId4,
							custProd.getProductCode());
				}*/	
				
				if(orderDetail4!=null) {
					inputProduct.setOrderDetailId4(
							orderDetail4.getOrderDetailId());
					inputProduct.setOrderQty4(
							formatText(orderDetail4.getJumlah()));
				}
				else {

					inputProduct.setOrderQty4("0");
				}
				
				OrderDetail orderDetail5 = null;
				/*if(orderId5!=null) {
					orderDetail5 = orderDetailService.getByOrderidProductcode(
							orderId5,
							custProd.getProductCode());
				}*/	
				
				if(orderDetail5!=null) {
					inputProduct.setOrderDetailId5(
							orderDetail5.getOrderDetailId());
					inputProduct.setOrderQty5(
							formatText(orderDetail5.getJumlah()));
				}
				else {

					inputProduct.setOrderQty5("0");
				}
				
				/*//cmob required data
				Double averageSalesCurrentMonth = (double) 0;
				CustProdSales custProdSalesCurrent = 
						custProdSalesService.
							getBygetByCompanyCustidProductcodePeriode(
									company, custId,
									productCode, periodeCurrentOracle);
				if(custProdSalesCurrent!=null) {
					System.out.println();
					if(custProdSalesCurrent.getAvgSales()!=null) {
						averageSalesCurrentMonth =
								custProdSalesCurrent.getAvgSales();
					}
				}
				inputProduct.setAverageSalesCurrentMonth(
						averageSalesCurrentMonth);
				
				Double averageSales1MonthBefore = (double) 0;
				CustProdSales custProdSales1MonthBefore = 
						custProdSalesService.
							getBygetByCompanyCustidProductcodePeriode(
									company, custId,
									productCode, periode1BeforeOracle);
				if(custProdSales1MonthBefore!=null) {
					if(custProdSales1MonthBefore.getAvgSales()!=null) {
						averageSales1MonthBefore =
								custProdSales1MonthBefore.getAvgSales();
					}
				}
				inputProduct.setAverageSales1MonthBefore(
						averageSales1MonthBefore);
				
				Double averageSales2MonthBefore = (double) 0;
				CustProdSales custProdSales2MonthBefore = 
						custProdSalesService.
							getBygetByCompanyCustidProductcodePeriode(
									company, custId,
									productCode, periode2BeforeOracle);
				if(custProdSales2MonthBefore!=null) {
					if(custProdSales2MonthBefore.getAvgSales()!=null) {
						averageSales2MonthBefore =
								custProdSales2MonthBefore.getAvgSales();
					}
				}
				inputProduct.setAverageSales2MonthBefore(
						averageSales2MonthBefore);
				
				Double averageSales3MonthBefore = (double) 0;
				CustProdSales custProdSales3MonthBefore = 
						custProdSalesService.
							getBygetByCompanyCustidProductcodePeriode(
									company, custId,
									productCode, periode3BeforeOracle);
				if(custProdSales3MonthBefore!=null) {
					if(custProdSales3MonthBefore.getAvgSales()!=null) {
						averageSales3MonthBefore =
								custProdSales3MonthBefore.getAvgSales();
					}
				}
				inputProduct.setAverageSales3MonthBefore(
						averageSales3MonthBefore);
				

				Long qtyOnHand = (long)0;
				CustProdTarget custProdTargetStock =
						custProdTargetService.
							getBygetByCompanyCustidProductcode(
									company, custId,
									productCode);
				if(custProdTargetStock!=null) {
						if(custProdTargetStock.getEndStock()!=null) {
							qtyOnHand =
									custProdTargetStock.getEndStock();
							String primaryUom = product.getProdUom1();
							Double primaryUomRate=0.0;
							Double priceUomRate=0.0;
							for(Integer i=0; i<prodUoms.size(); i++) {
								if(primaryUom.trim().equals(prodUoms.get(i).getUomCode())) {
									primaryUomRate = prodUoms.get(i).getConversionRate();
								}
								if(custProd.getPriceUom().trim().equals(
										prodUoms.get(i).getUomCode())) {
									priceUomRate = prodUoms.get(i).getConversionRate();
								}
							}
							
							qtyOnHand =
									(long)((double)qtyOnHand
									* primaryUomRate
									/ priceUomRate);
							
						}
				}
				inputProduct.setQtyOnHand(qtyOnHand);
				
				long targetCustomerCurrentMonth = (long)0;
				CustProdTarget custProdTargetCurrent =
						custProdTargetService.
							getBygetByCompanyCustidProductcodePeriodetarget(
									company, custId,
									productCode, periodeCurrentOracle);

				if(custProdTargetCurrent!=null) {
						if(custProdTargetCurrent.getTargetSales()!=null) {
							targetCustomerCurrentMonth =
									custProdTargetCurrent.getTargetSales();
							String primaryUom = product.getProdUom1();
							Double primaryUomRate=0.0;
							Double priceUomRate=0.0;
							for(Integer i=0; i<prodUoms.size(); i++) {
								if(primaryUom.trim().equals(prodUoms.get(i).getUomCode().trim())) {
									primaryUomRate = prodUoms.get(i).getConversionRate();
								}
								if(custProd.getPriceUom().trim().equals(prodUoms.get(i).getUomCode())) {
									priceUomRate = prodUoms.get(i).getConversionRate();
								}
							}

							targetCustomerCurrentMonth =
									(long)((double)targetCustomerCurrentMonth
									* primaryUomRate
									/ priceUomRate);
							
						}
				}
				inputProduct.setTargetCustomerCurrentMonth(
						targetCustomerCurrentMonth);
				
				Long targetCustomerNextMonth = (long)0;
				CustProdTarget custProdTargetNextMonth =
						custProdTargetService.
							getBygetByCompanyCustidProductcodePeriodetarget(
									company, custId,
									productCode, periodeNextOracle);
				if(custProdTargetNextMonth!=null) {
						if(custProdTargetNextMonth.getTargetSales()!=null) {
							targetCustomerNextMonth =
									custProdTargetNextMonth.getTargetSales();
							
							String primaryUom = product.getProdUom1();
							Double primaryUomRate=0.0;
							Double priceUomRate=0.0;
							for(Integer i=0; i<prodUoms.size(); i++) {
								if(primaryUom.trim().equals(prodUoms.get(i).getUomCode())) {
									primaryUomRate = prodUoms.get(i).getConversionRate();
								}
								if(custProd.getPriceUom().trim().equals(
										prodUoms.get(i).getUomCode())) {
									priceUomRate = prodUoms.get(i).getConversionRate();
								}
							}
							
							targetCustomerNextMonth =
									(long)((double)targetCustomerNextMonth
									* primaryUomRate
									/ priceUomRate);
						}		
				}
				inputProduct.setTargetCustomerNextMonth(
						targetCustomerNextMonth);
				
				List<CustInvoice> custInvoices =
						custInvoiceService.
							getByCompanyCustidProductcode(
									company, custId,
									productCode);
				inputProduct.setCustInvoices(custInvoices);
				//end of cmob required data
*/				
				inputProducts.add(inputProduct);
			}
			
		}
		
		return inputProducts;
	}
	
	private String getMonthNameOracle(int m) {
		String mName = "";
		if(m==1) {mName= "JAN";}
		else if(m==2) {mName= "FEB";}
		else if(m==3) {mName= "MAR";}
		else if(m==4) {mName= "APR";}
		else if(m==5) {mName= "MAY";}
		else if(m==6) {mName= "JUN";}
		else if(m==7) {mName= "JUL";}
		else if(m==8) {mName= "AUG";}
		else if(m==9) {mName= "SEP";}
		else if(m==10) {mName= "OCT";}
		else if(m==11) {mName= "NOV";}
		else if(m==12) {mName= "DEC";}
		return mName;
	}
	
	private String getMonthName(int m) {
		String mName = "";
		if(m==1) {mName= "Januari";}
		else if(m==2) {mName= "Pebruari";}
		else if(m==3) {mName= "Maret";}
		else if(m==4) {mName= "April";}
		else if(m==5) {mName= "Mei";}
		else if(m==6) {mName= "Juni";}
		else if(m==7) {mName= "Juli";}
		else if(m==8) {mName= "Agustus";}
		else if(m==9) {mName= "September";}
		else if(m==10) {mName= "Oktober";}
		else if(m==11) {mName= "November";}
		else if(m==12) {mName= "Desember";}
		return mName;
	}
	
	private String formatText(Long value) {
		String text = "0";
		NumberFormat usFormat = NumberFormat.getNumberInstance(Locale.US);
		text = usFormat.format(value);
		return text;
	}

}
