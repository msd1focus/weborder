package com.focus.weborder.services.custprodsales;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustProdSalesService {

	@Autowired
	private CustProdSalesRepository custProdSalesRepository;
	
	public List<CustProdSales> getAllCustProdSales() {
		List<CustProdSales> custProdSales = 
				custProdSalesRepository.getAll();
		return custProdSales;		
	}

}
