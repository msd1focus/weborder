package com.focus.weborder.services.custprodstock;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface CustProdStockRepository 
	extends CrudRepository<CustProdStock, String> {

	@Query("SELECT cps FROM CustProdStock cps")
    List<CustProdStock> getAll();

	@Query("SELECT cps FROM CustProdStock cps WHERE "
            + "cps.company = :company AND "
            + "cps.custId = :custId AND "
            + "cps.productCode = :productCode AND "
            + "cps.periodeStock = :periodeStock"
           )
	CustProdStock getByCompanyCustidProductcodePeriodestock(
			@Param("company") String company,
    		@Param("custId") Long custId,
			@Param("productCode") String productCode,
			@Param("periodeStock") String periodeStock
    	);
	
	@Query("SELECT cps FROM CustProdStock cps WHERE "
            + "cps.company = :company AND "
            + "cps.custId = :custId AND "
            + "cps.productCode = :productCode"
           )
	CustProdStock getByCompanyCustidProductcode(
			@Param("company") String company,
    		@Param("custId") Long custId,
			@Param("productCode") String productCode
    	);

}
