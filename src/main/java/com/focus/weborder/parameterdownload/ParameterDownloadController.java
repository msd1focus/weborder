package com.focus.weborder.parameterdownload;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ParameterDownloadController {

	@Autowired
	private ParameterDownloadService parameterDownloadService;
	
	@RequestMapping("/parameterDownloadIndex")
    public String parameterDownloadIndex(Model model){
		
		List<ParameterDownload> list = new ArrayList<ParameterDownload>();
		list =  parameterDownloadService.getAll();

		model.addAttribute("parameterDownloadList", list);  
		
        return "parameterdownloadindex";
    }
	
	@RequestMapping("/parameterDownloadAdd")
    public String parameterDownloadAdd(
    		Model model){
		
        return "parameterdownloadadd";
    }
	
	@PostMapping("/parameterDownloadSimpanAdd")
    public String simpanAdd(@Valid ParameterDownload parameterDownload, BindingResult result, Model model) {
        if (result.hasErrors()) {
            return "add-parameterDownload";
        }

        parameterDownloadService.save(parameterDownload);
        return "redirect:parameterDownloadIndex";
    }
	
	@PostMapping("/parameterDownloadSimpanEdit")
    public String simpanEdit(@Valid ParameterDownload parameterDownload, BindingResult result, Model model) {
        if (result.hasErrors()) {
            return "add-parameterDownload";
        }

        parameterDownloadService.save(parameterDownload);
        return "redirect:parameterDownloadIndex";
    }
	
	@RequestMapping("/parameterDownloadEdit/{id}")
    public String parameterDownloadEdit(
    		Model model,
    		@PathVariable("id") Integer id){
		
		ParameterDownload parameterDownload =  parameterDownloadService.getById(id);
		
		model.addAttribute("parameterDownload", parameterDownload);  
		
        return "parameterdownloadedit";
    }
	
	@RequestMapping("/parameterDownloadDelete/{id}")
    public String parameterDownloadDelete(
    		Model model,
    		@PathVariable("id") Integer id){
		
		parameterDownloadService.delete(id);
		
		return "redirect:/parameterDownloadIndex";
    }
}
