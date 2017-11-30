package com.focus.weborder.services.uploadstock;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest")
public class UploadStockController {

	@Autowired
	private UploadStockService uploadStockService;
	
	@RequestMapping("/uploadstocks")
	public List<UploadStock> getAllUploadStocks() {
		return uploadStockService.getAllUploadStocks();
	}
	
	@RequestMapping("/uploadstocks/transactiondate")
	public List<UploadStock> getByCompanyOutletidItemidTransactiondate(
			@RequestParam String company, 
			@RequestParam String outletid,
			@RequestParam String itemid, 
			@RequestParam Date transactiondatestart,
			@RequestParam Date transactiondateend) {
		return uploadStockService.getByCompanyOutletidItemidTransactiondate(
				company, outletid,
				itemid, transactiondatestart,
				transactiondateend);
	}

}
