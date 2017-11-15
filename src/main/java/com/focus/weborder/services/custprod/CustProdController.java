package com.focus.weborder.services.custprod;

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
public class CustProdController {

	@Autowired
	private CustProdService custProdService;
	
	@RequestMapping("/custprods")
	public List<CustProd> getAllCustProds() {
		return custProdService.getAllCustProds();
	}
	
	@RequestMapping("/custprod")
	public List<CustProd> getCustProd(@RequestParam String company,
			@RequestParam Long custid){
		return custProdService.getCustProd(company, custid);
	}
	
	@RequestMapping(method=RequestMethod.POST, value="/custprods")
	public void addCustProd(@RequestBody CustProd custProd){
		custProdService.addCustProd(custProd);
	}
	
	@RequestMapping(method=RequestMethod.PUT, value="/custprods")
	public void updateCustProd(@RequestBody CustProd custProd){
		custProdService.updateCustProd(custProd);
	}
	
	@RequestMapping(method=RequestMethod.DELETE, value="/custprods/{custId}")
	public void deleteCustProd(@PathVariable Long custId){
		custProdService.deleteCustProd(custId);
	}
	
}
