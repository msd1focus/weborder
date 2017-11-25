package com.focus.weborder.services.custprodsales;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface CustProdSalesRepository 
	extends CrudRepository<CustProdSales, String> {
	
	@Query("SELECT cps FROM CustProdSales cps")
    List<CustProdSales> getAll();
	
	@Query("SELECT cps FROM CustProdSales cps WHERE "
            + "cps.company = :company AND "
            + "cps.custId = :custId AND "
            + "cps.productCode = :productCode AND "
            + "cps.periode = :periode"
           )
	CustProdSales getByCompanyCustidProductcodePeriode(
			@Param("company") String company,
    		@Param("custId") Long custId,
			@Param("productCode") String productCode,
			@Param("periode") String periode
    	);

}
