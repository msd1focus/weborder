package com.focus.weborder.services.order;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface OrderRepository extends CrudRepository<Order, Long> {
	
	@Query("SELECT o FROM Order o "
            + "ORDER BY o.orderId ASC"
           )
	List<Order> getAll();
	
	@Query("SELECT o FROM Order o WHERE "
            + "o.company = :company AND "
            + "o.custId = :custId AND "
            + "o.orderGrpId = :orderGrpId "
            + "ORDER BY o.orderId ASC"
           )
	List<Order> getByCompanyCustidGrpid(
			@Param("orderGrpId") Long orderGrpId,
    		@Param("custId") Long custId,
			@Param("company") String company
    	);
	
	@Query("SELECT DISTINCT o.expedisi FROM Order o WHERE "
            + "o.company = :company AND "
            + "o.custId = :custId"
           )
	List<String> getExpedisiByCompanyCustid(
			@Param("company") String company,
    		@Param("custId") Long custId
    	);
	
	@Query("SELECT o FROM Order o WHERE "
            + "o.company = :company AND "
            + "o.custId = :custId AND "
            + "o.orderGrpId = :orderGrpId AND "
            + "o.poNumber = :poNumber"
           )
	Order getByCompanyCustidGrpidPonumber(
			@Param("orderGrpId") Long orderGrpId,
    		@Param("custId") Long custId,
			@Param("company") String company,
			@Param("poNumber") String poNumber
    	);
	
	@Modifying
	@Query("DELETE Order o "
			+ "WHERE "
            + "o.company = :company AND "
            + "o.custId = :custId AND "
            + "o.orderGrpId = :orderGrpId AND "
            + "o.orderId = :orderId"
          )
	@Transactional
	void deleteByCompanyCustidGrpidOrderid(
			@Param("orderId") String orderId,
    		@Param("orderGrpId") Long orderGrpId, 
			@Param("company") String company,
    		@Param("custId") String custId
    	);
	
	@Modifying
	@Query("UPDATE Order o SET "
			+ "o.orderId = :orderId, o.orderGrpId = :orderGrpId, "
			+ "o.company = :company, o.custId = :custId, "
			+ "o.poNumber = :poNumber, "
			+ "o.orderDate = :orderDate, o.shipTo = :shipTo, "
			+ "o.expedisi = :expedisi, o.jenisMobil = :jenisMobil, "
			+ "o.tonaseMobil = :tonaseMobil, o.tonaseOrder = :tonaseOrder, "
			+ "o.selisihTonase = :selisihTonase, o.totalPrice = :totalPrice, "
			+ "o.periode = :periode, o.ebsSubmitStatus = :ebsSubmitStatus, "
			+ "o.ebsSubmitDate = :ebsSubmitDate, o.soNumber = :soNumber, "
			+ "o.soStatus = :soStatus, o.soDate = :soDate, "
			+ "o.invoiceStatus = :invoiceStatus, "
            + "o.invoiceDate = :invoiceDate, "
            + "o.notes = :notes "
			+ "WHERE "
            + "o.company = :company AND "
            + "o.custId = :custId AND "
            + "o.orderGrpId = :orderGrpId AND "
            + "o.orderId = :orderId"
           )
	@Transactional
	void updateByCompanyCustidGrpidOrderid(
			@Param("orderId") Long orderId,
    		@Param("orderGrpId") Long orderGrpId, 
			@Param("company") String company,
    		@Param("custId") Long custId,
    		@Param("poNumber") String poNumber,
			@Param("orderDate") Date orderDate,
    		@Param("shipTo") String shipTo,
			@Param("expedisi") String expedisi,
    		@Param("jenisMobil") String jenisMobil,
			@Param("tonaseMobil") Double tonaseMobil,
    		@Param("tonaseOrder") Long tonaseOrder,
			@Param("selisihTonase") Double selisihTonase,
    		@Param("totalPrice") Long totalPrice,
			@Param("periode") String periode,
    		@Param("ebsSubmitStatus") String ebsSubmitStatus,
			@Param("ebsSubmitDate") Date ebsSubmitDate,
    		@Param("soNumber") String soNumber,
    		@Param("soStatus") String soStatus,
			@Param("soDate") Date soDate,
    		@Param("invoiceStatus") String invoiceStatus,
    		@Param("invoiceDate") Date invoiceDate,
    		@Param("notes") String notes
    	);
	
	@Modifying
	@Query(value="insert into orders ("
            + "order_id, order_grp_id, company, "
            + "cust_id, po_number, order_date, ship_to, "
            + "expedisi, jenis_mobil, tonase_mobil, "
            + "tonase_order, selisih_tonase, total_price, "
            + "periode, ebs_submit_status, ebs_submit_date, "
            + "so_number, so_status, so_date, invoice_status, "
            + "invoice_date) VALUES ("
            + ":orderId, :orderGrpId, :company, "
            + ":custId, :poNumber, :orderDate, :shipTo, "
            + ":expedisi, :jenisMobil, :tonaseMobil, "
            + ":tonaseOrder, :selisihTonase, :totalPrice, "
            + ":periode, :ebsSubmitStatus, :ebsSubmitDate, "
            + ":soNumber, :soStatus, :soDate, :invoiceStatus, "
            + ":invoiceDate)", nativeQuery = true
		)
	@Transactional
	void insert(
			@Param("orderId") Long orderId,
    		@Param("orderGrpId") Long orderGrpId, 
			@Param("company") String company,
    		@Param("custId") Long custId,
    		@Param("poNumber") String poNumber,
			@Param("orderDate") Date orderDate,
    		@Param("shipTo") String shipTo,
			@Param("expedisi") String expedisi,
    		@Param("jenisMobil") String jenisMobil,
			@Param("tonaseMobil") Double tonaseMobil,
    		@Param("tonaseOrder") Long tonaseOrder,
			@Param("selisihTonase") Double selisihTonase,
    		@Param("totalPrice") Long totalPrice,
			@Param("periode") String periode,
    		@Param("ebsSubmitStatus") String ebsSubmitStatus,
			@Param("ebsSubmitDate") Date ebsSubmitDate,
    		@Param("soNumber") String soNumber,
    		@Param("soStatus") String soStatus,
			@Param("soDate") Date soDate,
    		@Param("invoiceStatus") String invoiceStatus,
    		@Param("invoiceDate") Date invoiceDate
    	);
}
