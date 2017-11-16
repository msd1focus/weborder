package com.focus.weborder.services.uploadstock;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
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

}
