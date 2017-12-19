package com.focus.weborder.services.custprodstock;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustProdStockService {

	@Autowired
	private CustProdStockRepository custProdStockRepository;
	
	public List<CustProdStock> getAllCustProdStocks() {
		List<CustProdStock> custProdStocks = 
				custProdStockRepository.getAll();
		return custProdStocks;		
	}

	public CustProdStock getBygetByCompanyCustidProductcodePeriodestock(
			String company, Long custId,
			String productCode, String periodeStock) {
		CustProdStock custProdStock = 
				custProdStockRepository.getByCompanyCustidProductcodePeriodestock(
						company, custId, 
						productCode, periodeStock);
		return custProdStock;		
	}
	
	public CustProdStock getBygetByCompanyCustidProductcode(
			String company, Long custId,
			String productCode) {
		CustProdStock custProdStock = 
				custProdStockRepository.getByCompanyCustidProductcode(
						company, custId, 
						productCode);
		return custProdStock;		
	}
	
	public void addCustProdStock(CustProdStock custProdStock) {
		//custProdStockRepository.save(custProdStock);
	}
	
	public void updateCustProdStock(CustProdStock custProdStock) {
		//custProdStockRepository.save(custProdStock);
	}
	
	public void deleteCustProdStock(String custId) {
		//custProdStockRepository.delete(custId);
	}

}
