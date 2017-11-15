package com.focus.weborder.services.product;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
	
	@Autowired
	private ProductRepository productRepository;
	
	public List<Product> getAllProducts() {
		List<Product> products = 
				productRepository.getAll();
		return products;		
	}
	
	public Product getProduct(String company, String productCode) {
		return productRepository.getByCompanyProductcode(company, productCode);
	}
	
	public void addProduct(Product product) {
		productRepository.save(product);
	}
	
	public void updateProduct(Product product) {
		productRepository.save(product);
	}
	
	public void deleteProduct(String prodId) {
		productRepository.delete(prodId);
	}
	
}
