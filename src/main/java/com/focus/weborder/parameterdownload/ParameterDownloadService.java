package com.focus.weborder.parameterdownload;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class ParameterDownloadService {
	
	@Autowired
	ParameterDownloadRepository downloadRepository;
	
	
	public List<ParameterDownload> getAll (){
		
		return downloadRepository.getAll();
	}
	
	public List<ParameterDownload> getListByCompany (String company){
		
		return downloadRepository.getListByCompany(company);
	}
	
	public ParameterDownload getById (Integer id){
		
		return downloadRepository.getById(id);
	}
	
	void delete (Integer id){
		
		ParameterDownload parameter  = downloadRepository.getById(id);
		
		downloadRepository.delete(parameter);
	}
	
	public ParameterDownload save (ParameterDownload p){
		
		return downloadRepository.save(p);
	}
	
	
}
