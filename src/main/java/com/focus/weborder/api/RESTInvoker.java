package com.focus.weborder.api;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.apache.commons.codec.binary.Base64;

public class RESTInvoker {

	private final String baseUrl;
    private final String username;
    private final String password;
 
    public RESTInvoker(String baseUrl, String username, String password) {
        this.baseUrl = baseUrl;
        this.username = username;
        this.password = password;
    }
 
    public String getRESTResponse(String path){
       return getDataFromServer(path);
    }
 
    private String getDataFromServer(String path) {
        StringBuilder sb = new StringBuilder();
        try {
            URL url = new URL(baseUrl + path);
            //System.out.print("; url: " + url);
            HttpURLConnection urlConnection = setUsernamePassword(url);
            urlConnection.setRequestMethod("GET");
            urlConnection.setRequestProperty("Accept", "application/json");
            
            if (urlConnection.getResponseCode() != 200) {
				throw new RuntimeException("Failed : HTTP error code : "
						+ urlConnection.getResponseCode());
			}
            
            BufferedReader reader = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
            reader.close();
            
            urlConnection.disconnect();
 
            return sb.toString();
            
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
 
    private HttpURLConnection setUsernamePassword(URL url) throws IOException {
    	HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
        String authString = username + ":" + password;
        String authStringEnc = new String(Base64.encodeBase64(authString.getBytes()));
        urlConnection.setRequestProperty("Authorization", "Basic " + authStringEnc);
        return urlConnection;
    }

}
