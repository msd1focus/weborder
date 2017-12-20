function viewReport(){
	var reportFrame = document.getElementById("reportFrame");
	var month = document.getElementById("month").value;
	var year = document.getElementById("year").value;
	var custId = document.getElementById("custId").value;
	var company = document.getElementById("company").value;
	console.log("month: " + month);
	console.log("year: " + year);
	console.log("custId: " + custId);
	console.log("company: " + company);
	if(year!=""){
		var source = 
			"http://focusdev.focus.co.id:8080/birt-viewer/frameset?__report=WO.rptdesign&CUST_ID="
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