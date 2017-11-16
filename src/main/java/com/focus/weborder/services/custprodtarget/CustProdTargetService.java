package com.focus.weborder.services.custprodtarget;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustProdTargetService {
	
	@Autowired
	private CustProdTargetRepository custProdTargetRepository;
	
	public List<CustProdTarget> getAllCustProdTargets() {
		List<CustProdTarget> custProdTargets = 
				custProdTargetRepository.getAll();
		return custProdTargets;		
	}
	
	public void addCustTarget(CustProdTarget custProdTarget) {
		//custTargetRepository.save(custTarget);
	}
	
	public void updateCustTarget(CustProdTarget custProdTarget) {
		//custTargetRepository.save(custTarget);
	}
	
	public void deleteCustTarget(String custId) {
		//custTargetRepository.delete(custId);
	}
	
}
