package com.focus.weborder.services.listmobil;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ListMobilService {

	@Autowired
	private ListMobilRepository listMobilRepository;
	
	public List<ListMobil> getListMobils() {
		List<ListMobil> listMobils = 
				listMobilRepository.getAll();
		return listMobils;		
	}

}
