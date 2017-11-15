package com.focus.weborder.services.custprod;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustProdService {
	
	@Autowired
	private CustProdRepository custProdRepository;
	
	public List<CustProd> getAllCustProds() {
		List<CustProd> custProds = 
				custProdRepository.getAll();
		return custProds;		
	}
	
	public List<CustProd> getCustProd(String company, Long custId) {
		return custProdRepository.getByCompanyCustid(company, custId);
	}
	
	public void addCustProd(CustProd custProd) {
		//custProdRepository.save(custProd);
	}
	
	public void updateCustProd(CustProd custProd) {
		//custProdRepository.save(custProd);
	}
	
	public void deleteCustProd(Long custId) {
		//custProdRepository.delete(custId);
	}
	
}
