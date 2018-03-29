package com.focus.weborder.external.creditlimit;

import java.text.DecimalFormat;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.focus.weborder.api.RESTInvoker;
import com.focus.weborder.types.CreditLimit;

@Service
public class CreditLimitService {
	
	@Autowired
	CreditLimitProperties creditLimitProperties;
	
	public CreditLimit getCreditLimit(
			String company,
			Long custId) {
		
		CreditLimit cl = new CreditLimit();
		
		String url = "";
		String username = "";
		String password = "";
		String param1 = creditLimitProperties.getCreditlimit().getParam1();
		
		if(company.equals("FDI")) {
			url = creditLimitProperties.getCreditlimit().getUrlfdi();
			username = creditLimitProperties.getCreditlimit().getUsernamefdi();
			password = creditLimitProperties.getCreditlimit().getPasswordfdi();
		}
		else if(company.equals("FDN")){
			url = creditLimitProperties.getCreditlimit().getUrlfdn();
			username = creditLimitProperties.getCreditlimit().getUsernamefdn();
			password = creditLimitProperties.getCreditlimit().getPasswordfdn();
		}
		
		
		RESTInvoker ri = new RESTInvoker(
				url,
				username,
				password);
		String restResponse = 
				ri.getRESTResponse(
						"?"
						+ param1
						+ "="
						+ custId);
		
		try {
			JSONArray responses = new JSONArray(restResponse);
			DecimalFormat df = new DecimalFormat("##,##0.00");
			for(int i=0; i < responses.length(); i++) {
			    JSONObject response = responses.getJSONObject(i);
			    cl.setOverallCreditLimitText(
			    		df.format(
			    				Double.valueOf(
			    						response.getString("overallCreditLimit"))));
			    cl.setSisaArText(
			    		df.format(
			    				Double.valueOf(
			    						response.getString("sisaAr"))));
			    cl.setOutstandingSoText(
			    		df.format(
			    				Double.valueOf(
			    						response.getString("outstandingSo"))));
			    cl.setOutstandingCo1Text(
			    		df.format(
			    				Double.valueOf(
			    						response.getString("outstandingCo1"))));
			    cl.setOutstandingCo2Text(
			    		df.format(
			    				Double.valueOf(
			    						response.getString("outstandingCo2"))));
			    cl.setSisaLimitText(
			    		df.format(
			    				Double.valueOf(
			    						response.getString("sisaLimit"))));
			    cl.setSisaLimit(
	    				Double.valueOf(
	    						response.getString("sisaLimit")));
			}
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			System.out.println(e.getMessage());
		}
		
		return cl;
	}

}
