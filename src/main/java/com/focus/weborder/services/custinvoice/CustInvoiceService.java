package com.focus.weborder.services.custinvoice;

import java.sql.Date;
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

	public List<CustInvoice> getByCompanyCustidProductcode(
			String company, Long custId,
			String productCode) {
		List<CustInvoice> custInvoices = 
				custInvoiceRepository.getByCompanyCustidProductcode(
						company, custId, 
						productCode);
		return custInvoices;		
	}

	public List<CustInvoice> getByCompanyCustidProductcodeTrxdate(
			String company, Long custId,
			String productCode, Date trxDate) {
		List<CustInvoice> custInvoices = 
				custInvoiceRepository.getByCompanyCustidProductcodeTrxdate(
						company, custId, 
						productCode, trxDate);
		return custInvoices;		
	}

}
