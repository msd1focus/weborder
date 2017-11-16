package com.focus.weborder.services.custprodsales;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest")
public class CustProdSalesController {

	@Autowired
	private CustProdSalesService custProdSalesService;
	
	@RequestMapping("/custprodsales")
	public List<CustProdSales> getAllCustProdSales() {
		return custProdSalesService.getAllCustProdSales();
	}

}
