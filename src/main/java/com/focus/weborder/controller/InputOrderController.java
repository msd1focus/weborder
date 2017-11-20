package com.focus.weborder.controller;

import java.sql.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.focus.weborder.services.customer.Customer;
import com.focus.weborder.services.customer.CustomerService;
import com.focus.weborder.services.custprod.CustProd;
import com.focus.weborder.services.custprod.CustProdService;
import com.focus.weborder.services.custshipto.CustShipTo;
import com.focus.weborder.services.custshipto.CustShipToService;
import com.focus.weborder.services.listmobil.ListMobil;
import com.focus.weborder.services.listmobil.ListMobilService;
import com.focus.weborder.services.order.Order;
import com.focus.weborder.services.order.OrderService;
import com.focus.weborder.services.orderdetail.OrderDetail;
import com.focus.weborder.services.orderdetail.OrderDetailService;
import com.focus.weborder.services.ordergrp.OrderGrp;
import com.focus.weborder.services.ordergrp.OrderGrpService;
import com.focus.weborder.services.product.Product;
import com.focus.weborder.services.product.ProductService;
import com.focus.weborder.services.produom.ProdUom;
import com.focus.weborder.services.produom.ProdUomService;
import com.focus.weborder.types.InputWebOrder;
import com.focus.weborder.types.InputOrder;
import com.focus.weborder.types.InputProduct;

@Controller
public class InputOrderController {

	@Autowired
	private CustomerService customerService;
	
	@Autowired
	private CustProdService custProdService;
	
	@Autowired
	private ProductService productService;
	
	@Autowired
	private ProdUomService prodUomService;
	
	@Autowired
	private OrderGrpService orderGrpService;
	
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private OrderDetailService orderDetailService;
	
	@Autowired
	private ListMobilService listMobilService;

	@Autowired
	private CustShipToService custShipToService;
	
	@RequestMapping(value="/order", method=RequestMethod.GET)
    public String order(Model model){
		
		String company = "FDI";
		Long custId = (long)4112;
		
		Calendar c = Calendar.getInstance();
		Integer year = c.get(Calendar.YEAR);
		Integer month = c.get(Calendar.MONTH) + 1;
		String monthName = getMonthName(month);
		
		Customer customer = customerService.getCustomer(company, custId);
		OrderGrp orderGrp = orderGrpService.getOrderGrpDraft(company, custId);
		List<CustShipTo> custShipTo = custShipToService.getCustShipTo(company, custId);
		List<ListMobil> listMobils = listMobilService.getListMobils();
		List<String> expedisis = orderService.getExpedisiByCompanyCustid(company, custId);
		
		List<Order> orders = new ArrayList<>();
		Order order1 = null;
		Order order2 = null;
		Order order3 = null;
		Order order4 = null;
		Order order5 = null;
		
		Long poNumber1 = (long)1;
		Long poNumber2 = (long)2;
		Long poNumber3 = (long)3;
		Long poNumber4 = (long)4;
		Long poNumber5 = (long)5;
		
		if(orderGrp==null) {		
			
			List<OrderGrp> orderGrpSubmitteds = 
					orderGrpService.getOrderGrpSubmitted(company, custId);
			
			if(orderGrpSubmitteds!=null) {
				OrderGrp orderGrpSubmittedLast = 
						orderGrpSubmitteds.get(0);
				List<Order> orderSubmittedLasts = 
						orderService.getByCompanyCustidGrpid(
								orderGrpSubmittedLast.getOrderGrpId(), custId, company); 
				if(orderSubmittedLasts!=null) {
					Order orderSubmittedLast = 
							orderSubmittedLasts.get(orderSubmittedLasts.size()-1);
					String poNumberLast =
							orderSubmittedLast.getPoNumber();
					String sPoNumberLast = poNumberLast.substring(8,11);
					System.out.println(sPoNumberLast);
					Long lPoNumberLast = Long.parseLong(sPoNumberLast);
					poNumber1 = lPoNumberLast + 1;
					poNumber2 = lPoNumberLast + 2;
					poNumber3 = lPoNumberLast + 3;
					poNumber4 = lPoNumberLast + 4;
					poNumber5 = lPoNumberLast + 5;
				}
						
			}
			
			orderGrp = new OrderGrp();
			orderGrp.setCompany(company);
			orderGrp.setCustId(custId);
			orderGrp.setOrderType("SO Lokal Non Food With CO");
			orderGrp.setOrderBy("Manual");
			orderGrp.setPeriodeOrder(monthName + " " + year);
			orderGrp.setJumlahOrder((long)0);
			orderGrp.setLeadTime((long) 0);
			orderGrp.setSisaLimit(customer.getCreditLimit());	
		}
		else {
			orders = orderService.getByCompanyCustidGrpid(
					orderGrp.getOrderGrpId(), custId, company);
		}
		
		if(orders.size()==0) {
			
			order1 = setDefaultOrder(
					customer, orderGrp, custShipTo,
					listMobils,
					poNumber1, year, month);
			order2 = setDefaultOrder(
					customer, orderGrp, custShipTo,
					listMobils,
					poNumber2, year, month);
			order3 = setDefaultOrder(
					customer, orderGrp, custShipTo,
					listMobils,
					poNumber3, year, month);
			order4 = setDefaultOrder(
					customer, orderGrp, custShipTo,
					listMobils,
					poNumber4, year, month);
			order5 = setDefaultOrder(
					customer, orderGrp, custShipTo,
					listMobils,
					poNumber5, year, month);
		}
		else if(orders.size()==1) {
			
			order1 = orders.get(0);
			order2 = setDefaultOrder(
					customer, orderGrp, custShipTo,
					listMobils,
					(long)002, year, month);
			order3 = setDefaultOrder(
					customer, orderGrp, custShipTo,
					listMobils,
					(long)003, year, month);
			order4 = setDefaultOrder(
					customer, orderGrp, custShipTo,
					listMobils,
					(long)004, year, month);
			order5 = setDefaultOrder(
					customer, orderGrp, custShipTo,
					listMobils,
					(long)005, year, month);
		}
		else if(orders.size()==2) {
			
			order1 = orders.get(0);
			order2 = orders.get(1);
			order3 = setDefaultOrder(
					customer, orderGrp, custShipTo,
					listMobils,
					(long)003, year, month);
			order4 = setDefaultOrder(
					customer, orderGrp, custShipTo,
					listMobils,
					(long)004, year, month);
			order5 = setDefaultOrder(
					customer, orderGrp, custShipTo,
					listMobils,
					(long)005, year, month);
		}
		else if(orders.size()==3) {
			
			order1 = orders.get(0);
			order2 = orders.get(1);
			order3 = orders.get(2);
			order4 = setDefaultOrder(
					customer, orderGrp, custShipTo,
					listMobils,
					(long)004, year, month);
			order5 = setDefaultOrder(
					customer, orderGrp, custShipTo,
					listMobils,
					(long)005, year, month);
		}
		else if(orders.size()==4) {
			
			order1 = orders.get(0);
			order2 = orders.get(1);
			order3 = orders.get(2);
			order4 = orders.get(3);
			order5 = setDefaultOrder(
					customer, orderGrp, custShipTo,
					listMobils,
					(long)005, year, month);
		}
		else if(orders.size()==5) {
			order1 = orders.get(0);
			order2 = orders.get(1);
			order3 = orders.get(2);
			order4 = orders.get(3);
			order5 = orders.get(4);
		}
		
		InputOrder inputOrder = new InputOrder();
		inputOrder.setOrderGrp(orderGrp);
		inputOrder.setOrder1(order1);
		inputOrder.setOrder2(order2);
		inputOrder.setOrder3(order3);
		inputOrder.setOrder4(order4);
		inputOrder.setOrder5(order5);
		
		List<String> periodes = new ArrayList<>();
		periodes.add(monthName + " " + year);
		if(month==12) {
			month = 1;
			year += 1;
		}
		else {
			month += 1;
		}
		monthName = getMonthName(month);
		periodes.add( monthName + " " + year);
		
		String minOrderDate = getMinDate(orderGrp.getPeriodeOrder());
		String maxOrderDate = getMaxDate(orderGrp.getPeriodeOrder());
		
		List<Integer> jumlahOrders = new ArrayList<>();
		jumlahOrders.add(1);
		jumlahOrders.add(2);
		jumlahOrders.add(3);
		jumlahOrders.add(4);
		jumlahOrders.add(5);
		
		List<String> orderTypes = new ArrayList<>();
		orderTypes.add("SO Lokal Food With CO");
		orderTypes.add("SO Lokal Non Food With CO");
		orderTypes.add("SO Lokal Food With CO - DP");
		orderTypes.add("SO Lokal Non Food With CO - DP");
		
		List<InputProduct> inputProducts = new ArrayList<>();
		List<CustProd> custProds = custProdService.getCustProd(
				company, custId);
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
				
				OrderDetail orderDetail1 = 
						orderDetailService.getByOrderidProductcode(
								order1.getOrderId(),
								custProd.getProductCode());
				if(orderDetail1!=null) {
					inputProduct.setOrderQty1(orderDetail1.getJumlah());
				}
				else {

					inputProduct.setOrderQty1((long)0);
				}
				
				OrderDetail orderDetail2 = 
						orderDetailService.getByOrderidProductcode(
								order2.getOrderId(),
								custProd.getProductCode());
				if(orderDetail2!=null) {
					inputProduct.setOrderQty2(orderDetail2.getJumlah());
				}
				else {

					inputProduct.setOrderQty2((long)0);
				}
				
				OrderDetail orderDetail3 = 
						orderDetailService.getByOrderidProductcode(
								order3.getOrderId(),
								custProd.getProductCode());
				if(orderDetail3!=null) {
					inputProduct.setOrderQty3(orderDetail3.getJumlah());
				}
				else {

					inputProduct.setOrderQty3((long)0);
				}
				
				OrderDetail orderDetail4 = 
						orderDetailService.getByOrderidProductcode(
								order4.getOrderId(),
								custProd.getProductCode());
				if(orderDetail4!=null) {
					inputProduct.setOrderQty4(orderDetail4.getJumlah());
				}
				else {

					inputProduct.setOrderQty4((long)0);
				}
				
				OrderDetail orderDetail5 = 
						orderDetailService.getByOrderidProductcode(
								order5.getOrderId(),
								custProd.getProductCode());
				if(orderDetail5!=null) {
					inputProduct.setOrderQty5(orderDetail5.getJumlah());
				}
				else {

					inputProduct.setOrderQty5((long)0);
				}
				inputProducts.add(inputProduct);
			}
			
		}
		
		InputWebOrder inputWebOrder = new InputWebOrder();
		inputWebOrder.setCustomer(customer);
		inputWebOrder.setInputOrder(inputOrder);
		inputWebOrder.setInputProducts(inputProducts);

		model.addAttribute("minOrderDate", minOrderDate);
		model.addAttribute("maxOrderDate", maxOrderDate);
		model.addAttribute("orderTypes", orderTypes);
		model.addAttribute("periodes", periodes);
		model.addAttribute("productQty", inputProducts.size());
		model.addAttribute("custShipTo", custShipTo);
		model.addAttribute("jumlahOrders", jumlahOrders);
		model.addAttribute("listMobils", listMobils);
		model.addAttribute("expedisis", expedisis);
		model.addAttribute("inputWebOrder", inputWebOrder);
        return "order";
    }
	
	@RequestMapping(value="/order", method=RequestMethod.POST)
	public String inputOrderRequest(@ModelAttribute InputWebOrder inputWebOrder, 
	        @RequestParam(value="action", required=true) String action) {
		
		String company = inputWebOrder.getCustomer().getCompany();
		Long custId = inputWebOrder.getCustomer().getCustId();
		
		String status = "UNKNOWN";
		String ebsSubmitStatus = null;
	    if (action.equals("Submit")) {      
	    	status = "SUBMITTED";
	    	ebsSubmitStatus = "R";
	    	
	    }
	    else if (action.equals("Save")) {
	    	status = "DRAFT";
	    }
		
		OrderGrp orderGrp = inputWebOrder.getInputOrder().getOrderGrp();
		orderGrp.setCompany(company);
		orderGrp.setCustId(custId);
    	orderGrp.setSubmitStatus(status);
    	orderGrpService.updateOrderGrp(orderGrp);
    	Long orderGroupId = orderGrp.getOrderGrpId();
    	
    	Long orderGrpId = orderGrp.getOrderGrpId();
	    Long jumlahOrder = orderGrp.getJumlahOrder();
	    String periodeOrder = orderGrp.getPeriodeOrder();
	    
	    List<Order> orders = orderService.getByCompanyCustidGrpid(
	    		orderGroupId, custId, company);
	    
	    Order order1 = null;
		Order order2 = null;
		Order order3 = null;
		Order order4 = null;
		Order order5 = null;
		
		if(orders.size()>0) {
			order1 = orders.get(0);
			if(orders.size()>1) {
				order2 = orders.get(1);
				if(orders.size()>2) {
					order3 = orders.get(2);
					if(orders.size()>3) {
						order4 = orders.get(3);
						if(orders.size()>4) {
							order5 = orders.get(4);
						}
					}
				}
			}
		}
	    
		Long orderId1 = null;
		Long orderId2 = null;
		Long orderId3 = null;
		Long orderId4 = null;
		Long orderId5 = null;
		
    	if(jumlahOrder>0) {
    		
    		Order o1 = inputWebOrder.getInputOrder().getOrder1();
        	o1.setOrderGrpId(orderGrpId);
        	o1.setPeriode(periodeOrder);
        	o1.setEbsSubmitStatus(ebsSubmitStatus);
        	orderId1 = upsertOrder(o1);
        	
        	if(jumlahOrder>1) {
        		
        		Order o2 = inputWebOrder.getInputOrder().getOrder2();
            	o2.setOrderGrpId(orderGrpId);
            	o2.setPeriode(periodeOrder);
            	o2.setEbsSubmitStatus(ebsSubmitStatus);
            	orderId2 = upsertOrder(o2);
            	
            	if(jumlahOrder>2) {
                	
                	Order o3 = inputWebOrder.getInputOrder().getOrder3();
                	o3.setOrderGrpId(orderGrpId);
                	o3.setPeriode(periodeOrder);
                	o3.setEbsSubmitStatus(ebsSubmitStatus);
                	orderId3 = upsertOrder(o3);
            		
            		if(jumlahOrder>3) {
            	    	
            	    	Order o4 = inputWebOrder.getInputOrder().getOrder4();
            	    	o4.setOrderGrpId(orderGrpId);
                    	o4.setPeriode(periodeOrder);
                    	o4.setEbsSubmitStatus(ebsSubmitStatus);
                    	orderId4 = upsertOrder(o4);
            			
            			if(jumlahOrder>4) {
            		    	
            		    	Order o5 = inputWebOrder.getInputOrder().getOrder5();
            		    	o5.setOrderGrpId(orderGrpId);
                        	o5.setPeriode(periodeOrder);
                        	o5.setEbsSubmitStatus(ebsSubmitStatus);
                        	orderId5 = upsertOrder(o5);
            				
            			}
            		}
            	}
        	}
    		
    	}
    	
    	for(InputProduct inputProduct: inputWebOrder.getInputProducts()) {
    		
    		String productCode = inputProduct.getProduct().getProductCode();
    		String productDesc = inputProduct.getProduct().getProductName();
    		String uom = inputProduct.getCustProd().getPriceUom();
    		Long unitPrice = inputProduct.getCustProd().getPrice();
    		Long orderQty1 = inputProduct.getOrderQty1();
    		Long orderQty2 = inputProduct.getOrderQty2();
    		Long orderQty3 = inputProduct.getOrderQty3();
    		Long orderQty4 = inputProduct.getOrderQty4();
    		Long orderQty5 = inputProduct.getOrderQty5();
    		

    		OrderDetail orderDetail1 = null;
    		OrderDetail orderDetail2 = null;
			OrderDetail orderDetail3 = null;
			OrderDetail orderDetail4 = null;
			OrderDetail orderDetail5 = null;
    		
    		if(orderId1!=null) {
    			orderDetail1 = orderDetailService.getByOrderidProductcode(
						orderId1, productCode);
    		}

    		if(orderId2!=null) {		
	    		orderDetail2 = 
						orderDetailService.getByOrderidProductcode(
								orderId2, productCode);
    		}

    		if(orderId3!=null) {
	    		orderDetail3 = 
						orderDetailService.getByOrderidProductcode(
								orderId3, productCode);
    		}

    		if(orderId4!=null) {
	    		orderDetail4 = 
						orderDetailService.getByOrderidProductcode(
								orderId4, productCode);
    		}

    		if(orderId5!=null) {
	    		orderDetail5 = 
						orderDetailService.getByOrderidProductcode(
								orderId5, productCode);
    		}
    		
    		if(jumlahOrder<5) {
    			if(orderDetail5!=null) {
    				orderDetailService.deleteOrderDetail(orderDetail5.getOrderDetailId());
    				if(jumlahOrder<4) {
    					if(orderDetail4!=null) {
    	    				orderDetailService.deleteOrderDetail(orderDetail4.getOrderDetailId());
    						if(jumlahOrder<3) {
    							if(orderDetail3!=null) {
    			    				orderDetailService.deleteOrderDetail(orderDetail3.getOrderDetailId());
    								if(jumlahOrder<2) {
    									if(orderDetail2!=null) {
    					    				orderDetailService.deleteOrderDetail(orderDetail2.getOrderDetailId());
    										if(jumlahOrder<1) {
    											if(orderDetail1!=null) {
    							    				orderDetailService.deleteOrderDetail(orderDetail1.getOrderDetailId());
    											}
    										}
    									}
    								}
    							}
    						}
    					}
    				}
    			}
    		}
    		
    		if(jumlahOrder>0) {
    			
    			if(orderQty1>0) {
    				
    				if(orderDetail1==null) {
        				orderDetail1 = new OrderDetail();
        				orderDetail1.setOrderId(orderId1);
        			}
    				orderDetail1.setProductCode(productCode);
    				orderDetail1.setProductDesc(productDesc);
    				orderDetail1.setUom(uom);
    				orderDetail1.setJumlah(orderQty1);
    				orderDetail1.setUnitPrice(unitPrice);
    				orderDetail1.setTotalPrice(orderQty1*unitPrice);
            		orderDetailService.updateOrderDetail(orderDetail1);
    			}
    			else {
    				if(orderDetail1!=null) {
	        			orderDetailService.deleteOrderDetail(
	        					orderDetail1.getOrderDetailId());
	    			}
    				orderDetail1 = null;
    			}
        		
        		if(jumlahOrder>1) {
        			
        			
        			if(orderQty2>0) {

        				if(orderDetail2==null) {
        					orderDetail2 = new OrderDetail();
        					orderDetail2.setOrderId(orderId2);
            			}
        				orderDetail2.setProductCode(productCode);
        				orderDetail2.setProductDesc(productDesc);
        				orderDetail2.setUom(uom);
        				orderDetail2.setJumlah(orderQty2);
        				orderDetail2.setUnitPrice(unitPrice);
        				orderDetail2.setTotalPrice(orderQty2*unitPrice);
                		orderDetailService.updateOrderDetail(orderDetail2);
        			}
        			else {
        				if(orderDetail2!=null) {
    	        			orderDetailService.deleteOrderDetail(
    	        					orderDetail2.getOrderDetailId());
    	    			}
        				orderDetail2 = null;
        			}
            		
            		if(jumlahOrder>2) {
            			
            			
            			if(orderQty3>0) {

	            			if(orderDetail3==null) {
	            				orderDetail3 = new OrderDetail();
	            				orderDetail3.setOrderId(orderId3);
	            			}
	            			orderDetail3.setProductCode(productCode);
	            			orderDetail3.setProductDesc(productDesc);
	            			orderDetail3.setUom(uom);
	            			orderDetail3.setJumlah(orderQty3);
	            			orderDetail3.setUnitPrice(unitPrice);
	            			orderDetail3.setTotalPrice(orderQty3*unitPrice);
	                		orderDetailService.updateOrderDetail(orderDetail3);
            			}
            			else {
            				if(orderDetail3!=null) {
        	        			orderDetailService.deleteOrderDetail(
        	        					orderDetail3.getOrderDetailId());
        	    			}
            				orderDetail3 = null;
            			}
                		
                		if(jumlahOrder>3) {
                			
                			
                			if(orderQty4>0) {

	                			if(orderDetail4==null) {
	                				orderDetail4 = new OrderDetail();
	                				orderDetail4.setOrderId(orderId4);
	                			}
	                			orderDetail4.setProductCode(productCode);
	                			orderDetail4.setProductDesc(productDesc);
	                			orderDetail4.setUom(uom);
	                			orderDetail4.setJumlah(orderQty4);
	                			orderDetail4.setUnitPrice(unitPrice);
	                			orderDetail4.setTotalPrice(orderQty4*unitPrice);
	                    		orderDetailService.updateOrderDetail(orderDetail4);
                			}
                			else {
                				if(orderDetail4!=null) {
            	        			orderDetailService.deleteOrderDetail(
            	    -    					orderDetail4.getOrderDetailId());
            	    			}
                				orderDetail4 = null;
                			}
                    		
                    		if(jumlahOrder>4) {
                    			
                    			
                    			if(orderQty5>0) {
                    				
	                    			if(orderDetail5==null) {
	                    				orderDetail5 = new OrderDetail();
	                    				orderDetail5.setOrderId(orderId5);
	                    			}
	                    			orderDetail5.setProductCode(productCode);
	                    			orderDetail5.setProductDesc(productDesc);
	                    			orderDetail5.setUom(uom);
	                    			orderDetail5.setJumlah(orderQty5);
	                    			orderDetail5.setUnitPrice(unitPrice);
	                    			orderDetail5.setTotalPrice(orderQty5*unitPrice);
	                        		orderDetailService.updateOrderDetail(orderDetail5);
                    			}
                    			else {
                    				if(orderDetail5!=null) {
                	        			orderDetailService.deleteOrderDetail(
                	        					orderDetail5.getOrderDetailId());
                	    			}
                    				orderDetail5 = null;
                    			}
                    			
                    		}
                			
                		}
            			
            		}
        			
        		}
    			
    		}
    	}
    	
    	if(jumlahOrder<5) {
			if(order5!=null) {
				orderService.deleteOrder(order5.getOrderId());
				if(jumlahOrder<4) {
					if(order4!=null) {
						orderService.deleteOrder(order4.getOrderId());
						if(jumlahOrder<3) {
							if(order3!=null) {
								orderService.deleteOrder(order3.getOrderId());
								if(jumlahOrder<2) {
									if(order2!=null) {
										orderService.deleteOrder(order2.getOrderId());
										if(jumlahOrder<1) {
											if(order1!=null) {
												orderService.deleteOrder(order1.getOrderId());
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
    	
	    return "home";
	}
	
	private Order setDefaultOrder(
			Customer customer,
			OrderGrp orderGrp,
			List<CustShipTo> custShipTo,
			List<ListMobil> listMobils,
			Long poNumber,
			Integer year,
			Integer month
			) {
		String po = "000";
		if(poNumber<10) {
			po = "00" + poNumber;
		}
		else if(poNumber>=10 && poNumber<100) {
			po = "0" + poNumber;
		}
		else if(poNumber>=100 && poNumber<1000){
			po = poNumber.toString();
		}
		else {
			po = "---";
		}
		Order order = new Order();
		order.setCompany(orderGrp.getCompany());
		order.setCustId(orderGrp.getCustId());
		order.setPoNumber("PO" + year + month 
				+ po + "/" 
				+ customer.getCustCompanyId());
		order.setOrderDate(
				Date.valueOf(
					getMinDate(orderGrp.getPeriodeOrder())));
		order.setShipTo(
				custShipTo.get(0).getShipToId().toString());
		order.setJenisMobil(
				listMobils.get(0).getMobilDesc().toString());
		order.setTotalPrice((long)0);
		Long tonaseMobil = (listMobils.get(0).getMobilPanjang()
				*listMobils.get(0).getMobilLebar()
				*listMobils.get(0).getMobilTinggi())
				/1000000000;
		order.setTonaseMobil(tonaseMobil);
		order.setTonaseOrder((long)0);
		order.setSelisihTonase(tonaseMobil);
		
		return order;
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
	
	private Long upsertOrder(Order order) {
		
		Long orderId = order.getOrderId();
		
		Boolean isOrderExist = false;
		if(orderId!=null) {
			Order o = orderService.getByOrderid(orderId);
			if(o!=null) {
				isOrderExist = true;
			}
		}
		
		if(isOrderExist) {
			orderService.updateOrder(order);
		}
		else {
			orderService.addOrder(order);
			orderId = order.getOrderId();
		}
		
		return orderId;
		
	}
	
	private String getCurrentDate() {
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Calendar cal = Calendar.getInstance();
	    return dateFormat.format(cal.getTime());
	}
	
	private String getMinDate() {
		return getCurrentDate();
	}
	
	private String getMinDate(String periodeOrder) {
		String minDate = getMinDate();
		
		String[] p = periodeOrder.split(" ");
	    String monthName = p[0];
	    String year = p[1];
		if(monthName.equals("Januari")){
			minDate = year + "-01-01";
	    }
	    else if(monthName.equals("Pebruari")){
	    	minDate = year + "-02-01";
	    }
	    else if(monthName.equals("Maret")){
	    	minDate = year + "-03-01";
	    }
	    else if(monthName.equals("April")){
	    	minDate = year + "-04-01";
	    }
	    else if(monthName.equals("Mei")){
	    	minDate = year + "-05-01";
	    }
	    else if(monthName.equals("Juni")){
	    	minDate = year + "-06-01";
	    }
	    else if(monthName.equals("Juli")){
	    	minDate = year + "-07-01";
	    }
	    else if(monthName.equals("Agustus")){
	    	minDate = year + "-08-01";
	    }
	    else if(monthName.equals("September")){
	    	minDate = year + "-09-01";
	    }
	    else if(monthName.equals("Oktober")){
	    	minDate = year + "-10-01";
	    }
	    else if(monthName.equals("November")){
	    	minDate = year + "-11-01";
	    }
	    else if(monthName.equals("Desember")){
	    	minDate = year + "-12-01";
	    } 
		return minDate;
	}
	
	private String getMaxDate(String periodeOrder) {
		String maxDate = "2100-01-01";
		
		String[] p = periodeOrder.split(" ");
	    String monthName = p[0];
	    String year = p[1];
	    
		if(monthName.equals("Januari")){
	    	maxDate = year + "-01-31";
	    }
	    else if(monthName.equals("Pebruari")){
	    	maxDate = year + "-02-28";
	    }
	    else if(monthName.equals("Maret")){
	    	maxDate = year + "-03-31";
	    }
	    else if(monthName.equals("April")){
	    	maxDate = year + "-04-30";
	    }
	    else if(monthName.equals("Mei")){
	    	maxDate = year + "-05-31";
	    }
	    else if(monthName.equals("Juni")){
	    	maxDate = year + "-06-30";
	    }
	    else if(monthName.equals("Juli")){
	    	maxDate = year + "-07-31";
	    }
	    else if(monthName.equals("Agustus")){
	    	maxDate = year + "-08-31";
	    }
	    else if(monthName.equals("September")){
	    	maxDate = year + "-09-30";
	    }
	    else if(monthName.equals("Oktober")){
	    	maxDate = year + "-10-31";
	    }
	    else if(monthName.equals("November")){
	    	maxDate = year + "-11-30";
	    }
	    else if(monthName.equals("Desember")){
	    	maxDate = year + "-12-31";
	    } 
		
		return maxDate;
	}

}
