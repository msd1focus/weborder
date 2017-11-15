package com.focus.weborder.services.custtarget;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustTargetService {
	
	@Autowired
	private CustTargetRepository custTargetRepository;
	
	public List<CustTarget> getAllCustTargets() {
		List<CustTarget> custTargets = 
				custTargetRepository.getAll();
		return custTargets;		
	}
	
	public void addCustTarget(CustTarget custTarget) {
		//custTargetRepository.save(custTarget);
	}
	
	public void updateCustTarget(CustTarget custTarget) {
		//custTargetRepository.save(custTarget);
	}
	
	public void deleteCustTarget(String custId) {
		//custTargetRepository.delete(custId);
	}
	
}
