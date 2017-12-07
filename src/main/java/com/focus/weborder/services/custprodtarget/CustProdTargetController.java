package com.focus.weborder.services.custprodtarget;

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
public class CustProdTargetController {

	@Autowired
	private CustProdTargetService custProdTargetService;
	
	@RequestMapping("/custprodtargets")
	public List<CustProdTarget> getAllCustProdTargets() {
		return custProdTargetService.getAllCustProdTargets();
	}
	
	@RequestMapping("/custprodtarget/periodetarget")
	public CustProdTarget getByCompanyCustidProductcodePeriodetarget(
		@RequestParam String company, 
		@RequestParam Long custid,
		@RequestParam String productcode, 
		@RequestParam String periodetarget) {
		return custProdTargetService.getBygetByCompanyCustidProductcodePeriodetarget(
				company, custid, productcode, periodetarget);
	}
	
	@RequestMapping("/custprodtarget/periodestock")
	public CustProdTarget getByCompanyCustidProductcodePeriodestock(
			@RequestParam String company, 
			@RequestParam Long custid,
			@RequestParam String productcode, 
			@RequestParam String periodestock) {
			return custProdTargetService.getBygetByCompanyCustidProductcodePeriodestock(
					company, custid, productcode, periodestock);
		}
	

	@RequestMapping("/custprodtarget/productcode")
	public CustProdTarget getByCompanyCustidProductcode(
			@RequestParam String company, 
			@RequestParam Long custid,
			@RequestParam String productcode) {
			return custProdTargetService.getBygetByCompanyCustidProductcode(
					company, custid, productcode);
		}
	
	@RequestMapping(method=RequestMethod.POST, value="/custprodtargets")
	public void addCustTarget(@RequestBody CustProdTarget custProdTarget){
		custProdTargetService.addCustTarget(custProdTarget);
	}
	
	@RequestMapping(method=RequestMethod.PUT, value="/custprodtargets")
	public void updateCustTarget(@RequestBody CustProdTarget custProdTarget){
		custProdTargetService.updateCustTarget(custProdTarget);
	}
	
	@RequestMapping(method=RequestMethod.DELETE, value="/custprodtargets/{custId}")
	public void deleteCustTarget(@PathVariable String custId){
		custProdTargetService.deleteCustTarget(custId);
	}
	
}
