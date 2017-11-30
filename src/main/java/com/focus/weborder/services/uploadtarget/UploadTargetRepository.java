package com.focus.weborder.services.uploadtarget;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface UploadTargetRepository
	extends CrudRepository<UploadTarget, String>{
	
	@Query("SELECT ut FROM UploadTarget ut")
    List<UploadTarget> getAll();
	
	@Query("SELECT ut FROM UploadTarget ut WHERE "
            + "ut.company = :company AND "
            + "ut.outletId = :outletId AND "
            + "ut.itemId = :itemId AND "
            + "(ut.transactionDate BETWEEN :transactionDateStart AND "
            + ":transactionDateEnd)"
           )
	List<UploadTarget> getByCompanyOutletidItemidTransactiondate(
			@Param("company") String company,
    		@Param("outletId") String outletId,
			@Param("itemId") String itemId,
			@Param("transactionDateStart") Date transactionDateStart,
			@Param("transactionDateEnd") Date transactionDateEnd
    	);

}
