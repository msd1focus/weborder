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

	public CustProdTarget getBygetByCompanyCustidProductcodePeriodetarget(
			String company, Long custId,
			String productCode, String periodeTarget) {
		CustProdTarget custProdTarget = 
				custProdTargetRepository.getByCompanyCustidProductcodePeriodetarget(
						company, custId, 
						productCode, periodeTarget);
		return custProdTarget;		
	}
	
	public CustProdTarget getBygetByCompanyCustidProductcode(
			String company, Long custId,
			String productCode) {
		CustProdTarget custProdTarget = 
				custProdTargetRepository.getByCompanyCustidProductcode(
						company, custId, 
						productCode);
		return custProdTarget;		
	}
	
	public void addCustProdTarget(CustProdTarget custProdTarget) {
		//custTargetRepository.save(custTarget);
	}
	
	public void updateCustProdTarget(CustProdTarget custProdTarget) {
		//custTargetRepository.save(custTarget);
	}
	
	public void deleteCustProdTarget(String custId) {
		//custTargetRepository.delete(custId);
	}
	
}
