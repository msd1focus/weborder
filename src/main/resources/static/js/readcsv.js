var targetlist;	
var validMon = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
	
function chfiletype () {
	var x = document.getElementById("jenisfile").value;
	switch (x) {
		case "stock": 	document.getElementById("targetrule").style.display = "none";
						document.getElementById("stockrule").style.display = "block";
						document.getElementById("mobilrule").style.display = "none";
						break;
		case "target":	document.getElementById("targetrule").style.display = "block";
						document.getElementById("stockrule").style.display = "none";
						document.getElementById("mobilrule").style.display = "none";
						break;
		case "custmobil":	document.getElementById("targetrule").style.display = "none";
						document.getElementById("stockrule").style.display = "none";
						document.getElementById("mobilrule").style.display = "block";
						break;
	}
}

function companyIsValid (lineNum, company) {
	var retvalue = true;
	switch (company) {
		case "FDI":
		case "FDN": break;
		default : retvalue = false;
	}
	return (retvalue);
}

function periodeIsValid (lineNum, periode) {
	var retvalue = true;
	var bulan = periode.substring(0,3);
	if (validMon.indexOf(bulan) == -1) { 
		retvalue = false;
	}
	if (isNaN(periode.slice(-4))) { 
		retvalue = false;
	}
	return (retvalue);
}

function errorText (msg) {
	 var x = document.getElementById("errordiv");
	 x.innerHTML = "<h4>Error : </h4><ul>" + msg + "</ul>";
	 x.style.display = "block";
}
 
function targetListIsValid(text) {
	var targetRowStatus;
	var isValid = "true";
	var companyErrors = [];
	var custIdErrors = [];
	var targetSalesErrors = [];
	var periodeErrors = [];
	var productCodeErrors = [];
	var lines = text.split('\n');
	if (lines[0].trim() != 'company,product_code,cust_number,cust_id,periode_target,target_sales') { 
		errorText("Header file tidak valid.");
		return ("false"); 
	}
	var headers = lines[0].trim().split(',');
	
	for(var j = 1; j<lines.length; j++){
		if(lines[j].trim() != ""){
	
			var information = lines[j].trim().split(',');
			var target = new Object();
	
			for(var k = 0; k < headers.length; k++){
				switch (k) {
					case 0: target.company = information[k]; break;
					case 1: target.product_code = information[k]; break;
					case 2: target.cust_number = information[k]; break;
					case 3: target.cust_id = information[k]; break;
					case 4: target.periode_target = information[k].toUpperCase(); break;
					case 5: target.target_sales = information[k]; break;
				}
			}
	
			if(!companyIsValid(j, target.company) ) {
				isValid = "false";
				companyErrors.push(j);
			}
			if(!periodeIsValid(j, target.periode_target) ) {
				isValid = "false";
				periodeErrors.push(j);
			}
			if(!isInteger(j, target.cust_id) ) {
				isValid = "false";
				custIdErrors.push(j);
			}
			if(!isInteger(j, target.product_code) ) {
				isValid = "false";
				productCodeErrors.push(j);
			}
			if(!isInteger(j, target.target_sales) ) {
				isValid = "false";
				targetSalesErrors.push(j);
			}
		}
	  
	}
	
	if(isValid=="false"){
		
		var errorLog = "";
		
		errorLog = errorCompany(companyErrors, errorLog);
		errorLog = errorPeriode(periodeErrors, errorLog);
		errorLog = errorCustId(custIdErrors, errorLog);
		errorLog = errorProductCode(productCodeErrors, errorLog);
		errorLog = errorTargetSales(targetSalesErrors, errorLog);
		
		errorText(errorLog);
	}
	return(isValid)
}
	
function stockListIsValid(text) {
	var stockRowStatus;
	var isValid = "true";
	var companyErrors = [];
	var custIdErrors = [];
	var endStockErrors = [];
	var periodeErrors = [];
	var productCodeErrors = [];
	var lines = text.split('\n');
	if (lines[0].trim() != 'company,product_code,cust_number,cust_id,periode_stock,end_stock') { 
			errorText("Header file tidak valid.");
			return ("false"); 
	}
	var headers = lines[0].trim().split(',');
	for(var j = 1; j<lines.length; j++){
		if(lines[j].trim() != ""){

			var information = lines[j].trim().split(',');
			var target = new Object();

			for(var k = 0; k < headers.length; k++){
				switch (k) {
					case 0: target.company = information[k]; break;
					case 1: target.product_code = information[k]; break;
					case 2: target.cust_number = information[k]; break;
					case 3: target.cust_id = information[k]; break;
					case 4: target.periode_stock = information[k].toUpperCase(); break;
					case 5: target.end_stock = information[k]; break;
				}
			}

			if(!companyIsValid(j, target.company) ) {
				isValid = "false";
				companyErrors.push(j);
			}
			if(!periodeIsValid(j, target.periode_stock) ) {
				isValid = "false";
				periodeErrors.push(j);
			}
			if(!isInteger(j, target.cust_id) ) {
				isValid = "false";
				custIdErrors.push(j);
			}
			if(!isInteger(j, target.product_code) ) {
				isValid = "false";
				productCodeErrors.push(j);
			}
			if(!isInteger(j, target.end_stock) ) {
				isValid = "false";
				endStockErrors.push(j);
			}
		}
	}
	
	if(isValid=="false"){
		
		var errorLog = "";
		
		errorLog = errorCompany(companyErrors, errorLog);
		errorLog = errorPeriode(periodeErrors, errorLog);
		errorLog = errorCustId(custIdErrors, errorLog);
		errorLog = errorProductCode(productCodeErrors, errorLog);
		errorLog = errorEndStock(endStockErrors, errorLog);
		
		errorText(errorLog);
	}
	return(isValid)
	
}

function custmobilListIsValid(text) {
	var stockRowStatus;
	var isValid = "true";
	var companyErrors = [];
	var custIdErrors = [];
	var mobilIdErrors = [];
	var lines = text.split('\n');
	if (lines[0].trim() != 'company,cust_number,cust_id,mobil_desc,mobil_id') { 
			errorText("Header file tidak valid.");
			return ("false"); 
	}
	var headers = lines[0].trim().split(',');
	for(var j = 1; j<lines.length; j++){
		if(lines[j].trim() != ""){

			var information = lines[j].trim().split(',');
			var custmobil = new Object();

			for(var k = 0; k < headers.length; k++){
				switch (k) {
					case 0: custmobil.company = information[k]; break;
					case 1: custmobil.cust_number = information[k]; break;
					case 2: custmobil.cust_id = information[k]; break;
					case 3: custmobil.mobil_desc = information[k]; break;
					case 4: custmobil.mobil_id = information[k]; break;
				}
			}

			if(!companyIsValid(j, custmobil.company) ) {
				isValid = "false";
				companyErrors.push(j);
			}
			if(!isInteger(custmobil.cust_id)){
				isValid = "false";
				custIdErrors.push(j);
			}
			if(!isInteger(custmobil.mobil_id)){
				isValid = "false";
				mobilIdErrors.push(j);
			}
		}

	}
	
	if(isValid=="false"){
		
		var errorLog = "";
		
		errorLog = errorCompany(companyErrors, errorLog);
		errorLog = errorCustId(custIdErrors, errorLog);
		errorLog = errorMobilId(mobilIdErrors, errorLog);	
		
		errorText(errorLog);
	}
	return(isValid)
	
}

function errorEndStock(endStockErrors, errorLog){
	
	if(endStockErrors.length>0){
		var lineNum = "";
		for(var i = 0; i<endStockErrors.length; i++){
			lineNum += endStockErrors[i];
			if(i!=(endStockErrors.length-1)){
				lineNum += ",";
			}
		}
		errorLog += "<li> end_stock tidak valid pada baris " + lineNum + "</li>";  
	}
	
	return errorLog;
	
}

function errorTargetSales(targetSalesErrors, errorLog){
	
	if(targetSalesErrors.length>0){
		var lineNum = "";
		for(var i = 0; i<targetSalesErrors.length; i++){
			lineNum += targetSalesErrors[i];
			if(i!=(targetSalesErrors.length-1)){
				lineNum += ",";
			}
		}
		errorLog += "<li> target_sales tidak valid pada baris " + lineNum + "</li>";  
	}
	
	return errorLog;
	
}

function errorProductCode(productCodeErrors, errorLog){
	
	if(productCodeErrors.length>0){
		var lineNum = "";
		for(var i = 0; i<productCodeErrors.length; i++){
			lineNum += productCodeErrors[i];
			if(i!=(productCodeErrors.length-1)){
				lineNum += ",";
			}
		}
		errorLog += "<li> product_code tidak valid pada baris " + lineNum + "</li>";  
	}
	
	return errorLog;
	
}

function errorPeriode(periodeErrors, errorLog){
	
	if(periodeErrors.length>0){
		var lineNum = "";
		for(var i = 0; i<periodeErrors.length; i++){
			lineNum += periodeErrors[i];
			if(i!=(periodeErrors.length-1)){
				lineNum += ",";
			}
		}
		errorLog += "<li> periode tidak valid pada baris " + lineNum + "</li>";  
	}
	
	return errorLog;
	
}

function errorMobilId(mobilIdErrors, errorLog){
	
	if(mobilIdErrors.length>0){
		var lineNum = "";
		for(var i = 0; i<mobilIdErrors.length; i++){
			lineNum += mobilIdErrors[i];
			if(i!=(mobilIdErrors.length-1)){
				lineNum += ",";
			}
		}
		errorLog += "<li> mobil_id tidak valid pada baris " + lineNum + "</li>";  
	}
	
	return errorLog;
	
}

function errorCustId(custIdErrors, errorLog){
	
	if(custIdErrors.length>0){
		var lineNum = "";
		for(var i = 0; i<custIdErrors.length; i++){
			lineNum += custIdErrors[i];
			if(i!=(custIdErrors.length-1)){
				lineNum += ",";
			}
		}
		errorLog += "<li> cust_id tidak valid pada baris " + lineNum + "</li>";  
	}
	
	return errorLog;
}

function errorCompany(companyErrors, errorLog){
	
	if(companyErrors.length>0){
		var lineNum = "";
		for(var i = 0; i<companyErrors.length; i++){
			lineNum += companyErrors[i];
			if(i!=(companyErrors.length-1)){
				lineNum += ",";
			}
		}
		errorLog += "<li> company tidak valid pada baris " + lineNum + "</li>";  
	}
	
	return errorLog;
}

function verify() {
	var x = document.getElementById("jenisfile").value;
  	var file =  document.getElementById('file').files[0];
  	var parseStatus;
  	
	if (file == null) {
		errorText ("File belum dipilih.");
		return;
	}
	if (!(file.name.endsWith(".csv"))) {
		errorText("Nama file tidak valid");
		return;
	}
	if (x == "target" 
			&& (!(file.name.startsWith("target_"))
					|| !(isInteger(file.name.substring(7,15))))) {
			errorText("Nama file " + file.name + " tidak valid");
  			return;
	}
	if (x == "stock" 
			&& (!(file.name.startsWith("stock_"))
					|| !(isInteger(file.name.substring(6,14))))) {
		errorText("Nama file " + file.name + " tidak valid");
		return;
	}
	if (x == "custmobil" 
			&& (!(file.name.startsWith("custmobil_"))
					|| !(isInteger(file.name.substring(10,18))))) {
		errorText("Nama file " + file.name + " tidak valid");
		return;
	}

  	var reader = new FileReader();
	reader.onload = (function(theFile) {
		return function(e) {
			if (x == "target") {
				parseStatus = targetListIsValid (e.target.result);
			} else if (x == "stock") {
				parseStatus = stockListIsValid (e.target.result);
			} else if (x == "custmobil") {
				parseStatus = custmobilListIsValid (e.target.result);
			}
			if (parseStatus == "true") {
				document.getElementById("form-id").submit();
			} 
		};
	})(file);
	reader.readAsText(file);
	
	return false;
}

function isInteger(value){
	return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
}
