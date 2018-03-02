package com.focus.weborder.services.custprod;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface CustProdRepository extends CrudRepository<CustProd, Long> {
	
	@Query("SELECT c FROM CustProd c WHERE "
            + "c.price > 0")
	List<CustProd> getAll();
	
	@Query("SELECT c FROM CustProd c WHERE " +
            "c.company = :company AND " +
            "c.custId = :custId "
            + "AND c.price > 0")
	List<CustProd> getByCompanyCustid(@Param("company") String company,
    		@Param("custId") Long custId);
	

	@Query("SELECT c FROM CustProd c WHERE " +
            "c.company = :company AND " +
            "c.custId = :custId")
	List<CustProd> getByCompanyCustidAll(@Param("company") String company,
    		@Param("custId") Long custId);
}
