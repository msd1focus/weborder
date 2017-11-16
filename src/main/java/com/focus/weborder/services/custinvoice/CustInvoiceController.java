package com.focus.weborder.services.custinvoice;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest")
public class CustInvoiceController {
	
	@Autowired
	private CustInvoiceService custInvoiceService;
	
	@RequestMapping("/custinvoices")
	public List<CustInvoice> getAllCustInvoices() {
		return custInvoiceService.getAllCustInvoices();
	}

}
