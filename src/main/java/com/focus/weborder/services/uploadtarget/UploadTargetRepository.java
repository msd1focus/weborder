package com.focus.weborder.services.uploadtarget;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface UploadTargetRepository
	extends CrudRepository<UploadTarget, String>{
	
	@Query("SELECT ut FROM UploadTarget ut")
    List<UploadTarget> getAll();

}
