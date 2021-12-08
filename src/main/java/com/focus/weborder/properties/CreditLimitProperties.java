package com.focus.weborder.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix="external")
public class CreditLimitProperties {

	public static class Creditlimit {
		
		private String urlfdi;
		private String usernamefdi;
		private String passwordfdi;
		private String urlfdn;
		private String usernamefdn;
		private String passwordfdn;
//		private String param1;
		
		public String getUrlfdi() {
			return urlfdi;
		}
		public void setUrlfdi(String urlfdi) {
			this.urlfdi = urlfdi;
		}
		public String getUsernamefdi() {
			return usernamefdi;
		}
		public void setUsernamefdi(String usernamefdi) {
			this.usernamefdi = usernamefdi;
		}
		public String getPasswordfdi() {
			return passwordfdi;
		}
		public void setPasswordfdi(String passwordfdi) {
			this.passwordfdi = passwordfdi;
		}
		public String getUrlfdn() {
			return urlfdn;
		}
		public void setUrlfdn(String urlfdn) {
			this.urlfdn = urlfdn;
		}
		public String getUsernamefdn() {
			return usernamefdn;
		}
		public void setUsernamefdn(String usernamefdn) {
			this.usernamefdn = usernamefdn;
		}
		public String getPasswordfdn() {
			return passwordfdn;
		}
		public void setPasswordfdn(String passwordfdn) {
			this.passwordfdn = passwordfdn;
		}
//		public String getParam1() {
//			return param1;
//		}
//		public void setParam1(String param1) {
//			this.param1 = param1;
//		}
		
	}

	private Creditlimit creditlimit;

	public Creditlimit getCreditlimit() {
		return creditlimit;
	}

	public void setCreditlimit(Creditlimit creditlimit) {
		this.creditlimit = creditlimit;
	}
	
}
