package com.focus.weborder;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;

@SpringBootApplication
public class WebOrderApplication
	extends SpringBootServletInitializer 
	/*implements WebApplicationInitializer */
	{

	public static void main(String[] args) {
		SpringApplication.run(WebOrderApplication.class, args);
	}
	
	@Override
    protected SpringApplicationBuilder configure(
    		SpringApplicationBuilder webOrderApplication) {
        return webOrderApplication.sources(WebOrderApplication.class);
    }
	
}
