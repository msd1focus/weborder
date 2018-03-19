package com.focus.weborder.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ErrorController {

	@GetMapping("/401")
    public String error401() {
        return "/error/401";
    }

    @GetMapping("/403")
    public String error403() {
        return "/error/403";
    }
    
    @GetMapping("/404")
    public String error404() {
        return "/error/404";
    }
    
    @GetMapping("/405")
    public String error405() {
        return "/error/405";
    }
    

    @GetMapping("/500")
    public String error500() {
        return "/error/500";
    }

}
