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

	@RequestMapping("/custprodtarget/productcode")
	public CustProdTarget getByCompanyCustidProductcode(
			@RequestParam String company, 
			@RequestParam Long custid,
			@RequestParam String productcode) {
			return custProdTargetService.getBygetByCompanyCustidProductcode(
					company, custid, productcode);
		}
	
	@RequestMapping(method=RequestMethod.PUT, value="/custprodtarget/sync")
	public String syncCustProdTarget() {
		return custProdTargetService.syncCustProdTarget();
	}
	
	@RequestMapping(method=RequestMethod.POST, value="/custprodtarget")
	public void addCustProdTarget(@RequestBody CustProdTarget custProdTarget){
		custProdTargetService.addCustProdTarget(custProdTarget);
	}
	
	@RequestMapping(method=RequestMethod.PUT, value="/custprodtarget")
	public void updateCustProdTarget(
			@RequestBody List<CustProdTarget> custProdTargets){
		custProdTargetService.updateCustProdTarget(custProdTargets);
	}
	
	@RequestMapping(method=RequestMethod.DELETE, value="/custprodtarget/{custId}")
	public void deleteCustProdTarget(@PathVariable String custId){
		custProdTargetService.deleteCustProdTarget(custId);
	}
	
}
