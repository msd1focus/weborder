"use strict";

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
	document.getElementById("cell_invoicestatus").innerHTML = rowobj.getAttribute("data-invoicestatus");
	document.getElementById("cell_notes").innerHTML = rowobj.getAttribute("data-notes");

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var objitems;
			var nf = Intl.NumberFormat();
			objitems = JSON.parse(this.responseText);

			for (var i = 0; i < objitems.length; i++) {
				tab.insertRow(i).outerHTML = '<tr><td>'
						+ objitems[i].productCode + '</td><td>'
						+ objitems[i].productDesc + '</td><td>' 
						+ objitems[i].uom + '</td><td style="text-align:right">' 
						+ nf.format(objitems[i].unitPrice) + '</td><td style="text-align:right">' 
						+ objitems[i].jumlah + '</td><td style="text-align:right">' 
						+ nf.format(objitems[i].totalPrice) + '</td></tr>';
			}
		}
	};
/*	setRequestHeader()	*/	
	xhttp.open("GET", "rest/orderdetail?orderid=" +ordId, true);
	xhttp.send();

	document.getElementById("myModal").style.display = "block";
}
