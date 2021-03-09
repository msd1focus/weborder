package com.focus.weborder.file;

import java.io.IOException;
import java.io.InputStream;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.focus.weborder.parameterdownload.ParameterDownload;
import com.focus.weborder.parameterdownload.ParameterDownloadService;
import com.focus.weborder.parameterdownload.PeriodeDto;
import com.focus.weborder.security.model.User;
import com.focus.weborder.security.service.UserService;
import com.focus.weborder.services.order.Order;
import com.focus.weborder.services.ordergrp.OrderGrp;
import com.focus.weborder.utility.PropertiesReader;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;


@Controller
public class FileController {
	
	static final Logger log= LoggerFactory.getLogger(FileController.class);
	
	@Autowired
    FileService fileService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	ParameterDownloadService parameterDownloadService;
	
	//function Index Download File
	@GetMapping("/downloadFileIndex")
    public String downloadFileIndex(Model model) {
		
		List<ParameterDownload> parameterDownloadList = parameterDownloadService.getAll();
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		
		User user = new User();
		
		if (auth != null) {
			user = userService.findUserByUsername(auth.getName());
		}
        model.addAttribute("parameterList", parameterDownloadService.getListByCompany(user.getCompany()));
        model.addAttribute("custName", user.getCompany()+user.getName());
        
        return "downloadfile";
    }
	
	@GetMapping("/generatePeriode")
	@ResponseBody
	public List<PeriodeDto> multiply(@RequestParam int input) {
		
		List<PeriodeDto> periodeList =  new  ArrayList<PeriodeDto>();
		
		ParameterDownload parameterDownload =  parameterDownloadService.getById(input);
		
		//Periode Daily
		if(parameterDownload.getJenisPeriode().equals("9")) {
			
			Integer lastShow =  parameterDownload.getLastShow();
			if(parameterDownload.getIncCurrent().equals("C-1")) {
				lastShow+=1;
			}
			
			for(int a=0; a < lastShow; a++) {
				PeriodeDto periode =  new PeriodeDto();
		        DateFormat sdf = new SimpleDateFormat("dd MMMM yyyy");  
		        DateFormat formatValue = new SimpleDateFormat("yyyyMMdd");
		        Date today = new Date();  

		        Calendar calendar = Calendar.getInstance();  
		        calendar.setTime(today);  

		        calendar.add(Calendar.DATE, -a);  

		        Date lastDayOfMonth = calendar.getTime();  
		        
		        if(parameterDownload.getIncCurrent().equals("C-1") && a == 0) {
					
				}else {
					 //System.out.println("Tanggal: "+ sdf.format(lastDayOfMonth));  
					 periode.setPeriodeValue(formatValue.format(lastDayOfMonth));
				     periode.setPeriodeString(sdf.format(lastDayOfMonth));
				     periodeList.add(periode);
				}
		       
			}
			
		//Periode Yearly	
		}else if(parameterDownload.getJenisPeriode().equals("1")) {
			
			Integer lastShow =  parameterDownload.getLastShow();
			if(parameterDownload.getIncCurrent().equals("C-1")) {
				lastShow+=1;
			}
			
			for(int a=0; a < lastShow; a++) {
				PeriodeDto periode =  new PeriodeDto();
		        DateFormat sdf = new SimpleDateFormat("yyyy");  
		        DateFormat formatValue = new SimpleDateFormat("yyyy");
		        Date today = new Date();  

		        Calendar calendar = Calendar.getInstance();  
		        calendar.setTime(today);  

		        calendar.add(Calendar.YEAR, -a);  

		        Date lastDayOfMonth = calendar.getTime();  
		        
		        if(parameterDownload.getIncCurrent().equals("C-1") && a == 0) {
					
				}else {
					 //System.out.println("TAHUN: "+ sdf.format(lastDayOfMonth));  
					 periode.setPeriodeValue(formatValue.format(lastDayOfMonth));
				     periode.setPeriodeString(sdf.format(lastDayOfMonth));
				     periodeList.add(periode);
				}
		       
			}
		
		//Periode Monthly (Per 1 Bulan)	
		}else if(parameterDownload.getJenisPeriode().equals("2")) {
			
			Integer lastShow =  parameterDownload.getLastShow();
			if(parameterDownload.getIncCurrent().equals("C-1")) {
				lastShow+=1;
			}
			
			for(int a=0; a < lastShow; a++) {
				PeriodeDto periode =  new PeriodeDto();
		        DateFormat sdf = new SimpleDateFormat("MMMM yyyy");  
		        DateFormat formatValue = new SimpleDateFormat("yyyyMM");
		        Date today = new Date();  

		        Calendar calendar = Calendar.getInstance();  
		        calendar.setTime(today);  

		        calendar.add(Calendar.MONTH, -a);  

		        Date lastDayOfMonth = calendar.getTime();  
		        
		        if(parameterDownload.getIncCurrent().equals("C-1") && a == 0) {
					
				}else {
					 //System.out.println("Bulan: "+ sdf.format(lastDayOfMonth));  
					 periode.setPeriodeValue(formatValue.format(lastDayOfMonth));
				     periode.setPeriodeString(sdf.format(lastDayOfMonth));
				     periodeList.add(periode);
				}
		       
			}
		
		//Periode Monthly (Per 2 Bulan)
		}else if(parameterDownload.getJenisPeriode().equals("3")) {
			
			Integer lastShow =  parameterDownload.getLastShow();
			if(parameterDownload.getIncCurrent().equals("C-1")) {
				lastShow+=1;
			}
			
			Date date = new Date();
			int bulan =  date.getMonth();
			bulan+=1;
			
	        if(bulan%2 != 0) {
	        	Calendar calendar = Calendar.getInstance();  
		        calendar.setTime(date);  

		        calendar.add(Calendar.MONTH, 1);  

		        date = calendar.getTime();
	        }
			
			for(int a=0; a < lastShow; a++) {
				PeriodeDto periode =  new PeriodeDto();  
				
				DateFormat sdf = new SimpleDateFormat("MMMM");  
				DateFormat sdf2 = new SimpleDateFormat("MMMM yyyy");
				DateFormat sdfYear = new SimpleDateFormat("yyyy");
		        DateFormat formatValue = new SimpleDateFormat("yyyyMM");  

		        Calendar calendar = Calendar.getInstance();  
		        calendar.setTime(date);  

		        calendar.add(Calendar.MONTH, -2);  
		        Date lastDayOfMonth = calendar.getTime();  
		        
		        calendar.add(Calendar.MONTH, 1);  
		        Date monthPri = calendar.getTime();  
		        
		        if(parameterDownload.getIncCurrent().equals("C-1") && a == 0) {
					
				}else {
					
					 Integer month = (date.getMonth()+1)/2;
					 //System.out.println(sdf.format(monthPri) + " - " + sdf2.format(date));  
					 //System.out.println(sdfYear.format(date) + "_2M"+ month);  
					 periode.setPeriodeValue(sdfYear.format(date) + "_2M"+ month);
				     periode.setPeriodeString(sdf.format(monthPri) + " - " + sdf2.format(date));
				     periodeList.add(periode);
				}
		        
		        
		        date = lastDayOfMonth;
			}
		
		//Periode Monthly (Per 3 Bulan)	
		}else if(parameterDownload.getJenisPeriode().equals("4")) {
			
			Integer lastShow =  parameterDownload.getLastShow();
			if(parameterDownload.getIncCurrent().equals("C-1")) {
				lastShow+=1;
			}
			
			Date date = new Date();
			int bulan =  date.getMonth();
			bulan+=1;
			
	        if(bulan%3 != 0) {
	        	Calendar calendar = Calendar.getInstance();  
		        calendar.setTime(date);  
		        
		        Integer blnPlus = 3-(bulan%3);
		        
		        calendar.add(Calendar.MONTH, blnPlus);  

		        date = calendar.getTime();
	        }
			
			for(int a=0; a < lastShow; a++) {
				PeriodeDto periode =  new PeriodeDto();  
				
				DateFormat sdf = new SimpleDateFormat("MMMM");  
				DateFormat sdf2 = new SimpleDateFormat("MMMM yyyy");
				DateFormat sdfYear = new SimpleDateFormat("yyyy");
		        DateFormat formatValue = new SimpleDateFormat("yyyyMM");  

		        Calendar calendar = Calendar.getInstance();  
		        calendar.setTime(date);  

		        calendar.add(Calendar.MONTH, -3);  
		        Date lastDayOfMonth = calendar.getTime();  
		        
		        calendar.add(Calendar.MONTH, 1);  
		        Date monthPri = calendar.getTime();  
		        
		        if(parameterDownload.getIncCurrent().equals("C-1") && a == 0) {
					
				}else {
					
					 Integer month = (date.getMonth()+1)/3;
					 //System.out.println(sdf.format(monthPri) + " - " + sdf2.format(date));  
					 //System.out.println(sdfYear.format(date) + "_3M"+ month);  
					 periode.setPeriodeValue(sdfYear.format(date) + "_3M"+ month);
				     periode.setPeriodeString(sdf.format(monthPri) + " - " + sdf2.format(date));
				     periodeList.add(periode);
				}
		        
		        
		        date = lastDayOfMonth;
			}
			
		//Periode Monthly (Per 4 Bulan)	
		}else if(parameterDownload.getJenisPeriode().equals("5")) {
			
			Integer lastShow =  parameterDownload.getLastShow();
			if(parameterDownload.getIncCurrent().equals("C-1")) {
				lastShow+=1;
			}
			
			Date date = new Date();
			int bulan =  date.getMonth();
			bulan+=1;
			
	        if(bulan%4 != 0) {
	        	Calendar calendar = Calendar.getInstance();  
		        calendar.setTime(date);  
		        
		        Integer blnPlus = 4-(bulan%4);
		        
		        calendar.add(Calendar.MONTH, blnPlus);  

		        date = calendar.getTime();
	        }
			
			for(int a=0; a < lastShow; a++) {
				PeriodeDto periode =  new PeriodeDto();  
				
				DateFormat sdf = new SimpleDateFormat("MMMM");  
				DateFormat sdf2 = new SimpleDateFormat("MMMM yyyy");
				DateFormat sdfYear = new SimpleDateFormat("yyyy");
		        DateFormat formatValue = new SimpleDateFormat("yyyyMM");  

		        Calendar calendar = Calendar.getInstance();  
		        calendar.setTime(date);  

		        calendar.add(Calendar.MONTH, -4);  
		        Date lastDayOfMonth = calendar.getTime();  
		        
		        calendar.add(Calendar.MONTH, 1);  
		        Date monthPri = calendar.getTime();  
		        
		        if(parameterDownload.getIncCurrent().equals("C-1") && a == 0) {
					
				}else {
					
					 Integer month = (date.getMonth()+1)/4;
					 //System.out.println(sdf.format(monthPri) + " - " + sdf2.format(date));  
					 //System.out.println(sdfYear.format(date) + "_4M"+ month);  
					 periode.setPeriodeValue(sdfYear.format(date) + "_4M"+ month);
				     periode.setPeriodeString(sdf.format(monthPri) + " - " + sdf2.format(date));
				     periodeList.add(periode);
				}
		        
		        
		        date = lastDayOfMonth;
			}
			
		//Periode Monthly (Per 6 Bulan)	
		}else if(parameterDownload.getJenisPeriode().equals("6")) {
			
			Integer lastShow =  parameterDownload.getLastShow();
			if(parameterDownload.getIncCurrent().equals("C-1")) {
				lastShow+=1;
			}
			
			Date date = new Date();
			int bulan =  date.getMonth();
			bulan+=1;
			
	        if(bulan%6 != 0) {
	        	Calendar calendar = Calendar.getInstance();  
		        calendar.setTime(date);  
		        
		        Integer blnPlus = 6-(bulan%6);
		        
		        calendar.add(Calendar.MONTH, blnPlus);  

		        date = calendar.getTime();
	        }
			
			for(int a=0; a < lastShow; a++) {
				PeriodeDto periode =  new PeriodeDto();  
				
				DateFormat sdf = new SimpleDateFormat("MMMM");  
				DateFormat sdf2 = new SimpleDateFormat("MMMM yyyy");
				DateFormat sdfYear = new SimpleDateFormat("yyyy");
		        DateFormat formatValue = new SimpleDateFormat("yyyyMM");  

		        Calendar calendar = Calendar.getInstance();  
		        calendar.setTime(date);  

		        calendar.add(Calendar.MONTH, -6);  
		        Date lastDayOfMonth = calendar.getTime();  
		        
		        calendar.add(Calendar.MONTH, 1);  
		        Date monthPri = calendar.getTime();  
		        
		        if(parameterDownload.getIncCurrent().equals("C-1") && a == 0) {
					
				}else {
					
					 Integer month = (date.getMonth()+1)/6;
					 //System.out.println(sdf.format(monthPri) + " - " + sdf2.format(date));  
					 //System.out.println(sdfYear.format(date) + "_6M"+ month);  
					 periode.setPeriodeValue(sdfYear.format(date) + "_6M"+ month);
				     periode.setPeriodeString(sdf.format(monthPri) + " - " + sdf2.format(date));
				     periodeList.add(periode);
				}
		        
		        date = lastDayOfMonth;
			}
			
		//Periode Weekly (Per 1 MInggu)	
		}else if(parameterDownload.getJenisPeriode().equals("7")) {
			
			Integer lastShow =  parameterDownload.getLastShow();
			if(parameterDownload.getIncCurrent().equals("C-1")) {
				lastShow+=1;
			}
			
			Date date = new Date();
			int tanggal =  date.getDate();

			
	        if(tanggal%7 != 0) {
	        	Calendar calendar = Calendar.getInstance();  
		        calendar.setTime(date);  
		        
		        Integer tglPlus = 7-(tanggal%7);
		        
		        calendar.add(Calendar.DATE, tglPlus);  
	
		        date = calendar.getTime();
	        }
			
			for(int a=0; a < lastShow; a++) {
				PeriodeDto periode =  new PeriodeDto();  
				
				DateFormat sdf = new SimpleDateFormat("dd");  
				DateFormat sdf2 = new SimpleDateFormat("dd MMMM yyyy");
				DateFormat sdfYear = new SimpleDateFormat("yyyy");
		        DateFormat formatValue = new SimpleDateFormat("yyyyMM");  
	
		        Calendar calendar = Calendar.getInstance();  
		        calendar.setTime(date);  
		        
		        Date lastDayOfMonth;
		        
		        Integer weekCount;
		        if((date.getDate()-7) >= 21) {
		        	
		        	int sisa = date.getDate()%21;
		        	calendar.add(Calendar.DATE, -sisa);  
			        lastDayOfMonth = calendar.getTime();  
			        
		        }else {
		        	
		        	calendar.add(Calendar.DATE, -7);  
			        lastDayOfMonth = calendar.getTime();  
		        }
		        weekCount = date.getDate()/7;
		        
		        calendar.add(Calendar.DATE, 1);  
		        Date monthPri = calendar.getTime();  
		        
		        if(parameterDownload.getIncCurrent().equals("C-1") && a == 0) {
					
				}else {
					
					 
					 //System.out.println(sdf.format(monthPri) + " - " + sdf2.format(date));  
					 //System.out.println(formatValue.format(date) + "_1W"+ weekCount);  
					 periode.setPeriodeValue(formatValue.format(date) + "_1W"+ weekCount);
				     periode.setPeriodeString(sdf.format(monthPri) + " - " + sdf2.format(date));
				     periodeList.add(periode);
				}
		        
		        date = lastDayOfMonth;
			}
			
		//Periode Weekly (Per 2 MInggu)		
		}else if(parameterDownload.getJenisPeriode().equals("8")) {
			
			Integer lastShow =  parameterDownload.getLastShow();
			if(parameterDownload.getIncCurrent().equals("C-1")) {
				lastShow+=1;
			}
			
			Date date = new Date();
			
			for(int a=0; a < lastShow; a++) {
				PeriodeDto periode =  new PeriodeDto();  

				DateFormat sdf2 = new SimpleDateFormat("dd MMMM yyyy");
		        DateFormat formatValue = new SimpleDateFormat("yyyyMM");  
		        

					 Date dateShow = date;
					 if(dateShow.getDate() >= 16) {
						 
						 Calendar cldr = Calendar.getInstance();  
						 cldr.setTime(dateShow);  
						 
						 dateShow.setDate(cldr.getActualMaximum(Calendar.DATE));
						 
						 //System.out.println(16 + " - " + sdf2.format(dateShow));  
						 //System.out.println(formatValue.format(dateShow) + "_2W"+ 2);  
						 
						 periode.setPeriodeValue(formatValue.format(dateShow) + "_2W"+ 2);
					     periode.setPeriodeString(16 + " - " + sdf2.format(dateShow));
					     
				         if(parameterDownload.getIncCurrent().equals("C-1") && a == 0) {
							
						 }else {
							periodeList.add(periode);
						 }
					     dateShow = cldr.getTime();
					     dateShow.setDate(15);
					     
					 }else {
						 
						 Calendar cldr = Calendar.getInstance();  
						 cldr.setTime(dateShow);  
						 
						 //System.out.println(1 + " - " + sdf2.format(dateShow));  
						 //System.out.println(formatValue.format(dateShow) + "_2W"+ 1);
						 
						 periode.setPeriodeValue(formatValue.format(dateShow) + "_2W"+ 1);
					     periode.setPeriodeString(1 + " - " + sdf2.format(dateShow));
					     
					     if(parameterDownload.getIncCurrent().equals("C-1") && a == 0) {
								
						 }else {
							periodeList.add(periode);
						 }
					     
					     cldr.add(Calendar.MONTH, -1);
					     dateShow = cldr.getTime();
					     dateShow.setDate(25);
						 
					 }
					 
					 date = dateShow;
		        
			}
			
		}
		
	    return periodeList; // The calculation
	}
	
	@GetMapping("/getParamterById")
	@ResponseBody
	public ParameterDownload getParamterById(@RequestParam int input) {
		
		List<PeriodeDto> periodeList =  new  ArrayList<PeriodeDto>();
		
		ParameterDownload parameterDownload =  parameterDownloadService.getById(input);
		
	    return parameterDownload; // The calculation
	}
	
	//function Download File
	@GetMapping("/downloadFile")
    public ResponseEntity downloadFile(
    		Model model,
    		@RequestParam("id") String id,
    		@RequestParam("fileName") String fileName,
    		HttpServletRequest request) throws ParseException, IOException {
    	
    	
		Resource resource = null;
    	String contentType = null;
        
    	resource = fileService.download(id,fileName);
        contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        
       
        //content type
        if(contentType == null) {
            contentType = "application/octet-stream";
        }
        
        try  (InputStream input = resource.getInputStream()) {
        	 return ResponseEntity.ok()
     				.contentType(MediaType.parseMediaType(contentType))
     				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
     				.body(resource);
        } catch (IOException ex) {
            

        	return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("File "+ resource.getFilename()+ " Tidak Ditemukan !");
        }  
       
	} 

}
