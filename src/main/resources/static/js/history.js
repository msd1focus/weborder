"use strict";

function onload(){
	var conftab = document.getElementById("conftab");
	var company = document.getElementById("company").value.toLowerCase();
	var custId = document.getElementById("custId").value;
	var tabNonWO = document.getElementById("detailNonWO");
	var startInvoiceDate = document.getElementById("startInvoiceDate").textContent;
	var endInvoiceDate = document.getElementById("endInvoiceDate").textContent;
	//console.log("startInvoiceDate: " + startInvoiceDate);
	//console.log("endInvoiceDate: " + endInvoiceDate);
	if(conftab.rows.length>1){
		for(var idxRow = 1; idxRow<conftab.rows.length; idxRow++){
			var invoiceNumber = conftab.rows[idxRow].getAttribute("data-invoicenumber");
	    	if(invoiceNumber!=null){
	    		var innerHtml = "";
	    		if(invoiceNumber.includes(";")){
	    			var inn = invoiceNumber.split(";");
	                for(var i=0; i<inn.length; i++){
	                	if(i>0){
	                		innerHtml += '<br/>';
	                	}
	                	innerHtml += '<input type="button" value="' 
	                		+ inn[i].trim() 
	                		+ '" style="width:10em; color:blue; border:none; background-color:white;" onclick="showinvoice(this)"/>';
	                }
	    		}
	    		else{
	    			innerHtml += '<input type="button" value="' 
	    				+ invoiceNumber.trim() 
	    				+ '" style="width:10em; color:blue; border:none; background-color:white;" onclick="showinvoice(this)"/>';
	    		}
	    		conftab.rows[idxRow].cells[4].innerHTML = innerHtml;
	    	}
		}
	}
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var objitems;
			var nf = Intl.NumberFormat();
			objitems = JSON.parse(this.responseText);
			
			if(objitems.length>0){
				
				for (var i = 0; i < objitems.length; i++) {
					tabNonWO.insertRow(i).innerHTML = 
							'<tr>'
							+ '<td>Non Web Order</td>'
							+ '<td style="text-align:center;">-</td>'
							+ '<td style="text-align:center;">-</td>'
							+ '<td style="text-align:center;">'
							+ '<input id="customerTrxId" type="hidden" value="'
							+ objitems[i].customerTrxId
							+ '"/>'
							+ '-</td>'
							+ '<td style="text-align:center;">'
							+ '<input type="button" value="'
							+ objitems[i].trxNumber
							+ '" style="width:10em; color:blue; border:none; background-color:white;"'
							+ 'onclick="showinvoicenonwo(this)"/>'
							+ '</td>'
							+ '</tr>';
				}
			}else{
				
				tabNonWO.insertRow(i).innerHTML = 
					'<tr>'
					+ '<td>Non Web Order</td>'
					+ '<td style="text-align:center;">-</td>'
					+ '<td style="text-align:center;">-</td>'
					+ '<td style="text-align:center;">-</td>'
					+ '<td style="text-align:center;">-</td>'
					+ '</tr>';
			}
			
		}
	};
/*	setRequestHeader()	*/	
	xhttp.open(
			"GET",
			"/oracle" + company 
			+ "/rest/invdetailnonwo/custidstartenddate?custid=" + custId 
			+ "&startdate=" + startInvoiceDate
			+ "&enddate=" + endInvoiceDate,
			true);
	xhttp.send();
}

function showdetail(obj) {
	var rowobj = obj.parentElement.parentElement;
	var ordId = rowobj.getAttribute("data-orderid");
	var poNumber = rowobj.children[0].innerHTML;
	var poDate = rowobj.children[1].innerHTML;
	var poTotalOrder = rowobj.children[2].innerHTML;
	var tab = document.getElementById("rincianorder");
	tab.innerHTML = "";
	
	document.getElementById("cell_ponumber").innerHTML = poNumber;
	document.getElementById("cell_podate").innerHTML = poDate;

	document.getElementById("cell_totalorder").innerHTML = rowobj.children[2].innerHTML;
	document.getElementById("cell_postatus").innerHTML = rowobj.getAttribute("data-postatus");
	document.getElementById("cell_notes").innerHTML = rowobj.getAttribute("data-notes");

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var objitems;
			var nf = Intl.NumberFormat();
			objitems = JSON.parse(this.responseText);

			for (var i = 0; i < objitems.length; i++) {
				tab.insertRow(i).outerHTML = 
						'<tr>'
						+ '<td>'
						+ objitems[i].productCode 
						+ '</td><td>'
						+ objitems[i].productDesc 
						+ '</td><td>' 
						+ objitems[i].uom 
						+ '</td><td style="text-align:right">' 
						+ nf.format(objitems[i].unitPrice) 
						+ '</td><td style="text-align:right">' 
						+ objitems[i].jumlah 
						+ '</td><td style="text-align:right">' 
						+ nf.format(objitems[i].totalPrice) 
						+ '</td><td>'
						+ objitems[i].nomorCo
						+ '</td><td>'
						+ objitems[i].tanggalCo
						+ '</td><td style="text-align:right">'
						+ nf.format(objitems[i].qtyCo)
						+ '</td><td>'
						+ objitems[i].orderStatus
						+ '</td><td>'
						+ objitems[i].nomorSo
						+ '</td><td>'
						+ objitems[i].tanggalSo
						+ '</td><td>'
						+ objitems[i].orderDetailStatus
						+ '</td><td style="text-align:right">'
						+ nf.format(objitems[i].qtySo)
						+ '</td><td>'
						+ objitems[i].nomorDo
						+ '</td><td>'
						+ objitems[i].tanggalDo
						+ '</td><td style="text-align:right">'
						+ nf.format(objitems[i].qtyDo)
						+ '</td></tr>';
			}
		}
	};
/*	setRequestHeader()	*/	
	xhttp.open("GET", "rest/orderdetail?orderid=" +ordId, true);
	xhttp.send();

	document.getElementById("myModal").style.display = "block";
}

function showinvoice(obj){
	var loading = document.getElementById('loading');
	loading.style.display = "block";
	//document.getElementById("modalInvoice").style.display = "block"; //testonly
	var invoiceNumber = obj.value;
	var tab = document.getElementById("detailInvoices");
	var rowobj = obj.parentElement.parentElement;
	var company = rowobj.getAttribute("data-company").toLowerCase();
	
	tab.innerHTML = "";
	
	document.getElementById("cell_invnumber").innerHTML = invoiceNumber;	
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			//console.log("this.readyState == 4 && this.status == 200: " + obj.value);
			var objitems;
			var nf = Intl.NumberFormat();
			objitems = JSON.parse(this.responseText);
			var cellTrxDate = document.getElementById("cell_trxdate");
			var cellJumlah = document.getElementById("cell_jumlah");
			var rowDiskon1 = document.getElementById("row_diskon1");
			var rowDiskon2 = document.getElementById("row_diskon2");
			var rowDiskon3 = document.getElementById("row_diskon3");
			var rowDiskon4 = document.getElementById("row_diskon4");
			var rowDiskon5 = document.getElementById("row_diskon5");
			var rowDiskon6 = document.getElementById("row_diskon6");
			var rowDiskon7 = document.getElementById("row_diskon7");
			var rowDpp = document.getElementById("row_dpp");
			var rowPpn = document.getElementById("row_ppn");
			var rowTotal = document.getElementById("row_total");
			var cellDiskon1 = document.getElementById("cell_diskon1");
			var cellDiskon2 = document.getElementById("cell_diskon2");
			var cellDiskon3 = document.getElementById("cell_diskon3");
			var cellDiskon4 = document.getElementById("cell_diskon4");
			var cellDiskon5 = document.getElementById("cell_diskon5");
			var cellDiskon6 = document.getElementById("cell_diskon6");
			var cellDiskon7 = document.getElementById("cell_diskon7");
			var cellDpp = document.getElementById("cell_dpp");
			var cellPpn = document.getElementById("cell_ppn");
			var cellTotal = document.getElementById("cell_total");
			var trxDate = "UNKNOWN";
			var jumlah = 0; 
			var diskon1 = 0;
			var diskon2 = 0;
			var diskon3 = 0;
			var diskon4 = 0;
			var diskon5 = 0;
			var diskon6 = 0;
			var diskon7 = 0;
			var isIncludeTax = false;
			var isBatam = false;
			for (var i = 0; i < objitems.length; i++) {
				if(objitems[i].trxDate!=null){
					trxDate = objitems[i].trxDate;
				}
				var qty = parseFloat(objitems[i].quantityInvoiced);
				var price = parseFloat(objitems[i].unitSellingPrice);
				var amount = qty*price;
				diskon1 = objitems[i].diskon1;
				diskon2 = objitems[i].diskon2;
				diskon3 = objitems[i].diskon3;
				diskon4 = objitems[i].diskon4;
				diskon5 = objitems[i].diskon5;
				diskon6 = objitems[i].diskon6;
				diskon7 = objitems[i].diskon7;
				if(objitems[i].taxClassificationCode=="PPN 10% INCLUDE"){
					isIncludeTax = true;
				}
				else{
					if(objitems[i].attribute5=="SLB006"){
						isBatam = true;
					}
				}
				jumlah += amount;
				tab.insertRow(i).outerHTML = 
						'<tr><td>'
						+ objitems[i].lineNumber 
						+ '</td><td>'
						+ objitems[i].itemCode 
						+ '</td><td>' 
						+ objitems[i].itemDesc 
						+ '</td><td style="text-align:right">' 
						+ formatCurrency(nf.format(qty)) 
						+ ' ' 
						+ objitems[i].uomCode  
						+ '</td><td style="text-align:right">' 
						+ formatCurrency(nf.format(price)) 
						+ '</td><td style="text-align:right">' 
						+ formatCurrency(nf.format(amount)) 
						+ '</td></tr>';
			}
			
			cellTrxDate.innerHTML = trxDate;
			cellJumlah.innerHTML = formatCurrency(nf.format(jumlah));
			
			var total = jumlah;
			
			if(diskon1>0){
				cellDiskon1.innerHTML = 
					formatCurrency(nf.format(diskon1));
				rowDiskon1.style.display = "table-row";
				total -= diskon1;
			}
			else{
				rowDiskon1.style.display = "none";
			}
			
			if(diskon2>0){
				cellDiskon2.innerHTML = 
					formatCurrency(nf.format(diskon2));
				rowDiskon2.style.display = "table-row";
				total -= diskon2;
			}
			else{
				rowDiskon2.style.display = "none";
			}
			
			if(diskon3>0){
				cellDiskon3.innerHTML = 
					formatCurrency(nf.format(diskon3));
				rowDiskon3.style.display = "table-row";
				total -= diskon3;
			}
			else{
				rowDiskon3.style.display = "none";
			}
			
			if(diskon4>0){
				cellDiskon4.innerHTML = 
					formatCurrency(nf.format(diskon4));
				rowDiskon4.style.display = "table-row";
				total -= diskon4;
			}
			else{
				rowDiskon4.style.display = "none";
			}
			
			if(diskon5>0){
				cellDiskon5.innerHTML = 
					formatCurrency(nf.format(diskon5));
				rowDiskon5.style.display = "table-row";
				total -= diskon5;
			}
			else{
				rowDiskon5.style.display = "none";
			}
			
			if(diskon6>0){
				cellDiskon6.innerHTML = 
					formatCurrency(nf.format(diskon6));
				rowDiskon6.style.display = "table-row";
				total -= diskon6;
			}
			else{
				rowDiskon6.style.display = "none";
			}
			
			if(diskon7>0){
				cellDiskon7.innerHTML = 
					formatCurrency(nf.format(diskon7));
				rowDiskon7.style.display = "table-row";
				total -= diskon7;
			}
			else{
				rowDiskon7.style.display = "none";
			}
			if(total<0){
				total = 0;
			}
			if(isIncludeTax){
				cellTotal.innerHTML = 
					formatCurrency(nf.format(total));
				rowTotal.style.display = "table-row";
			}
			else{
				cellDpp.innerHTML = 
					formatCurrency(nf.format(total));
				rowDpp.style.display = "table-row";
				if(!isBatam){
					var ppn = total/10;
					cellPpn.innerHTML = 
						formatCurrency(nf.format(ppn));
					cellTotal.innerHTML = 
						formatCurrency(nf.format(total+ppn));
					rowPpn.style.display = "table-row";
					rowTotal.style.display = "table-row";
				}
			}
			loading.style.display = "none";
			document.getElementById("modalInvoice").style.display = "block";
		}
		/*else{
			console.log("this.readyState: " + this.readyState);
			console.log("this.status: " + this.status);
		}*/
	};
/*	setRequestHeader()	*/	
	xhttp.open("GET", "/oracle" + company + "/rest/invdetail?trxnumber=" +invoiceNumber, true);
	xhttp.send();
}

function showinvoicenonwo(obj){
	var loading = document.getElementById('loading');
	var company = document.getElementById("company").value.toLowerCase();
	loading.style.display = "block";
	//document.getElementById("modalInvoice").style.display = "block"; //testonly
	var invoiceNumber = obj.value;
	var rowobj = obj.parentElement.parentElement;
	var tab = document.getElementById("detailInvoices");
	var customerTrxId = rowobj.children[3].children[0].value;
	
	tab.innerHTML = "";
	
	document.getElementById("cell_invnumber").innerHTML = invoiceNumber;	
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			//console.log("this.readyState == 4 && this.status == 200: " + obj.value);
			var objitems;
			var nf = Intl.NumberFormat();
			objitems = JSON.parse(this.responseText);
			var cellTrxDate = document.getElementById("cell_trxdate");
			var cellJumlah = document.getElementById("cell_jumlah");
			var rowDiskon1 = document.getElementById("row_diskon1");
			var rowDiskon2 = document.getElementById("row_diskon2");
			var rowDiskon3 = document.getElementById("row_diskon3");
			var rowDiskon4 = document.getElementById("row_diskon4");
			var rowDiskon5 = document.getElementById("row_diskon5");
			var rowDiskon6 = document.getElementById("row_diskon6");
			var rowDiskon7 = document.getElementById("row_diskon7");
			var rowDpp = document.getElementById("row_dpp");
			var rowPpn = document.getElementById("row_ppn");
			var rowTotal = document.getElementById("row_total");
			var cellDiskon1 = document.getElementById("cell_diskon1");
			var cellDiskon2 = document.getElementById("cell_diskon2");
			var cellDiskon3 = document.getElementById("cell_diskon3");
			var cellDiskon4 = document.getElementById("cell_diskon4");
			var cellDiskon5 = document.getElementById("cell_diskon5");
			var cellDiskon6 = document.getElementById("cell_diskon6");
			var cellDiskon7 = document.getElementById("cell_diskon7");
			var cellDpp = document.getElementById("cell_dpp");
			var cellPpn = document.getElementById("cell_ppn");
			var cellTotal = document.getElementById("cell_total");
			var trxDate = "UNKNOWN";
			var jumlah = 0; 
			var diskon1 = 0;
			var diskon2 = 0;
			var diskon3 = 0;
			var diskon4 = 0;
			var diskon5 = 0;
			var diskon6 = 0;
			var diskon7 = 0;
			var isIncludeTax = false;
			var isBatam = false;
			for (var i = 0; i < objitems.length; i++) {
				if(objitems[i].trxDate!=null){
					trxDate = objitems[i].trxDate;
				}
				var qty = parseFloat(objitems[i].quantityInvoiced);
				var price = parseFloat(objitems[i].unitSellingPrice);
				var amount = qty*price;
				diskon1 = objitems[i].diskon1;
				diskon2 = objitems[i].diskon2;
				diskon3 = objitems[i].diskon3;
				diskon4 = objitems[i].diskon4;
				diskon5 = objitems[i].diskon5;
				diskon6 = objitems[i].diskon6;
				diskon7 = objitems[i].diskon7;
				if(objitems[i].taxClassificationCode=="PPN 10% INCLUDE"){
					isIncludeTax = true;
				}
				else{
					if(objitems[i].attribute5=="SLB006"){
						isBatam = true;
					}
				}
				jumlah += amount;
				tab.insertRow(i).outerHTML = 
						'<tr><td>'
						+ objitems[i].lineNumber 
						+ '</td><td>'
						+ objitems[i].itemCode 
						+ '</td><td>' 
						+ objitems[i].itemDesc 
						+ '</td><td style="text-align:right">' 
						+ formatCurrency(nf.format(qty)) 
						+ ' ' 
						+ objitems[i].uomCode  
						+ '</td><td style="text-align:right">' 
						+ formatCurrency(nf.format(price)) 
						+ '</td><td style="text-align:right">' 
						+ formatCurrency(nf.format(amount)) 
						+ '</td></tr>';
			}
			
			cellTrxDate.innerHTML = trxDate;
			cellJumlah.innerHTML = formatCurrency(nf.format(jumlah));
			
			var total = jumlah;
			
			if(diskon1>0){
				cellDiskon1.innerHTML = 
					formatCurrency(nf.format(diskon1));
				rowDiskon1.style.display = "table-row";
				total -= diskon1;
			}
			else{
				rowDiskon1.style.display = "none";
			}
			
			if(diskon2>0){
				cellDiskon2.innerHTML = 
					formatCurrency(nf.format(diskon2));
				rowDiskon2.style.display = "table-row";
				total -= diskon2;
			}
			else{
				rowDiskon2.style.display = "none";
			}
			
			if(diskon3>0){
				cellDiskon3.innerHTML = 
					formatCurrency(nf.format(diskon3));
				rowDiskon3.style.display = "table-row";
				total -= diskon3;
			}
			else{
				rowDiskon3.style.display = "none";
			}
			
			if(diskon4>0){
				cellDiskon4.innerHTML = 
					formatCurrency(nf.format(diskon4));
				rowDiskon4.style.display = "table-row";
				total -= diskon4;
			}
			else{
				rowDiskon4.style.display = "none";
			}
			
			if(diskon5>0){
				cellDiskon5.innerHTML = 
					formatCurrency(nf.format(diskon5));
				rowDiskon5.style.display = "table-row";
				total -= diskon5;
			}
			else{
				rowDiskon5.style.display = "none";
			}
			
			if(diskon6>0){
				cellDiskon6.innerHTML = 
					formatCurrency(nf.format(diskon6));
				rowDiskon6.style.display = "table-row";
				total -= diskon6;
			}
			else{
				rowDiskon6.style.display = "none";
			}
			
			if(diskon7>0){
				cellDiskon7.innerHTML = 
					formatCurrency(nf.format(diskon7));
				rowDiskon7.style.display = "table-row";
				total -= diskon7;
			}
			else{
				rowDiskon7.style.display = "none";
			}
			if(total<0){
				total = 0;
			}
			if(isIncludeTax){
				cellTotal.innerHTML = 
					formatCurrency(nf.format(total));
				rowTotal.style.display = "table-row";
			}
			else{
				cellDpp.innerHTML = 
					formatCurrency(nf.format(total));
				rowDpp.style.display = "table-row";
				if(!isBatam){
					var ppn = total/10;
					cellPpn.innerHTML = 
						formatCurrency(nf.format(ppn));
					cellTotal.innerHTML = 
						formatCurrency(nf.format(total+ppn));
					rowPpn.style.display = "table-row";
					rowTotal.style.display = "table-row";
				}
			}
			loading.style.display = "none";
			document.getElementById("modalInvoice").style.display = "block";
		}
		/*else{
			console.log("this.readyState: " + this.readyState);
			console.log("this.status: " + this.status);
		}*/
	};
/*	setRequestHeader()	*/	
	xhttp.open("GET", "/oracle" + company + "/rest/invdetail/customertrxid?customertrxid=" + customerTrxId, true);
	xhttp.send();
}

function formatCurrency(obj){
	var result = "0.00";
	if(obj.includes(".")){
		var objs = obj.split(".");
        var obj1 = objs[0].trim();
        var obj2 = objs[1].trim();
        if(obj2.length==0){
        	obj2 = obj2 + "00";
        }
        else if(obj2.length==1){
        	obj2 = obj2 + "0";
        }
        else if(obj2.length>2){
        	obj2 = obj2.substring(0,2);
        }
        result = obj1 + "." + obj2;
	}
	else{
		result = obj + ".00";
	}
	return result;
}

function closeinvoice(){
	document.getElementById("modalInvoice").style.display = "none";
}
