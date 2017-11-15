package com.focus.weborder.services.listmobil;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
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

}
