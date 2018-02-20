package com.focus.weborder.services.custprodstock;

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
public class CustProdStockController {

	@Autowired
	private CustProdStockService custProdStockService;
	
	@RequestMapping("/custprodstocks")
	public List<CustProdStock> getAllCustProdStocks() {
		return custProdStockService.getAllCustProdStocks();
	}
	
	@RequestMapping("/custprodstock/periodestock")
	public CustProdStock getByCompanyCustidProductcodePeriodestock(
			@RequestParam String company, 
			@RequestParam Long custid,
			@RequestParam String productcode, 
			@RequestParam String periodestock) {
			return custProdStockService.getBygetByCompanyCustidProductcodePeriodestock(
					company, custid, productcode, periodestock);
		}
	

	@RequestMapping("/custprodstock/productcode")
	public CustProdStock getByCompanyCustidProductcode(
			@RequestParam String company, 
			@RequestParam Long custid,
			@RequestParam String productcode) {
			return custProdStockService.getBygetByCompanyCustidProductcode(
					company, custid, productcode);
		}

	@RequestMapping(method=RequestMethod.PUT, value="/custprodstock/sync")
	public String syncCustProdStock() {
		return custProdStockService.syncCustProdStock();
	}
	
	@RequestMapping(method=RequestMethod.POST, value="/custprodstock")
	public void addCustProdStock(@RequestBody CustProdStock custProdStock){
		custProdStockService.addCustProdStock(custProdStock);
	}
	
	@RequestMapping(method=RequestMethod.PUT, value="/custprodstock")
	public void updateCustProdStock(
			@RequestBody List<CustProdStock> custProdStocks){
		custProdStockService.updateCustProdStock(custProdStocks);
	}
	
	@RequestMapping(method=RequestMethod.DELETE, value="/custprodstock/{custId}")
	public void deleteCustProdStock(@PathVariable String custId){
		custProdStockService.deleteCustProdStock(custId);
	}

}
