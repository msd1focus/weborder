package com.focus.weborder.services.custshipto;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest")
public class CustShipToController {

	@Autowired
	private CustShipToService custShipToService;
	
	@RequestMapping("/custshipto")
	public List<CustShipTo>  getCustShipTo(@RequestParam String company,
			@RequestParam Long custid){
		return custShipToService.getCustShipTo(company, custid);
	}

}
