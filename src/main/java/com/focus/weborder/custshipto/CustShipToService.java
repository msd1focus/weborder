package com.focus.weborder.custshipto;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustShipToService {

	@Autowired
	private CustShipToRepository custShipToRepository;
	
	public List<CustShipTo> getCustShipTo(String company, Long custId) {
		return custShipToRepository.getByCompanyCustid(company, custId);
	}

}
