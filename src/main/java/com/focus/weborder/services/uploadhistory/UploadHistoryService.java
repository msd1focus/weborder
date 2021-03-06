package com.focus.weborder.services.uploadhistory;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UploadHistoryService {

	@Autowired
	private UploadHistoryRepository uploadHistoryRepository;
	
	public List<UploadHistory> getAllUploadHistories(){
		List<UploadHistory> uploadHistories =
				uploadHistoryRepository.getAll();
		return uploadHistories;
	}
	 
	public UploadHistory getByTypeStatusFileName(
			String type, String status, String fileName) {
		return uploadHistoryRepository.getByTypeStatusFileName(type, status, fileName);
	}
	
	public List<UploadHistory> getByTypeStatus(
			String type, String status) {
		return uploadHistoryRepository.getByTypeStatus(type, status);
	}
	
	public void updateUploadHistory(UploadHistory uploadHistory){
		uploadHistoryRepository.save(uploadHistory);
	}

}
