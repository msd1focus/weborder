package com.focus.weborder.services.customer;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface CustomerRepository extends CrudRepository<Customer, Long> {
	
	@Query("SELECT c FROM Customer c")
    List<Customer> getAll();
		
	@Query("SELECT c FROM Customer c WHERE " +
            "c.company = :company AND " +
            "c.custId = :custId")
    Customer getByCompanyCustid(@Param("company") String company,
    		@Param("custId") Long custId);

}
