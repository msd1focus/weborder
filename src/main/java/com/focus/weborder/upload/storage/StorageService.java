package com.focus.weborder.upload.storage;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.focus.weborder.services.custprodtarget.CustProdTarget;
import com.focus.weborder.services.custprodtarget.CustProdTargetService;
import com.focus.weborder.services.uploadhistory.UploadHistory;
import com.focus.weborder.services.uploadhistory.UploadHistoryService;
import com.focus.weborder.upload.storage.StorageException;

@Service
public class StorageService {
	
	@Autowired
	StorageProperties storageProperties;

	@Autowired
	public CustProdTargetService custProdTargetService;

	@Autowired
	public UploadHistoryService uploadHistoryService;
	
    public void store(MultipartFile file, String username) throws IOException {

    	String fileType = "UNKNOWN";
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        String dirTo = "UNKNOWN";
		
        if (file.isEmpty()) {
		    throw new StorageException("Failed to store empty file " + fileName);
		}
		if (fileName.contains("..")) {
		    throw new StorageException(
		            "Cannot store file with relative path outside current directory "
		                    + fileName);
		}
        if (!fileName.contains(".csv")) {
                throw new StorageException(
                        "File " + fileName + " is not csv file");
        }
        fileType = fileName.contains("stock")?"STOCK"
        		  :fileName.contains("target")?"TARGET"
        		  :fileName.contains("custmobil")?"CUSTMOBIL"
        		  :fileName.contains("mastermobil")?"MASTERMOBIL"
        		  :"undefined";
            
        byte[] bytes = file.getBytes();
        if (fileType == "TARGET") {
        	dirTo = storageProperties.getFolders().getTarget();
        	Path path = Paths.get(storageProperties.getFolders().getTarget(), fileName);
            Files.write(path, bytes);
        } else if (fileType == "STOCK") {
        	dirTo = storageProperties.getFolders().getStock();
        	Path path = Paths.get(storageProperties.getFolders().getStock(), fileName);
            Files.write(path, bytes);
        } else if (fileType == "CUSTMOBIL") {
        	dirTo = storageProperties.getFolders().getMobilcustomer();
        	Path path = Paths.get(storageProperties.getFolders().getMobilcustomer(), fileName);
            Files.write(path, bytes);
        } else if (fileType == "MASTERMOBIL") {
        	dirTo = storageProperties.getFolders().getMastermobil();
        	Path path = Paths.get(storageProperties.getFolders().getMastermobil(), fileName);
            Files.write(path, bytes);
        } 
        
        UploadHistory uploadHistory = 
        		uploadHistoryService.getByTypeStatusFileName(fileType, "UPLOADED", fileName);
        if(uploadHistory==null) {
        	uploadHistory = new UploadHistory();
    		uploadHistory.setUploadStatus("UPLOADED");
    		uploadHistory.setUploadFileName(fileName);
    		uploadHistory.setUploadType(fileType);
        }
		uploadHistory.setUploadBy(username);
		uploadHistory.setUploadDirTo(dirTo);
		Date date = new Date();
		uploadHistory.setUploadTime(date);
		uploadHistoryService.updateUploadHistory(uploadHistory);

        //upload to database per rows
/*		String line = null;
		while ((line = reader.readLine()) != null) {
			String[] str = line.split(";");
			if (!(str[0].equals("company"))) {  
				System.out.println(str[0]+"-" + str[1]+"-" + str[2]+"-" + str[3]+"-" + str[4]+"-" + str[5]);
				CustProdTargetPK custProdTargetId = new CustProdTargetPK ();
				custProdTargetId.setCompany(str[0]);
				custProdTargetId.setProductCode(str[1]);
				custProdTargetId.setCustId(Long.parseLong(str[3]));
				custProdTargetId.setPeriodeTarget(str[4]);
				
				CustProdTarget custProdTarget = new CustProdTarget();
				custProdTarget.setCustProdTargetId(custProdTargetId);
				custProdTarget.setCustNumber(str[2]);
				custProdTarget.setTargetSales(Double.parseDouble(str[5]));
				
				custProdTargetService.addCustProdTarget(custProdTarget);
			}
		}
		reader.close();
*/
    }
}
