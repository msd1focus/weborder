package com.focus.weborder.services.product;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest")
public class ProductController {

	@Autowired
	private ProductService productService;
	
	@RequestMapping("/products")
	public List<Product> getAllProducts() {
		return productService.getAllProducts();
	}
	
	@RequestMapping("/product")
	public Product getProduct(@RequestParam String company,
			@RequestParam String productcode){
		return productService.getProduct(company, productcode);
	}
	
	@RequestMapping(method=RequestMethod.POST, value="/products")
	public void addProduct(@RequestBody Product product){
		productService.addProduct(product);
	}
	
	@RequestMapping(method=RequestMethod.PUT, value="/products")
	public void updateProduct(@RequestBody Product product){
		productService.updateProduct(product);
	}
	
	@RequestMapping(method=RequestMethod.DELETE, value="/products/{prodId}")
	public void deleteProduct(@PathVariable String prodId){
		productService.deleteProduct(prodId);
	}
	
}
