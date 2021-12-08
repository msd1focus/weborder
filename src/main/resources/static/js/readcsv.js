var targetlist;	
var validMon = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
	
function chfiletype () {
	var x = document.getElementById("jenisfile").value;
	switch (x) {
		case "stock": 	document.getElementById("targetrule").style.display = "none";
						document.getElementById("stockrule").style.display = "block";
						document.getElementById("mobilrule").style.display = "none";
						document.getElementById("mastermobilrule").style.display = "none";
						break;
		case "target":	document.getElementById("targetrule").style.display = "block";
						document.getElementById("stockrule").style.display = "none";
						document.getElementById("mobilrule").style.display = "none";
						document.getElementById("mastermobilrule").style.display = "none";
						break;
		case "custmobil":	document.getElementById("targetrule").style.display = "none";
							document.getElementById("stockrule").style.display = "none";
							document.getElementById("mobilrule").style.display = "block";
							document.getElementById("mastermobilrule").style.display = "none";
							break;
		case "mastermobil":	document.getElementById("targetrule").style.display = "none";
							document.getElementById("stockrule").style.display = "none";
							document.getElementById("mobilrule").style.display = "block";
							document.getElementById("mastermobilrule").style.display = "block";
							break;
	}
}

function companyIsValid (lineNum, company) {
	var retvalue = true;
	switch (company) {
		case "FRI":
		case "FRN": break;
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

function mastermobilListIsValid(text) {
	var stockRowStatus;
	var isValid = "true";
	var panjangErrors = [];
	var lebarErrors = [];
	var tinggiErrors = [];
	var mobilIdErrors = [];
	var lines = text.split('\n');
	if (lines[0].trim() != 'mobil_id,mobil_desc,mobil_panjang,mobil_lebar,mobil_tinggi') { 
			errorText("Header file tidak valid.");
			return ("false"); 
	}
	var headers = lines[0].trim().split(',');
	for(var j = 1; j<lines.length; j++){
		if(lines[j].trim() != ""){

			var information = lines[j].trim().split(',');
			var listmobil = new Object();

			for(var k = 0; k < headers.length; k++){
				switch (k) {
					case 0: listmobil.mobil_id = information[k]; break;
					case 1: listmobil.mobil_desc = information[k]; break;
					case 2: listmobil.mobil_panjang = information[k]; break;
					case 3: listmobil.mobil_lebar = information[k]; break;
					case 4: listmobil.mobil_tinggi = information[k]; break;
				}
			}

			if(!isInteger(j, listmobil.mobil_id) ) {
				isValid = "false";
				mobilIdErrors.push(j);
			}
			if(!isInteger(listmobil.mobil_panjang)){
				isValid = "false";
				panjangErrors.push(j);
			}
			if(!isInteger(listmobil.mobil_lebar)){
				isValid = "false";
				lebarErrors.push(j);
			}
			if(!isInteger(listmobil.mobil_tinggi)){
				isValid = "false";
				tinggiErrors.push(j);
			}
		}

	}
	
	if(isValid=="false"){
		
		var errorLog = "";
		
		errorLog = errorMobilId(mobilIdErrors, errorLog);
		errorLog = errorPanjang(panjangErrors, errorLog);
		errorLog = errorLebar(lebarErrors, errorLog);	
		errorLog = errorTinggi(tinggiErrors, errorLog);	
		
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

function errorPanjang(panjangErrors, errorLog){
	
	if(panjangErrors.length>0){
		var lineNum = "";
		for(var i = 0; i<panjangErrors.length; i++){
			lineNum += panjangErrors[i];
			if(i!=(panjangErrors.length-1)){
				lineNum += ",";
			}
		}
		errorLog += "<li> mobil_panjang tidak valid pada baris " + lineNum + "</li>";  
	}
	
	return errorLog;
	
}

function errorLebar(lebarErrors, errorLog){
	
	if(lebarErrors.length>0){
		var lineNum = "";
		for(var i = 0; i<lebarErrors.length; i++){
			lineNum += lebarErrors[i];
			if(i!=(lebarErrors.length-1)){
				lineNum += ",";
			}
		}
		errorLog += "<li> mobil_lebar tidak valid pada baris " + lineNum + "</li>";  
	}
	
	return errorLog;
	
}

function errorTinggi(tinggiErrors, errorLog){
	
	if(tinggiErrors.length>0){
		var lineNum = "";
		for(var i = 0; i<tinggiErrors.length; i++){
			lineNum += tinggiErrors[i];
			if(i!=(tinggiErrors.length-1)){
				lineNum += ",";
			}
		}
		errorLog += "<li> mobil_tinggi tidak valid pada baris " + lineNum + "</li>";  
	}
	
	return errorLog;
	
}

function verify() {
	var x = document.getElementById("jenisfile").value;
  	var file =  document.getElementById('file').files[0];
  	var file1 =  document.getElementById('file').files[1];
  	var parseStatus;
  	
	if (file == null) {
		errorText ("File belum dipilih.");
		return;
	}
	if (!(file.name.endsWith(".csv"))) {
		errorText("Nama file " + file.name + " tidak valid");
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
	if (x == "mastermobil"){
		
		var fileType = "";
		var file1Type = "";
		
		if (file1 == null) {
			errorText ("Minimum 2 File yang dipilih");
			return;
		}
		
		if (!(file1.name.endsWith(".csv"))) {
			errorText("Nama file " + file1.name + " tidak valid");
			return;
		}
		
		var isAllFileValid = false;
		var isMasterMobilValid = false;
		var isCustMobilValid = false;
		var isFileValid = false;
		var isFile1Valid = false;
		var errorLog = "";
		
		if(file.name.startsWith("mastermobil_")
			&& isInteger(file.name.substring(12,20))){
			fileType = "mastermobil";
			isFileValid = true;
			isMasterMobilValid = true;
		}
				
		if(file.name.startsWith("custmobil_")
			&& isInteger(file.name.substring(10,18))){
			fileType = "custmobil";
			isFileValid = true;
			isCustMobilValid = true;
		}
			
		if(file1.name.startsWith("mastermobil_")
			&& isInteger(file1.name.substring(12,20))){
			file1Type = "mastermobil";
			isFile1Valid = true;
			isMasterMobilValid = true;
		}
				
		if(file1.name.startsWith("custmobil_")
			&& isInteger(file1.name.substring(10,18))){
			file1Type = "custmobil";
			isFile1Valid = true;
			isCustMobilValid = true;
		}
		
		if(!isFileValid){
			if(errorLog!=""){
				errorLog += "; "
			}
			errorLog += "Nama file " + file.name + " tidak valid";
		}
		
		if(!isFile1Valid){
			if(errorLog!=""){
				errorLog += "; "
			}
			errorLog += "Nama file " + file1.name + " tidak valid";
		}
		
		if(isFileValid
				&& isFile1Valid){
			if(isMasterMobilValid
					&& isCustMobilValid){
				isAllFileValid = true;
			}
			else{
				if(errorLog!=""){
					errorLog += "; "
				}
				errorLog += "File harus terdiri dari CustMobil dan MasterMobil";
			}
		}
		
		if(!isAllFileValid){
			errorText(errorLog);
			return;
		}
		
		var parseStatus = "false";
		var reader = new FileReader();
		reader.onload = (function(theFile) {
			return function(e) {
				if (fileType == "custmobil") {
					parseStatus = custmobilListIsValid (e.target.result);
				}else if (fileType == "mastermobil") {
					parseStatus = mastermobilListIsValid (e.target.result);
				}
				if (parseStatus == "true") {
					document.getElementById("form-id").submit();
				} 
				console.log(parseStatus);
			};
		})(file);
		reader.readAsText(file);
		
		var parseStatus1 = "false";
		var reader1 = new FileReader();
		reader1.onload = (function(theFile) {
			return function(e) {
				if (file1Type == "custmobil") {
					parseStatus1 = custmobilListIsValid (e.target.result);
				}else if (file1Type == "mastermobil") {
					parseStatus1 = mastermobilListIsValid (e.target.result);
				}
				if (parseStatus1 == "true") {
					document.getElementById("form-id").submit();
				} 
				console.log(parseStatus1);
			};
		})(file1);
		reader1.readAsText(file1);

		//console.log(parseStatus);
		//console.log(parseStatus1);
		
		if (parseStatus == "true"
				&& parseStatus1 == "true") {
			document.getElementById("form-id").submit();
		} 
	}
	else{
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
	}
	
	return false;
}

function isInteger(value){
	return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
}
