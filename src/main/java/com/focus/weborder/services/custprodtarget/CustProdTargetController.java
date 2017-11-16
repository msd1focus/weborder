package com.focus.weborder.services.custprodtarget;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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
	
	@RequestMapping(method=RequestMethod.POST, value="/custtargets")
	public void addCustTarget(@RequestBody CustProdTarget custProdTarget){
		custProdTargetService.addCustTarget(custProdTarget);
	}
	
	@RequestMapping(method=RequestMethod.PUT, value="/custtargets")
	public void updateCustTarget(@RequestBody CustProdTarget custProdTarget){
		custProdTargetService.updateCustTarget(custProdTarget);
	}
	
	@RequestMapping(method=RequestMethod.DELETE, value="/custtargets/{custId}")
	public void deleteCustTarget(@PathVariable String custId){
		custProdTargetService.deleteCustTarget(custId);
	}
	
}
