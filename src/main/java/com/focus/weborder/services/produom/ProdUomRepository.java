package com.focus.weborder.services.produom;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface ProdUomRepository extends CrudRepository<ProdUom, String>{

	@Query("SELECT p FROM ProdUom p WHERE " +
            "p.company = :company AND " +
            "p.prodCode = :productCode")
    List<ProdUom> getByCompanyProductcode(@Param("company") String company,
    		@Param("productCode") String productCode);
}
