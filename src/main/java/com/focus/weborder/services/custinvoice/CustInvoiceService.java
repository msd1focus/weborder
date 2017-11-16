package com.focus.weborder.services.custinvoice;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustInvoiceService {
	
	@Autowired
	private CustInvoiceRepository custInvoiceRepository;
	
	public List<CustInvoice> getAllCustInvoices() {
		List<CustInvoice> custInvoices = 
				custInvoiceRepository.getAll();
		return custInvoices;		
	}

}
