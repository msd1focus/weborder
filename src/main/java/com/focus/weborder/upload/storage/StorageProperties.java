package com.focus.weborder.upload.storage;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix="upload")
public class StorageProperties {

	public static class Folders {
		private String target;
		private String stock;
		private String mobilcustomer;
		public String getTarget() {
			return target;
		}
		public void setTarget(String target) {
			this.target = target;
		}
		public String getStock() {
			return stock;
		}
		public void setStock(String stock) {
			this.stock = stock;
		}
		public String getMobilcustomer() {
			return mobilcustomer;
		}
		public void setMobilcustomer(String mobilcustomer) {
			this.mobilcustomer = mobilcustomer;
		}
		
	}

	private Folders folders;

	public Folders getFolders() {
		return folders;
	}

	public void setFolders(Folders folders) {
		this.folders = folders;
	}



}
