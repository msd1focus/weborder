package com.focus.weborder.services.custinvoice;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface CustInvoiceRepository extends CrudRepository<CustInvoice, Long>{

	@Query("SELECT ci FROM CustInvoice ci")
    List<CustInvoice> getAll();
}
