package com.focus.weborder.services.custshipto;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface CustShipToRepository extends CrudRepository<CustShipTo, Long> {
	
	@Query("SELECT c FROM CustShipTo c WHERE " +
            "c.company = :company AND " +
            "c.custId = :custId")
    List<CustShipTo> getByCompanyCustid(@Param("company") String company,
    		@Param("custId") Long custId);
}
