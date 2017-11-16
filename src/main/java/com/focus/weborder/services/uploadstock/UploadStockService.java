package com.focus.weborder.services.uploadstock;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UploadStockService {

	@Autowired
	private UploadStockRepository uploadStockRepository;
	
	public List<UploadStock> getAllUploadStocks() {
		List<UploadStock> uploadStocks = 
				uploadStockRepository.getAll();
		return uploadStocks;		
	}

}
