package com.focus.weborder.services.custprodtarget;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface CustProdTargetRepository extends CrudRepository<CustProdTarget, String> {
	
	@Query("SELECT ct FROM CustProdTarget ct")
    List<CustProdTarget> getAll();

}
