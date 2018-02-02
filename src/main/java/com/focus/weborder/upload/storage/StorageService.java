package com.focus.weborder.upload.storage;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.focus.weborder.services.custprodtarget.CustProdTarget;
//import com.focus.weborder.services.custprodtarget.CustProdTargetPK;
import com.focus.weborder.services.custprodtarget.CustProdTargetService;

import com.focus.weborder.upload.storage.StorageException;

@Service
public class StorageService {
	
	@Autowired
	StorageProperties storageProperties;

//    private static String UPLOADED_FOLDER = "C://dev//";

	@Autowired
	public CustProdTargetService custProdTargetService;
	
    public void store(MultipartFile file) throws IOException {
    	String fileType;
        String filename = StringUtils.cleanPath(file.getOriginalFilename());
        //System.out.println("filename: " + filename);
        if (file.isEmpty()) {
		    throw new StorageException("Failed to store empty file " + filename);
		}
		if (filename.contains("..")) {
		    // This is a security check
		    throw new StorageException(
		            "Cannot store file with relative path outside current directory "
		                    + filename);
		}
        if (!filename.contains(".csv")) {
                throw new StorageException(
                        "File " + filename + " is not csv file");
        }
        fileType = filename.contains("stock")?"stock"
        		  :filename.contains("target")?"target"
        		  :filename.contains("custmobil")?"custmobil"
        		  :"undefined";
            
        byte[] bytes = file.getBytes();
        if (fileType == "target") {
        	Path path = Paths.get(storageProperties.getFolders().getTarget(), file.getOriginalFilename());
            Files.write(path, bytes);
        } else if (fileType == "stock") {
        	Path path = Paths.get(storageProperties.getFolders().getStock(), file.getOriginalFilename());
            Files.write(path, bytes);
        } else if (fileType == "custmobil") {
        	//System.out.println("fileType: " + fileType);
        	//System.out.println("getMobilCustomer: " + storageProperties.getFolders().getMobilcustomer());
        	Path path = Paths.get(storageProperties.getFolders().getMobilcustomer(), file.getOriginalFilename());
        	//System.out.println("path: " + path);
            Files.write(path, bytes);
        } 

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


/*    public void deleteAll() {
        FileSystemUtils.deleteRecursively(rootLocation.toFile());
    }

    public void init() {
        try {
            Files.createDirectories(rootLocation);
        }
        catch (IOException e) {
            throw new StorageException("Could not initialize storage", e);
        }
    }
*/
}
