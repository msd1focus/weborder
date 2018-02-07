package com.focus.weborder.services.custmobil;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.focus.weborder.services.customer.Customer;
import com.focus.weborder.services.customer.CustomerService;
import com.focus.weborder.services.listmobil.ListMobil;
import com.focus.weborder.services.listmobil.ListMobilService;
import com.focus.weborder.services.uploadhistory.UploadHistory;
import com.focus.weborder.upload.storage.StorageProperties;

@Service
public class CustMobilService {

	@Autowired
	private CustMobilRepository custMobilRepository;
	
	@Autowired
	private CustomerService customerService;
	
	@Autowired
	private ListMobilService listMobilService;
	
	@Autowired
	StorageProperties storageProperties;
	
	public List<CustMobil> getByCompanyCustid(
			String company,
			Long custId){
		List<CustMobil> custMobils =
				custMobilRepository.getByCompanyCustid(company, custId);
		return custMobils;
	}
	
	public void updateCustMobil(List<CustMobil> custMobils) {
		for(CustMobil cm: custMobils) {
			custMobilRepository.save(cm);
		}
	}
	
	public void deleteCustMobil(List<Long> custMobilIds) {
		for(Long custMobilId: custMobilIds) {
			custMobilRepository.delete(custMobilId);
		}
	}
	
	public void deleteAllCustMobil() {
		custMobilRepository.deleteAll();
	}
	
	public String syncCustMobil() {
		
		String result = "Success";
		
		File folder = new File(storageProperties.getFolders().getMobilcustomer());
		String csvFile = null;
		File[] files;
		//Integer year = 0;
		//Integer month = 0;
		//Integer day = 0;
		Integer date = 0;
		if(folder!=null) {
			files = folder.listFiles();
			if(files!=null) {
			    for (File file: files) {
			      if (file.isFile()) {
			    	  if(file.getName().length()==22) {
				    	  if(file.getName().startsWith("custmobil_")) {
				    		  if(file.getName().endsWith(".csv")) {
				    			  System.out.println("file.getName().substring(10, 18): " + file.getName().substring(10, 18));
					    		  if(isInteger(file.getName().substring(10, 18))) {
					    			  if(Integer.parseInt(file.getName().substring(10, 18))>=date) {
					    				  date = Integer.parseInt(file.getName().substring(10, 18));
					    				  csvFile = folder.getAbsolutePath() + "/" +  file.getName();
					    			  }		  
					    			  /*System.out.println("year: " + file.getName().substring(10, 14) + " - " + year);
					    			  if(Integer.parseInt(file.getName().substring(10, 14))>=year) {
					    				  year = Integer.parseInt(file.getName().substring(10, 14));
						    			  System.out.println("month: " + file.getName().substring(15, 16) + " - " + month);
					    				  if(Integer.parseInt(file.getName().substring(15, 16))>=month) {
					    					  month = Integer.parseInt(file.getName().substring(15, 16));
							    			  System.out.println("day: " + file.getName().substring(17, 18) + " - " + day);
					    					  if(Integer.parseInt(file.getName().substring(17, 18))>=day) {
					    						  day = Integer.parseInt(file.getName().substring(17, 18));
										    	  csvFile = folder.getAbsolutePath() + "/" +  file.getName();	  
							    			  }
						    			  }
					    			  } */ 			  
					    		  }
				    		  }
				    	  }
			    	  }
			      }
			    }		    
			    if(csvFile!=null) {
					System.out.println("csvFile: " + csvFile);
			        String line = "";
			        String cvsSplitBy = ",";
			        List<CustMobil> custMobilUploads = new ArrayList<>();
			        List<CustMobil> custMobils = new ArrayList<>();
			        Long custMobilId = (long)1;
			    	BufferedReader br;
			    	
			        try{

			        	br = new BufferedReader(new FileReader(csvFile));
			            while ((line = br.readLine()) != null) {

			                System.out.println("line: " + line);
			                String[] asCustMobil = line.split(cvsSplitBy);
			                if(asCustMobil[0].trim().equals("FDI") 
			                	|| asCustMobil[0].trim().equals("FDN")) {
			                	CustMobil custMobil = new CustMobil();
			                	custMobil.setCustMobilId(custMobilId);
			                	custMobil.setCompany(asCustMobil[0].trim());
			                	custMobil.setCustId(Long.parseLong(asCustMobil[2].trim()));
			                	custMobil.setMobilId(Long.parseLong(asCustMobil[4].trim()));
			                	custMobilUploads.add(custMobil);
			                	custMobils.add(custMobil);
			                	custMobilId++;
			                }
			            }
			            
			            List<Customer> customers =
				        		customerService.getAllCustomers();
				        System.out.println("customers: " + customers.size());
				        List<ListMobil> listMobils =
				        		listMobilService.getListMobils();
				        System.out.println("listMobils: " + listMobils.size());
				        System.out.println("custMobils: " + custMobils);
				        
				        for(Customer c: customers) {
				        	Boolean isContain = 
				        			this.isContainInArray(
				        					c.getCompany(), c.getCustId(), custMobilUploads);
				        	
				        	if(!isContain){
				        		for(ListMobil lm: listMobils) {
				        			CustMobil custMobil = new CustMobil();
				                	custMobil.setCustMobilId(custMobilId);
				                	custMobil.setCompany(c.getCompany());
				                	custMobil.setCustId(c.getCustId());
				                	custMobil.setMobilId(lm.getMobilId());
				                	custMobils.add(custMobil);
				                	custMobilId++;
				        		}
				        	}
				        	else {
				                System.out.println("isContain: " + c.getCompany() + c.getCustId());
				        	}
				        }
				        System.out.println("custMobilUploads: " + custMobilUploads.size());
				        System.out.println("custMobil: " + custMobils.size());
				        this.deleteAllCustMobil();
				        System.out.println("delete all");
				        this.updateCustMobil(custMobils);
				        System.out.println("insert custMobild done!");
				        
				        File arc = new File(folder.getAbsolutePath() + "/arc/");
				        
				        if (!arc.exists()) {
				            if (arc.mkdirs()) {
				                System.out.println("Arc directory are created!");
				            } else {
				                System.out.println("Failed to create arc directory!");
				            }
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
			            result = "Error: " + e.getMessage();
			        }
			    }
			    else {
			    	result = "Error: cust_mobil file in " + folder + " directory is not found. File must have custmobil_yyyymmdd.csv format";
			    }
		    }      
		    else {
		    	result = "Error: " + storageProperties.getFolders().getMobilcustomer() + " directory is not found.";
		    }
		}
		else {
			result = "Error: " + storageProperties.getFolders().getMobilcustomer() + " directory is not found.";
		}
		
        return result;
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
	
	private Boolean isContainInArray(
			String company,
			Long custId,
			List<CustMobil> custMobils) {
		Boolean isContain = false;
		
		for(CustMobil cm: custMobils) {
			if(cm.getCompany().equals(company)
				&& cm.getCustId().equals(custId)) {
				isContain = true;
				break;
			}
		}
		
		return isContain;
	}
 
}
