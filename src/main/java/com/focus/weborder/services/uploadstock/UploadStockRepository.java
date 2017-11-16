package com.focus.weborder.services.uploadstock;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface UploadStockRepository extends CrudRepository<UploadStock, String>{
	
	@Query("SELECT us FROM UploadStock us")
    List<UploadStock> getAll();

}
