package com.focus.weborder.services.produom;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest")
public class ProdUomController {

	@Autowired
	ProdUomService prodUomService;
	
	@RequestMapping("/produom")
	public List<ProdUom> getProdUom(@RequestParam String company,
			@RequestParam String productcode){
		return prodUomService.getProdUom(company, productcode);
	}

}
