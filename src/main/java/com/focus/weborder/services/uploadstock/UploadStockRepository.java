package com.focus.weborder.services.uploadstock;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface UploadStockRepository
	extends CrudRepository<UploadStock, String>{
	
	@Query("SELECT us FROM UploadStock us")
    List<UploadStock> getAll();
	
	@Query("SELECT us FROM UploadStock us WHERE "
            + "us.company = :company AND "
            + "us.outletId = :outletId AND "
            + "us.itemId = :itemId AND "
            + "(us.transactionDate BETWEEN :transactionDateStart AND "
            + ":transactionDateEnd)"
           )
	List<UploadStock> getByCompanyOutletidItemidTransactiondate(
			@Param("company") String company,
    		@Param("outletId") String outletId,
			@Param("itemId") String itemId,
			@Param("transactionDateStart") Date transactionDateStart,
			@Param("transactionDateEnd") Date transactionDateEnd
    	);

}
