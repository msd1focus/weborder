package com.focus.weborder.services.custprodtarget;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface CustProdTargetRepository 
	extends CrudRepository<CustProdTarget, String> {
	
	@Query("SELECT cpt FROM CustProdTarget cpt")
    List<CustProdTarget> getAll();

	@Query("SELECT cpt FROM CustProdTarget cpt WHERE "
            + "cpt.company = :company AND "
            + "cpt.custId = :custId AND "
            + "cpt.productCode = :productCode AND "
            + "cpt.periodeTarget = :periodeTarget"
           )
	CustProdTarget getByCompanyCustidProductcodePeriodetarget(
			@Param("company") String company,
    		@Param("custId") Long custId,
			@Param("productCode") String productCode,
			@Param("periodeTarget") String periodeTarget
    	);

	@Query("SELECT cpt FROM CustProdTarget cpt WHERE "
            + "cpt.company = :company AND "
            + "cpt.custId = :custId AND "
            + "cpt.productCode = :productCode"
           )
	CustProdTarget getByCompanyCustidProductcode(
			@Param("company") String company,
    		@Param("custId") Long custId,
			@Param("productCode") String productCode
    	);

}
