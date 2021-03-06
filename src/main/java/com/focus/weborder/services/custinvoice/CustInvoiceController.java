package com.focus.weborder.services.custinvoice;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	
	@RequestMapping("/custinvoices/productcode")
	public List<CustInvoice> getByCompanyCustidProductcode(
		@RequestParam String company, 
		@RequestParam Long custid,
		@RequestParam String productcode) {
		return custInvoiceService.getByCompanyCustidProductcode(
				company, custid, productcode);
	}
	
	@RequestMapping("/custinvoices/trxdate")
	public List<CustInvoice> getByCompanyCustidProductcodeTrxdate(
		@RequestParam String company, 
		@RequestParam Long custid,
		@RequestParam String productcode, 
		@RequestParam Date trxdate) {
		return custInvoiceService.getByCompanyCustidProductcodeTrxdate(
				company, custid, productcode, trxdate);
	}

}
