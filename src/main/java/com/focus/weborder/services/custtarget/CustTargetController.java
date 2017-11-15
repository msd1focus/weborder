package com.focus.weborder.services.custtarget;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest")
public class CustTargetController {

	@Autowired
	private CustTargetService custTargetService;
	
	@RequestMapping("/custtargets")
	public List<CustTarget> getAllCustTargets() {
		return custTargetService.getAllCustTargets();
	}
	
	@RequestMapping(method=RequestMethod.POST, value="/custtargets")
	public void addCustTarget(@RequestBody CustTarget custTarget){
		custTargetService.addCustTarget(custTarget);
	}
	
	@RequestMapping(method=RequestMethod.PUT, value="/custtargets")
	public void updateCustTarget(@RequestBody CustTarget custTarget){
		custTargetService.updateCustTarget(custTarget);
	}
	
	@RequestMapping(method=RequestMethod.DELETE, value="/custtargets/{custId}")
	public void deleteCustTarget(@PathVariable String custId){
		custTargetService.deleteCustTarget(custId);
	}
	
}
