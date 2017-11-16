package com.focus.weborder.services.custprodsales;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface CustProdSalesRepository 
	extends CrudRepository<CustProdSales, String> {
	
	@Query("SELECT cps FROM CustProdSales cps")
    List<CustProdSales> getAll();

}
