package com.focus.weborder.services.custtarget;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface CustTargetRepository extends CrudRepository<CustTarget, String> {
	
	@Query("SELECT ct FROM CustTarget ct")
    List<CustTarget> getAll();

}
