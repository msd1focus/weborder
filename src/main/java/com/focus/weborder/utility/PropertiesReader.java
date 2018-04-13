package com.focus.weborder.utility;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Properties;

public class PropertiesReader {

	public Properties readProperties(String fileDir){
		
		Properties prop = new Properties();
		InputStream input = null;

		try {

			input = new FileInputStream(fileDir);
			
			// load a properties file
			prop.load(input);

		} catch (Exception e) {

			System.out.println(e.getMessage());

		} finally {

			try {

				if (input != null)
					input.close();

			} catch (Exception ex) {

				System.out.println(ex.getMessage());

			}

		}

		return prop;
	}

}
