package com.focus.weborder.controller;

import java.sql.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.focus.weborder.ebs.creditlimit.CreditLimitService;
import com.focus.weborder.security.model.User;
import com.focus.weborder.security.service.UserService;
import com.focus.weborder.services.custmobil.CustMobil;
import com.focus.weborder.services.custmobil.CustMobilService;
import com.focus.weborder.services.customer.Customer;
import com.focus.weborder.services.customer.CustomerService;
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
import com.focus.weborder.types.InputWebOrder;
import com.focus.weborder.types.CreditLimit;
import com.focus.weborder.types.InputOrder;
import com.focus.weborder.types.InputProduct;

@Controller
public class InputOrderController 
	{

	@Autowired
	private CustomerService customerService;
	
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
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private CustMobilService custMobilService;
	
	@Autowired
	private CreditLimitService creditLimitService;

	@InitBinder
	public void initBinder(WebDataBinder binder) {
	    binder.setAutoGrowCollectionLimit(100000);
	}
	   
	@RequestMapping(value="/", method=RequestMethod.GET)
    public ModelAndView order(
    		Model model,
    		HttpServletRequest req){

		ModelAndView modelAndView = new ModelAndView();
		
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		
		if (auth != null) {

			User user = userService.findUserByUsername(auth.getName());
			
			Calendar c = Calendar.getInstance();
			Integer year = c.get(Calendar.YEAR);
			Integer month = c.get(Calendar.MONTH) + 1;
			
			System.out.println();
			System.out.print(
					"[WebOrder-InputOrder]" 
					+ year 
					+ "/"
					+ month
					+ "/"
					+ c.get(Calendar.DAY_OF_MONTH)
					+ " "
					+ c.get(Calendar.HOUR)
					+ ":"
					+ c.get(Calendar.MINUTE)
					+ ":"
					+ c.get(Calendar.SECOND)
					+ "."
					+ c.get(Calendar.MILLISECOND)
					+ " by " 
					+ auth.getName()
					+ " with role: "
					+ auth.getAuthorities());
			
			Boolean isAdmin = false;
			for(GrantedAuthority ga: auth.getAuthorities()) {
				String role = ga.getAuthority();
				if(role != null) {
					if(role.equals("ADMIN")) {
						isAdmin = true;
					}
				}
			}
			
			if(isAdmin) {
				user = new User();
				modelAndView.addObject("user", user);
				modelAndView.setViewName("registration");
				return modelAndView;
			}
			else {
				
				System.out.print("; user: " + user.getName());
				System.out.print("; custid: " + user.getCustId());
				

				Integer maxInactiveInterval = 0;
				HttpSession session = req.getSession();
				maxInactiveInterval = session.getMaxInactiveInterval();
				
				String company = user.getCompany();
				Long custId = user.getCustId();
				
				String monthName = getMonthName(month);
				
				List<String> periodes = new ArrayList<>();
				periodes.add(monthName + " " + year);
				
				Integer monthNext = month;
				Integer yearNext = year;	
		
				if(month==12) {
					monthNext = 1;
					yearNext += 1;
				}
				else {
					monthNext += 1;
				}
				
				String monthNameNext = getMonthName(monthNext);
				periodes.add(monthNameNext + " " + yearNext);
				
				Integer monthPeriode = month;
				Integer yearPeriode = year;
				
				Customer customer =
						customerService.getCustomer(company, custId);
				CreditLimit creditLimits =
						creditLimitService.getCreditLimit(company, custId);
				List<OrderGrp> orderGrps =
						orderGrpService.getOrderGrpDraft(company, custId);
				List<CustShipTo> custShipTo =
						custShipToService.getCustShipTo(company, custId);
				List<String> expedisis =
						orderService.getExpedisiByCompanyCustid(company, custId);
				List<CustMobil> custMobils =
						custMobilService.getByCompanyCustid(company, custId);
				List<ListMobil> listMobils = new ArrayList<>();
				for(CustMobil cm: custMobils) {
					if(cm.getMobilId()!=null) {
						ListMobil lm = 
								listMobilService.getById(cm.getMobilId());
						if(lm!=null) {
							listMobils.add(lm);
						}
					}
				}

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
				
				Long poNumber1CurrentMonth = (long)1;
				Long poNumber2CurrentMonth = (long)2;
				Long poNumber3CurrentMonth = (long)3;
				Long poNumber4CurrentMonth = (long)4;
				Long poNumber5CurrentMonth = (long)5;
				
				Long poNumber1NextMonth = (long)1;
				Long poNumber2NextMonth = (long)2;
				Long poNumber3NextMonth = (long)3;
				Long poNumber4NextMonth = (long)4;
				Long poNumber5NextMonth = (long)5;

				OrderGrp orderGrp = null;
				if(orderGrps!=null) {
					if(orderGrps.size()>0) {
						orderGrp = orderGrps.get(0);
						String pOracle = orderGrp.getPeriodeOrder();
						String[] p = getPeriode(pOracle).split(" ");
						monthPeriode = getMonthValue(p[0]);
						yearPeriode = Integer.parseInt(p[1]);
						orderGrp.setPeriodeOrder(getPeriode(pOracle));
					}
				}
				
				Boolean isForcePeriodeCurrent = false;
				if(yearPeriode<year) {
					isForcePeriodeCurrent = true;
				}
				else {
					if(monthPeriode<month) {
						isForcePeriodeCurrent = true;
					}
				}
				
				if(orderGrp==null) {		
					
					List<OrderGrp> orderGrpSubmittedsCurrentMonth = 
							orderGrpService.getOrderGrpSubmitted(
									company, custId, getPeriodeOracle(periodes.get(0)));
					
					if(orderGrpSubmittedsCurrentMonth!=null) {
						if(orderGrpSubmittedsCurrentMonth.size()>0) {
							
							for(Integer i=0; i<orderGrpSubmittedsCurrentMonth.size(); i++) {
									
								OrderGrp orderGrpSubmittedLast = 
										orderGrpSubmittedsCurrentMonth.get(i);
								List<Order> orderSubmittedLasts = 
										orderService.getByCompanyCustidGrpid(
												orderGrpSubmittedLast.getOrderGrpId(),
												custId, company); 
								if(orderSubmittedLasts!=null) {
									if(orderSubmittedLasts.size()>0) {
										Order orderSubmittedLast = 
												orderSubmittedLasts.get(
														orderSubmittedLasts.size()-1);
										String poNumberLast =
												orderSubmittedLast.getPoNumber();
										String sPoNumberLast = poNumberLast.substring(8,11);
										Long lPoNumberLast = Long.parseLong(sPoNumberLast);
										poNumber1CurrentMonth = lPoNumberLast + 1;
										poNumber2CurrentMonth = lPoNumberLast + 2;
										poNumber3CurrentMonth = lPoNumberLast + 3;
										poNumber4CurrentMonth = lPoNumberLast + 4;
										poNumber5CurrentMonth = lPoNumberLast + 5;
										
										poNumber1 = poNumber1CurrentMonth;
										poNumber2 = poNumber2CurrentMonth;
										poNumber3 = poNumber3CurrentMonth;
										poNumber4 = poNumber4CurrentMonth;
										poNumber5 = poNumber5CurrentMonth; 
										
										break;
									}
									else {
										orderGrpService.deleteOrderGrp(orderGrpSubmittedLast.getOrderGrpId());
									}
								}
								else {
									orderGrpService.deleteOrderGrp(orderGrpSubmittedLast.getOrderGrpId());
								}
							}
						}						
					}
					
					List<OrderGrp> orderGrpSubmittedsNextMonth = 
							orderGrpService.getOrderGrpSubmitted(company, custId, getPeriodeOracle(periodes.get(1)));
					
					if(orderGrpSubmittedsNextMonth!=null) {
						if(orderGrpSubmittedsNextMonth.size()>0) {
							
							for(Integer i=0; i<orderGrpSubmittedsNextMonth.size(); i++) {
								
								OrderGrp orderGrpSubmittedLast = 
										orderGrpSubmittedsNextMonth.get(i);
								List<Order> orderSubmittedLasts = 
										orderService.getByCompanyCustidGrpid(
												orderGrpSubmittedLast.getOrderGrpId(),
												custId, company); 
								if(orderSubmittedLasts!=null) {
									if(orderSubmittedLasts.size()>0) {
										Order orderSubmittedLast = 
												orderSubmittedLasts.get(
														orderSubmittedLasts.size()-1);
										String poNumberLast =
												orderSubmittedLast.getPoNumber();
										String sPoNumberLast = poNumberLast.substring(8,11);
										Long lPoNumberLast = Long.parseLong(sPoNumberLast);
										poNumber1NextMonth = lPoNumberLast + 1;
										poNumber2NextMonth = lPoNumberLast + 2;
										poNumber3NextMonth = lPoNumberLast + 3;
										poNumber4NextMonth = lPoNumberLast + 4;
										poNumber5NextMonth = lPoNumberLast + 5;
										
										break;
									}
									else {
										orderGrpService.deleteOrderGrp(orderGrpSubmittedLast.getOrderGrpId());
									}
								}
								else {
									orderGrpService.deleteOrderGrp(orderGrpSubmittedLast.getOrderGrpId());
								}
							}
						}						
					}
					
					orderGrp = new OrderGrp();
					orderGrp.setCompany(company);
					orderGrp.setCustId(custId);
					orderGrp.setOrderType("SO Lokal Non Food With CO");
					orderGrp.setOrderBy("Manual");
					orderGrp.setPeriodeOrder(monthName + " " + year);
					orderGrp.setJumlahOrder((long)0);
					orderGrp.setLeadTime((long) 1);
					Double creditLimit = (double) 0;
					if(creditLimits!=null) {
						creditLimit = creditLimits.getSisaLimit();
					}
					/* change to direct ebs web service
					 * if(customer!=null) {
						if(customer.getCreditLimit()!=null) {
							creditLimit = customer.getCreditLimit();	
						}
					}*/
					orderGrp.setSisaLimit(creditLimit);
				}
				else {
					
					System.out.print("; orderGrpId: " + orderGrp.getOrderGrpId());
					
					orders = orderService.getByCompanyCustidGrpid(
							orderGrp.getOrderGrpId(), custId, company);
					
					for(Order o: orders) {
						String pOracle = o.getPeriode();
						String[] p = getPeriode(pOracle).split(" ");
						monthPeriode = getMonthValue(p[0]);
						yearPeriode = Integer.parseInt(p[1]);
						if(yearPeriode<year) {
							isForcePeriodeCurrent = true;
						}
						else {
							if(monthPeriode<month) {
								isForcePeriodeCurrent = true;
							}
						}
					}
					
					if(isForcePeriodeCurrent) {
						
						orderGrp.setPeriodeOrder(periodes.get(0));
						
						List<OrderGrp> orderGrpSubmittedsCurrentMonth = 
								orderGrpService.getOrderGrpSubmitted(company, custId, getPeriodeOracle(periodes.get(0)));
						
						if(orderGrpSubmittedsCurrentMonth!=null) {
							if(orderGrpSubmittedsCurrentMonth.size()>0) {
								
								for(Integer i=0; i<orderGrpSubmittedsCurrentMonth.size(); i++) {
									
									OrderGrp orderGrpSubmittedLast = 
											orderGrpSubmittedsCurrentMonth.get(i);
									List<Order> orderSubmittedLasts = 
											orderService.getByCompanyCustidGrpid(
													orderGrpSubmittedLast.getOrderGrpId(),
													custId, company); 
									if(orderSubmittedLasts!=null) {
										if(orderSubmittedLasts.size()>0) {
											Order orderSubmittedLast = 
													orderSubmittedLasts.get(
															orderSubmittedLasts.size()-1);
											String poNumberLast =
													orderSubmittedLast.getPoNumber();
											String sPoNumberLast = poNumberLast.substring(8,11);
											Long lPoNumberLast = Long.parseLong(sPoNumberLast);
											poNumber1CurrentMonth = lPoNumberLast + 1;
											poNumber2CurrentMonth = lPoNumberLast + 2;
											poNumber3CurrentMonth = lPoNumberLast + 3;
											poNumber4CurrentMonth = lPoNumberLast + 4;
											poNumber5CurrentMonth = lPoNumberLast + 5;
											
											poNumber1 = poNumber1CurrentMonth;
											poNumber2 = poNumber2CurrentMonth;
											poNumber3 = poNumber3CurrentMonth;
											poNumber4 = poNumber4CurrentMonth;
											poNumber5 = poNumber5CurrentMonth; 
											
											break;
										}
										else {
											orderGrpService.deleteOrderGrp(orderGrpSubmittedLast.getOrderGrpId());
										}
									}
									else {
										orderGrpService.deleteOrderGrp(orderGrpSubmittedLast.getOrderGrpId());
									}
								}
							}						
						}
						
						List<OrderGrp> orderGrpSubmittedsNextMonth = 
								orderGrpService.getOrderGrpSubmitted(company, custId, getPeriodeOracle(periodes.get(1)));
						
						if(orderGrpSubmittedsNextMonth!=null) {
							if(orderGrpSubmittedsNextMonth.size()>0) {
								
								for(Integer i=0; i<orderGrpSubmittedsNextMonth.size(); i++) {
									
									OrderGrp orderGrpSubmittedLast = 
											orderGrpSubmittedsNextMonth.get(i);
									List<Order> orderSubmittedLasts = 
											orderService.getByCompanyCustidGrpid(
													orderGrpSubmittedLast.getOrderGrpId(),
													custId, company); 
									if(orderSubmittedLasts!=null) {
										if(orderSubmittedLasts.size()>0) {
											Order orderSubmittedLast = 
													orderSubmittedLasts.get(
															orderSubmittedLasts.size()-1);
											String poNumberLast =
													orderSubmittedLast.getPoNumber();
											String sPoNumberLast = poNumberLast.substring(8,11);
											Long lPoNumberLast = Long.parseLong(sPoNumberLast);
											poNumber1NextMonth = lPoNumberLast + 1;
											poNumber2NextMonth = lPoNumberLast + 2;
											poNumber3NextMonth = lPoNumberLast + 3;
											poNumber4NextMonth = lPoNumberLast + 4;
											poNumber5NextMonth = lPoNumberLast + 5;
											
											break;
										}
										else {
											orderGrpService.deleteOrderGrp(orderGrpSubmittedLast.getOrderGrpId());
										}
									}
									else {
										orderGrpService.deleteOrderGrp(orderGrpSubmittedLast.getOrderGrpId());
									}
								}
							}						
						}
					}
				}
				
				//System.out.print("; " + orders.size());
				
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
					if(!isForcePeriodeCurrent) {
						String pnLast = order1.getPoNumber();
						String spnLast = pnLast.substring(8,11);
						Long lpnLast = Long.parseLong(spnLast);
						poNumber1 = lpnLast;
						poNumber2 = lpnLast + 1;
						poNumber3 = lpnLast + 2;
						poNumber4 = lpnLast + 3;
						poNumber5 = lpnLast + 4;
						
						if(monthPeriode==month) {
							
							poNumber1CurrentMonth = poNumber1;
							poNumber2CurrentMonth = poNumber2;
							poNumber3CurrentMonth = poNumber3;
							poNumber4CurrentMonth = poNumber4;
							poNumber5CurrentMonth = poNumber5;
							
							List<OrderGrp> orderGrpSubmittedsNextMonth = 
									orderGrpService.getOrderGrpSubmitted(company, custId, getPeriodeOracle(periodes.get(1)));
							
							if(orderGrpSubmittedsNextMonth!=null) {
								if(orderGrpSubmittedsNextMonth.size()>0) {
									
									for(Integer i=0; i<orderGrpSubmittedsNextMonth.size(); i++) {
										
										OrderGrp orderGrpSubmittedLast = 
												orderGrpSubmittedsNextMonth.get(i);
										List<Order> orderSubmittedLasts = 
												orderService.getByCompanyCustidGrpid(
														orderGrpSubmittedLast.getOrderGrpId(),
														custId, company); 
										if(orderSubmittedLasts!=null) {
											if(orderSubmittedLasts.size()>0) {
												Order orderSubmittedLast = 
														orderSubmittedLasts.get(
																orderSubmittedLasts.size()-1);
												String poNumberLast =
														orderSubmittedLast.getPoNumber();
												String sPoNumberLast = poNumberLast.substring(8,11);
												Long lPoNumberLast = Long.parseLong(sPoNumberLast);
												poNumber1NextMonth = lPoNumberLast + 1;
												poNumber2NextMonth = lPoNumberLast + 2;
												poNumber3NextMonth = lPoNumberLast + 3;
												poNumber4NextMonth = lPoNumberLast + 4;
												poNumber5NextMonth = lPoNumberLast + 5;
												
												break;
											}
											else {
												orderGrpService.deleteOrderGrp(orderGrpSubmittedLast.getOrderGrpId());
											}
										}
										else {
											orderGrpService.deleteOrderGrp(orderGrpSubmittedLast.getOrderGrpId());
										}
									}
								}						
							}
							
						}
						else if(monthPeriode==monthNext){
							
							poNumber1NextMonth = poNumber1;
							poNumber2NextMonth = poNumber2;
							poNumber3NextMonth = poNumber3;
							poNumber4NextMonth = poNumber4;
							poNumber5NextMonth = poNumber5;
							
							List<OrderGrp> orderGrpSubmittedsCurrentMonth = 
									orderGrpService.getOrderGrpSubmitted(company, custId, getPeriodeOracle(periodes.get(0)));
							
							if(orderGrpSubmittedsCurrentMonth!=null) {
								if(orderGrpSubmittedsCurrentMonth.size()>0) {
									
									for(Integer i=0; i<orderGrpSubmittedsCurrentMonth.size(); i++) {

										OrderGrp orderGrpSubmittedLast = 
												orderGrpSubmittedsCurrentMonth.get(i);
										List<Order> orderSubmittedLasts = 
												orderService.getByCompanyCustidGrpid(
														orderGrpSubmittedLast.getOrderGrpId(),
														custId, company); 
										if(orderSubmittedLasts!=null) {
											if(orderSubmittedLasts.size()>0) {
												Order orderSubmittedLast = 
														orderSubmittedLasts.get(
																orderSubmittedLasts.size()-1);
												String poNumberLast =
														orderSubmittedLast.getPoNumber();
												String sPoNumberLast = poNumberLast.substring(8,11);
												Long lPoNumberLast = Long.parseLong(sPoNumberLast);
												poNumber1CurrentMonth = lPoNumberLast + 1;
												poNumber2CurrentMonth = lPoNumberLast + 2;
												poNumber3CurrentMonth = lPoNumberLast + 3;
												poNumber4CurrentMonth = lPoNumberLast + 4;
												poNumber5CurrentMonth = lPoNumberLast + 5;
												
												break;
											}
											else {
												orderGrpService.deleteOrderGrp(orderGrpSubmittedLast.getOrderGrpId());
											}
										}
										else {
											orderGrpService.deleteOrderGrp(orderGrpSubmittedLast.getOrderGrpId());
										}
									}
								}						
							}
						}
					}
					else {
						order1.setPoNumber(
								generatePoNumber(customer, year, month, poNumber1));
						order1.setPeriode(periodes.get(0));
						order1.setOrderDate(Date.valueOf(getMinDate()));
					}
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
				else if(orders.size()==2) {
					
					order1 = orders.get(0);
					order2 = orders.get(1);

					if(!isForcePeriodeCurrent) {
						String pnLast = order2.getPoNumber();
						String spnLast = pnLast.substring(8,11);
						Long lpnLast = Long.parseLong(spnLast);
						poNumber1 = lpnLast - 1;
						poNumber2 = lpnLast;
						poNumber3 = lpnLast + 1;
						poNumber4 = lpnLast + 2;
						poNumber5 = lpnLast + 3;
						
						if(monthPeriode==month) {
							
							poNumber1CurrentMonth = poNumber1;
							poNumber2CurrentMonth = poNumber2;
							poNumber3CurrentMonth = poNumber3;
							poNumber4CurrentMonth = poNumber4;
							poNumber5CurrentMonth = poNumber5;
							
							List<OrderGrp> orderGrpSubmittedsNextMonth = 
									orderGrpService.getOrderGrpSubmitted(company, custId, getPeriodeOracle(periodes.get(1)));
							
							if(orderGrpSubmittedsNextMonth!=null) {
								if(orderGrpSubmittedsNextMonth.size()>0) {
									
									for(Integer i=0; i<orderGrpSubmittedsNextMonth.size(); i++) {
										
										OrderGrp orderGrpSubmittedLast = 
												orderGrpSubmittedsNextMonth.get(i);
										List<Order> orderSubmittedLasts = 
												orderService.getByCompanyCustidGrpid(
														orderGrpSubmittedLast.getOrderGrpId(),
														custId, company); 
										if(orderSubmittedLasts!=null) {
											if(orderSubmittedLasts.size()>0) {
												Order orderSubmittedLast = 
														orderSubmittedLasts.get(
																orderSubmittedLasts.size()-1);
												String poNumberLast =
														orderSubmittedLast.getPoNumber();
												String sPoNumberLast = poNumberLast.substring(8,11);
												Long lPoNumberLast = Long.parseLong(sPoNumberLast);
												poNumber1NextMonth = lPoNumberLast + 1;
												poNumber2NextMonth = lPoNumberLast + 2;
												poNumber3NextMonth = lPoNumberLast + 3;
												poNumber4NextMonth = lPoNumberLast + 4;
												poNumber5NextMonth = lPoNumberLast + 5;
												
												break;
											}
											else {
												orderGrpService.deleteOrderGrp(orderGrpSubmittedLast.getOrderGrpId());
											}
										}
										else {
											orderGrpService.deleteOrderGrp(orderGrpSubmittedLast.getOrderGrpId());
										}
										
									}
								}						
							}
							
						}
						else if(monthPeriode==monthNext){
							
							poNumber1NextMonth = poNumber1;
							poNumber2NextMonth = poNumber2;
							poNumber3NextMonth = poNumber3;
							poNumber4NextMonth = poNumber4;
							poNumber5NextMonth = poNumber5;
							
							List<OrderGrp> orderGrpSubmittedsCurrentMonth = 
									orderGrpService.getOrderGrpSubmitted(company, custId, getPeriodeOracle(periodes.get(0)));
							
							if(orderGrpSubmittedsCurrentMonth!=null) {
								if(orderGrpSubmittedsCurrentMonth.size()>0) {
									
									for(Integer i=0; i<orderGrpSubmittedsCurrentMonth.size(); i++) {
										
										OrderGrp orderGrpSubmittedLast = 
												orderGrpSubmittedsCurrentMonth.get(i);
										List<Order> orderSubmittedLasts = 
												orderService.getByCompanyCustidGrpid(
														orderGrpSubmittedLast.getOrderGrpId(),
														custId, company); 
										if(orderSubmittedLasts!=null) {
											if(orderSubmittedLasts.size()>0) {
												Order orderSubmittedLast = 
														orderSubmittedLasts.get(
																orderSubmittedLasts.size()-1);
												String poNumberLast =
														orderSubmittedLast.getPoNumber();
												String sPoNumberLast = poNumberLast.substring(8,11);
												Long lPoNumberLast = Long.parseLong(sPoNumberLast);
												poNumber1CurrentMonth = lPoNumberLast + 1;
												poNumber2CurrentMonth = lPoNumberLast + 2;
												poNumber3CurrentMonth = lPoNumberLast + 3;
												poNumber4CurrentMonth = lPoNumberLast + 4;
												poNumber5CurrentMonth = lPoNumberLast + 5;
												
												break;
											}
											else {
												orderGrpService.deleteOrderGrp(orderGrpSubmittedLast.getOrderGrpId());
											}
										}
										else {
											orderGrpService.deleteOrderGrp(orderGrpSubmittedLast.getOrderGrpId());
										}
									}
								}						
							}
						}
					}
					else {
						order1.setPoNumber(
								generatePoNumber(customer, year, month, poNumber1));
						order2.setPoNumber(
								generatePoNumber(customer, year, month, poNumber2));
						order1.setPeriode(periodes.get(0));
						order2.setPeriode(periodes.get(0));
						order1.setOrderDate(Date.valueOf(getMinDate()));
						order2.setOrderDate(Date.valueOf(getMinDate()));
					}
					
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
				else if(orders.size()==3) {
					
					order1 = orders.get(0);
					order2 = orders.get(1);
					order3 = orders.get(2);

					if(!isForcePeriodeCurrent) {
						String pnLast = order3.getPoNumber();
						String spnLast = pnLast.substring(8,11);
						Long lpnLast = Long.parseLong(spnLast);
						poNumber1 = lpnLast - 2;
						poNumber2 = lpnLast - 1;
						poNumber3 = lpnLast;
						poNumber4 = lpnLast + 1;
						poNumber5 = lpnLast + 2;

						if(monthPeriode==month) {
							
							poNumber1CurrentMonth = poNumber1;
							poNumber2CurrentMonth = poNumber2;
							poNumber3CurrentMonth = poNumber3;
							poNumber4CurrentMonth = poNumber4;
							poNumber5CurrentMonth = poNumber5;
							
							List<OrderGrp> orderGrpSubmittedsNextMonth = 
									orderGrpService.getOrderGrpSubmitted(company, custId, getPeriodeOracle(periodes.get(1)));
							
							if(orderGrpSubmittedsNextMonth!=null) {
								if(orderGrpSubmittedsNextMonth.size()>0) {
									
									for(Integer i=0; i<orderGrpSubmittedsNextMonth.size(); i++) {
										
										OrderGrp orderGrpSubmittedLast = 
												orderGrpSubmittedsNextMonth.get(i);
										List<Order> orderSubmittedLasts = 
												orderService.getByCompanyCustidGrpid(
														orderGrpSubmittedLast.getOrderGrpId(),
														custId, company); 
										if(orderSubmittedLasts!=null) {
											if(orderSubmittedLasts.size()>0) {
												Order orderSubmittedLast = 
														orderSubmittedLasts.get(
																orderSubmittedLasts.size()-1);
												String poNumberLast =
														orderSubmittedLast.getPoNumber();
												String sPoNumberLast = poNumberLast.substring(8,11);
												Long lPoNumberLast = Long.parseLong(sPoNumberLast);
												poNumber1NextMonth = lPoNumberLast + 1;
												poNumber2NextMonth = lPoNumberLast + 2;
												poNumber3NextMonth = lPoNumberLast + 3;
												poNumber4NextMonth = lPoNumberLast + 4;
												poNumber5NextMonth = lPoNumberLast + 5;
												
												break;
											}
											else {
												orderGrpService.deleteOrderGrp(orderGrpSubmittedLast.getOrderGrpId());
											}
										}
										else {
											orderGrpService.deleteOrderGrp(orderGrpSubmittedLast.getOrderGrpId());
										}
									}
								}						
							}
							
						}
						else if(monthPeriode==monthNext){
							
							poNumber1NextMonth = poNumber1;
							poNumber2NextMonth = poNumber2;
							poNumber3NextMonth = poNumber3;
							poNumber4NextMonth = poNumber4;
							poNumber5NextMonth = poNumber5;
							
							List<OrderGrp> orderGrpSubmittedsCurrentMonth = 
									orderGrpService.getOrderGrpSubmitted(company, custId, getPeriodeOracle(periodes.get(0)));
							
							if(orderGrpSubmittedsCurrentMonth!=null) {
								if(orderGrpSubmittedsCurrentMonth.size()>0) {
									
									for(Integer i=0; i<orderGrpSubmittedsCurrentMonth.size(); i++) {
										
										OrderGrp orderGrpSubmittedLast = 
												orderGrpSubmittedsCurrentMonth.get(i);
										List<Order> orderSubmittedLasts = 
												orderService.getByCompanyCustidGrpid(
														orderGrpSubmittedLast.getOrderGrpId(),
														custId, company); 
										if(orderSubmittedLasts!=null) {
											if(orderSubmittedLasts.size()>0) {
												Order orderSubmittedLast = 
														orderSubmittedLasts.get(
																orderSubmittedLasts.size()-1);
												String poNumberLast =
														orderSubmittedLast.getPoNumber();
												String sPoNumberLast = poNumberLast.substring(8,11);
												Long lPoNumberLast = Long.parseLong(sPoNumberLast);
												poNumber1CurrentMonth = lPoNumberLast + 1;
												poNumber2CurrentMonth = lPoNumberLast + 2;
												poNumber3CurrentMonth = lPoNumberLast + 3;
												poNumber4CurrentMonth = lPoNumberLast + 4;
												poNumber5CurrentMonth = lPoNumberLast + 5;
												
												break;
											}
											else {
												orderGrpService.deleteOrderGrp(orderGrpSubmittedLast.getOrderGrpId());
											}
										}
										else {
											orderGrpService.deleteOrderGrp(orderGrpSubmittedLast.getOrderGrpId());
										}
									}
								}						
							}
						}
					}
					else {
						order1.setPoNumber(
								generatePoNumber(customer, year, month, poNumber1));
						order2.setPoNumber(
								generatePoNumber(customer, year, month, poNumber2));
						order3.setPoNumber(
								generatePoNumber(customer, year, month, poNumber3));
						order1.setPeriode(periodes.get(0));
						order2.setPeriode(periodes.get(0));
						order3.setPeriode(periodes.get(0));
						order1.setOrderDate(Date.valueOf(getMinDate()));
						order2.setOrderDate(Date.valueOf(getMinDate()));
						order3.setOrderDate(Date.valueOf(getMinDate()));
					}
					
					order4 = setDefaultOrder(
							customer, orderGrp, custShipTo,
							listMobils,
							poNumber4, year, month);
					order5 = setDefaultOrder(
							customer, orderGrp, custShipTo,
							listMobils,
							poNumber5, year, month);
				}
				else if(orders.size()==4) {
					
					order1 = orders.get(0);
					order2 = orders.get(1);
					order3 = orders.get(2);
					order4 = orders.get(3);
					if(!isForcePeriodeCurrent) {
						String pnLast = order4.getPoNumber();
						String spnLast = pnLast.substring(8,11);
						Long lpnLast = Long.parseLong(spnLast);
						poNumber1 = lpnLast - 3;
						poNumber2 = lpnLast - 2;
						poNumber3 = lpnLast - 1;
						poNumber4 = lpnLast;
						poNumber5 = lpnLast + 1;

						if(monthPeriode==month) {
							
							poNumber1CurrentMonth = poNumber1;
							poNumber2CurrentMonth = poNumber2;
							poNumber3CurrentMonth = poNumber3;
							poNumber4CurrentMonth = poNumber4;
							poNumber5CurrentMonth = poNumber5;
							
							List<OrderGrp> orderGrpSubmittedsNextMonth = 
									orderGrpService.getOrderGrpSubmitted(company, custId, getPeriodeOracle(periodes.get(1)));
							
							if(orderGrpSubmittedsNextMonth!=null) {
								if(orderGrpSubmittedsNextMonth.size()>0) {
									
									for(Integer i=0; i<orderGrpSubmittedsNextMonth.size(); i++) {
										
										OrderGrp orderGrpSubmittedLast = 
												orderGrpSubmittedsNextMonth.get(i);
										List<Order> orderSubmittedLasts = 
												orderService.getByCompanyCustidGrpid(
														orderGrpSubmittedLast.getOrderGrpId(),
														custId, company); 
										if(orderSubmittedLasts!=null) {
											if(orderSubmittedLasts.size()>0) {
												Order orderSubmittedLast = 
														orderSubmittedLasts.get(
																orderSubmittedLasts.size()-1);
												String poNumberLast =
														orderSubmittedLast.getPoNumber();
												String sPoNumberLast = poNumberLast.substring(8,11);
												Long lPoNumberLast = Long.parseLong(sPoNumberLast);
												poNumber1NextMonth = lPoNumberLast + 1;
												poNumber2NextMonth = lPoNumberLast + 2;
												poNumber3NextMonth = lPoNumberLast + 3;
												poNumber4NextMonth = lPoNumberLast + 4;
												poNumber5NextMonth = lPoNumberLast + 5;
												
												break;
											}
											else {
												orderGrpService.deleteOrderGrp(orderGrpSubmittedLast.getOrderGrpId());
											}
										}
										else {
											orderGrpService.deleteOrderGrp(orderGrpSubmittedLast.getOrderGrpId());
										}
									}	
								}						
							}
							
						}
						else if(monthPeriode==monthNext){
							
							poNumber1NextMonth = poNumber1;
							poNumber2NextMonth = poNumber2;
							poNumber3NextMonth = poNumber3;
							poNumber4NextMonth = poNumber4;
							poNumber5NextMonth = poNumber5;
							
							List<OrderGrp> orderGrpSubmittedsCurrentMonth = 
									orderGrpService.getOrderGrpSubmitted(company, custId, getPeriodeOracle(periodes.get(0)));
							
							if(orderGrpSubmittedsCurrentMonth!=null) {
								if(orderGrpSubmittedsCurrentMonth.size()>0) {
									
									for(Integer i=0; i<orderGrpSubmittedsCurrentMonth.size(); i++) {
										
										OrderGrp orderGrpSubmittedLast = 
												orderGrpSubmittedsCurrentMonth.get(i);
										List<Order> orderSubmittedLasts = 
												orderService.getByCompanyCustidGrpid(
														orderGrpSubmittedLast.getOrderGrpId(),
														custId, company); 
										if(orderSubmittedLasts!=null) {
											if(orderSubmittedLasts.size()>0) {
												Order orderSubmittedLast = 
														orderSubmittedLasts.get(
																orderSubmittedLasts.size()-1);
												String poNumberLast =
														orderSubmittedLast.getPoNumber();
												String sPoNumberLast = poNumberLast.substring(8,11);
												Long lPoNumberLast = Long.parseLong(sPoNumberLast);
												poNumber1CurrentMonth = lPoNumberLast + 1;
												poNumber2CurrentMonth = lPoNumberLast + 2;
												poNumber3CurrentMonth = lPoNumberLast + 3;
												poNumber4CurrentMonth = lPoNumberLast + 4;
												poNumber5CurrentMonth = lPoNumberLast + 5;
												
												break;
											}
											else {
												orderGrpService.deleteOrderGrp(orderGrpSubmittedLast.getOrderGrpId());
											}
										}
										else {
											orderGrpService.deleteOrderGrp(orderGrpSubmittedLast.getOrderGrpId());
										}
									}
								}						
							}
						}
					}
					else {
						order1.setPoNumber(
								generatePoNumber(customer, year, month, poNumber1));
						order2.setPoNumber(
								generatePoNumber(customer, year, month, poNumber2));
						order3.setPoNumber(
								generatePoNumber(customer, year, month, poNumber3));
						order4.setPoNumber(
								generatePoNumber(customer, year, month, poNumber4));
						order1.setPeriode(periodes.get(0));
						order2.setPeriode(periodes.get(0));
						order3.setPeriode(periodes.get(0));
						order4.setPeriode(periodes.get(0));
						order1.setOrderDate(Date.valueOf(getMinDate()));
						order2.setOrderDate(Date.valueOf(getMinDate()));
						order3.setOrderDate(Date.valueOf(getMinDate()));
						order4.setOrderDate(Date.valueOf(getMinDate()));
					}
					
					order5 = setDefaultOrder(
							customer, orderGrp, custShipTo,
							listMobils,
							poNumber5, year, month);
				}
				else if(orders.size()==5) {
					order1 = orders.get(0);
					order2 = orders.get(1);
					order3 = orders.get(2);
					order4 = orders.get(3);
					order5 = orders.get(4);
					if(!isForcePeriodeCurrent) {
						String pnLast = order1.getPoNumber();
						String spnLast = pnLast.substring(8,11);
						Long lpnLast = Long.parseLong(spnLast);
						poNumber1 = lpnLast;
						poNumber2 = lpnLast + 1;
						poNumber3 = lpnLast + 2;
						poNumber4 = lpnLast + 3;
						poNumber5 = lpnLast + 4;

						if(monthPeriode==month) {
							
							poNumber1CurrentMonth = poNumber1;
							poNumber2CurrentMonth = poNumber2;
							poNumber3CurrentMonth = poNumber3;
							poNumber4CurrentMonth = poNumber4;
							poNumber5CurrentMonth = poNumber5;
							
							List<OrderGrp> orderGrpSubmittedsNextMonth = 
									orderGrpService.getOrderGrpSubmitted(company, custId, getPeriodeOracle(periodes.get(1)));
							
							if(orderGrpSubmittedsNextMonth!=null) {
								if(orderGrpSubmittedsNextMonth.size()>0) {
									
									for(Integer i=0; i<orderGrpSubmittedsNextMonth.size(); i++) {
										
										OrderGrp orderGrpSubmittedLast = 
												orderGrpSubmittedsNextMonth.get(i);
										List<Order> orderSubmittedLasts = 
												orderService.getByCompanyCustidGrpid(
														orderGrpSubmittedLast.getOrderGrpId(),
														custId, company); 
										if(orderSubmittedLasts!=null) {
											if(orderSubmittedLasts.size()>0) {
												Order orderSubmittedLast = 
														orderSubmittedLasts.get(
																orderSubmittedLasts.size()-1);
												String poNumberLast =
														orderSubmittedLast.getPoNumber();
												String sPoNumberLast = poNumberLast.substring(8,11);
												Long lPoNumberLast = Long.parseLong(sPoNumberLast);
												poNumber1NextMonth = lPoNumberLast + 1;
												poNumber2NextMonth = lPoNumberLast + 2;
												poNumber3NextMonth = lPoNumberLast + 3;
												poNumber4NextMonth = lPoNumberLast + 4;
												poNumber5NextMonth = lPoNumberLast + 5;
												
												break;
											}
											else {
												orderGrpService.deleteOrderGrp(orderGrpSubmittedLast.getOrderGrpId());
											}
										}
										else {
											orderGrpService.deleteOrderGrp(orderGrpSubmittedLast.getOrderGrpId());
										}
									}
								}						
							}
							
						}
						else if(monthPeriode==monthNext){
							
							poNumber1NextMonth = poNumber1;
							poNumber2NextMonth = poNumber2;
							poNumber3NextMonth = poNumber3;
							poNumber4NextMonth = poNumber4;
							poNumber5NextMonth = poNumber5;
							
							List<OrderGrp> orderGrpSubmittedsCurrentMonth = 
									orderGrpService.getOrderGrpSubmitted(company, custId, getPeriodeOracle(periodes.get(0)));
							
							if(orderGrpSubmittedsCurrentMonth!=null) {
								if(orderGrpSubmittedsCurrentMonth.size()>0) {
									
									for(Integer i=0; i<orderGrpSubmittedsCurrentMonth.size(); i++) {
										
										OrderGrp orderGrpSubmittedLast = 
												orderGrpSubmittedsCurrentMonth.get(i);
										List<Order> orderSubmittedLasts = 
												orderService.getByCompanyCustidGrpid(
														orderGrpSubmittedLast.getOrderGrpId(),
														custId, company); 
										if(orderSubmittedLasts!=null) {
											if(orderSubmittedLasts.size()>0) {
												Order orderSubmittedLast = 
														orderSubmittedLasts.get(
																orderSubmittedLasts.size()-1);
												String poNumberLast =
														orderSubmittedLast.getPoNumber();
												String sPoNumberLast = poNumberLast.substring(8,11);
												Long lPoNumberLast = Long.parseLong(sPoNumberLast);
												poNumber1CurrentMonth = lPoNumberLast + 1;
												poNumber2CurrentMonth = lPoNumberLast + 2;
												poNumber3CurrentMonth = lPoNumberLast + 3;
												poNumber4CurrentMonth = lPoNumberLast + 4;
												poNumber5CurrentMonth = lPoNumberLast + 5;
												
												break;
											}
											else {
												orderGrpService.deleteOrderGrp(orderGrpSubmittedLast.getOrderGrpId());
											}
										}
										else {
											orderGrpService.deleteOrderGrp(orderGrpSubmittedLast.getOrderGrpId());
										}
										
									}
								}						
							}
						}
					}
					else {
						order1.setPoNumber(
								generatePoNumber(customer, year, month, poNumber1));
						order2.setPoNumber(
								generatePoNumber(customer, year, month, poNumber2));
						order3.setPoNumber(
								generatePoNumber(customer, year, month, poNumber3));
						order4.setPoNumber(
								generatePoNumber(customer, year, month, poNumber4));
						order5.setPoNumber(
								generatePoNumber(customer, year, month, poNumber5));
						order1.setPeriode(periodes.get(0));
						order2.setPeriode(periodes.get(0));
						order3.setPeriode(periodes.get(0));
						order4.setPeriode(periodes.get(0));
						order5.setPeriode(periodes.get(0));
						order1.setOrderDate(Date.valueOf(getMinDate()));
						order2.setOrderDate(Date.valueOf(getMinDate()));
						order3.setOrderDate(Date.valueOf(getMinDate()));
						order4.setOrderDate(Date.valueOf(getMinDate()));
						order5.setOrderDate(Date.valueOf(getMinDate()));
					}
				}
				
				InputOrder inputOrder = new InputOrder();
				inputOrder.setOrderGrp(orderGrp);
				inputOrder.setOrder1(order1);
				inputOrder.setOrder2(order2);
				inputOrder.setOrder3(order3);
				inputOrder.setOrder4(order4);
				inputOrder.setOrder5(order5);
				
				String customerNumber = "-------";
				if(customer!=null) {
					if(customer.getCustomerNumber()!=null) {
						customerNumber = customer.getCustomerNumber();
					}
				}
				
				inputOrder.setPoNumber1CurrentMonth(
						createPoNumber(year, month, poNumber1CurrentMonth, customerNumber));
				inputOrder.setPoNumber2CurrentMonth(
						createPoNumber(year, month, poNumber2CurrentMonth, customerNumber));
				inputOrder.setPoNumber3CurrentMonth(
						createPoNumber(year, month, poNumber3CurrentMonth, customerNumber));
				inputOrder.setPoNumber4CurrentMonth(
						createPoNumber(year, month, poNumber4CurrentMonth, customerNumber));
				inputOrder.setPoNumber5CurrentMonth(
						createPoNumber(year, month, poNumber5CurrentMonth, customerNumber));
				
				inputOrder.setPoNumber1NextMonth(
						createPoNumber(yearNext, monthNext, poNumber1NextMonth, customerNumber));
				inputOrder.setPoNumber2NextMonth(
						createPoNumber(yearNext, monthNext, poNumber2NextMonth, customerNumber));
				inputOrder.setPoNumber3NextMonth(
						createPoNumber(yearNext, monthNext, poNumber3NextMonth, customerNumber));
				inputOrder.setPoNumber4NextMonth(
						createPoNumber(yearNext, monthNext, poNumber4NextMonth, customerNumber));
				inputOrder.setPoNumber5NextMonth(
						createPoNumber(yearNext, monthNext, poNumber5NextMonth, customerNumber));
				
				String minOrderDate = getMinDate();
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
				InputWebOrder inputWebOrder = new InputWebOrder();
				
				for(ListMobil listMobil: listMobils) {
					listMobil.setMobilPanjang(listMobil.getMobilPanjang()/1000);
					listMobil.setMobilLebar(listMobil.getMobilLebar()/1000);
					listMobil.setMobilTinggi(listMobil.getMobilTinggi()/1000);
				}
				
				inputWebOrder.setCustomer(customer);
				/*System.out.println(
						"creditLimits.getOverallCreditLimitText(): "
						+ creditLimits.getOverallCreditLimitText());
				System.out.println(
						"creditLimits.getSisaArText(): "
						+ creditLimits.getSisaArText());
				System.out.println(
						"creditLimits.getOutstandingSoText(): "
						+ creditLimits.getOutstandingSoText());
				System.out.println(
						"creditLimits.getOutstandingCo1Text(): "
						+ creditLimits.getOutstandingCo1Text());
				System.out.println(
						"creditLimits.getOutstandingCo2Text(): "
						+ creditLimits.getOutstandingCo2Text());
				System.out.println(
						"creditLimits.getSisaLimitText(): "
						+ creditLimits.getSisaLimitText());
				System.out.println(
						"creditLimits.getSisaLimit(): "
						+ creditLimits.getSisaLimit());*/
				inputWebOrder.setCreditLimit(creditLimits);
				inputWebOrder.setInputOrder(inputOrder);
				inputWebOrder.setInputProducts(inputProducts);
				inputWebOrder.setListMobils(listMobils);

				//System.out.println("maxInactiveInterval: " + maxInactiveInterval);
				model.addAttribute("maxInactiveInterval", maxInactiveInterval);
				model.addAttribute("minOrderDate", minOrderDate);
				model.addAttribute("maxOrderDate", maxOrderDate);
				model.addAttribute("orderTypes", orderTypes);
				model.addAttribute("periodes", periodes);
				model.addAttribute("productQty", inputProducts.size());
				model.addAttribute("custShipTo", custShipTo);
				model.addAttribute("jumlahOrders", jumlahOrders);
				model.addAttribute("expedisis", expedisis);
				model.addAttribute("inputWebOrder", inputWebOrder);

				modelAndView.setViewName("order");
				return modelAndView;
			}        
		}
		else {
			modelAndView.setViewName("login");
			return modelAndView;
		}
    }
	
	@RequestMapping(value="/", method=RequestMethod.POST)
	public String inputOrderRequest(
			@ModelAttribute InputWebOrder inputWebOrder, 
			BindingResult bindingResult,
	        @RequestParam(value="action", required=false) String action,
	        @RequestParam(value="action1", required=false) String action1) {
		
		Calendar c = Calendar.getInstance();
		Integer year = c.get(Calendar.YEAR);
		Integer month = c.get(Calendar.MONTH) + 1;
		
		System.out.println();
		System.out.print("[WebOrder-POST]"
				+ year 
				+ "/"
				+ month
				+ "/"
				+ c.get(Calendar.DAY_OF_MONTH)
				+ " "
				+ c.get(Calendar.HOUR)
				+ ":"
				+ c.get(Calendar.MINUTE)
				+ ":"
				+ c.get(Calendar.SECOND)
				+ "."
				+ c.get(Calendar.MILLISECOND));
		if(bindingResult.hasErrors()) {
			System.out.print("; error: " + bindingResult.getFieldError());
		}
		
		System.out.print("; action: " + action);
		System.out.print("; action1: " + action1);
		
		if(action != null) {
			
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
	    	orderGrp.setSubmitStatus(status);
	    	System.out.print("; orderGrpId(): " + orderGrp.getOrderGrpId());
	    	System.out.print("; custId(): " + orderGrp.getCustId());
	    	System.out.print("; company(): " + orderGrp.getCompany());
	    	orderGrpService.updateOrderGrp(orderGrp);
	    	
	    	Long orderGrpId = orderGrp.getOrderGrpId();
	    	Long custId = orderGrp.getCustId();
	    	String company = orderGrp.getCompany();
		    Long jumlahOrder = orderGrp.getJumlahOrder();
		    String periodeOrder = orderGrp.getPeriodeOrder();
		    
		    List<Order> orders = orderService.getByCompanyCustidGrpid(
		    		orderGrpId, custId, company);
		    
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
	    		
	
				/*System.out.println("inputProduct.getProduct().getProductCode(): "
						+ inputProduct.getProduct().getProductCode());*/
				
	    		String productCode = inputProduct.getProduct().getProductCode();
	    		String productDesc = inputProduct.getProduct().getProductName();
	    		String uom = "";
	    		Double unitPrice = 0.0;
	    		if(inputProduct.getCustProd()!=null) {
	        		if(inputProduct.getCustProd().getPriceUom()!=null) {
	        			uom = inputProduct.getCustProd().getPriceUom();
	        		}
	        		
	        		if(inputProduct.getCustProd().getPrice()!=null) {
	            		unitPrice = inputProduct.getCustProd().getPrice();
	        		}
	    		}
	    		
	    		Long orderQty1 = (long)0;
	    		Long orderQty2 = (long)0;
	    		Long orderQty3 = (long)0;
	    		Long orderQty4 = (long)0;
	    		Long orderQty5 = (long)0;
	    		
	    		if(inputProduct.getOrderQty1()!=null) {
	    			orderQty1 = unFormatText(inputProduct.getOrderQty1());
	    		}
	    		if(inputProduct.getOrderQty2()!=null) {
	    			orderQty2 = unFormatText(inputProduct.getOrderQty2());
	    		}
	    		if(inputProduct.getOrderQty3()!=null) {
	    			orderQty3 = unFormatText(inputProduct.getOrderQty3());
	    		}
	    		if(inputProduct.getOrderQty4()!=null) {
	    			orderQty4 = unFormatText(inputProduct.getOrderQty4());
	    		}
	    		if(inputProduct.getOrderQty5()!=null) {
	    			orderQty5 = unFormatText(inputProduct.getOrderQty5());
	    		}
	    		
	    		/*System.out.println("orderQty1: "
						+ orderQty1);*/
	    		
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
		                    			orderDetail5.setTotalPrice(
		                    					orderQty5*unitPrice);
		                        		orderDetailService.updateOrderDetail(
		                        				orderDetail5);
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
		}
    	
	    return "home";
	}
	
	private Long unFormatText(String text) {
		Long value = (long)0;
		text = text.replaceAll("[^\\d.]+", "");
		value = Long.parseLong(text);
		return value;
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
		
		Order order = new Order();
		order.setCompany(orderGrp.getCompany());
		order.setCustId(orderGrp.getCustId());
		order.setPoNumber(
				generatePoNumber(
						customer, year, month, poNumber));
		order.setOrderDate(
				Date.valueOf(getMinDate()));
		if(custShipTo!=null) {
			if(custShipTo.size()>0) {
				order.setShipTo(
						custShipTo.get(0).getShipToId().toString());
			}
		}
		
		order.setJenisMobil(
				listMobils.get(0).getMobilDesc().toString());
		order.setTotalPrice(0.0);
		Double tonaseMobil = 0.0;
				/*(listMobils.get(0).getMobilPanjang()
				*listMobils.get(0).getMobilLebar()
				*listMobils.get(0).getMobilTinggi())
				/1000000000;*/
		order.setTonaseMobil(tonaseMobil);
		order.setTonaseOrder(0.0);
		order.setSelisihTonase(tonaseMobil);
		
		return order;
	}
	
	private String generatePoNumber(
			Customer customer,
			Integer year,
			Integer month,
			Long poNumber) {
		
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
		String monthPo = "00";
		if(month<10){
			monthPo = "0" + month;
		}else if(month>=10 && month<100){
			monthPo = month.toString();
		}
		else {
			monthPo = "--";
		}
		String customerNumber = "-------";
		if(customer!=null) {
			if(customer.getCustomerNumber()!=null) {
				customerNumber = customer.getCustomerNumber();
			}
		}
		
		String pn = 
			"PO" + year + monthPo 
			+ po + "/" 
			+ customerNumber;
		
		return pn;
	}
	
	private String getMonthName(Integer m) {
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
	
	private Integer getMonthValue(String mName) {
		Integer m = 0;
		if(mName.equals("Januari")){m=1;}
		else if(mName.equals("Pebruari")){m=2;}
		else if(mName.equals("Maret")){m=3;}
		else if(mName.equals("April")){m=4;}
		else if(mName.equals("Mei")){m=5;}
		else if(mName.equals("Juni")){m=6;}
		else if(mName.equals("Juli")){m=7;}
		else if(mName.equals("Agustus")){m=8;}
		else if(mName.equals("September")){m=9;}
		else if(mName.equals("Oktober")){m=10;}
		else if(mName.equals("November")){m=11;}
		else if(mName.equals("Desember")){m=12;}
		return m;
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
	
	private String createPoNumber(
			Integer year, Integer month, Long poNumber,
			String customerName) {
		
		String pn = "PO";
		
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
		
		String m = month.toString();
		if(month<10) {
			m = "0" + month;		
		}
		
		pn += year + m + po + "/" + customerName;
				
		return pn;
	}

	private String getMonth(String mOracle) {
		String month = "XXX";
		if(mOracle.equals("JAN")){month="Januari";}
		else if(mOracle.equals("FEB")){month="Pebruari";}
		else if(mOracle.equals("MAR")){month="Maret";}
		else if(mOracle.equals("APR")){month="April";}
		else if(mOracle.equals("MAY")){month="Mei";}
		else if(mOracle.equals("JUN")){month="Juni";}
		else if(mOracle.equals("JUL")){month="Juli";}
		else if(mOracle.equals("AUG")){month="Agustus";}
		else if(mOracle.equals("SEP")){month="September";}
		else if(mOracle.equals("OCT")){month="Oktober";}
		else if(mOracle.equals("NOV")){month="November";}
		else if(mOracle.equals("DEC")){month="Desember";}
		return month;
	}
	
	private String getPeriode(String pOracle) {
		String periode = "Januari 2000";
		String[] p = pOracle.split("-");
		periode = getMonth(p[0]) + " " + p[1];
		return periode;
	}
	
	private String getMonthOracle(String month) {
		String mOracle = "XXX";
		if(month.equals("Januari")){mOracle="JAN";}
		else if(month.equals("Pebruari")){mOracle="FEB";}
		else if(month.equals("Maret")){mOracle="MAR";}
		else if(month.equals("April")){mOracle="APR";}
		else if(month.equals("Mei")){mOracle="MAY";}
		else if(month.equals("Juni")){mOracle="JUN";}
		else if(month.equals("Juli")){mOracle="JUL";}
		else if(month.equals("Agustus")){mOracle="AUG";}
		else if(month.equals("September")){mOracle="SEP";}
		else if(month.equals("Oktober")){mOracle="OCT";}
		else if(month.equals("November")){mOracle="NOV";}
		else if(month.equals("Desember")){mOracle="DEC";}
		return mOracle;
	}
	
	private String getPeriodeOracle(String periode) {
		String pOracle = "JAN-2000";
		String[] p = periode.split(" ");
		pOracle = getMonthOracle(p[0]) + "-" + p[1];
		return pOracle;
	}

}
