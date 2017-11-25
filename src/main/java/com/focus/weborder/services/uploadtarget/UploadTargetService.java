package com.focus.weborder.services.uploadtarget;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UploadTargetService {

	@Autowired
	private UploadTargetRepository uploadTargetRepository;
	
	public List<UploadTarget> getAllUploadTargets() {
		List<UploadTarget> uploadTargets = 
				uploadTargetRepository.getAll();
		return uploadTargets;		
	}

}
