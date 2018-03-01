package com.focus.weborder.services.custmobil;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.focus.weborder.services.customer.Customer;
import com.focus.weborder.services.customer.CustomerService;
import com.focus.weborder.services.listmobil.ListMobil;
import com.focus.weborder.services.listmobil.ListMobilService;
import com.focus.weborder.services.uploadhistory.UploadHistory;
import com.focus.weborder.services.uploadhistory.UploadHistoryService;
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

	@Autowired
	public UploadHistoryService uploadHistoryService;
	
	public List<CustMobil> getAll(){
		return (List<CustMobil>) custMobilRepository.findAll();
	}
			
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
		
		String result = "SUCCESS";
		
		File folder = new File(storageProperties.getFolders().getMobilcustomer());
		String csvFile = null;
		File[] files;
		Integer date = 0;
		String fileType = "";
		String fileName = "";
		String status = "USED";
		List<Integer> companyErrors = new ArrayList<>();
		List<Integer> custIdErrors = new ArrayList<>();
		List<Integer> mobilIdErrors = new ArrayList<>();
		if(folder!=null) {
			files = folder.listFiles();
			if(files!=null) {
			    for (File file: files) {
			      if (file.isFile()) {
			    	  if(file.getName().length()==22) {
				    	  if(file.getName().startsWith("custmobil_")) {
				    		  if(file.getName().endsWith(".csv")) {
				    			  //System.out.println("file.getName().substring(10, 18): " + file.getName().substring(10, 18));
					    		  if(isInteger(file.getName().substring(10, 18))) {
					    			  if(Integer.parseInt(file.getName().substring(10, 18))>=date) {
					    				  date = Integer.parseInt(file.getName().substring(10, 18));
					    				  csvFile = folder.getAbsolutePath() + "/" +  file.getName();
					    				  fileType = "CUSTMOBIL";
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
			        List<CustMobil> custMobilUploads = new ArrayList<>();
			        List<CustMobil> custMobils = new ArrayList<>();
			        List<CustMobil> custMobilsPrevious =
			        		this.getAll();
			        Long custMobilId = (long)1;
			    	BufferedReader br;
			    	Boolean isCustMobilDeleted = false;
			    	
			        try{

			        	List<Customer> customers =
				        		customerService.getAllCustomers();
				        //System.out.println("customers: " + customers.size());
				        List<ListMobil> listMobils =
				        		listMobilService.getListMobils();
				        //System.out.println("listMobils: " + listMobils.size());
				        
			        	br = new BufferedReader(new FileReader(csvFile));
			        	Integer lineNumber = 0;
			        	
			            while ((line = br.readLine()) != null) {	
			                //System.out.println("line: " + line);
			                if(lineNumber>0) {
				                String[] asCustMobil = line.split(cvsSplitBy);
				                String company = asCustMobil[0].trim();
				                Long custId = Long.parseLong(asCustMobil[2].trim());
				                Long mobilId = Long.parseLong(asCustMobil[4].trim());
				                
				                if(!(company.equals("FDI") 
				                		|| company.equals("FDN"))) {   
						            status = "ERROR";
				                	companyErrors.add(lineNumber);
				                }
				                else {
					                //System.out.println("custId: " + custId);
					                //System.out.println("customers: " + customers.size());
					                if(!isCustomerValid(company, custId, customers)) {
					                	//System.out.println("!isCustomerValid: " + custId);
							            status = "ERROR";
							            custIdErrors.add(lineNumber);
					                }
				                }
				                
				                if(!isMobilValid(mobilId, listMobils)) {
				                	//System.out.println("!isMobilValid: " + mobilId);
						            status = "ERROR";
						            mobilIdErrors.add(lineNumber);
				                }
				                
				                if(status.equals("USED")) {
				                	CustMobil custMobil = new CustMobil();
				                	custMobil.setCustMobilId(custMobilId);
				                	custMobil.setCompany(company);
				                	custMobil.setCustId(custId);
				                	custMobil.setMobilId(mobilId);
				                	custMobilUploads.add(custMobil);
				                	custMobils.add(custMobil);
				                	custMobilId++;
				                }
			                }  
			            	lineNumber++;
			            }
			            
				        //System.out.println("custMobils: " + custMobils);
				        
				        if(status.equals("USED")) {
				        	
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
					        	/*else {
					                System.out.println("isContain: " + c.getCompany() + c.getCustId());
					        	}*/
					        }
					        //System.out.println("custMobilUploads: " + custMobilUploads.size());
					        //System.out.println("custMobil: " + custMobils.size());
					        this.deleteAllCustMobil();
					        //System.out.println("delete all");
					        this.updateCustMobil(custMobils);
					        //System.out.println("insert custMobild done!");
				        	
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
			            if(isCustMobilDeleted && (!custMobilsPrevious.isEmpty())) {
			            	this.updateCustMobil(custMobilsPrevious);
			            }
			        }
			    }
			    else {
		            status = "ERROR";
			    	result = "Error: cust_mobil file in " + folder + " directory is not found. File must have custmobil_yyyymmdd.csv format";
			    }
		    }      
		    else {
	            status = "ERROR";
		    	result = "Error: " + storageProperties.getFolders().getMobilcustomer() + " directory is not found.";
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
						if(ce!=companyErrors.size()){
							error += ", ";
						}
						else {
							error += "; ";
						}
					}
					//status = "ERROR";
				}
				if(custIdErrors.size()>0) {
					error += "cust_id tidak valid pada baris ";
					for(Integer cie: custIdErrors) {
						error += cie;
						if(cie!=custIdErrors.size()){
							error += ", ";
						}
						else {
							error += "; ";
						}
					}
					//status = "ERROR";
				}
				if(mobilIdErrors.size()>0) {
					error += "mobil_id tidak valid pada baris ";
					for(Integer ce: mobilIdErrors) {
						error += ce;
						if(ce!=mobilIdErrors.size()){
							error += ", ";
						}
						else {
							error += "; ";
						}
					}
					//status = "ERROR";
				}
			}
			/*else {
				status = "ERROR";
			}*/
			
			List<UploadHistory> uploadHistoryUseds =
					uploadHistoryService.getByTypeStatus("CUSTMOBIL", "USED");
			
			if(status.equals("ERROR")) {
				result = error;
			}
			uploadHistory.setUploadStatus(status);
			//System.out.println("result: " + result);
			if(result.length()>500) {
				result = result.substring(0, 499);
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
			result = "INFO: No custmobil file on " 
					+ folder.getAbsolutePath();
		}
		
        return result;
	}
	
	private Boolean isCustomerValid(
			String company,
			Long custId, 
			List<Customer> customers) {
		Boolean isValid = false;
		for(Customer c: customers) {
			//System.out.println("c.getCustId(): " + c.getCustId());
			if(c.getCompany().equals(company)
					&& c.getCustId().equals(custId)) {
				//System.out.println("valid: " + custId);
				isValid = true;
				break;
			}
		}
		return isValid;
	}
	
	private Boolean isMobilValid(
			Long mobilId, List<ListMobil> listMobils) {
		Boolean isValid = false;
		for(ListMobil lm: listMobils) {
			if(lm.getMobilId()==mobilId) {
				isValid = true;
				break;
			}
		}
		return isValid;
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
