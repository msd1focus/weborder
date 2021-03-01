package com.focus.weborder.file;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import com.focus.weborder.parameterdownload.ParameterDownload;
import com.focus.weborder.parameterdownload.ParameterDownloadRepository;

@Service
public class FileService {

	@Autowired
	ParameterDownloadRepository parameterRepository;
    
    public Resource download(String id,String fileName) throws MalformedURLException  {
    	
    	ParameterDownload param = parameterRepository.getById(Integer.valueOf(id));
    	
    	String  uploadDir = param.getPath();
    	
    	Path path = Paths.get(uploadDir+fileName);
    	Resource resource = null;
    	
		resource = new UrlResource(path.toUri());
		return resource;
    	
    }
	
}
