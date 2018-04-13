package com.focus.weborder.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix="properties")
public class WebOrderProperties {

	private String Weborder;

	public String getWeborder() {
		return Weborder;
	}

	public void setWeborder(String weborder) {
		Weborder = weborder;
	}

}
