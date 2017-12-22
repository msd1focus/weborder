function viewReport(){
	var reportFrame = document.getElementById("reportFrame");
	var month = document.getElementById("month").value;
	var year = document.getElementById("year").value;
	var custId = document.getElementById("custId").value;
	var company = document.getElementById("company").value;
	//console.log("month: " + month);
	//console.log("year: " + year);
	//console.log("custId: " + custId);
	//console.log("company: " + company);
	  
	//console.log(location.hostname);
	//console.log(document.domain);
	//console.log(window.location.hostname)

	//console.log("document.URL : "+document.URL);
	//console.log("document.location.href : "+document.location.href);
	//console.log("document.location.origin : "+document.location.origin);
	//console.log("document.location.hostname : "+document.location.hostname);
	//console.log("document.location.host : "+document.location.host);
	//console.log("document.location.pathname : "+document.location.pathname);
	
	if(year!=""){
		var source = 
			document.location.origin
			+ "/birt-viewer/frameset?__report=WO.rptdesign&CUST_ID="
			+ custId + "&COMPANY="
			+ company + "&Interval=3&Month="
			+ month + "&Year=" + year;
		console.log("source: " + source);
		reportFrame.src = source;
	}
	else{
		alert("Please Fill Year!");
	}
	return false;
}