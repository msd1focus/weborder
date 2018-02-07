package com.focus.weborder.services.uploadhistory;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface UploadHistoryRepository 
	extends CrudRepository<UploadHistory, String>{
	
	@Query("SELECT uh FROM UploadHistory uh "
			+ "ORDER BY uh.uploadId Desc")
    List<UploadHistory> getAll();
}
