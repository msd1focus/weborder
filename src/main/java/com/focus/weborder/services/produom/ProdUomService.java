package com.focus.weborder.services.produom;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProdUomService {

	@Autowired
	private ProdUomRepository prodUomRepository;
	
	public List<ProdUom> getProdUom(String company, String productCode) {
		return prodUomRepository.getByCompanyProductcode(company, productCode);
	}

}
