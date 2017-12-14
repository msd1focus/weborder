package com.focus.weborder.services.inputproduct;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.focus.weborder.types.InputProduct;

@RestController
@RequestMapping("/rest")
public class InputProductController {

	@Autowired
	private InputProductService inputProductService;
	
	@RequestMapping("/inputproduct")
	public List<InputProduct> getInputProduct(
			@RequestParam String company,
			@RequestParam Long custid,
			@RequestParam(value="orderid1", required=false) Long orderid1,
			@RequestParam(value="orderid2", required=false) Long orderid2,
			@RequestParam(value="orderid3", required=false) Long orderid3,
			@RequestParam(value="orderid4", required=false) Long orderid4,
			@RequestParam(value="orderid5", required=false) Long orderid5,
			@RequestParam(value="periodecurrent", required=false) String periodecurrent){
		return inputProductService.getInputProduct(
				company, 
				custid, 
				orderid1, 
				orderid2, 
				orderid3, 
				orderid4, 
				orderid5, 
				periodecurrent);			
	}

}
