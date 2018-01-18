package com.focus.weborder.services.custmobil;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CustMobilRepository extends CrudRepository<CustMobil, Long> {

	@Query("SELECT cm FROM CustMobil cm WHERE "
            + "cm.company = :company AND "
            + "cm.custId = :custId"
           )
	List<CustMobil> getByCompanyCustid(
			@Param("company") String company,
    		@Param("custId") Long custId
    	);
}
