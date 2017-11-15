package com.focus.weborder.services.customer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {
	
	@Autowired
	private CustomerRepository customerRepository;
	
	public List<Customer> getAllCustomers() {
		List<Customer> customers = 
				customerRepository.getAll();
		return customers;		
	}
	
	public Customer getCustomer(String customer, Long custId) {
		return customerRepository.getByCompanyCustid(customer, custId);
	}
	
	public void addCustomer(Customer customer) {
		//customerRepository.save(customer);
	}
	
	public void updateCustomer(Customer customer) {
		//customerRepository.save(customer);
	}
	
	public void deleteCustomer(Long custId) {
		//customerRepository.delete(custId);
	}
	
}
