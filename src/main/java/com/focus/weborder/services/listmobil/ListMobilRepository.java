package com.focus.weborder.services.listmobil;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ListMobilRepository extends CrudRepository<ListMobil, Long>{
	
	@Query("SELECT lm FROM ListMobil lm")
    List<ListMobil> getAll();

}
