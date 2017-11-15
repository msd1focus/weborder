package com.focus.weborder.services.ordergrp;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface OrderGrpRepository extends CrudRepository<OrderGrp, Long> {

	@Query("SELECT og FROM OrderGrp og")
	List<OrderGrp> getAll();
	
	@Query("SELECT og FROM OrderGrp og WHERE " +
            "og.company = :company AND " +
            "og.custId = :custId AND " +
            "og.submitStatus = 'DRAFT'")
	OrderGrp getByCompanyCustidDraft(@Param("company") String company,
    		@Param("custId") Long custId);
	
	@Query("SELECT og FROM OrderGrp og WHERE " +
            "og.company = :company AND " +
            "og.custId = :custId AND " +
            "og.submitStatus = 'SUBMITTED'"
            + "ORDER BY og.orderGrpId DESC")
	List<OrderGrp> getOrderGrpSubmitted(@Param("company") String company,
    		@Param("custId") Long custId);
}
