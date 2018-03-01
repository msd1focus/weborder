package com.focus.weborder.services.listmobil;

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

import com.focus.weborder.services.custmobil.CustMobilService;
import com.focus.weborder.services.uploadhistory.UploadHistory;
import com.focus.weborder.services.uploadhistory.UploadHistoryService;
import com.focus.weborder.upload.storage.StorageProperties;

@Service
public class ListMobilService {

	@Autowired
	private ListMobilRepository listMobilRepository;

	@Autowired
	StorageProperties storageProperties;
	
	@Autowired
	private ListMobilService listMobilService;

	@Autowired
	public UploadHistoryService uploadHistoryService;

	@Autowired
	public CustMobilService custMobilService;
	
	public List<ListMobil> getListMobils() {
		List<ListMobil> listMobils = 
				listMobilRepository.getAll();
		return listMobils;		
	}
	
	public ListMobil getById(Long mobilId) {
		ListMobil listMobil = 
				listMobilRepository.findOne(mobilId);
		return listMobil;		
	}
	
	public void updateListMobil(List<ListMobil> listMobils) {
		for(ListMobil lm: listMobils) {
			listMobilRepository.save(lm);
		}
	}

	public void deleteAllListMobil() {
		listMobilRepository.deleteAll();
	}
	
	public String syncMasterMobil() {
		String result = "SUCCESS";
		List<ListMobil> listMobilsPrevious =
        		listMobilService.getListMobils();
		List<UploadHistory> uploadHistoriesPrevious = 
				uploadHistoryService.getByTypeStatus("MASTERMOBIL", "USED");
		UploadHistory uploadHistoryPrevious = null;
		if(!uploadHistoriesPrevious.isEmpty()) {
			uploadHistoryPrevious = uploadHistoriesPrevious.get(0);
		}
		String syncListMobil = this.syncListMobil();
		String syncCustMobil = custMobilService.syncCustMobil();
		if(!syncCustMobil.equals("SUCCESS")) {
			this.updateListMobil(listMobilsPrevious);
			List<UploadHistory> uploadHistories = 
					uploadHistoryService.getByTypeStatus("MASTERMOBIL", "USED");
			for(UploadHistory uh: uploadHistories) {
				uh.setUploadStatus("ARCHIVED");
				uploadHistoryService.updateUploadHistory(uh);
			}
			System.out.println("uploadHistoryPrevious: " + uploadHistoryPrevious);
			if(uploadHistoryPrevious!=null) {
				uploadHistoryPrevious.setUploadStatus("USED");
				uploadHistoryService.updateUploadHistory(uploadHistoryPrevious);
			}
			syncListMobil = "Info: return to previous version because syncCustMobil was error";
		}
		result = "[ListMobil]" + syncListMobil + " & [CustMobil]" + syncCustMobil;
		return result;
	}
	
	public String syncListMobil() {
		
		String result = "SUCCESS";
		File folder = new File(storageProperties.getFolders().getMastermobil());
		String csvFile = null;
		File[] files;
		Integer date = 0;
		String fileType = "";
		String fileName = "";
		String status = "USED";
		List<Integer> mobilIdErrors = new ArrayList<>();
		List<Integer> mobilPanjangErrors = new ArrayList<>();
		List<Integer> mobilLebarErrors = new ArrayList<>();
		List<Integer> mobilTinggiErrors = new ArrayList<>();

		if(folder!=null) {
			files = folder.listFiles();
			if(files!=null) {
			    for (File file: files) {
			      if (file.isFile()) {
			    	  if(file.getName().length()==24) {
				    	  if(file.getName().startsWith("mastermobil_")) {
				    		  if(file.getName().endsWith(".csv")) {
				    			  //System.out.println("file.getName().substring(10, 18): " + file.getName().substring(10, 18));
					    		  if(isInteger(file.getName().substring(12, 20))) {
					    			  if(Integer.parseInt(file.getName().substring(12, 20))>=date) {
					    				  date = Integer.parseInt(file.getName().substring(12, 20));
					    				  csvFile = folder.getAbsolutePath() + "/" +  file.getName();
					    				  fileType = "MASTERMOBIL";
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
			        List<ListMobil> listMobilUploads = new ArrayList<>();
			        List<ListMobil> listMobilsPrevious =
			        		listMobilService.getListMobils();
			    	BufferedReader br;
			    	Boolean isListMobilDeleted = false;
			        
			        try{

				        //System.out.println("listMobils: " + listMobils.size());
				        
			        	br = new BufferedReader(new FileReader(csvFile));
			        	Integer lineNumber = 0;
			        	
			            while ((line = br.readLine()) != null) {	
			                //System.out.println("line: " + line);
			                if(lineNumber>0) {
				                String[] asListMobil = line.split(cvsSplitBy);
				                Long mobilId = (long)0;
				                if(isInteger(asListMobil[0].trim())) {
				                	mobilId = Long.parseLong(asListMobil[0].trim());
				                }
				                else {
				                	status = "ERROR";
						            mobilIdErrors.add(lineNumber);
				                }	      		
				                String mobilDesc = asListMobil[1].trim();
				                Double mobilPanjang = (double)0;
				                if(isInteger(asListMobil[2].trim())) {
				                	mobilPanjang = Double.parseDouble(asListMobil[2].trim());
				                }
				                else {
				                	status = "ERROR";
						            mobilPanjangErrors.add(lineNumber);
				                }	
				                Double mobilLebar = (double)0;
				                if(isInteger(asListMobil[3].trim())) {
				                	mobilLebar = Double.parseDouble(asListMobil[3].trim());
				                }
				                else {
				                	status = "ERROR";
						            mobilLebarErrors.add(lineNumber);
				                }	
				                Double mobilTinggi = (double)0;
				                if(isInteger(asListMobil[4].trim())) {
				                	mobilTinggi = Double.parseDouble(asListMobil[4].trim());
				                }
				                else {
				                	status = "ERROR";
						            mobilTinggiErrors.add(lineNumber);
				                }	

				                
				                if(status.equals("USED")) {
				                	ListMobil listMobil = new ListMobil();
				                	listMobil.setMobilId(mobilId);
				                	listMobil.setMobilDesc(mobilDesc);
				                	listMobil.setMobilPanjang(mobilPanjang);
				                	listMobil.setMobilLebar(mobilLebar);
				                	listMobil.setMobilTinggi(mobilTinggi);
				                	listMobilUploads.add(listMobil);
				                }
			                }  
			            	lineNumber++;
			            }
				        
				        if(status.equals("USED")) {
				        	
					        this.deleteAllListMobil();
					        isListMobilDeleted = true;
					        //System.out.println("delete all");
					        this.updateListMobil(listMobilUploads);
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
			            if(isListMobilDeleted && (!listMobilsPrevious.isEmpty())) {
			            	this.updateListMobil(listMobilsPrevious);
			            }
			        }
			    }
			    else {
		            status = "ERROR";
			    	result = "Error: master_mobil file in " + folder + " directory is not found. File must have mastermobil_yyyymmdd.csv format";
			    }
		    }      
		    else {
	            status = "ERROR";
		    	result = "Error: " + storageProperties.getFolders().getMastermobil() + " directory is not found.";
		    }
		}
		

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
				if(mobilPanjangErrors.size()>0) {
					error += "mobil_panjang tidak valid pada baris ";
					for(Integer ce: mobilPanjangErrors) {
						error += ce;
						if(ce!=mobilPanjangErrors.size()){
							error += ", ";
						}
						else {
							error += "; ";
						}
					}
					//status = "ERROR";
				}
				if(mobilLebarErrors.size()>0) {
					error += "mobil_lebar tidak valid pada baris ";
					for(Integer ce: mobilLebarErrors) {
						error += ce;
						if(ce!=mobilLebarErrors.size()){
							error += ", ";
						}
						else {
							error += "; ";
						}
					}
					//status = "ERROR";
				}
				if(mobilTinggiErrors.size()>0) {
					error += "mobil_tinggi tidak valid pada baris ";
					for(Integer ce: mobilTinggiErrors) {
						error += ce;
						if(ce!=mobilTinggiErrors.size()){
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
					uploadHistoryService.getByTypeStatus("MASTERMOBIL", "USED");
			
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
			result = "INFO: No mastermobil file on " 
					+ folder.getAbsolutePath();
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

}
