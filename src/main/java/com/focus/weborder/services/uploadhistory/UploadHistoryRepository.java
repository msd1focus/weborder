package com.focus.weborder.services.uploadhistory;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface UploadHistoryRepository 
	extends CrudRepository<UploadHistory, String>{
	
	@Query("SELECT uh FROM UploadHistory uh "
			+ "ORDER BY uh.uploadId Desc")
    List<UploadHistory> getAll();
	
	@Query("SELECT uh FROM UploadHistory uh "
			+ "WHERE uh.uploadType = :uploadType "
			+ "AND uh.uploadStatus = :uploadStatus "
			+ "AND uh.uploadFileName = :uploadFileName")
    UploadHistory getByTypeStatusFileName(
			@Param("uploadType") String uploadType,
    		@Param("uploadStatus") String uploadStatus,
    		@Param("uploadFileName") String uploadFileName);
	
	@Query("SELECT uh FROM UploadHistory uh "
			+ "WHERE uh.uploadType = :uploadType "
			+ "AND uh.uploadStatus = :uploadStatus")
    List<UploadHistory> getByTypeStatus(
			@Param("uploadType") String uploadType,
    		@Param("uploadStatus") String uploadStatus);
}
