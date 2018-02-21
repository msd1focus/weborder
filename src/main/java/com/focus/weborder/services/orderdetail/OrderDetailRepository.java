package com.focus.weborder.services.orderdetail;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface OrderDetailRepository extends CrudRepository<OrderDetail, Long> {

	List<OrderDetail> findOrderDetailByOrderId (Long orderId);
	
	@Query("SELECT o FROM OrderDetail o ")
	List<OrderDetail> getAll();
	
	@Query("SELECT o FROM OrderDetail o WHERE "
            + "o.orderId = :orderId"
           )
	List<OrderDetail> getByOrderid(
			@Param("orderId") Long orderId
    	);
	
	@Query("SELECT o FROM OrderDetail o WHERE "
            + "o.orderId = :orderId AND "
            + "o.productCode = :productCode"
           )
	OrderDetail getByOrderidProductcode(
			@Param("orderId") Long orderId,
			@Param("productCode") String productCode
    	);

	@Modifying
	@Query("DELETE FROM OrderDetail o WHERE "
            + "o.orderDetailId = :orderDetailId"
           )
	@Transactional
	void deleteByOrderdetailid(
			@Param("orderDetailId") Long orderDetailId
    	);
	
	@Modifying
	@Query("UPDATE OrderDetail o SET "
			+ "o.orderDetailId = :orderDetailId, o.orderId = :orderId, "
			+ "o.productCode = :productCode, o.productDesc = :productDesc, "
			+ "o.uom = :uom, o.jumlah = :jumlah, "
			+ "o.unitPrice = :unitPrice, o.totalPrice = :totalPrice "
			+ "WHERE o.orderId = :orderId AND orderDetailId = :orderDetailId"
           )
	@Transactional
	void update(
    		@Param("orderDetailId") Long orderDetailId, 
			@Param("orderId") Long orderId,
			@Param("productCode") String productCode,
    		@Param("productDesc") String productDesc,
    		@Param("uom") String uom,
			@Param("jumlah") Long jumlah,
    		@Param("unitPrice") Long unitPrice,
			@Param("totalPrice") Long totalPrice
    	);
	
	@Modifying
	@Query(value="insert into order_detail ("
            + "order_detail_id, order_id, product_code, "
            + "product_desc, uom, jumlah, unit_price, "
            + "total_price ) VALUES ("
            + ":orderDetailId, :orderId, :productCode, "
            + ":productDesc, :uom, :jumlah, "
            + ":unitPrice, :totalPrice, :lastStock)", nativeQuery = true
		)
	@Transactional
	void insert(
			@Param("orderDetailId") Long orderDetailId, 
			@Param("orderId") Long orderId,
			@Param("productCode") String productCode,
    		@Param("productDesc") String productDesc,
    		@Param("uom") String uom,
			@Param("jumlah") Long jumlah,
    		@Param("unitPrice") Double unitPrice,
			@Param("totalPrice") Double totalPrice,
			@Param("lastStock") Double lastStock
    	);
}
