package com.focus.weborder.test;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.WebApplicationInitializer;

@RunWith(SpringRunner.class)
@SpringBootTest
public class WebOrderApplicationTests 
	extends SpringBootServletInitializer 
	implements WebApplicationInitializer 
{

	@Test
	public void contextLoads() {
	}

}
