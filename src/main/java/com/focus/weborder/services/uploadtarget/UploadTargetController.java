package com.focus.weborder.services.uploadtarget;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest")
public class UploadTargetController {

	@Autowired
	private UploadTargetService uploadTargetService;
	
	@RequestMapping("/uploadtargets")
	public List<UploadTarget> getAllUploadTargets() {
		return uploadTargetService.getAllUploadTargets();
	}
	
	@RequestMapping("/uploadtargets/transactiondate")
	public List<UploadTarget> getByCompanyOutletidItemidTransactiondate(
			@RequestParam String company, 
			@RequestParam String outletid,
			@RequestParam String itemid, 
			@RequestParam Date transactiondatestart,
			@RequestParam Date transactiondateend) {
		return uploadTargetService.getByCompanyOutletidItemidTransactiondate(
				company, outletid,
				itemid, transactiondatestart,
				transactiondateend);
	}

}
