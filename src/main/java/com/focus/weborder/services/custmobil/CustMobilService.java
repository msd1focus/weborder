package com.focus.weborder.services.custmobil;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustMobilService {

	@Autowired
	private CustMobilRepository custMobilRepository;
	
	public List<CustMobil> getByCompanyCustid(
			String company,
			Long custId){
		List<CustMobil> custMobils =
				custMobilRepository.getByCompanyCustid(company, custId);
		return custMobils;
	}
 
}
