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
		default : errorText("Error baris " + lineNum + ", Company tidak valid. ");  
				retvalue = false;
	}
	return (retvalue);
}

function periodeIsValid (lineNum, periode) {
	var retvalue = true;
	var bulan = periode.substring(0,3);
	if (validMon.indexOf(bulan) == -1) { 
		errorText("Error baris " + lineNum + ", Periode tidak valid. ");  
		retvalue = false;
	}
	if (isNaN(periode.slice(-4))) { 
		errorText("Error baris " + lineNum + ", Periode tidak valid. ");  
		retvalue = false;
	}
	return (retvalue);
}
	
function targetValIsValid (lineNum, targetVal) {
	var retvalue = true;
	if (isNaN(targetVal)) {
		errorText("Error baris " + lineNum + ", Target tidak valid. ");  
		retvalue = false;
	}
	return (retvalue);
}

function errorText (msg) {
	 var x = document.getElementById("errordiv");
//	 console.log(x.innerHTML);
	 x.innerHTML = "<h4>Error : </h4>" + msg;
	 x.style.display = "block";
}
 
function targetListIsValid(text) {
	 var targetRowStatus;
		//break the lines apart
		var lines = text.split('\n');
		if (lines[0].trim() != 'company,product_code,cust_number,cust_id,periode_target,target_sales') { 
			errorText("Header file tidak valid.");
			return ("false"); 
		}
		var headers = lines[0].trim().split(',');
	
		for(var j = 1; j<lines.length; j++){
			if(lines[j].trim() != ""){

				//split the rows at the cellTerminator character
				var information = lines[j].trim().split(',');
				var target = new Object();

				for(var k = 0; k < headers.length; k++){
					switch (k) {
						case 0: target.company = information[k]; break;
						case 1: target.product_code = information[k]; break;
						case 2: target.cust_number = information[k]; break;
						case 3: target.cust_id = information[k]; break;
						case 4: target.periode_target = information[k]; break;
						case 5: target.target_sales = information[k]; break;
					}
				}

				if (!companyIsValid(j, target.company) ) {
					return("false");
				}
				if (!periodeIsValid(j, target.periode_target) ) {
					return("false");
				}
				if	(!targetValIsValid(j, target.target_sales) ) {
					return("false");
				}
			}
  
		}
		return("true")
}
	
function stockListIsValid(text) {
	var stockRowStatus;
		//break the lines apart
	var lines = text.split('\n');
	if (lines[0].trim() != 'company,product_code,cust_number,cust_id,periode_stock,end_stock') { 
			errorText("Header file tidak valid.");
			return ("false"); 
	}
	var headers = lines[0].trim().split(',');
	for(var j = 1; j<lines.length; j++){
		if(lines[j].trim() != ""){

			//split the rows at the cellTerminator character
			var information = lines[j].trim().split(',');
			var target = new Object();

			for(var k = 0; k < headers.length; k++){
				switch (k) {
					case 0: target.company = information[k]; break;
					case 1: target.product_code = information[k]; break;
					case 2: target.cust_number = information[k]; break;
					case 3: target.cust_id = information[k]; break;
					case 4: target.periode_stock = information[k]; break;
					case 5: target.end_stock = information[k]; break;
				}
			}

			if (!companyIsValid(j, target.company) ) {
				return("false");
			}
			if (!periodeIsValid(j, target.periode_stock) ) {
				return("false");
			}
		}

	}
	return("true")
	
}

function custmobilListIsValid(text) {
	var stockRowStatus;
		//break the lines apart
	var lines = text.split('\n');
	if (lines[0].trim() != 'company,cust_number,cust_id,mobil_desc,mobil_id') { 
			errorText("Header file tidak valid.");
			return ("false"); 
	}
	var headers = lines[0].trim().split(',');
	for(var j = 1; j<lines.length; j++){
		if(lines[j].trim() != ""){

			//split the rows at the cellTerminator character
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

			if (!companyIsValid(j, custmobil.company) ) {
				return("false");
			}
		}

	}
	return("true")
	
}

function verify() {
	var x = document.getElementById("jenisfile").value;
  	var file =  document.getElementById('file').files[0];
  	var parseStatus;

	console.log("type:" + x);

	if (file == null) {
		console.log("disini panggil error");
  			errorText ("File belum dipilih.");
  			return;
	}
	console.log("filename:" + file.name);
	if (!(file.name.endsWith(".csv"))) {
  			errorText("Nama file tidak valid");
  			return;
	}
	if (x == "target" && !(file.name.startsWith("target_")) ) {
			errorText("Nama file " + file.name + " tidak valid");
  			return;
	}
	if (x == "stock" && !(file.name.startsWith("stock_")) ) {
		errorText("Nama file " + file.name + " tidak valid");
			return;
	}
	if (x == "custmobil" && !(file.name.startsWith("custmobil_")) ) {
		errorText("Nama file " + file.name + " tidak valid");
			return;
	}

  	var reader = new FileReader();
	// Closure to capture the file information.
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
	// Read the file as text
	reader.readAsText(file);
	
	return false;
}
