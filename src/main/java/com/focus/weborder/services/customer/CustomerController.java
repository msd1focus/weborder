package com.focus.weborder.services.customer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest")
public class CustomerController {

	@Autowired
	private CustomerService customerService;
	
	@RequestMapping("/customers")
	public List<Customer> getAllCustomers() {
		return customerService.getAllCustomers();
	}
	
	@RequestMapping("/customer")
	public Customer getCustomer(@RequestParam String company,
			@RequestParam Long custid){
		return customerService.getCustomer(company, custid);
	}
	
	@RequestMapping(method=RequestMethod.POST, value="/customer")
	public void addCustomer(@RequestBody Customer customer){
		customerService.addCustomer(customer);
	}
	
	@RequestMapping(method=RequestMethod.PUT, value="/customer")
	public void updateCustomer(@RequestBody Customer customer){
		customerService.updateCustomer(customer);
	}
	
	@RequestMapping(method=RequestMethod.DELETE, value="/customers/{custId}")
	public void deleteCustomer(@PathVariable Long custId){
		customerService.deleteCustomer(custId);
	}
	
}
