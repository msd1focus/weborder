package com.focus.weborder.services.custinvoice;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface CustInvoiceRepository extends CrudRepository<CustInvoice, Long>{

	@Query("SELECT ci FROM CustInvoice ci")
    List<CustInvoice> getAll();
	
	@Query("SELECT ci FROM CustInvoice ci WHERE "
            + "ci.company = :company AND "
            + "ci.custId = :custId AND "
            + "ci.productCode = :productCode AND "
            + "ci.trxDate >= :trxDate AND "
            + "ci.invType = 'INV'"
           )
	List<CustInvoice> getByCompanyCustidProductcodeTrxdate(
			@Param("company") String company,
    		@Param("custId") Long custId,
			@Param("productCode") String productCode,
			@Param("trxDate") Date trxDate
    	);

	@Query("SELECT ci FROM CustInvoice ci WHERE "
            + "ci.company = :company AND "
            + "ci.custId = :custId AND "
            + "ci.productCode = :productCode AND "
            + "ci.invType = 'INV'"
           )
	List<CustInvoice> getByCompanyCustidProductcode(
			@Param("company") String company,
    		@Param("custId") Long custId,
			@Param("productCode") String productCode
    	);
}
