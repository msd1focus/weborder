package com.focus.weborder.services.custprodstock;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.focus.weborder.services.customer.Customer;
import com.focus.weborder.services.customer.CustomerService;
import com.focus.weborder.services.custprod.CustProd;
import com.focus.weborder.services.custprod.CustProdService;
import com.focus.weborder.services.uploadhistory.UploadHistory;
import com.focus.weborder.services.uploadhistory.UploadHistoryService;
import com.focus.weborder.upload.storage.StorageProperties;

@Service
public class CustProdStockService {

	@Autowired
	private CustProdStockRepository custProdStockRepository;
	
	@Autowired
	StorageProperties storageProperties;

	@Autowired
	private CustomerService customerService;
	
	@Autowired
	private CustProdService custProdService;

	@Autowired
	private UploadHistoryService uploadHistoryService;
	
	private List<String> validMonths =
			Arrays.asList("JAN", "FEB", "MAR", "APR", "MAY", "JUN",
			"JUL", "AUG", "SEP", "OCT", "NOV", "DEC");
	
	public List<CustProdStock> getAllCustProdStocks() {
		List<CustProdStock> custProdStocks = 
				custProdStockRepository.getAll();
		return custProdStocks;		
	}

	public CustProdStock getByCompanyCustidProductcodePeriodestock(
			String company, Long custId,
			String productCode, String periodeStock) {
		CustProdStock custProdStock = 
				custProdStockRepository.getByCompanyCustidProductcodePeriodestock(
						company, custId, 
						productCode, periodeStock);
		return custProdStock;		
	}
	
	public List<CustProdStock> getByCompanyCustidProductcode(
			String company, Long custId,
			String productCode) {
		List<CustProdStock> custProdStocks = 
				custProdStockRepository.getByCompanyCustidProductcode(
						company, custId, 
						productCode);
		return custProdStocks;		
	}
	
	public CustProdStock getByCompanyCustidProductcodeLastperiode(
			String company, Long custId,
			String productCode) {
		CustProdStock custProdStock = null;
		List<CustProdStock> custProdStocks = 
				custProdStockRepository.getByCompanyCustidProductcode(
						company, custId, 
						productCode);
		String lastPeriode = null;
		for(CustProdStock cps: custProdStocks) {	
			if(lastPeriode==null) {
				custProdStock = cps;
				lastPeriode = cps.getPeriodeStock();
			}
			else {
				if(isNewestPeriode(cps.getPeriodeStock(), lastPeriode)) {
					custProdStock = cps;
					lastPeriode = cps.getPeriodeStock();
				}
			}
		}
		return custProdStock;		
	}
	
	public void addCustProdStock(CustProdStock custProdStock) {
		//custProdStockRepository.save(custProdStock);
	}
	
	public void updateCustProdStock(List<CustProdStock> custProdStocks) {
		for(CustProdStock cps: custProdStocks) {
			custProdStockRepository.save(cps);
		}
	}
	
	public void deleteCustProdStock(String custId) {
		//custProdStockRepository.delete(custId);
	}
	
	private Boolean isNewestPeriode(
			String checkPeriode,
			String refPeriode) {
		Boolean isNewest = false;
		Integer checkYear = 
					Integer.parseInt(
							checkPeriode.substring(4,8));
		Integer refYear = 
				Integer.parseInt(
						checkPeriode.substring(4,8));
		Integer checkMonth = 
				validMonths.indexOf(
						checkPeriode.substring(0,3));
		Integer refMonth = 
				validMonths.indexOf(
						checkPeriode.substring(0,3));
		System.out.println("checkYear: " + checkYear);
		System.out.println("checkMonth: " + checkMonth);
		if(checkYear>=refYear) {
			if(checkMonth>refMonth) {
				isNewest = true;
			}
		}
		return isNewest;
	}
	
	public String syncCustProdStock() {
		
		String result = "SUCCESS";
		
		File folder = new File(storageProperties.getFolders().getStock());
		String csvFile = null;
		File[] files;
		Integer date = 0;
		String fileType = "";
		String fileName = "";
		String status = "USED";
		List<Integer> companyErrors = new ArrayList<>();
		List<Integer> custIdErrors = new ArrayList<>();
		List<Integer> custNumberErrors = new ArrayList<>();
		List<Integer> custIdNumberErrors = new ArrayList<>();
		List<Integer> productCodeErrors = new ArrayList<>();
		List<Integer> periodeStockErrors = new ArrayList<>();
		List<Integer> endStockErrors = new ArrayList<>();
		if(folder!=null) {
			files = folder.listFiles();
			if(files!=null) {
			    for (File file: files) {
			      if (file.isFile()) {
			    	  if(file.getName().length()==18) {
				    	  if(file.getName().startsWith("stock_")) {
				    		  if(file.getName().endsWith(".csv")) {
				    			  //System.out.println("file.getName().substring(10, 18): " + file.getName().substring(10, 18));
					    		  if(isInteger(file.getName().substring(6,14))) {
					    			  if(Integer.parseInt(file.getName().substring(6, 14))>=date) {
					    				  date = Integer.parseInt(file.getName().substring(6, 14));
					    				  csvFile = folder.getAbsolutePath() + "/" +  file.getName();
					    				  fileType = "STOCK";
					    				  fileName = file.getName();
					    			  }	  
					    		  }
				    		  }
				    	  }
			    	  }
			      }
			    }		    
			    if(csvFile!=null) {
					//System.out.println("csvFile: " + csvFile);
			        String line = "";
			        String cvsSplitBy = ",";
			        List<CustProdStock> custProdStockUploads = new ArrayList<>();
			    	BufferedReader br;
			    	
			        try{

			        	List<Customer> customers =
				        		customerService.getAllCustomers();
				        //System.out.println("customers: " + customers.size());
			        	List<Customer> customerValids =
			        			new ArrayList<>();
			        	List<CustProd> custProdValids =
			        			new ArrayList<>();
				        //System.out.println("listMobils: " + listMobils.size());
				        
			        	br = new BufferedReader(new FileReader(csvFile));
			        	Integer lineNumber = 0;
			        	
			            while ((line = br.readLine()) != null) {	
			                //System.out.println("line: " + line);
			            	Boolean isCustomerValid = false;
			                if(lineNumber>0) {
				                String[] asCustProdStock = line.split(cvsSplitBy);
				                String company = asCustProdStock[0].trim();
				                String productCode = asCustProdStock[1].trim();
				                String custNumber = 
				                		asCustProdStock[2].trim().toUpperCase();
				                Long custId = (long)0;
				                if(!isInteger(asCustProdStock[3].trim())) {
				                	status = "ERROR";
				                	custIdErrors.add(lineNumber);
				                }
				                else {
				                	custId = Long.parseLong(asCustProdStock[3].trim());
				                }
				                String periodeStock = asCustProdStock[4].trim().toUpperCase();
				                Double endStock = (double)0;
				                if(!isInteger(asCustProdStock[5].trim())) {
				                	status = "ERROR";
				                	endStockErrors.add(lineNumber);
				                }
				                else {
				                	endStock = Double.parseDouble(asCustProdStock[5].trim());
				                }

				                if(!(company.equals("FDI") 
				                		|| company.equals("FDN"))) {   
						            status = "ERROR";
				                	companyErrors.add(lineNumber);
				                }
				                else{
				                	
				                	Boolean isCustIdValid = false;
				                	if(custId!=0) {
					                	if(!isCustIdContainInArray(company, custId, customerValids)) {
						                	if(!isCustIdContainInArray(company, custId, customers)) {
							                	//System.out.println("!isCustomerValid: " + custId);
									            status = "ERROR";
									            custIdErrors.add(lineNumber);
							                }
							                else {
							                	isCustIdValid = true;
							                }
					                	}
					                	else {
					                		isCustIdValid = true;
					                	}		
				                	}
				                	

				                	Boolean isCustNumberValid = false;
				                	if(!isCustNumberContainInArray(company, custNumber, customerValids)) {
					                	if(!isCustNumberContainInArray(company, custNumber, customers)) {
								            status = "ERROR";
								            custNumberErrors.add(lineNumber);
						                }
						                else {
						                	isCustNumberValid = true;
						                }
				                	}
				                	else {
				                		isCustNumberValid = true;
				                	}

				                	Boolean isCustIdNumberValid = false;
				                	if(isCustIdValid && isCustNumberValid) {
					                	if(!isCustIdNumberContainInArray(company, custId, custNumber, customerValids)) {
						                	if(!isCustIdNumberContainInArray(company, custId, custNumber, customers)) {
									            status = "ERROR";
									            custIdNumberErrors.add(lineNumber);
							                }
							                else {
							                	isCustIdNumberValid = true;
							                }
					                	}
					                	else {
					                		isCustIdNumberValid = true;
					                	}
				                		
				                	}
				                	
					                if(isCustIdNumberValid) {
					                	isCustomerValid = true;
					                	for(Customer c: customers) {
					                		if(isCustIdContainInArray(company, custId, customerValids)) {
						                		customerValids.add(c);
						                		break;
					                		}
					                	}
					                }
				                }
				                
				                if(!isPeriodeValid(periodeStock)) {
				                	status = "ERROR";
					        		periodeStockErrors.add(lineNumber);
				                } 
				                productCode = validateProductCode(productCode);
				                Boolean isCustProd = false;
				                if(!isCustProdContainInArray(
				                		company, custId, productCode, custProdValids)) {
					                if(isCustomerValid) {
					                	List<CustProd> custProds =
								        		custProdService.getCustProd(company, custId);
								        for(CustProd cp: custProds) {
								        	if(isCustProdValid(company, custId, productCode, cp)) {
								        		isCustProd = true;
								        		custProdValids.add(cp);
								        		break;
								        	}
								        }
					                }
					                else {
					                	isCustProd = true;
					                }
				                }
				                
				                if(!isCustProd) {
				                	status = "ERROR";
					        		productCodeErrors.add(lineNumber);
				                }
				                
				                //System.out.println("custProdValids" + custProdValids.size());
				                
				                if(status.equals("USED")) {
				                	CustProdStock custProdStock = new CustProdStock();
				                	custProdStock.setCompany(company);
				                	custProdStock.setCustId(custId);
				                	custProdStock.setCustNumber(custNumber);
				                	custProdStock.setProductCode(productCode);
				                	custProdStock.setPeriodeStock(periodeStock);
				                	custProdStock.setEndStock(endStock);
				                	custProdStockUploads.add(custProdStock);
				                }
			                }  
			            	lineNumber++;
			            }
			            
				        //System.out.println("custMobils: " + custMobils);
				        
				        if(status.equals("USED")) {
				        	
					        this.updateCustProdStock(custProdStockUploads);
				        	
				        }
				        
				        File arc = new File(folder.getAbsolutePath() + "/arc/");
				        
				        if (!arc.exists()) {
				        	arc.mkdirs();
				            /*if (arc.mkdirs()) {
				                System.out.println("Arc directory are created!");
				            } else {
				                System.out.println("Failed to create arc directory!");
				            }*/
				        }
				        
				        for(File file: files) {
				        	if (file.isFile()) {  		
								 Files.move(
										 Paths.get(folder.getAbsolutePath() + "/" + file.getName()),
										 Paths.get(folder.getAbsolutePath() + "/arc/" + file.getName()),
										 StandardCopyOption.REPLACE_EXISTING);
						    }
				        }
				        
			        } catch (IOException e) {
			            e.printStackTrace();
			            status = "ERROR";
			            result = "Error: " + e.getMessage();
			        }
			    }
			    else {
		            status = "ERROR";
			    	result = "Error: cust_prod_stock file in " + folder + " directory is not found. File must have stock_yyyymmdd.csv format";
			    }
		    }      
		    else {
	            status = "ERROR";
		    	result = "Error: " + storageProperties.getFolders().getStock() + " directory is not found.";
		    }
		}
		/*else {
            status = "ERROR";
			result = "Error: " + storageProperties.getFolders().getMobilcustomer() + " directory is not found.";
		}*/
		

		if(!fileName.trim().equals("")) {
			
			List<UploadHistory> uploadHistories = 
	        		uploadHistoryService.getByTypeStatus(fileType, "UPLOADED");
			UploadHistory uploadHistory = new UploadHistory();
			Date dt = new Date();
			//System.out.println("fileName: " + fileName);
			if(uploadHistories!=null) {
				for(UploadHistory uh: uploadHistories) {
					//System.out.println("uh.getUploadFileName(): " + uh.getUploadFileName());
					if(uh.getUploadFileName().trim().equals(fileName.trim())) {
						uploadHistory = uh;
					}
					else {
						uh.setUploadStatus("ARCHIVED");
						uh.setProcessedTime(dt);
						uploadHistoryService.updateUploadHistory(uh);
					}
				}
			}
			
			uploadHistory.setProcessedTime(dt);
			
			String error = "ERROR: ";
			if(status=="ERROR") {
				if(companyErrors.size()>0) {
					error += "company tidak valid pada baris ";
					for(Integer ce: companyErrors) {
						error += ce;
						if(ce!=(companyErrors.size())){
							error += ",";
						}
						else {
							error += ";";
						}
					}
					//status = "ERROR";
				}
				if(custIdErrors.size()>0) {
					error += "cust_id tidak valid pada baris ";
					for(Integer cie: custIdErrors) {
						error += cie;
						if(cie!=(custIdErrors.size())){
							error += ",";
						}
						else {
							error += ";";
						}
					}
					//status = "ERROR";
				}
				if(custNumberErrors.size()>0) {
					error += "cust_number tidak valid pada baris ";
					for(Integer cne: custNumberErrors) {
						error += cne;
						if(cne!=(custNumberErrors.size())){
							error += ",";
						}
						else {
							error += ";";
						}
					}
					//status = "ERROR";
				}
				if(custIdNumberErrors.size()>0) {
					error += "cust_id dan cust_number tidak sesuai pada baris ";
					for(Integer cine: custIdNumberErrors) {
						error += cine;
						if(cine!=(custIdNumberErrors.size())){
							error += ",";
						}
						else {
							error += ";";
						}
					}
					//status = "ERROR";
				}
				if(productCodeErrors.size()>0) {
					error += "product_code tidak valid pada baris ";
					for(Integer pce: productCodeErrors) {
						error += pce;
						if(pce!=(productCodeErrors.size())){
							error += ",";
						}
						else {
							error += ";";
						}
					}
					//status = "ERROR";
				}
				if(periodeStockErrors.size()>0) {
					error += "periode_stock tidak valid pada baris ";
					for(Integer pse: periodeStockErrors) {
						error += pse;
						if(pse!=(periodeStockErrors.size())){
							error += ",";
						}
						else {
							error += ";";
						}
					}
					//status = "ERROR";
				}
				if(endStockErrors.size()>0) {
					error += "end_stock tidak valid pada baris ";
					for(Integer ese: endStockErrors) {
						error += ese;
						if(ese!=(endStockErrors.size())){
							error += ",";
						}
						else {
							error += ";";
						}
					}
					//status = "ERROR";
				}
			}
			/*else {
				status = "ERROR";
			}*/
			
			List<UploadHistory> uploadHistoryUseds =
					uploadHistoryService.getByTypeStatus("STOCK", "USED");
			
			if(status.equals("ERROR")) {
				result = error;
			}
			uploadHistory.setUploadStatus(status);
			//System.out.println("result: " + result);
			if(result.length()>500) {
				result = result.substring(0, 500);
			}
			uploadHistory.setUploadDescription(result);
			uploadHistoryService.updateUploadHistory(uploadHistory);
			
			if(!status.equals("ERROR")) {
				for(UploadHistory up: uploadHistoryUseds) {
					up.setUploadStatus("ARCHIVED");
					uploadHistoryService.updateUploadHistory(up);
				}
			}
			
		}
		else {
			result = "INFO: No stock file on " 
					+ folder.getAbsolutePath();
		}
		
        return result;
	}
	
	private String validateProductCode(String productCode) {
		if(productCode.length()<9) {
        	productCode = "0" + productCode;
        	if(productCode.length()<8) {
            	productCode = "0" + productCode;
            	if(productCode.length()<7) {
                	productCode = "0" + productCode;
                	if(productCode.length()<6) {
	                	productCode = "0" + productCode;
	                	if(productCode.length()<5) {
		                	productCode = "0" + productCode;
		                	if(productCode.length()<4) {
			                	productCode = "0" + productCode;
			                	if(productCode.length()<3) {
				                	productCode = "0" + productCode;
				                	if(productCode.length()<2) {
					                	productCode = "0" + productCode;
					                	if(productCode.length()<1) {
						                	productCode = "0" + productCode;
						                }
					                }
				                }
			                }
		                }
	                }
                }
            }
        }
		return productCode;
	}
	
	private Boolean isInteger(String s) {
	    try { 
	        Integer.parseInt(s); 
	    } catch(NumberFormatException e) { 
	        return false; 
	    } catch(NullPointerException e) {
	        return false;
	    }
	    return true;
	}
	
	private Boolean isPeriodeValid(String s) {
		Boolean isValid = true;
		String month = s.substring(0, 3);
		if(!validMonths.contains(month)) {
			isValid = false;
		}
		String year = s.substring(4, 8);
		if(!isInteger(year)) {
			isValid = false;
		}
		return isValid;
	}
	
	private Boolean isCustIdContainInArray(
			String company,
			Long custId,
			List<Customer> customers) {
		Boolean isContain = false;
		
		for(Customer c: customers) {
			if(c.getCompany().equals(company)
				&& c.getCustId().equals(custId)) {
				isContain = true;
				break;
			}
		}
		
		return isContain;
	}
	
	private Boolean isCustNumberContainInArray(
			String company,
			String custNumber,
			List<Customer> customers) {
		Boolean isContain = false;
		
		for(Customer c: customers) {
			if(c.getCompany().equals(company)
				&& c.getCustomerNumber().equals(custNumber)) {
				isContain = true;
				break;
			}
		}
		
		return isContain;
	}

	private Boolean isCustIdNumberContainInArray(
			String company,
			Long custId,
			String custNumber,
			List<Customer> customers) {
		Boolean isContain = false;
		
		for(Customer c: customers) {
			if(c.getCompany().equals(company)
				&& c.getCustId().equals(custId)
				&& c.getCustomerNumber().equals(custNumber)) {
				isContain = true;
				break;
			}
		}
		
		return isContain;
	}

	private Boolean isCustProdContainInArray(
			String company,
			Long custId,
			String productCode,
			List<CustProd> custProds) {
		Boolean isContain = false;
		
		for(CustProd cp: custProds) {
			if(cp.getCompany().equals(company)
				&& cp.getCustId().equals(custId)
				&& cp.getProductCode().equals(productCode)) {
				isContain = true;
				break;
			}
		}
		
		return isContain;
	}
	
	private Boolean isCustProdValid(
				String company,
				Long custId,
				String productCode,
				CustProd custProd){
		Boolean isValid = false;
		if(custProd.getCompany().equals(company)
			&& custProd.getCustId().equals(custId)
			&& custProd.getProductCode().equals(productCode)) {
			isValid = true;
		}
		return isValid;
	}

}
