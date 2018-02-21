package com.focus.weborder.services.uploadhistory;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest")
public class UploadHistoryController {
	
	@Autowired
	private UploadHistoryService uploadHistoryService;

	@RequestMapping("/uploadhistories")
	public List<UploadHistory> getAllUploadHistories() {
		return uploadHistoryService.getAllUploadHistories();
	}
	
	@RequestMapping(method=RequestMethod.GET, value="/uploadhistories/typestatus")
	public List<UploadHistory> getByTypeStatus(
			@RequestParam String type,
			@RequestParam String status) {
		return uploadHistoryService.getByTypeStatus(type, status);
	}

	@RequestMapping(method=RequestMethod.POST, value="/uploadhistory")
	public void updateUploadHistories(
			@RequestBody UploadHistory uploadHistory) {
		uploadHistoryService.updateUploadHistory(uploadHistory);
	}

}
