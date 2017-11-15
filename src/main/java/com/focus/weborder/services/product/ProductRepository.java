package com.focus.weborder.services.product;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends CrudRepository<Product, String> {

	@Query("SELECT p FROM Product p")
    List<Product> getAll();
	
	@Query("SELECT p FROM Product p WHERE " +
            "p.company = :company AND " +
            "p.productCode = :productCode")
    Product getByCompanyProductcode(@Param("company") String company,
    		@Param("productCode") String productCode);
	
}
