package com.focus.weborder.services.uploadtarget;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
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

}
