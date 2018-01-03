package com.focus.weborder.services.ordergrp;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface OrderGrpRepository extends CrudRepository<OrderGrp, Long> {

	@Query("SELECT og FROM OrderGrp og")
	List<OrderGrp> getAll();	
	
	@Query("SELECT og FROM OrderGrp og WHERE " +
            "og.company = :company AND " +
            "og.custId = :custId AND " +
            "og.orderGrpId = :orderGrpId")
	OrderGrp getByCompanyCustidOrdergrpid(
			@Param("company") String company,
    		@Param("custId") Long custId,
    		@Param("orderGrpId") Long orderGrpId);
	
	@Query("SELECT og FROM OrderGrp og WHERE " +
            "og.company = :company AND " +
            "og.custId = :custId AND " +
            "og.submitStatus = 'DRAFT'")
	List<OrderGrp> getByCompanyCustidDraft(@Param("company") String company,
    		@Param("custId") Long custId);
	
	@Query("SELECT og FROM OrderGrp og WHERE "
            + "og.company = :company AND "
            + "og.custId = :custId AND "
            + "og.periodeOrder= :periodeOrder AND "
            + "og.submitStatus in ('SUBMITTED', 'PROCESSED') "
            + "ORDER BY og.orderGrpId DESC")
	List<OrderGrp> getOrderGrpSubmitted(@Param("company") String company,
    		@Param("custId") Long custId,
    		@Param("periodeOrder") String periodeOrder);
	
	@Modifying
	@Query("UPDATE OrderGrp o SET "
			+ "o.orderGrpId = :orderGrpId, "
			+ "o.company = :company, "
			+ "o.custId = :custId, "
			+ "o.periodeOrder = :periodeOrder, "
			+ "o.orderType = :orderType, "
			+ "o.orderBy = :orderBy, "
			+ "o.leadTime = :leadTime, "
			+ "o.totalOrder = :totalOrder, "
			+ "o.jumlahOrder = :jumlahOrder, "
			+ "o.totalPrice = :totalPrice, "
			+ "o.sisaLimit = :sisaLimit, "
			+ "o.submitStatus = :submitStatus, "
			+ "o.createTime = :createTime, "
			+ "o.updateTime = :updateTime "
			+ "WHERE "
            + "o.company = :company AND "
            + "o.custId = :custId AND "
            + "o.orderGrpId = :orderGrpId"
           )
	@Transactional
	void updateByCompanyCustidGrpid(
			@Param("orderGrpId") Long orderGrpId,
    		@Param("company") String company, 
			@Param("custId") Long custId,
    		@Param("periodeOrder") String periodeOrder,
    		@Param("orderType") String orderType,
			@Param("orderBy") String orderBy,
    		@Param("leadTime") Long leadTime,
			@Param("totalOrder") Long totalOrder,
    		@Param("jumlahOrder") Long jumlahOrder,
			@Param("totalPrice") Long totalPrice,
    		@Param("sisaLimit") Long sisaLimit,
			@Param("submitStatus") String submitStatus,
    		@Param("createTime") Date createTime,
			@Param("updateTime") Date updateTime
    	);
}
