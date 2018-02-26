package com.focus.weborder.services.listmobil;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest")
public class ListMobilController {

	@Autowired
	private ListMobilService listMobilService;
	
	@RequestMapping("/listmobil")
	public List<ListMobil> getListMobils() {
		return listMobilService.getListMobils();
	}
	
	@RequestMapping(method=RequestMethod.PUT, value="/listmobil")
	public void updateListMobil(
			@RequestBody List<ListMobil> listMobils) {
		listMobilService.updateListMobil(listMobils);
	}

	@RequestMapping(method=RequestMethod.PUT, value="/listmobil/sync")
	public String syncMasterMobil() {
		return listMobilService.syncMasterMobil();
	}

}
