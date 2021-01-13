package com.focus.weborder.ebs.creditlimit;

import java.text.DecimalFormat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.focus.weborder.properties.CreditLimitProperties;
import com.focus.weborder.types.CreditLimit;

@Service
public class CreditLimitService {
	
	@Autowired
	CreditLimitProperties creditLimitProperties;
	
	/*
	 * public CreditLimit getCreditLimit( String company, Long custId) {
	 * 
	 * CreditLimit cl = new CreditLimit();
	 * 
	 * String url = ""; String username = ""; String password = ""; String param1 =
	 * creditLimitProperties.getCreditlimit().getParam1();
	 * 
	 * if(company.equals("FDI")) { url =
	 * creditLimitProperties.getCreditlimit().getUrlfdi(); username =
	 * creditLimitProperties.getCreditlimit().getUsernamefdi(); password =
	 * creditLimitProperties.getCreditlimit().getPasswordfdi(); } else
	 * if(company.equals("FDN")){ url =
	 * creditLimitProperties.getCreditlimit().getUrlfdn(); username =
	 * creditLimitProperties.getCreditlimit().getUsernamefdn(); password =
	 * creditLimitProperties.getCreditlimit().getPasswordfdn(); }
	 * 
	 * 
	 * RESTInvoker ri = new RESTInvoker( url, username, password); String
	 * restResponse = ri.getRESTResponse( "?" + param1 + "=" + custId);
	 * 
	 * try { 
	 * 		JSONArray responses = new JSONArray(restResponse); 
	 * 		DecimalFormat df = new DecimalFormat("##,##0.00"); 
	 * 		for(int i=0; i < responses.length(); i++) {
	 * 			JSONObject response = responses.getJSONObject(i);
	 * 			cl.setOverallCreditLimitText( df.format( Double.valueOf(
	 * 				response.getString("overallCreditLimit")))); \
	 * 			cl.setSisaArText( df.format(
	 * 				Double.valueOf( response.getString("sisaAr")))); 
	 * 			cl.setOutstandingSoText(
	 * 				df.format( Double.valueOf( response.getString("outstandingSo"))));
	 * 			cl.setOutstandingCo1Text( df.format( Double.valueOf(
	 * 				response.getString("outstandingCo1")))); 
	 * 			cl.setOutstandingCo2Text( df.format(
	 * 				Double.valueOf( response.getString("outstandingCo2")))); 
	 * 			cl.setSisaLimitText(
	 * 				df.format( Double.valueOf( response.getString("sisaLimit"))));
	 * 			cl.setSisaLimit( Double.valueOf( response.getString("sisaLimit"))); 
	 * 			} 
	 * 	} catch (JSONException e) { 
	 * 		// TODO Auto-generated catch block
	 * 		System.out.println(e.getMessage()); }
	 * 
	 * 		return cl; 
	 * 	}
	 */
	
	public CreditLimit getCreditLimit(
			String company,
			Long custId) {
		
		RestTemplate restTemplate = new RestTemplate();
		DecimalFormat df = new DecimalFormat("##,##0.00"); 

		String url = "";
		CreditLimit creditLimit = new CreditLimit();
		
		if(company.equals("FDI")) 
			url = creditLimitProperties.getCreditlimit().getUrlfdi() + "?custid=" + custId;
		else 
			url = creditLimitProperties.getCreditlimit().getUrlfdn() + "?custid=" + custId;

		CreditLimitEbsDto[] restResponse = restTemplate.getForObject(url, CreditLimitEbsDto[].class);

		creditLimit.setOverallCreditLimitText(
				df.format( Double.valueOf( restResponse[0].getOverallCreditLimit())) );
		creditLimit.setSisaArText( 
				df.format( Double.valueOf( restResponse[0].getSisaAr())) );
		creditLimit.setOutstandingSoText (
				df.format( Double.valueOf( restResponse[0].getOutstandingSo())) );
		creditLimit.setOutstandingCo1Text(
				df.format( Double.valueOf( restResponse[0].getOutstandingCo1())) );
		creditLimit.setOutstandingCo2Text (
				df.format( Double.valueOf( restResponse[0].getOutstandingCo2())) );
		creditLimit.setSisaLimitText(
				df.format( Double.valueOf( restResponse[0].getSisaLimit())) );
		creditLimit.setSisaLimit(
				Double.valueOf( restResponse[0].getSisaLimit()) );

		return creditLimit;
	}
}
