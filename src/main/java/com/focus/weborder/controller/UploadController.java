package com.focus.weborder.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.focus.weborder.services.uploadhistory.UploadHistory;
import com.focus.weborder.services.uploadhistory.UploadHistoryService;
import com.focus.weborder.upload.storage.StorageService;

@Controller
public class UploadController {

	@Autowired
	private UploadHistoryService uploadHistoryService;

	@Autowired
	private StorageService storageService;
	
	@RequestMapping(value="/upload", method = RequestMethod.GET)
    public String uploadForm() {
        return "/uploadform";
    }
    
    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    public String handleFileUpload(
    		@RequestParam("file") MultipartFile[] files,
            Model model) throws IOException {
       	Authentication auth = SecurityContextHolder.getContext().getAuthentication();
       	String username = auth.getName();
       	String uploadLog = "You successfully uploaded ";
       	int i = 0;
       	for(MultipartFile mf: files) {
        	storageService.store(mf, username);
        	uploadLog += mf.getOriginalFilename();
        	if(i!=(files.length-1)) {
        		uploadLog += " & ";
        	}
        	i++;
       	}
    	model.addAttribute("message", uploadLog + "!");
    	return "/uploadform";
    }
    
	@RequestMapping(value="/uploadhistory", method = RequestMethod.GET)
    public ModelAndView uploadHistory() {

		ModelAndView modelAndView = new ModelAndView();
		List<UploadHistory> uploadHistories = new ArrayList<>();
		uploadHistories = uploadHistoryService.getAllUploadHistories();
		modelAndView.addObject("uploadHistories", uploadHistories);
		modelAndView.setViewName("uploadhistory");
        return modelAndView;
    }
	
}
