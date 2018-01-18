package com.focus.weborder.services.custmobil;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest")
public class CustMobilController {
	
	@Autowired
	private CustMobilService custMobilService;

	@RequestMapping("/custmobil")
	public List<CustMobil> getByCompanyCustid(
			@RequestParam String company,
			@RequestParam Long custid){
		return custMobilService.getByCompanyCustid(
				company, custid);
	}
}
