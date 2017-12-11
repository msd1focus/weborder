window.onload = function(){
	
	
	var orderBySelected = document.getElementById("orderBySelected").value;
	var manual = document.getElementById("manual");
	var cmob = document.getElementById("cmob");
	var orderType = document.getElementById("orderType");
	
	dimensiMobilInit();
	poDateInit();
	
	changeOrderType(orderType);
	
	if(orderBySelected=="CMOB"){
		cmob.checked = "checked";
	}
	else if(orderBySelected="Manual"){
		manual.checked = "checked";
	}
	
	changeJumlahOrder(jumlahOrder);	
}

/*$(document).keypress(
	    function(event){
	     if (event.which == '13') {
	    	 console.log("enter");
	        event.preventDefault();
	      }

});*/


function saveForm(obj){

    var submitStatus = 
		document.getElementById("submitStatus");
    var btnSubmit = 
		document.getElementById("btnSubmit");
    console.log("submitStatus.value: " 
    			+ submitStatus.value);
    
	if(submitStatus.value==="false"){

        console.log("save!");
	    console.log("obj.name: " 
	    			+ obj.name);
	    console.log("btnSubmit.name: " 
    			+ btnSubmit.name );
        submitStatus.value = "true";
        obj.name = "action";
        btnSubmit.name = "action";
	
		var selisihDimensi1Text = 
			document.getElementById("selisihDimensi1Text");
		var selisihDimensi2Text = 
			document.getElementById("selisihDimensi2Text");
		var selisihDimensi3Text = 
			document.getElementById("selisihDimensi3Text");
		var selisihDimensi4Text = 
			document.getElementById("selisihDimensi4Text");
		var selisihDimensi5Text = 
			document.getElementById("selisihDimensi5Text");
		
		var isWarning = "false";
		
		var alertText = "Dimensi Order pada : \n";
		
		if(selisihDimensi1Text.style.backgroundColor === "yellow"){
			alertText += "- Order 1\n";
			isWarning = "true";
		}
		if(selisihDimensi2Text.style.backgroundColor === "yellow"){
			alertText += "- Order 2\n";
			isWarning = "true";
		}
		if(selisihDimensi3Text.style.backgroundColor === "yellow"){
			alertText += "- Order 3\n";
			isWarning = "true";
		}
		if(selisihDimensi4Text.style.backgroundColor === "yellow"){
			alertText += "- Order 4\n";
			isWarning = "true";
		}
		if(selisihDimensi5Text.style.backgroundColor === "yellow"){
			alertText+= "- Order 5\n";
			isWarning = "true";
		}
		
		if(isWarning==="true"){
			alertText += "Melebihi Kapasitas Mobil. Mobon Diperiksa Kembali.";
			alert(alertText);
		}
		
		saveOrderGrp("DRAFT");
		
	    /*$.ajax({
	    	type: "GET",
            dataType: "application/json",
            contentType: "json",
	    	url: "/weborder/rest/orderdetails",
	    	success: function(result, textStatus, xhr){
	    		console.log(xhr.status);
	    		$.each(result, function(i, field){
			        console.log(
			        		"ajax_success: " 
			        		+ field.orderDetailId 
			        		+ " - "
			        		+ field.orderId 
			        		+ " - "
			        		+ field.jumlah);
			     });
	    	},
			error: function( xhr, textStatus, errorThrown ) {
				console.log( "XMLHttpRequest.status:  " + xhr.status);
				console.log( 
						"XMLHttpRequest.responseText:  " 
						+ xhr.responseText);
				responseText = JSON.parse(xhr.responseText);
				console.log( 
						"XMLHttpRequest.responseText.Error:  " 
						+ responseText.error);
				console.log( 
						"XMLHttpRequest.responseText.Message:  " 
						+ responseText.message);
			}
	    });*/
	}
	else{

		alert ("Already saved, please wait!");
        obj.name = "action1";
        btnSubmit.name = "action1";
	}	

	//window.location.replace("/weborder/home");
		
	return false;
}

function submitForm(obj){

    var submitStatus = 
		document.getElementById("submitStatus");    
    var btnSave = 
		document.getElementById("btnSave");
    console.log("submitStatus.value: " 
    			+ submitStatus.value);
    
    if(submitStatus.value==="false"){

        console.log("submit!");
	    console.log("obj.name: " 
	    			+ obj.name);
	    console.log("btnSave.name: " 
    			+ btnSave.name );
	    
    	submitStatus.value = "true";
        obj.name = "action";
        btnSave.name = "action";
        
        var selisihDimensi1Text = 
    		document.getElementById("selisihDimensi1Text");
    	var selisihDimensi2Text = 
    		document.getElementById("selisihDimensi2Text");
    	var selisihDimensi3Text = 
    		document.getElementById("selisihDimensi3Text");
    	var selisihDimensi4Text = 
    		document.getElementById("selisihDimensi4Text");
    	var selisihDimensi5Text = 
    		document.getElementById("selisihDimensi5Text");
    	
    	var isWarning = "false";
    	
    	var alertText = "Dimensi Order pada : \n";
    	
    	if(selisihDimensi1Text.style.backgroundColor === "yellow"){
    		alertText += "- Order 1\n";
    		isWarning = "true";
    	}
    	if(selisihDimensi2Text.style.backgroundColor === "yellow"){
    		alertText += "- Order 2\n";
    		isWarning = "true";
    	}
    	if(selisihDimensi3Text.style.backgroundColor === "yellow"){
    		alertText += "- Order 3\n";
    		isWarning = "true";
    	}
    	if(selisihDimensi4Text.style.backgroundColor === "yellow"){
    		alertText += "- Order 4\n";
    		isWarning = "true";
    	}
    	if(selisihDimensi5Text.style.backgroundColor === "yellow"){
    		alertText+= "- Order 5\n";
    		isWarning = "true";
    	}
    	
    	if(isWarning==="true"){
    		alertText += "Melebihi Kapasitas Mobil. Mobon Diperiksa Kembali.";
    		alert(alertText);
    	}	

		saveOrderGrp("SUBMITTED");
	}
	else{
        
		alert ("Already submitted, please wait!");
        obj.name = "action1";
        btnSave.name = "action1";
	}
	
	//window.location.replace("/weborder/home");
	
	return false;
}

function saveOrderGrp(ss){
	
	var orderGrpId = 
		document.getElementById("orderGrpId").value;
	var company = 
		document.getElementById("company").value;
	var custId = 
		document.getElementById("custId").value;
	var periodeSelected = 
		document.getElementById("periodeSelected").value;
	var orderTypeSelected = 
		document.getElementById("orderTypeSelected").value;
	var orderBySelected = 
		document.getElementById("orderBySelected").value;
	var leadTime = 
		document.getElementById("leadTime").value;
	var jumlahOrderSelected = 
		document.getElementById("jumlahOrderSelected").value;
	var sisaLimit = 
		unformatText(document.getElementById("sisaLimit").value);
	var qtyTotal = 
		unformatText(document.getElementById("qtyTotal").value);
	var amtTotal = 
		unformatText(document.getElementById("amtTotal").value);
	var createTime = 
		document.getElementById("createTime").value;
	var currentdate = new Date();
	updateTime = currentdate.getTime();
	if(createTime=="" || createTime == null){
		createTime = currentdate.getTime();
	}

	var ordergrp = 
		{
		   "orderGrpId": orderGrpId,
		   "company": company,
		   "custId": custId,
		   "periodeOrder": periodeSelected,
		   "orderType": orderTypeSelected,
		   "orderBy": orderBySelected,
		   "leadTime": leadTime,
		   "totalOrder": qtyTotal,
		   "jumlahOrder": jumlahOrderSelected,
		   "totalPrice": amtTotal,
		   "sisaLimit": sisaLimit,
		   "submitStatus": ss,
		   "createTime": createTime,
		   "updateTime": updateTime
		};

	console.log(ordergrp);
	
	$.ajax({
	    type: "PUT",
	    url: "/weborder/rest/ordergrp",
	    // The key needs to match your method's input parameter (case-sensitive).
	    data: JSON.stringify(ordergrp),
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    success: function(result){
	    	console.log("ordergrp >> success: " + result);
	    	orderGrpId = result;
	    },
	    complete: function( xhr, status ) {
            console.log( "ordergrp >> complete for " + orderGrpId );
            if(jumlahOrderSelected>0){
            	saveOrder(1, company, custId, orderGrpId, periodeSelected);
            }
	    },
	    error: function( xhr, textStatus, errorThrown ) {
			console.log( "XMLHttpRequest.status:  " + xhr.status);
			if(xhr.status!==200){
				console.log( 
						"ordergrp >> XMLHttpRequest.responseText:  " 
						+ xhr.responseText);
				responseText = JSON.parse(xhr.responseText);
				console.log( 
						"ordergrp >> XMLHttpRequest.responseText.Error:  " 
						+ responseText.error);
				console.log( 
						"ordergrp >> XMLHttpRequest.responseText.Message:  " 
						+ responseText.message);
			}
		}
	});
}

function saveOrder(o, c, ci, ogi, ps){
	
	var orderId = 
		document.getElementById("orderId"+o).value;
	var poNumber = 
		document.getElementById("poNumber"+o).value;
	var poDate = 
		document.getElementById("poDate"+o).value;
	var notes = 
		document.getElementById("notes"+o).value;
	var shipToSelected = 
		document.getElementById("shipTo"+o+"Selected").value;
	var expedisiSelected = 
		document.getElementById("expedisi"+o+"Selected").value;
	var mobilSelected = 
		document.getElementById("mobil"+o+"Selected").value;
	var dimensiMobil = 
		document.getElementById("dimensiMobil"+o).value;
	var dimensiOrder = 
		document.getElementById("dimensiOrder"+o).value;
	var selisihDimensi = 
		document.getElementById("selisihDimensi"+o).value;
	var totalAmount = 
		document.getElementById("totalAmount"+o).value;
	
	var order = 
		{
		   "orderId": orderId,
		   "orderGrpId": ogi,
		   "company": c,
		   "custId": ci,
		   "poNumber": poNumber,
		   "orderDate": poDate,
		   "notes": notes,
		   "shipTo": shipToSelected,
		   "expedisi": expedisiSelected,
		   "jenisMobil": mobilSelected,
		   "tonaseMobil": dimensiMobil,
		   "tonaseOrder": dimensiOrder,
		   "selisihTonase": selisihDimensi,
		   "totalPrice": totalAmount,
		   "periode": ps,
		   "ebsSubmitStatus": "R",
		   "ebsSubmitDate": null,
		   "soNumber": null,
		   "soStatus": null,
		   "soDate": null,
		   "invoiceStatus": null,
		   "invoiceDate": null,
		   "processFlag": "R"
		};

	console.log(order);
	
	$.ajax({
	    type: "PUT",
	    url: "/weborder/rest/order",
	    // The key needs to match your method's input parameter (case-sensitive).
	    data: JSON.stringify(order),
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    success: function(result){
	    	console.log("order >> success: " + result);
	    	orderId = result;
	    },
	    complete: function( xhr, status ) {
            console.log( "order >> complete for " + orderId );
            saveOrderDetail(o, orderId, c, ci, ogi, ps);
	    },
	    error: function( xhr, textStatus, errorThrown ) {
			console.log( "order >> XMLHttpRequest.status:  " + xhr.status);
			if(xhr.status!==200){
				console.log( 
						"order >> XMLHttpRequest.responseText:  " 
						+ xhr.responseText);
				responseText = JSON.parse(xhr.responseText);
				console.log( 
						"order >> XMLHttpRequest.responseText.Error:  " 
						+ responseText.error);
				console.log( 
						"order >> XMLHttpRequest.responseText.Message:  " 
						+ responseText.message);
			}
		}
	});
}

var orderSavedCount = 0;

function saveOrderDetail(o, odi, c, ci, ogi, ps){
	
	var orderdetail = [];
	
	var tblOrderItemFixed = 
		document.getElementById("tblOrderItemFixed");
	var tblOrder = 
		document.getElementById("tblOrder");
	var productQty = 
		parseFloat(document.getElementById("productQty").value);
	var jumlahOrderSelected = 
		document.getElementById("jumlahOrderSelected").value;
	var item = 0;
	
	for(var idxRow = 1; idxRow<=productQty; idxRow++){

		var qty =
			unformatText(tblOrder.rows[idxRow].cells[o-1].children[0].value);
		
		if(qty>0){
			item += 1;
			var productCode=
				tblOrderItemFixed.rows[idxRow].cells[0].children[0].value;
			var productDesc=
				tblOrderItemFixed.rows[idxRow].cells[1].children[0].value;
			var orderDetailId =
				tblOrder.rows[idxRow].cells[o-1].children[1].value;
			var uomSelected = 
				tblOrder.rows[idxRow].cells[8].children[3].value;
			var unitPrice = 
				unformatText(tblOrder.rows[idxRow].cells[8].children[0].value);
			var totalPrice = 
				unformatText(tblOrder.rows[idxRow].cells[6].children[0].value);
			orderdetail.push({ 
		        "orderDetailId" : orderDetailId,
				"orderId": odi,
				"productCode": productCode,
				"productDesc": productDesc,
				"uom": uomSelected,
		        "jumlah"  : qty,
				"unitPrice": unitPrice,
				"totalPrice": totalPrice
		    });
		}
	}
	
	console.log(orderdetail);
	
	$.ajax({
	    type: "PUT",
	    url: "/weborder/rest/orderdetail",
	    // The key needs to match your method's input parameter (case-sensitive).
	    data: JSON.stringify(orderdetail),
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    success: function(result){
	    	console.log("orderdetail >> success: " 
	    			+ result + " rows from " + item + " rows");
	    },
	    complete: function( xhr, status ) {
            orderSavedCount += 1;
            console.log( "orderdetail >> orderSavedCount " + orderSavedCount );
            console.log( "jumlahOrderSelected: " + jumlahOrderSelected);
        	if(jumlahOrderSelected>1 && orderSavedCount==1){
        		saveOrder(2, c, ci, ogi, ps);
        	}
    		if(jumlahOrderSelected>2 && orderSavedCount==2){
    			saveOrder(3, c, ci, ogi, ps);
    		}
			if(jumlahOrderSelected>3 && orderSavedCount==3){
				saveOrder(4, c, ci, ogi, ps);
			}
			if(jumlahOrderSelected>4 && orderSavedCount==4){
				saveOrder(5, c, ci, ogi, ps);
			}          
            if(orderSavedCount==jumlahOrderSelected){
    	    	window.location.replace("/weborder/home");
            }
	    },
	    error: function( xhr, textStatus, errorThrown ) {
			console.log( "XMLHttpRequest.status:  " + xhr.status);
			if(xhr.status!==200){
				console.log( 
						"XMLHttpRequest.responseText:  " 
						+ xhr.responseText);
				responseText = JSON.parse(xhr.responseText);
				console.log( 
						"XMLHttpRequest.responseText.Error:  " 
						+ responseText.error);
				console.log( 
						"XMLHttpRequest.responseText.Message:  " 
						+ responseText.message);
			}
		}
	});
	
}

function formatText(obj){
	
	text = obj.value;
	//if(!isNaN(text)){
		text = text.replace(/[\D\s\._\-]+/g, "");
		text = text ? parseFloat( text, 10 ) : 0;
		text = ( text === 0 ) ? "" : text.toLocaleString( "en-US" )
		if(text===""){
			text = "0";
		}
		if(text<0){
			text = "-" + text;
		}
		obj.value = text;
		//obj.value = text.toFixed(2);
	//}
}

function formatTextValue(obj){
	
	text = obj;
	//text = text.toString().replace(/[\D\s\._\-]+/g, "");
	text = text ? parseFloat( text, 10 ) : 0;
	text = ( text === 0 ) ? "" : text.toLocaleString( "en-US" )
	if(text===""){
		text = "0";
	}
	return text;
}

function unformatText(obj){
	text = obj;
	var value = 0;
	text = text.replace(/,/g, "");
	value = parseFloat(text);
	return value;
}

function dimensiMobilInit(){
	
	var dimensiMobil1 = document.getElementById("dimensiMobil1").value;
	var dimensiMobil2 = document.getElementById("dimensiMobil2").value;
	var dimensiMobil3 = document.getElementById("dimensiMobil3").value;
	var dimensiMobil4 = document.getElementById("dimensiMobil4").value;
	var dimensiMobil5 = document.getElementById("dimensiMobil5").value;
	var dimensiMobil1Text = document.getElementById("dimensiMobil1Text");
	var dimensiMobil2Text = document.getElementById("dimensiMobil2Text");
	var dimensiMobil3Text = document.getElementById("dimensiMobil3Text");
	var dimensiMobil4Text = document.getElementById("dimensiMobil4Text");
	var dimensiMobil5Text = document.getElementById("dimensiMobil5Text");
	
	dimensiMobil1Text.value = formatTextValue(dimensiMobil1);
	dimensiMobil2Text.value = formatTextValue(dimensiMobil2);
	dimensiMobil3Text.value = formatTextValue(dimensiMobil3);
	dimensiMobil4Text.value = formatTextValue(dimensiMobil4);
	dimensiMobil5Text.value = formatTextValue(dimensiMobil5);
}

function poDateInit(){
	   
	var poDate1 = document.getElementById("poDate1");;
	var poDate2 = document.getElementById("poDate2");
	var poDate3 = document.getElementById("poDate3");
	var poDate4 = document.getElementById("poDate4");
	var poDate5 = document.getElementById("poDate5");
	
	var pd1 = getDate(poDate1.value);
	var pd2 = getDate(poDate2.value);
	var pd3 = getDate(poDate3.value);
	var pd4 = getDate(poDate4.value);
	var pd5 = getDate(poDate5.value);
	
	if(pd2<pd1){
		poDate2.value = poDate1.value;
		pd2 = getDate(poDate2.value);
	}
	
	if(pd3<pd2){
		poDate3.value = poDate2.value;
		pd3 = getDate(poDate3.value);
	}
	
	if(pd4<pd3){
		poDate4.value = poDate3.value;
		pd4 = getDate(poDate4.value);
	}
	
	if(pd5<pd5){
		poDate5.value = poDate4.value;
		pd5 = getDate(poDate5.value);
	}
	
	poDate2.min = poDate1.value;
	poDate3.min = poDate2.value;
	poDate4.min = poDate3.value;
	poDate5.min = poDate4.value;
	
}

function poDate1Change(obj){
	
	var poDate1 = document.getElementById("poDate1");
	var poDate2 = document.getElementById("poDate2");
	var poDate3 = document.getElementById("poDate3");
	var poDate4 = document.getElementById("poDate4");
	var poDate5 = document.getElementById("poDate5");
	
	if(obj.value===""){
		poDate1.value = poDate1.min;
	}

	pd1 = getDate(poDate1.value);
	pd2 = getDate(poDate2.value);
	pd3 = getDate(poDate3.value);
	pd4 = getDate(poDate4.value);
	pd5 = getDate(poDate5.value);
	
	pd1min = getDate(poDate1.min);
	if(pd1<pd1min){
		poDate1.value = poDate1.min;
	}
	
	if(pd2<pd1){
		poDate2.value = poDate1.value;
	}
	
	if(pd3<pd1){
		poDate3.value = poDate1.value;
	}
	
	if(pd4<pd1){
		poDate4.value = poDate1.value;
	}
	
	if(pd5<pd1){
		poDate5.value = poDate1.value;
	}
	
	poDate2.min = poDate1.value;
	poDate3.min = poDate1.value;
	poDate4.min = poDate1.value;
	poDate5.min = poDate1.value;
	
}

function poDate2Change(obj){
	
	var poDate2 = document.getElementById("poDate2");
	var poDate3 = document.getElementById("poDate3");
	var poDate4 = document.getElementById("poDate4");
	var poDate5 = document.getElementById("poDate5");
	
	if(obj.value===""){
		poDate2.value = poDate2.min;
	}
	
	pd2 = getDate(poDate2.value);
	pd3 = getDate(poDate3.value);
	pd4 = getDate(poDate4.value);
	pd5 = getDate(poDate5.value);
	
	pd2min = getDate(poDate2.min);
	if(pd2<pd2min){
		poDate2.value = poDate2.min;
	}
	
	if(pd3<pd2){
		poDate3.value = poDate2.value;
	}
	
	if(pd4<pd2){
		poDate4.value = poDate2.value;
	}
	
	if(pd5<pd2){
		poDate5.value = poDate2.value;
	}
	
	poDate3.min = poDate2.value;
	poDate4.min = poDate2.value;
	poDate5.min = poDate2.value;
	
}

function poDate3Change(obj){
	   
	var poDate3 = document.getElementById("poDate3");
	var poDate4 = document.getElementById("poDate4");
	var poDate5 = document.getElementById("poDate5");
	
	if(obj.value===""){
		poDate3.value = poDate3.min;
	}
	
	pd3 = getDate(poDate3.value);
	pd4 = getDate(poDate4.value);
	pd5 = getDate(poDate5.value);
	
	pd3min = getDate(poDate3.min);
	if(pd3<pd3min){
		poDate3.value = poDate3.min;
	}
	
	if(pd4<pd3){
		poDate4.value = poDate3.value;
	}
	
	if(pd5<pd3){
		poDate5.value = poDate3.value;
	}
	
	poDate4.min = poDate3.value;
	poDate5.min = poDate3.value;
	
}


function poDate4Change(obj){
	   
	var poDate4 = document.getElementById("poDate4");
	var poDate5 = document.getElementById("poDate5");
	
	if(obj.value===""){
		poDate4.value = poDate4.min;
	}
	
	pd4 = getDate(poDate4.value);
	pd5 = getDate(poDate5.value);
	
	pd4min = getDate(poDate4.min);
	if(pd4<pd4min){
		poDate4.value = poDate4.min;
	}
	
	if(pd5<pd4){
		poDate5.value = poDate4.value;
	}
	
	poDate5.min = poDate4.value;
	
}

function poDate5Change(obj){
	   
	var poDate5 = document.getElementById("poDate5");

	if(obj.value===""){
		poDate5.value = poDate5.min;
	}
	
	pd5 = getDate(poDate5.value);
	
	pd5min = getDate(poDate5.min);
	if(pd5<pd5min){
		poDate5.value = poDate5.min;
	}
	
}

function getDate(obj){
	
	var date = new Date();
	
	var d = obj.split("-");
    var year = d[0];
    var month = d[1];
    var day = d[2];
	
    date.
		setDate(day);
    date.
		setMonth(month);
    date.
		setFullYear(year);
	
	return date;
}

/*function changeSearch(obj){
	var productCode = obj.text;
    var searchSelected = document.getElementById("searchSelected");
	console.log("productCodeSelected: " + productCode);
    searchSelected.value = productCode;
}*/

function searchProduct(obj){
	
	console.log("===============================================================");
	console.log("Search");
	console.log("===============================================================");
	
	var tblOrderItemFixed = document.getElementById("tblOrderItemFixed");
	var tblOrder = document.getElementById("tblOrder");
	var searchInput = document.getElementById("searchInput");
	var productQty = 
		parseFloat(document.getElementById("productQty").value);
	
	var productCodeSelected =
		searchInput.value;
	console.log("productCodeSelected: " + productCodeSelected);
	
	for(var idxRow = 1; idxRow<=productQty; idxRow++){
		
		var productCodeCurrent =
			tblOrderItemFixed.rows[idxRow].cells[1].children[0].value;
		if(productCodeSelected===productCodeCurrent){
			tblOrder.rows[idxRow].cells[0].children[0].focus();
			break;
		}
	}
	

	console.log("===============================================================");
	return;
}

function changeUom(obj){

	console.log("===============================================================");
	console.log("Change UOM");
	console.log("===============================================================");
	
	var uomSelectedRate = obj.value;
	var idxRowCurrent = parseFloat(obj.parentNode.parentNode.rowIndex);
	console.log("idxRowCurrent: " + idxRowCurrent);
	//uomSelected.value = uomSelectedRate;
	var jumlahOrder = document.getElementById("jumlahOrder");
	var tblOrder = document.getElementById("tblOrder");
	//var untPrice = tblOrder.rows[idxRowCurrent].cells[6].children[0];
	var untPrice = tblOrder.rows[idxRowCurrent].cells[8].children[0];
	var untPriceInit = tblOrder.rows[idxRowCurrent].cells[8].children[1];
	var uomInit = tblOrder.rows[idxRowCurrent].cells[8].children[2];
	var uomSelected = tblOrder.rows[idxRowCurrent].cells[8].children[3];
	
	var up = 0;
	/*up =
		parseFloat(untPriceInit)
		* (0.06)
		/ uomSelectedRate;
*/
	console.log("uomSelectedRate: " + uomSelectedRate);
	console.log("untPriceInit: " + untPriceInit);
	console.log("uomInit: " + uomInit);
	console.log("untPrice: " + untPrice);
	
	//up = parseFloat(uom)*parseFloat(untPriceInit);
	untPrice.value = formatTextValue(up);
	changeJumlahOrder(jumlahOrder);	
	console.log("===============================================================");
}

function focus1(obj){
	var dtl1 = obj.value;
	var idxRowCurrent = parseFloat(obj.parentNode.parentNode.rowIndex);
	var tblOrder = document.getElementById("tblOrder");
	var productQty = 
		parseFloat(document.getElementById("productQty").value);
	var untPrice = tblOrder.rows[idxRowCurrent].cells[7].children[0].value;
	var up1 = document.getElementById("up1");
	var amt1 = document.getElementById("amt1");
	
	up1.value = formatTextValue(parseFloat(untPrice));
	amt1.value = formatTextValue(untPrice*unformatText(dtl1));
	up2.value = "0";
	amt2.value = "0";
	up3.value = "0";
	amt3.value = "0";
	up4.value = "0";
	amt4.value = "0";
	up5.value = "0";
	amt5.value = "0";
	
	obj.select();
	
	return;
}

function focus2(obj){
	var dtl2 = obj.value;
	var idxRowCurrent = parseFloat(obj.parentNode.parentNode.rowIndex);
	var tblOrder = document.getElementById("tblOrder");
	var productQty = 
		parseFloat(document.getElementById("productQty").value);
	var untPrice = tblOrder.rows[idxRowCurrent].cells[7].children[0].value;
	var up2 = document.getElementById("up2");
	var amt2 = document.getElementById("amt2");
	
	up2.value = formatTextValue(parseFloat(untPrice));
	amt2.value = formatTextValue(untPrice*unformatText(dtl2));
	up1.value = "0";
	amt1.value = "0";
	up3.value = "0";
	amt3.value = "0";
	up4.value = "0";
	amt4.value = "0";
	up5.value = "0";
	amt5.value = "0";
	obj.select();
	
	return;
}

function focus3(obj){
	var dtl3 = obj.value;
	var idxRowCurrent = parseFloat(obj.parentNode.parentNode.rowIndex);
	var tblOrder = document.getElementById("tblOrder");
	var productQty = 
		parseFloat(document.getElementById("productQty").value);
	var untPrice = tblOrder.rows[idxRowCurrent].cells[7].children[0].value;
	var up3 = document.getElementById("up3");
	var amt3 = document.getElementById("amt3");
	
	up3.value = formatTextValue(parseFloat(untPrice));
	amt3.value = formatTextValue(untPrice*unformatText(dtl3));
	up1.value = "0";
	amt1.value = "0";
	up2.value = "0";
	amt2.value = "0";
	up4.value = "0";
	amt4.value = "0";
	up5.value = "0";
	amt5.value = "0";
	obj.select();
	
	return;
}


function focus4(obj){
	var dtl4 = obj.value;
	var idxRowCurrent = parseFloat(obj.parentNode.parentNode.rowIndex);
	var tblOrder = document.getElementById("tblOrder");
	var productQty = 
		parseFloat(document.getElementById("productQty").value);
	var untPrice = tblOrder.rows[idxRowCurrent].cells[7].children[0].value;
	var up4 = document.getElementById("up4");
	var amt4 = document.getElementById("amt4");
	
	up4.value = formatTextValue(parseFloat(untPrice));
	amt4.value = formatTextValue(untPrice*unformatText(dtl4));
	up1.value = "0";
	amt1.value = "0";
	up2.value = "0";
	amt2.value = "0";
	up3.value = "0";
	amt3.value = "0";
	up5.value = "0";
	amt5.value = "0";
	obj.select();
	
	return;
}


function focus5(obj){
	var dtl5 = obj.value;
	var idxRowCurrent = parseFloat(obj.parentNode.parentNode.rowIndex);
	var tblOrder = document.getElementById("tblOrder");
	var productQty = 
		parseFloat(document.getElementById("productQty").value);
	var untPrice = tblOrder.rows[idxRowCurrent].cells[7].children[0].value;
	var up5 = document.getElementById("up5");
	var amt5 = document.getElementById("amt5");
	
	up5.value = formatTextValue(parseFloat(untPrice));
	amt5.value = formatTextValue(untPrice*unformatText(dtl5));
	up1.value = "0";
	amt1.value = "0";
	up2.value = "0";
	amt2.value = "0";
	up3.value = "0";
	amt3.value = "0";
	up4.value = "0";
	amt4.value = "0";
	obj.select();
	
	return;
}

function calcAmount1(obj){
	var dtl1 = obj.value;
	var idxRowCurrent = parseFloat(obj.parentNode.parentNode.rowIndex);
	var jumlahOrder = document.getElementById("jumlahOrder").value;
	var tblOrder = document.getElementById("tblOrder");
	var totalAmount1 = document.getElementById("totalAmount1");
	var totalAmount2 = document.getElementById("totalAmount2");
	var totalAmount3 = document.getElementById("totalAmount3");
	var totalAmount4 = document.getElementById("totalAmount4");
	var totalAmount5 = document.getElementById("totalAmount5");
    var totalAmount1Text = document.getElementById("totalAmount1Text");
	var productQty = 
		parseFloat(document.getElementById("productQty").value);
	var untPrice = tblOrder.rows[idxRowCurrent].cells[7].children[0].value;
	var qtyTotal = document.getElementById("qtyTotal");
	var amtTotal = document.getElementById("amtTotal");
	var dimensiMobil1 = document.getElementById("dimensiMobil1");
	var dimensiOrder1 = document.getElementById("dimensiOrder1");
	var dimensiOrder1Text = document.getElementById("dimensiOrder1Text");
	var selisihDimensi1 = document.getElementById("selisihDimensi1");
	var selisihDimensi1Text = document.getElementById("selisihDimensi1Text");
    var sisaLimit = document.getElementById("sisaLimit");
    var sisaLimitText = document.getElementById("sisaLimitText");
    var sisaLimit1 = document.getElementById("sisaLimit1");
    var sisaLimit2 = document.getElementById("sisaLimit2");
    var sisaLimit3 = document.getElementById("sisaLimit3");
    var sisaLimit4 = document.getElementById("sisaLimit4");
    var sisaLimit5 = document.getElementById("sisaLimit5");
    var sisaLimitInit = document.getElementById("sisaLimitInit").value;

	var totAmount1 = 0;
	var totAmount2 = 0;
	totAmount2 = totalAmount2.value;
	var totAmount3 = 0;
	totAmount3 = totalAmount3.value;
	var totAmount4 = 0;
	totAmount4 = totalAmount4.value;
	var totAmount5 = 0;
	totAmount5 = totalAmount5.value;
	var totQty = 0;
	var totAmount = 0;
	var dimensiOrder = 0;
	
	for(var idxRow = 1; idxRow<=productQty; idxRow++){
		
		var qty1 =
			unformatText(tblOrder.rows[idxRow].cells[0].children[0].value);
		
		dimensiOrder += 
			qty1
			*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
			*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
			*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
			/1000000000;
		
		var qtyCurrentLine = 0;
		qtyCurrentLine = 
			qty1;
		
		var amountCurrentLine = 0;
		amountCurrentLine = 
			qty1
			*parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value);
		totAmount1 += amountCurrentLine;	
		
		if(jumlahOrder === "1"){
			if(idxRow === idxRowCurrent){
				tblOrder.rows[idxRow].cells[5].children[0].value =
					formatTextValue(qtyCurrentLine);
				tblOrder.rows[idxRow].cells[6].children[0].value =
					formatTextValue(amountCurrentLine);
			}
			totQty += qtyCurrentLine;
			totAmount += amountCurrentLine;
		}
		else if(jumlahOrder === "2"){
			var qty2 =
				unformatText(tblOrder.rows[idxRow].cells[1].children[0].value);
			var totQtyPerLine = 0;
			totQtyPerLine = 
				qtyCurrentLine
				+ qty2;
			
			var totAmountPerLine = 0;
			totAmountPerLine = 
				amountCurrentLine
				+ (qty2
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
			
			if(idxRow === idxRowCurrent){
				tblOrder.rows[idxRow].cells[5].children[0].value =
					formatTextValue(totQtyPerLine);
				tblOrder.rows[idxRow].cells[6].children[0].value =
					formatTextValue(totAmountPerLine);	
			}
			totQty += totQtyPerLine;
			totAmount += totAmountPerLine; 
		}
		else if(jumlahOrder === "3"){
			var qty2 =
				unformatText(tblOrder.rows[idxRow].cells[1].children[0].value);
			var qty3 =
				unformatText(tblOrder.rows[idxRow].cells[2].children[0].value);
			var totQtyPerLine = 0;
			totQtyPerLine = 
				qtyCurrentLine
				+ qty2
				+ qty3;
						
			var totAmountPerLine = 0;
			totAmountPerLine = 
				amountCurrentLine
				+ (qty2
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value)) 
				+ (qty3
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
			
			if(idxRow === idxRowCurrent){
				tblOrder.rows[idxRow].cells[5].children[0].value =
					formatTextValue(totQtyPerLine);
				tblOrder.rows[idxRow].cells[6].children[0].value =
					formatTextValue(totAmountPerLine);
			}
			totQty += totQtyPerLine;
			totAmount += totAmountPerLine;
		}
		else if(jumlahOrder === "4"){
			var qty2 =
				unformatText(tblOrder.rows[idxRow].cells[1].children[0].value);
			var qty3 =
				unformatText(tblOrder.rows[idxRow].cells[2].children[0].value);
			var qty4 =
				unformatText(tblOrder.rows[idxRow].cells[3].children[0].value);
			var totQtyPerLine = 0;
			totQtyPerLine = 
				qtyCurrentLine
				+ qty2
				+ qty3
				+ qty4;
			
			var totAmountPerLine = 0;
			totAmountPerLine = 
				amountCurrentLine
				+ (qty2
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value)) 
				+ (qty3
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
				+ (qty4
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
			
			if(idxRow === idxRowCurrent){
				tblOrder.rows[idxRow].cells[5].children[0].value =
					formatTextValue(totQtyPerLine);
				tblOrder.rows[idxRow].cells[6].children[0].value =
					formatTextValue(totAmountPerLine);	
			}
			totQty += totQtyPerLine;
			totAmount += totAmountPerLine;
		}
		else if(jumlahOrder === "5"){
			var qty2 =
				unformatText(tblOrder.rows[idxRow].cells[1].children[0].value);
			var qty3 =
				unformatText(tblOrder.rows[idxRow].cells[2].children[0].value);
			var qty4 =
				unformatText(tblOrder.rows[idxRow].cells[3].children[0].value);
			var qty5 =
				unformatText(tblOrder.rows[idxRow].cells[4].children[0].value);
			var totQtyPerLine = 0;
			totQtyPerLine = 
				qtyCurrentLine
				+ qty2
				+ qty3
				+ qty4
				+ qty5;
			
			var totAmountPerLine = 0;
			totAmountPerLine = 
				amountCurrentLine
				+ (qty2
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value)) 
				+ (qty3
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
				+ (qty4
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
				+ (qty5
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
			if(idxRow === idxRowCurrent){
				tblOrder.rows[idxRow].cells[5].children[0].value =
					formatTextValue(totQtyPerLine);
				tblOrder.rows[idxRow].cells[6].children[0].value =
					formatTextValue(totAmountPerLine);	
			}
			totQty += totQtyPerLine;
			totAmount += totAmountPerLine;
		}
		
	}

	dimensiOrder1.value = dimensiOrder;
	dimensiOrder1Text.value = formatTextValue(dimensiOrder);
	var selisihDimensi = 0;
	selisihDimensi =  parseFloat(dimensiMobil1.value - dimensiOrder);
	selisihDimensi1.value = selisihDimensi;
	selisihDimensi1Text.value = formatTextValue(selisihDimensi);
	if(selisihDimensi<0){
		selisihDimensi1Text.style.backgroundColor = "yellow";
		//alert("Dimensi Mobil pada Order 1 Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		selisihDimensi1Text.style.backgroundColor = "#D3D3D3";
	}
	
	totalAmount1.value = totAmount1;
	totalAmount1Text.value = formatTextValue(totAmount1);
	qtyTotal.value = formatTextValue(totQty);
	amtTotal.value = formatTextValue(totAmount);
	
	if(jumlahOrder>0){
		
		var sl1 = 0;
		sl1 = sisaLimitInit - totAmount1;
		sisaLimit1.value = formatTextValue(sl1);
		if(sl1<0){
			sisaLimit1.style.backgroundColor = "yellow";
			alert("Sisa Limit pada Order 1 Tidak Mencukupi. Mohon Periksa Kembali");
		}
		else{
			sisaLimit1.style.backgroundColor = "#D3D3D3";
		}
		
		if(jumlahOrder>1){
			
			var sl2 = 0;
			sl2 = sl1 - totAmount2;
			sisaLimit2.value = formatTextValue(sl2);
			if(sl2<0){
				sisaLimit2.style.backgroundColor = "yellow";
				alert("Sisa Limit pada Order 2 Tidak Mencukupi. Mohon Periksa Kembali");
			}
			else{
				sisaLimit2.style.backgroundColor = "#D3D3D3";
			}
			
			if(jumlahOrder>2){
				
				var sl3 = 0;
				sl3 = sl2 - totAmount3;
				sisaLimit3.value = formatTextValue(sl3);
				if(sl3<0){
					sisaLimit3.style.backgroundColor = "yellow";
					alert("Sisa Limit pada Order 3 Tidak Mencukupi. Mohon Periksa Kembali");
				}
				else{
					sisaLimit3.style.backgroundColor = "#D3D3D3";
				}
				
				if(jumlahOrder>3){
					
					var sl4 = 0;
					sl4 = sl3 - totAmount4;
					sisaLimit4.value = formatTextValue(sl4);
					if(sl4<0){
						sisaLimit4.style.backgroundColor = "yellow";
						alert("Sisa Limit pada Order 4 Tidak Mencukupi. Mohon Periksa Kembali");
					}
					else{
						sisaLimit4.style.backgroundColor = "#D3D3D3";
					}
					
					if(jumlahOrder>4){
						
						var sl5 = 0;
						sl5 = sl4 - totAmount5;
						sisaLimit5.value = formatTextValue(sl5);
						if(sl5<0){
							sisaLimit5.style.backgroundColor = "yellow";
							alert("Sisa Limit pada Order 5 Tidak Mencukupi. Mohon Periksa Kembali");
						}
						else{
							sisaLimit5.style.backgroundColor = "#D3D3D3";
						}
						
						
					}
				}
			}
		}
	}
	
	var sl = 0;
	sl = sisaLimitInit - totAmount;
	sisaLimit.value = sl;
	sisaLimitText.value = formatTextValue(sl);
	if(sl<0){
		sisaLimitText.style.backgroundColor = "yellow";
		//alert("Sisa Limit Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		sisaLimitText.style.backgroundColor = "#D3D3D3";
	}
}

function calcAmount2(obj){
	var dtl2 = obj.value;
	var idxRowCurrent = parseFloat(obj.parentNode.parentNode.rowIndex);
	var jumlahOrder = document.getElementById("jumlahOrder").value;
	var tblOrder = document.getElementById("tblOrder");
	var totalAmount1 = document.getElementById("totalAmount1");
	var totalAmount2 = document.getElementById("totalAmount2");
	var totalAmount3 = document.getElementById("totalAmount3");
	var totalAmount4 = document.getElementById("totalAmount4");
	var totalAmount5 = document.getElementById("totalAmount5");
    var totalAmount2Text = document.getElementById("totalAmount2Text");
	var productQty = 
		parseFloat(document.getElementById("productQty").value);
	var untPrice = tblOrder.rows[idxRowCurrent].cells[7].children[0].value;
	var qtyTotal = document.getElementById("qtyTotal");
	var amtTotal = document.getElementById("amtTotal");
	var dimensiMobil2 = document.getElementById("dimensiMobil2");
	var dimensiOrder2 = document.getElementById("dimensiOrder2");
	var dimensiOrder2Text = document.getElementById("dimensiOrder2Text");
	var selisihDimensi2 = document.getElementById("selisihDimensi2");
	var selisihDimensi2Text = document.getElementById("selisihDimensi2Text");
    var sisaLimit = document.getElementById("sisaLimit");
    var sisaLimitText = document.getElementById("sisaLimitText");
    var sisaLimit1 = document.getElementById("sisaLimit1");
    var sisaLimit2 = document.getElementById("sisaLimit2");
    var sisaLimit3 = document.getElementById("sisaLimit3");
    var sisaLimit4 = document.getElementById("sisaLimit4");
    var sisaLimit5 = document.getElementById("sisaLimit5");
    var sisaLimitInit = document.getElementById("sisaLimitInit").value;
    
	var totAmount1 = 0;
	totAmount1 = totalAmount1.value;
	var totAmount2 = 0;
	var totAmount3 = 0;
	totAmount3 = totalAmount3.value;
	var totAmount4 = 0;
	totAmount4 = totalAmount4.value;
	var totAmount5 = 0;
	totAmount5 = totalAmount5.value;
	var totQty = 0;
	var totAmount = 0;
	var dimensiOrder = 0;
	
	for(var idxRow = 1; idxRow<=productQty; idxRow++){
		
		var qty2 =
			unformatText(tblOrder.rows[idxRow].cells[1].children[0].value);
		
		dimensiOrder += 
			qty2
			*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
			*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
			*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
			/1000000000;

		var qtyCurrentLine = 0;
		qtyCurrentLine = 
			qty2;
		
		var amountCurrentLine = 0;
		amountCurrentLine = 
			qty2
			*parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value);
		totAmount2 += amountCurrentLine;
		
		if(jumlahOrder === "2"){
			var qty1 =
				unformatText(tblOrder.rows[idxRow].cells[0].children[0].value);
			var totQtyPerLine = 0;
			totQtyPerLine = 
				qtyCurrentLine
				+ qty1;
			
			var totAmountPerLine = 0;
			totAmountPerLine = 
				amountCurrentLine
				+ (qty1
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
			
			if(idxRow === idxRowCurrent){
				tblOrder.rows[idxRow].cells[5].children[0].value =
					formatTextValue(totQtyPerLine);
				tblOrder.rows[idxRow].cells[6].children[0].value =
					formatTextValue(totAmountPerLine);	
			}
			totQty += totQtyPerLine;
			totAmount += totAmountPerLine; 
		}
		else if(jumlahOrder === "3"){
			var qty1 =
				unformatText(tblOrder.rows[idxRow].cells[0].children[0].value);
			var qty3 =
				unformatText(tblOrder.rows[idxRow].cells[2].children[0].value);
			var totQtyPerLine = 0;
			totQtyPerLine = 
				qtyCurrentLine
				+ qty1
				+ qty3;
			
			var totAmountPerLine = 0;
			totAmountPerLine = 
				amountCurrentLine
				+ (qty1
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value)) 
				+ (qty3
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
			
			if(idxRow === idxRowCurrent){
				tblOrder.rows[idxRow].cells[5].children[0].value =
					formatTextValue(totQtyPerLine);
				tblOrder.rows[idxRow].cells[6].children[0].value =
					formatTextValue(totAmountPerLine);
			}
			totQty += totQtyPerLine;
			totAmount += totAmountPerLine;
		}
		else if(jumlahOrder === "4"){
			var qty1 =
				unformatText(tblOrder.rows[idxRow].cells[0].children[0].value);
			var qty3 =
				unformatText(tblOrder.rows[idxRow].cells[2].children[0].value);
			var qty4 =
				unformatText(tblOrder.rows[idxRow].cells[3].children[0].value);
			var totQtyPerLine = 0;
			totQtyPerLine = 
				qtyCurrentLine
				+ qty1
				+ qty3
				+ qty4;
			
			var totAmountPerLine = 0;
			totAmountPerLine = 
				amountCurrentLine
				+ (qty1
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value)) 
				+ (qty3
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
				+ (qty4
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
			
			if(idxRow === idxRowCurrent){
				tblOrder.rows[idxRow].cells[5].children[0].value =
					formatTextValue(totQtyPerLine);
				tblOrder.rows[idxRow].cells[6].children[0].value =
					formatTextValue(totAmountPerLine);	
			}
			totQty += totQtyPerLine;
			totAmount += totAmountPerLine;
		}
		else if(jumlahOrder === "5"){
			var qty1 =
				unformatText(tblOrder.rows[idxRow].cells[0].children[0].value);
			var qty3 =
				unformatText(tblOrder.rows[idxRow].cells[2].children[0].value);
			var qty4 =
				unformatText(tblOrder.rows[idxRow].cells[3].children[0].value);
			var qty5 =
				unformatText(tblOrder.rows[idxRow].cells[4].children[0].value);
			var totQtyPerLine = 0;
			totQtyPerLine = 
				qtyCurrentLine
				+ qty1
				+ qty3
				+ qty4
				+ qty5;
			
			var totAmountPerLine = 0;
			totAmountPerLine = 
				amountCurrentLine
				+ (qty1
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value)) 
				+ (qty3
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
				+ (qty4
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
				+ (qty5
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
			if(idxRow === idxRowCurrent){
				tblOrder.rows[idxRow].cells[5].children[0].value =
					formatTextValue(totQtyPerLine);
				tblOrder.rows[idxRow].cells[6].children[0].value =
					formatTextValue(totAmountPerLine);	
			}
			totQty += totQtyPerLine;
			totAmount += totAmountPerLine;
		}
	
	}

	dimensiOrder2.value = dimensiOrder;
	dimensiOrder2Text.value = formatTextValue(dimensiOrder);
	var selisihDimensi = 0;
	selisihDimensi =  parseFloat(dimensiMobil2.value - dimensiOrder);
	selisihDimensi2.value = selisihDimensi;
	selisihDimensi2Text.value = formatTextValue(selisihDimensi);
	if(selisihDimensi<0){
		selisihDimensi2Text.style.backgroundColor = "yellow";
		//alert("Dimensi Mobil pada Order 2 Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		selisihDimensi2Text.style.backgroundColor = "#D3D3D3";
	}
	
	totalAmount2.value = totAmount2;
	totalAmount2Text.value = formatTextValue(totAmount2);
	qtyTotal.value = formatTextValue(totQty);
	amtTotal.value = formatTextValue(totAmount);

	if(jumlahOrder>0){
		
		var sl1 = 0;
		sl1 = sisaLimitInit - totAmount1;
		sisaLimit1.value = formatTextValue(sl1);
		if(sl1<0){
			sisaLimit1.style.backgroundColor = "yellow";
			alert("Sisa Limit pada Order 1 Tidak Mencukupi. Mohon Periksa Kembali");
		}
		else{
			sisaLimit1.style.backgroundColor = "#D3D3D3";
		}
		
		if(jumlahOrder>1){
			
			var sl2 = 0;
			sl2 = sl1 - totAmount2;
			sisaLimit2.value = formatTextValue(sl2);
			if(sl2<0){
				sisaLimit2.style.backgroundColor = "yellow";
				alert("Sisa Limit pada Order 2 Tidak Mencukupi. Mohon Periksa Kembali");
			}
			else{
				sisaLimit2.style.backgroundColor = "#D3D3D3";
			}
			
			if(jumlahOrder>2){
				
				var sl3 = 0;
				sl3 = sl2 - totAmount3;
				sisaLimit3.value = formatTextValue(sl3);
				if(sl3<0){
					sisaLimit3.style.backgroundColor = "yellow";
					alert("Sisa Limit pada Order 3 Tidak Mencukupi. Mohon Periksa Kembali");
				}
				else{
					sisaLimit3.style.backgroundColor = "#D3D3D3";
				}
				
				if(jumlahOrder>3){
					
					var sl4 = 0;
					sl4 = sl3 - totAmount4;
					sisaLimit4.value = formatTextValue(sl4);
					if(sl4<0){
						sisaLimit4.style.backgroundColor = "yellow";
						alert("Sisa Limit pada Order 4 Tidak Mencukupi. Mohon Periksa Kembali");
					}
					else{
						sisaLimit4.style.backgroundColor = "#D3D3D3";
					}
					
					if(jumlahOrder>4){
						
						var sl5 = 0;
						sl5 = sl4 - totAmount5;
						sisaLimit5.value = formatTextValue(sl5);
						if(sl5<0){
							sisaLimit5.style.backgroundColor = "yellow";
							alert("Sisa Limit pada Order 5 Tidak Mencukupi. Mohon Periksa Kembali");
						}
						else{
							sisaLimit5.style.backgroundColor = "#D3D3D3";
						}
						
						
					}
				}
			}
		}
	}
	
	var sl = 0;
	sl = sisaLimitInit - totAmount;
	sisaLimit.value = sl;
	sisaLimitText.value = formatTextValue(sl);
	if(sl<0){
		sisaLimitText.style.backgroundColor = "yellow";
		//alert("Sisa Limit Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		sisaLimitText.style.backgroundColor = "#D3D3D3";
	}
	return;
}

function calcAmount3(obj){
	var dtl3 = obj.value;
	var idxRowCurrent = parseFloat(obj.parentNode.parentNode.rowIndex);
	var jumlahOrder = document.getElementById("jumlahOrder").value;
	var tblOrder = document.getElementById("tblOrder");
	var totalAmount1 = document.getElementById("totalAmount1");
	var totalAmount2 = document.getElementById("totalAmount2");
	var totalAmount3 = document.getElementById("totalAmount3");
	var totalAmount4 = document.getElementById("totalAmount4");
	var totalAmount5 = document.getElementById("totalAmount5");
    var totalAmount3Text = document.getElementById("totalAmount3Text");
	var productQty = 
		parseFloat(document.getElementById("productQty").value);
	var untPrice = tblOrder.rows[idxRowCurrent].cells[7].children[0].value;
	var qtyTotal = document.getElementById("qtyTotal");
	var amtTotal = document.getElementById("amtTotal");
	var dimensiMobil3 = document.getElementById("dimensiMobil3");
	var dimensiOrder3 = document.getElementById("dimensiOrder3");
	var dimensiOrder3Text = document.getElementById("dimensiOrder3Text");
	var selisihDimensi3 = document.getElementById("selisihDimensi3");
	var selisihDimensi3Text = document.getElementById("selisihDimensi3Text");
    var sisaLimit = document.getElementById("sisaLimit");
    var sisaLimitText = document.getElementById("sisaLimitText");
    var sisaLimit1 = document.getElementById("sisaLimit1");
    var sisaLimit2 = document.getElementById("sisaLimit2");
    var sisaLimit3 = document.getElementById("sisaLimit3");
    var sisaLimit4 = document.getElementById("sisaLimit4");
    var sisaLimit5 = document.getElementById("sisaLimit5");
    var sisaLimitInit = document.getElementById("sisaLimitInit").value;

	var totAmount1 = 0;
	totAmount1 = totalAmount1.value;
	var totAmount2 = 0;
	totAmount2 = totalAmount2.value;
	var totAmount3 = 0;
	var totAmount4 = 0;
	totAmount4 = totalAmount4.value;
	var totAmount5 = 0;
	totAmount5 = totalAmount5.value;
	
	var totQty = 0;
	var totAmount = 0;
	var dimensiOrder = 0;
	
	for(var idxRow = 1; idxRow<=productQty; idxRow++){

		var qty3 =
			unformatText(tblOrder.rows[idxRow].cells[2].children[0].value);
		
		dimensiOrder += 
			qty3
			*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
			*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
			*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
			/1000000000;

		var qtyCurrentLine = 0;
		qtyCurrentLine = 
			qty3;
		
		amountCurrentLine = 
			qty3
			*parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value);
		totAmount3 += amountCurrentLine;
		
		if(jumlahOrder === "3"){
			var qty1 =
				unformatText(tblOrder.rows[idxRow].cells[0].children[0].value);
			var qty2 =
				unformatText(tblOrder.rows[idxRow].cells[1].children[0].value);
			var totQtyPerLine = 0;
			totQtyPerLine = 
				qtyCurrentLine
				+ qty1
				+ qty2;
			
			var totAmountPerLine = 0;
			totAmountPerLine = 
				amountCurrentLine
				+ (qty1
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value)) 
				+ (qty2
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
			
			if(idxRow === idxRowCurrent){
				tblOrder.rows[idxRow].cells[5].children[0].value =
					formatTextValue(totQtyPerLine);
				tblOrder.rows[idxRow].cells[6].children[0].value =
					formatTextValue(totAmountPerLine);
			}
			totQty += totQtyPerLine;
			totAmount += totAmountPerLine;
		}
		else if(jumlahOrder === "4"){
			var qty1 =
				unformatText(tblOrder.rows[idxRow].cells[0].children[0].value);
			var qty2 =
				unformatText(tblOrder.rows[idxRow].cells[1].children[0].value);
			var qty4 =
				unformatText(tblOrder.rows[idxRow].cells[3].children[0].value);
			var totQtyPerLine = 0;
			totQtyPerLine = 
				qtyCurrentLine
				+ qty1
				+ qty2
				+ qty4;
			
			var totAmountPerLine = 0;
			totAmountPerLine = 
				amountCurrentLine
				+ (qty1
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value)) 
				+ (qty2
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
				+ (qty4
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
			
			if(idxRow === idxRowCurrent){
				tblOrder.rows[idxRow].cells[5].children[0].value =
					formatTextValue(totQtyPerLine);
				tblOrder.rows[idxRow].cells[6].children[0].value =
					formatTextValue(totAmountPerLine);	
			}
			totQty += totQtyPerLine;
			totAmount += totAmountPerLine;
		}
		else if(jumlahOrder === "5"){
			var qty1 =
				unformatText(tblOrder.rows[idxRow].cells[0].children[0].value);
			var qty2 =
				unformatText(tblOrder.rows[idxRow].cells[1].children[0].value);
			var qty4 =
				unformatText(tblOrder.rows[idxRow].cells[3].children[0].value);
			var qty5 =
				unformatText(tblOrder.rows[idxRow].cells[4].children[0].value);
			var totQtyPerLine = 0;
			totQtyPerLine = 
				qtyCurrentLine
				+ qty1
				+ qty2
				+ qty4
				+ qty5;
			
			var totAmountPerLine = 0;
			totAmountPerLine = 
				amountCurrentLine
				+ (qty1
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value)) 
				+ (qty2
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
				+ (qty4
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
				+ (qty5
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
			if(idxRow === idxRowCurrent){
				tblOrder.rows[idxRow].cells[5].children[0].value =
					formatTextValue(totQtyPerLine);
				tblOrder.rows[idxRow].cells[6].children[0].value =
					formatTextValue(totAmountPerLine);	
			}
			totQty += totQtyPerLine;
			totAmount += totAmountPerLine;
		}
		
	}

	dimensiOrder3.value = dimensiOrder;
	dimensiOrder3Text.value = formatTextValue(dimensiOrder);
	var selisihDimensi = 0;
	selisihDimensi =  parseFloat(dimensiMobil3.value - dimensiOrder);
	selisihDimensi3.value = selisihDimensi;
	selisihDimensi3Text.value = formatTextValue(selisihDimensi);
	if(selisihDimensi<0){
		selisihDimensi3Text.style.backgroundColor = "yellow";
		//alert("Dimensi Mobil pada Order 3 Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		selisihDimensi3Text.style.backgroundColor = "#D3D3D3";
	}
	
	totalAmount3.value = totAmount3;
	totalAmount3Text.value = formatTextValue(totAmount3);
	qtyTotal.value = formatTextValue(totQty);
	amtTotal.value = formatTextValue(totAmount);

	if(jumlahOrder>0){
		
		var sl1 = 0;
		sl1 = sisaLimitInit - totAmount1;
		sisaLimit1.value = formatTextValue(sl1);
		if(sl1<0){
			sisaLimit1.style.backgroundColor = "yellow";
			alert("Sisa Limit pada Order 1 Tidak Mencukupi. Mohon Periksa Kembali");
		}
		else{
			sisaLimit1.style.backgroundColor = "#D3D3D3";
		}
		
		if(jumlahOrder>1){
			
			var sl2 = 0;
			sl2 = sl1 - totAmount2;
			sisaLimit2.value = formatTextValue(sl2);
			if(sl2<0){
				sisaLimit2.style.backgroundColor = "yellow";
				alert("Sisa Limit pada Order 2 Tidak Mencukupi. Mohon Periksa Kembali");
			}
			else{
				sisaLimit2.style.backgroundColor = "#D3D3D3";
			}
			
			if(jumlahOrder>2){
				
				var sl3 = 0;
				sl3 = sl2 - totAmount3;
				sisaLimit3.value = formatTextValue(sl3);
				if(sl3<0){
					sisaLimit3.style.backgroundColor = "yellow";
					alert("Sisa Limit pada Order 3 Tidak Mencukupi. Mohon Periksa Kembali");
				}
				else{
					sisaLimit3.style.backgroundColor = "#D3D3D3";
				}
				
				if(jumlahOrder>3){
					
					var sl4 = 0;
					sl4 = sl3 - totAmount4;
					sisaLimit4.value = formatTextValue(sl4);
					if(sl4<0){
						sisaLimit4.style.backgroundColor = "yellow";
						alert("Sisa Limit pada Order 4 Tidak Mencukupi. Mohon Periksa Kembali");
					}
					else{
						sisaLimit4.style.backgroundColor = "#D3D3D3";
					}
					
					if(jumlahOrder>4){
						
						var sl5 = 0;
						sl5 = sl4 - totAmount5;
						sisaLimit5.value = formatTextValue(sl5);
						if(sl5<0){
							sisaLimit5.style.backgroundColor = "yellow";
							alert("Sisa Limit pada Order 5 Tidak Mencukupi. Mohon Periksa Kembali");
						}
						else{
							sisaLimit5.style.backgroundColor = "#D3D3D3";
						}
						
						
					}
				}
			}
		}
	}
		
	var sl = 0;
	sl = sisaLimitInit - totAmount;
	sisaLimit.value = sl;
	sisaLimitText.value = formatTextValue(sl);
	if(sl<0){
		sisaLimitText.style.backgroundColor = "yellow";
		//alert("Sisa Limit Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		sisaLimitText.style.backgroundColor = "#D3D3D3";
	}
	return;
}

function calcAmount4(obj){
	var dtl4 = obj.value;
	var idxRowCurrent = parseFloat(obj.parentNode.parentNode.rowIndex);
	var jumlahOrder = document.getElementById("jumlahOrder").value;
	var tblOrder = document.getElementById("tblOrder");
	var totalAmount1 = document.getElementById("totalAmount1");
	var totalAmount2 = document.getElementById("totalAmount2");
	var totalAmount3 = document.getElementById("totalAmount3");
	var totalAmount4 = document.getElementById("totalAmount4");
	var totalAmount5 = document.getElementById("totalAmount5");
    var totalAmount4Text = document.getElementById("totalAmount4Text");
	var productQty = 
		parseFloat(document.getElementById("productQty").value);
	var untPrice = tblOrder.rows[idxRowCurrent].cells[7].children[0].value;
	var qtyTotal = document.getElementById("qtyTotal");
	var amtTotal = document.getElementById("amtTotal");
	var dimensiMobil4 = document.getElementById("dimensiMobil4");
	var dimensiOrder4 = document.getElementById("dimensiOrder4");
	var dimensiOrder4Text = document.getElementById("dimensiOrder4Text");
	var selisihDimensi4 = document.getElementById("selisihDimensi4");
	var selisihDimensi4Text = document.getElementById("selisihDimensi4Text");
    var sisaLimit = document.getElementById("sisaLimit");
    var sisaLimitText = document.getElementById("sisaLimitText");
    var sisaLimit1 = document.getElementById("sisaLimit1");
    var sisaLimit2 = document.getElementById("sisaLimit2");
    var sisaLimit3 = document.getElementById("sisaLimit3");
    var sisaLimit4 = document.getElementById("sisaLimit4");
    var sisaLimit5 = document.getElementById("sisaLimit5");
    var sisaLimitInit = document.getElementById("sisaLimitInit").value;

	var totAmount1 = 0;
	totAmount1 = totalAmount1.value;
	var totAmount2 = 0;
	totAmount2 = totalAmount2.value;
	var totAmount3 = 0;
	totAmount3 = totalAmount3.value;
	var totAmount4 = 0;
	var totAmount5 = 0;
	totAmount5 = totalAmount5.value;
	var totQty = 0;
	var totAmount = 0;
	var dimensiOrder = 0;
	
	for(var idxRow = 1; idxRow<=productQty; idxRow++){

		var qty4 =
			unformatText(tblOrder.rows[idxRow].cells[3].children[0].value);
		
		dimensiOrder += 
			qty4
			*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
			*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
			*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
			/1000000000;

		var qtyCurrentLine = 0;
		qtyCurrentLine = 
			qty4;
		
		var amountCurrentLine = 0;
		amountCurrentLine = 
			qty4
			*parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value);
		totAmount4 += amountCurrentLine;
		
		if(jumlahOrder === "4"){
			var qty1 =
				unformatText(tblOrder.rows[idxRow].cells[0].children[0].value);
			var qty2 =
				unformatText(tblOrder.rows[idxRow].cells[1].children[0].value);
			var qty3 =
				unformatText(tblOrder.rows[idxRow].cells[2].children[0].value);
			var totQtyPerLine = 0;
			totQtyPerLine = 
				qtyCurrentLine
				+ qty1
				+ qty2
				+ qty3;
			
			var totAmountPerLine = 0;
			totAmountPerLine = 
				amountCurrentLine
				+ (qty1
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value)) 
				+ (qty2
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
				+ (qty3
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
			
			if(idxRow === idxRowCurrent){
				tblOrder.rows[idxRow].cells[5].children[0].value =
					formatTextValue(totQtyPerLine);
				tblOrder.rows[idxRow].cells[6].children[0].value =
					formatTextValue(totAmountPerLine);	
			}
			totQty += totQtyPerLine;
			totAmount += totAmountPerLine;
		}
		else if(jumlahOrder === "5"){
			var qty1 =
				unformatText(tblOrder.rows[idxRow].cells[0].children[0].value);
			var qty2 =
				unformatText(tblOrder.rows[idxRow].cells[1].children[0].value);
			var qty3 =
				unformatText(tblOrder.rows[idxRow].cells[2].children[0].value);
			var qty5 =
				unformatText(tblOrder.rows[idxRow].cells[4].children[0].value);
			var totQtyPerLine = 0;
			totQtyPerLine = 
				qtyCurrentLine
				+ qty1
				+ qty2
				+ qty3
				+ qty5;
			
			var totAmountPerLine = 0;
			totAmountPerLine = 
				amountCurrentLine
				+ (qty1
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value)) 
				+ (qty2
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
				+ (qty3
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
				+ (qty5
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
			if(idxRow === idxRowCurrent){
				tblOrder.rows[idxRow].cells[5].children[0].value =
					formatTextValue(totQtyPerLine);
				tblOrder.rows[idxRow].cells[6].children[0].value =
					formatTextValue(totAmountPerLine);	
			}
			totQty += totQtyPerLine;
			totAmount += totAmountPerLine;
		}
		
	}

	dimensiOrder4.value = dimensiOrder;
	dimensiOrder4Text.value = formatTextValue(dimensiOrder);
	var selisihDimensi = 0;
	selisihDimensi =  parseFloat(dimensiMobil4.value - dimensiOrder);
	selisihDimensi4.value = selisihDimensi;
	selisihDimensi4Text.value = formatTextValue(selisihDimensi);
	if(selisihDimensi<0){
		selisihDimensi4Text.style.backgroundColor = "yellow";
		//alert("Dimensi Mobil pada Order 4 Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		selisihDimensi4Text.style.backgroundColor = "#D3D3D3";
	}
	
	totalAmount4.value = totAmount4;
	totalAmount4Text.value = formatTextValue(totAmount4);
	qtyTotal.value = formatTextValue(totQty);
	amtTotal.value = formatTextValue(totAmount);

	if(jumlahOrder>0){
		
		var sl1 = 0;
		sl1 = sisaLimitInit - totAmount1;
		sisaLimit1.value = formatTextValue(sl1);
		if(sl1<0){
			sisaLimit1.style.backgroundColor = "yellow";
			alert("Sisa Limit pada Order 1 Tidak Mencukupi. Mohon Periksa Kembali");
		}
		else{
			sisaLimit1.style.backgroundColor = "#D3D3D3";
		}
		
		if(jumlahOrder>1){
			
			var sl2 = 0;
			sl2 = sl1 - totAmount2;
			sisaLimit2.value = formatTextValue(sl2);
			if(sl2<0){
				sisaLimit2.style.backgroundColor = "yellow";
				alert("Sisa Limit pada Order 2 Tidak Mencukupi. Mohon Periksa Kembali");
			}
			else{
				sisaLimit2.style.backgroundColor = "#D3D3D3";
			}
			
			if(jumlahOrder>2){
				
				var sl3 = 0;
				sl3 = sl2 - totAmount3;
				sisaLimit3.value = formatTextValue(sl3);
				if(sl3<0){
					sisaLimit3.style.backgroundColor = "yellow";
					alert("Sisa Limit pada Order 3 Tidak Mencukupi. Mohon Periksa Kembali");
				}
				else{
					sisaLimit3.style.backgroundColor = "#D3D3D3";
				}
				
				if(jumlahOrder>3){
					
					var sl4 = 0;
					sl4 = sl3 - totAmount4;
					sisaLimit4.value = formatTextValue(sl4);
					if(sl4<0){
						sisaLimit4.style.backgroundColor = "yellow";
						alert("Sisa Limit pada Order 4 Tidak Mencukupi. Mohon Periksa Kembali");
					}
					else{
						sisaLimit4.style.backgroundColor = "#D3D3D3";
					}
					
					if(jumlahOrder>4){
						
						var sl5 = 0;
						sl5 = sl4 - totAmount5;
						sisaLimit5.value = formatTextValue(sl5);
						if(sl5<0){
							sisaLimit5.style.backgroundColor = "yellow";
							alert("Sisa Limit pada Order 5 Tidak Mencukupi. Mohon Periksa Kembali");
						}
						else{
							sisaLimit5.style.backgroundColor = "#D3D3D3";
						}
						
						
					}
				}
			}
		}
	}
	
	var sl = 0;
	sl = sisaLimitInit - totAmount;
	sisaLimit.value = sl;
	sisaLimitText.value = formatTextValue(sl);
	if(sl<0){
		sisaLimitText.style.backgroundColor = "yellow";
		//alert("Sisa Limit Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		sisaLimitText.style.backgroundColor = "#D3D3D3";
	}
	return;
}

function calcAmount5(obj){
	var dtl5 = obj.value;
	var idxRowCurrent = parseFloat(obj.parentNode.parentNode.rowIndex);
	var jumlahOrder = document.getElementById("jumlahOrder").value;
	var tblOrder = document.getElementById("tblOrder");
	var totalAmount1 = document.getElementById("totalAmount1");
	var totalAmount2 = document.getElementById("totalAmount2");
	var totalAmount3 = document.getElementById("totalAmount3");
	var totalAmount4 = document.getElementById("totalAmount4");
	var totalAmount5 = document.getElementById("totalAmount5");
    var totalAmount5Text = document.getElementById("totalAmount5Text");
	var productQty = 
		parseFloat(document.getElementById("productQty").value);
	var untPrice = tblOrder.rows[idxRowCurrent].cells[7].children[0].value;
	var qtyTotal = document.getElementById("qtyTotal");
	var amtTotal = document.getElementById("amtTotal");
	var dimensiMobil5 = document.getElementById("dimensiMobil5");
	var dimensiOrder5 = document.getElementById("dimensiOrder5");
	var dimensiOrder5Text = document.getElementById("dimensiOrder5Text");
	var selisihDimensi5 = document.getElementById("selisihDimensi5");
	var selisihDimensi5Text = document.getElementById("selisihDimensi5Text");
    var sisaLimit = document.getElementById("sisaLimit");
    var sisaLimitText = document.getElementById("sisaLimitText");
    var sisaLimit1 = document.getElementById("sisaLimit1");
    var sisaLimit2 = document.getElementById("sisaLimit2");
    var sisaLimit3 = document.getElementById("sisaLimit3");
    var sisaLimit4 = document.getElementById("sisaLimit4");
    var sisaLimit5 = document.getElementById("sisaLimit5");
    var sisaLimitInit = document.getElementById("sisaLimitInit").value;
    
	var totAmount1 = 0;
	totAmount1 = totalAmount1.value;
	var totAmount2 = 0;
	totAmount2 = totalAmount2.value;
	var totAmount3 = 0;
	totAmount3 = totalAmount3.value;
	var totAmount4 = 0;
	totAmount4 = totalAmount4.value;
	var totAmount5 = 0;
	var totQty = 0;
	var totAmount = 0;
	var dimensiOrder = 0;
	
	for(var idxRow = 1; idxRow<=productQty; idxRow++){

		var qty5 =
			unformatText(tblOrder.rows[idxRow].cells[4].children[0].value);
		
		dimensiOrder += 
			qty5
			*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
			*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
			*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
			/1000000000;

		var qtyCurrentLine = 0;
		qtyCurrentLine = 
			qty5;
		
		var amountCurrentLine = 0;
		amountCurrentLine = 
			qty5
			*parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value);
		totAmount5 += amountCurrentLine;

		var qty1 =
			unformatText(tblOrder.rows[idxRow].cells[0].children[0].value);
		var qty2 =
			unformatText(tblOrder.rows[idxRow].cells[1].children[0].value);
		var qty3 =
			unformatText(tblOrder.rows[idxRow].cells[2].children[0].value);
		var qty4 =
			unformatText(tblOrder.rows[idxRow].cells[3].children[0].value);
		
		var totQtyPerLine = 0;
		totQtyPerLine = 
			qtyCurrentLine
			+ qty1
			+ qty2
			+ qty3
			+ qty4;
		
		var totAmountPerLine = 0;
		totAmountPerLine = 
			amountCurrentLine
			+ (qty1
			* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value)) 
			+ (qty2
			* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
			+ (qty3
			* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
			+ (qty5
			* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
		if(idxRow === idxRowCurrent){
			tblOrder.rows[idxRow].cells[5].children[0].value =
				formatTextValue(totQtyPerLine);
			tblOrder.rows[idxRow].cells[6].children[0].value =
				formatTextValue(totAmountPerLine);	
		}
		totQty += totQtyPerLine;
		totAmount += totAmountPerLine;
		
	}

	dimensiOrder5.value = dimensiOrder;
	dimensiOrder5Text.value = formatTextValue(dimensiOrder);
	var selisihDimensi = 0;
	selisihDimensi =  parseFloat(dimensiMobil5.value - dimensiOrder);
	selisihDimensi5.value = selisihDimensi;
	selisihDimensi5Text.value = formatTextValue(selisihDimensi);
	if(selisihDimensi<0){
		selisihDimensi5Text.style.backgroundColor = "yellow";
		//alert("Dimensi Mobil pada Order 5 Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		selisihDimensi5Text.style.backgroundColor = "#D3D3D3";
	}
	totalAmount5.value = totAmount5;
	totalAmount5Text.value = formatTextValue(totAmount5);
	qtyTotal.value = formatTextValue(totQty);
	amtTotal.value = formatTextValue(totAmount);

	if(jumlahOrder>0){
		
		var sl1 = 0;
		sl1 = sisaLimitInit - totAmount1;
		sisaLimit1.value = formatTextValue(sl1);
		if(sl1<0){
			sisaLimit1.style.backgroundColor = "yellow";
			alert("Sisa Limit pada Order 1 Tidak Mencukupi. Mohon Periksa Kembali");
		}
		else{
			sisaLimit1.style.backgroundColor = "#D3D3D3";
		}
		
		if(jumlahOrder>1){
			
			var sl2 = 0;
			sl2 = sl1 - totAmount2;
			sisaLimit2.value = formatTextValue(sl2);
			if(sl2<0){
				sisaLimit2.style.backgroundColor = "yellow";
				alert("Sisa Limit pada Order 2 Tidak Mencukupi. Mohon Periksa Kembali");
			}
			else{
				sisaLimit2.style.backgroundColor = "#D3D3D3";
			}
			
			if(jumlahOrder>2){
				
				var sl3 = 0;
				sl3 = sl2 - totAmount3;
				sisaLimit3.value = formatTextValue(sl3);
				if(sl3<0){
					sisaLimit3.style.backgroundColor = "yellow";
					alert("Sisa Limit pada Order 3 Tidak Mencukupi. Mohon Periksa Kembali");
				}
				else{
					sisaLimit3.style.backgroundColor = "#D3D3D3";
				}
				
				if(jumlahOrder>3){
					
					var sl4 = 0;
					sl4 = sl3 - totAmount4;
					sisaLimit4.value = formatTextValue(sl4);
					if(sl4<0){
						sisaLimit4.style.backgroundColor = "yellow";
						alert("Sisa Limit pada Order 4 Tidak Mencukupi. Mohon Periksa Kembali");
					}
					else{
						sisaLimit4.style.backgroundColor = "#D3D3D3";
					}
					
					if(jumlahOrder>4){
						
						var sl5 = 0;
						sl5 = sl4 - totAmount5;
						sisaLimit5.value = formatTextValue(sl5);
						if(sl5<0){
							sisaLimit5.style.backgroundColor = "yellow";
							alert("Sisa Limit pada Order 5 Tidak Mencukupi. Mohon Periksa Kembali");
						}
						else{
							sisaLimit5.style.backgroundColor = "#D3D3D3";
						}
						
						
					}
				}
			}
		}
	}
	
	var sl = 0;
	sl = sisaLimitInit - totAmount;
	sisaLimit.value = sl;
	sisaLimitText.value = formatTextValue(sl);
	if(sl<0){
		sisaLimitText.style.backgroundColor = "yellow";
		//alert("Sisa Limit Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		sisaLimitText.style.backgroundColor = "#D3D3D3";
	}
	return;
}

function generateCMOB(){
	var jumlahOrder = document.getElementById("jumlahOrder").value;
	var orderBySelected = document.getElementById("orderBySelected");
	orderBySelected.value = "CMOB";
	var tblOrder = document.getElementById("tblOrder");
	var productQty = 
		parseFloat(document.getElementById("productQty").value);
	var totalAmount1 = document.getElementById("totalAmount1");
	var totalAmount2 = document.getElementById("totalAmount2");
	var totalAmount3 = document.getElementById("totalAmount3");
	var totalAmount4 = document.getElementById("totalAmount4");
	var totalAmount5 = document.getElementById("totalAmount5");
	var sisaLimit = document.getElementById("sisaLimit");
	var sisaLimitInit = document.getElementById("sisaLimitInit").value;
	
	var totAmount1 = 0;
	var totAmount2 = 0;
	var totAmount3 = 0;
	var totAmount4 = 0;
	var totAmount5 = 0;
	
	var amtTotal = document.getElementById("amtTotal");
    var totAmount = 0;
	
	var cmobInitial = 1;
	var cmobMultiplier = 0;
	
	for(var idxRow = 1; idxRow<=productQty; idxRow++){
		
		cmobMultiplier += 1;
		var qty = (cmobInitial * cmobMultiplier) / jumlahOrder;
		
		if(jumlahOrder === "1"){
			tblOrder.rows[idxRow].cells[0].children[0].value = qty;
			tblOrder.rows[idxRow].cells[1].children[0].value = 0;
			tblOrder.rows[idxRow].cells[2].children[0].value = 0;
			tblOrder.rows[idxRow].cells[3].children[0].value = 0;
			tblOrder.rows[idxRow].cells[4].children[0].value = 0;
		} 
		else if(jumlahOrder === "2"){
			tblOrder.rows[idxRow].cells[0].children[0].value = qty;
			tblOrder.rows[idxRow].cells[1].children[0].value = qty;
			tblOrder.rows[idxRow].cells[2].children[0].value = 0;
			tblOrder.rows[idxRow].cells[3].children[0].value = 0;
			tblOrder.rows[idxRow].cells[4].children[0].value = 0;
		}
		else if(jumlahOrder === "3"){
			tblOrder.rows[idxRow].cells[0].children[0].value = qty;
			tblOrder.rows[idxRow].cells[1].children[0].value = qty;
			tblOrder.rows[idxRow].cells[2].children[0].value = qty;
			tblOrder.rows[idxRow].cells[3].children[0].value = 0;
			tblOrder.rows[idxRow].cells[4].children[0].value = 0;
		}
		else if(jumlahOrder === "4"){
			tblOrder.rows[idxRow].cells[0].children[0].value = qty;
			tblOrder.rows[idxRow].cells[1].children[0].value = qty;
			tblOrder.rows[idxRow].cells[2].children[0].value = qty;
			tblOrder.rows[idxRow].cells[3].children[0].value = qty;
			tblOrder.rows[idxRow].cells[4].children[0].value = 0;
		}
		else if(jumlahOrder === "5"){
			tblOrder.rows[idxRow].cells[0].children[0].value = qty;
			tblOrder.rows[idxRow].cells[1].children[0].value = qty;
			tblOrder.rows[idxRow].cells[2].children[0].value = qty;
			tblOrder.rows[idxRow].cells[3].children[0].value = qty;
			tblOrder.rows[idxRow].cells[4].children[0].value = qty;
		}//
	} //	
	
			/*var totAmountPerLine = 0;
			totAmountPerLine = 
				parseFloat(tblOrder.rows[idxRow].cells[3].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value);
			tblOrder.rows[idxRow].cells[8].children[0].value =
				totAmountPerLine;
			totAmount += totAmountPerLine;
		}
		else if(jumlahOrder === "2"){
			tblOrder.rows[idxRow].cells[3].children[0].value = qty;
			tblOrder.rows[idxRow].cells[4].children[0].value = qty;
			tblOrder.rows[idxRow].cells[5].children[0].value = 0;
			tblOrder.rows[idxRow].cells[6].children[0].value = 0;
			tblOrder.rows[idxRow].cells[7].children[0].value = 0;
			
			var totAmountPerLine = 0;
			totAmountPerLine = 
				(parseFloat(tblOrder.rows[idxRow].cells[3].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value))
				+ (parseFloat(tblOrder.rows[idxRow].cells[4].children[0].value)
	    		* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value));
			tblOrder.rows[idxRow].cells[8].children[0].value =
				totAmountPerLine;
			totAmount += totAmountPerLine;
		}
		else if(jumlahOrder === "3"){
			tblOrder.rows[idxRow].cells[3].children[0].value = qty;
			tblOrder.rows[idxRow].cells[4].children[0].value = qty;
			tblOrder.rows[idxRow].cells[5].children[0].value = qty;
			tblOrder.rows[idxRow].cells[6].children[0].value = 0;
			tblOrder.rows[idxRow].cells[7].children[0].value = 0;
			
			var totAmountPerLine = 0;
			totAmountPerLine = 
				(parseFloat(tblOrder.rows[idxRow].cells[3].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value))
				+ (parseFloat(tblOrder.rows[idxRow].cells[4].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value))
				+ (parseFloat(tblOrder.rows[idxRow].cells[5].children[0].value)
	    		* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value));
			tblOrder.rows[idxRow].cells[8].children[0].value =
				totAmountPerLine;
			totAmount += totAmountPerLine;
		}
		else if(jumlahOrder === "4"){
			tblOrder.rows[idxRow].cells[3].children[0].value = qty;
			tblOrder.rows[idxRow].cells[4].children[0].value = qty;
			tblOrder.rows[idxRow].cells[5].children[0].value = qty;
			tblOrder.rows[idxRow].cells[6].children[0].value = qty;
			tblOrder.rows[idxRow].cells[7].children[0].value = 0;
			
			var totAmountPerLine = 0;
			totAmountPerLine = 
				(parseFloat(tblOrder.rows[idxRow].cells[3].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value))
				+ (parseFloat(tblOrder.rows[idxRow].cells[4].children[0].value)
   				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value))
   				+ (parseFloat(tblOrder.rows[idxRow].cells[5].children[0].value)
   				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value))
   				+ (parseFloat(tblOrder.rows[idxRow].cells[6].children[0].value)
   	    		* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value));
			tblOrder.rows[idxRow].cells[8].children[0].value =
				totAmountPerLine;
			totAmount += totAmountPerLine;
		}
		else if(jumlahOrder === "5"){
			tblOrder.rows[idxRow].cells[3].children[0].value = qty;
			tblOrder.rows[idxRow].cells[4].children[0].value = qty;
			tblOrder.rows[idxRow].cells[5].children[0].value = qty;
			tblOrder.rows[idxRow].cells[6].children[0].value = qty;
			tblOrder.rows[idxRow].cells[7].children[0].value = qty;
			
			var totAmountPerLine = 0;
			totAmountPerLine = 
				(parseFloat(tblOrder.rows[idxRow].cells[3].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value))
				+ (parseFloat(tblOrder.rows[idxRow].cells[4].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value))
				+ (parseFloat(tblOrder.rows[idxRow].cells[5].children[0].value)
   				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value))
   				+ (parseFloat(tblOrder.rows[idxRow].cells[6].children[0].value)
   				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value))
   				+ (parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value)
   	    		* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value));
			tblOrder.rows[idxRow].cells[8].children[0].value =
				totAmountPerLine;
			totAmount += totAmountPerLine;
		}
		
		totAmount1 += 
			(parseFloat(tblOrder.rows[idxRow].cells[3].children[0].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value));
		totAmount2 += 
			(parseFloat(tblOrder.rows[idxRow].cells[4].children[0].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value));
		totAmount3 += 
			(parseFloat(tblOrder.rows[idxRow].cells[5].children[0].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value));
		totAmount4 += 
			(parseFloat(tblOrder.rows[idxRow].cells[6].children[0].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value));
		totAmount5 += 
			(parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value));
		
	}
	
	totalAmount1.value = totAmount1;
	totalAmount2.value = totAmount2;
	totalAmount3.value = totAmount3;
	totalAmount4.value = totAmount4;
	totalAmount5.value = totAmount5;
	amtTotal.value = totAmount;
	sisaLimit.value = sisaLimitInit - totAmount;*/
}

/*function generateCMOB(){

	console.log("");
	console.log("========================================================");
	console.log("CMOB Calculation");
	console.log("========================================================");
	
	var jumlahOrder = document.getElementById("jumlahOrder").value;
	var orderBySelected = document.getElementById("orderBySelected");
	orderBySelected.value = "CMOB";
	var leadTime = 
		parseFloat(document.getElementById("leadTime").value);
	var rowLeadTime = document.getElementById("rowLeadTime");
	rowLeadTime.style.display = "table-row";
	var tblOrder = document.getElementById("tblOrder");
	var productQty = 
		parseFloat(document.getElementById("productQty").value);
	var totalAmount1 = document.getElementById("totalAmount1");
	var totalAmount2 = document.getElementById("totalAmount2");
	var totalAmount3 = document.getElementById("totalAmount3");
	var totalAmount4 = document.getElementById("totalAmount4");
	var totalAmount5 = document.getElementById("totalAmount5");
	var totalAmount1Text = document.getElementById("totalAmount1Text");
	var totalAmount2Text = document.getElementById("totalAmount2Text");
	var totalAmount3Text = document.getElementById("totalAmount3Text");
	var totalAmount4Text = document.getElementById("totalAmount4Text");
	var totalAmount5Text = document.getElementById("totalAmount5Text");
	var sisaLimit = document.getElementById("sisaLimit");
	var sisaLimitText = document.getElementById("sisaLimitText");
	var sisaLimit = document.getElementById("sisaLimit1");
	var sisaLimit = document.getElementById("sisaLimit2");
	var sisaLimit = document.getElementById("sisaLimit3");
	var sisaLimit = document.getElementById("sisaLimit4");
	var sisaLimit = document.getElementById("sisaLimit5");
	var sisaLimitInit = document.getElementById("sisaLimitInit").value;
	var dimensiMobil1 = document.getElementById("dimensiMobil1");
	var dimensiMobil2 = document.getElementById("dimensiMobil2");
	var dimensiMobil3 = document.getElementById("dimensiMobil3");
	var dimensiMobil4 = document.getElementById("dimensiMobil4");
	var dimensiMobil5 = document.getElementById("dimensiMobil5");
	var dimensiOrder1 = document.getElementById("dimensiOrder1");
	var dimensiOrder2 = document.getElementById("dimensiOrder2");
	var dimensiOrder3 = document.getElementById("dimensiOrder3");
	var dimensiOrder4 = document.getElementById("dimensiOrder4");
	var dimensiOrder5 = document.getElementById("dimensiOrder5");
	var dimensiOrder1Text = document.getElementById("dimensiOrder1Text");
	var dimensiOrder2Text = document.getElementById("dimensiOrder2Text");
	var dimensiOrder3Text = document.getElementById("dimensiOrder3Text");
	var dimensiOrder4Text = document.getElementById("dimensiOrder4Text");
	var dimensiOrder5Text = document.getElementById("dimensiOrder5Text");
	var selisihDimensi1 = document.getElementById("selisihDimensi1");
	var selisihDimensi2 = document.getElementById("selisihDimensi2");
	var selisihDimensi3 = document.getElementById("selisihDimensi3");
	var selisihDimensi4 = document.getElementById("selisihDimensi4");
	var selisihDimensi5 = document.getElementById("selisihDimensi5");
	var selisihDimensi1Text = document.getElementById("selisihDimensi1Text");
	var selisihDimensi2Text = document.getElementById("selisihDimensi2Text");
	var selisihDimensi3Text = document.getElementById("selisihDimensi3Text");
	var selisihDimensi4Text = document.getElementById("selisihDimensi4Text");
	var selisihDimensi5Text = document.getElementById("selisihDimensi5Text");
	
	var totAmount1 = 0;
	var totAmount2 = 0;
	var totAmount3 = 0;
	var totAmount4 = 0;
	var totAmount5 = 0;
	
	var qtyTotal = document.getElementById("qtyTotal");
    var totQty = 0;
    
	var amtTotal = document.getElementById("amtTotal");
    var totAmount = 0;
    
	var do1= 0;
	var do2= 0;
	var do3= 0;
	var do4= 0;
	var do5= 0;
	
	var today = new Date();
	var leadTimeDayBefore = new Date();
	leadTimeDayBefore.
		setDate(leadTimeDayBefore.getDate()-leadTime);
	leadTimeDayBefore.setHours(0);
	leadTimeDayBefore.setMinutes(0);
	leadTimeDayBefore.setSeconds(0);
	console.log("today = " + today);
	console.log("leadTime = " + leadTime);
	console.log("leadTimeDayBefore = " + leadTimeDayBefore);
	
	for(var idxRow = 1; idxRow<=productQty; idxRow++){
		
		var productName =
			tblOrder.rows[idxRow].cells[0].children[3].value;
		var averageSales3MonthBefore = 0;
		averageSales3MonthBefore = 
			parseFloat(tblOrder.rows[idxRow].cells[10].children[0].value);
		var averageSales2MonthBefore = 0;
		averageSales2MonthBefore = 
			parseFloat(tblOrder.rows[idxRow].cells[10].children[1].value);
		var averageSales1MonthBefore = 0;
		averageSales1MonthBefore = 
			parseFloat(tblOrder.rows[idxRow].cells[10].children[2].value);
		var averageSalesCurrentMonth = 0;
		averageSalesCurrentMonth = 
			parseFloat(tblOrder.rows[idxRow].cells[10].children[3].value);
		var targetCustomerCurrentMonth = 0;
		targetCustomerCurrentMonth = 
			parseFloat(tblOrder.rows[idxRow].cells[10].children[4].value);
		var targetCustomerNextMonth = 0;
		targetCustomerNextMonth = 
			parseFloat(tblOrder.rows[idxRow].cells[10].children[5].value);
		var qtyOnHand = 0;
		qtyOnHand = 
			parseFloat(tblOrder.rows[idxRow].cells[10].children[6].value);
		var outstandingOrder = 0;
		outstandingOrder = 
			parseFloat(tblOrder.rows[idxRow].cells[0].children[8].value);
		var outstandingQuotation = 0;
		outstandingQuotation = 
			parseFloat(tblOrder.rows[idxRow].cells[0].children[9].value);
		
		var averageSales = 0;
		var averageSalesCount = 0;
		
		if(averageSales3MonthBefore!=0){
			averageSalesCount +=1;
		}
		
		if(averageSales2MonthBefore!=0){
			averageSalesCount +=1;
		}
		
		if(averageSales1MonthBefore!=0){
			averageSalesCount +=1;
		}
		
		if(averageSalesCount>0){
			averageSales =
				(averageSales3MonthBefore
				+ averageSales2MonthBefore
				+ averageSales1MonthBefore)
				/averageSalesCount;
		}
		
		var bufferStock = 0;
		bufferStock =
			(averageSales/2)
			+ (leadTime*averageSales/30);
			
		var invoiceByLeadTime = 0;
		
		var tblCustInvoice =
			tblOrder.rows[idxRow].cells[11].children[0];
		for (var i = 0; i < tblCustInvoice.rows.length; i++) {
			
			var trxDate =
				new Date(tblCustInvoice.rows[i].cells[2].children[0].value);
			
			if(trxDate >= leadTimeDayBefore){
				invoiceByLeadTime +=
					parseFloat(
							tblCustInvoice.rows[i].cells[4].children[0].value);
			}
			
		}
		
		var cmob = 
			Math.ceil(
				targetCustomerCurrentMonth
				+ bufferStock
				- invoiceByLeadTime
				- qtyOnHand
				- outstandingQuotation
				- outstandingOrder);
				
		if(cmob<0){
			cmob = 0;
		}
			
		var qty = Math.ceil(cmob / jumlahOrder);
		
		console.log(
				productName
				+ " => "
				+ "averageSales3MonthBefore = " 
				+ averageSales3MonthBefore
				+ ", "
				+ "averageSales2MonthBefore = " 
				+ averageSales2MonthBefore
				+ ", "
				+ "averageSales1MonthBefore = " 
				+ averageSales1MonthBefore
				+ ", "
				+ "averageSalesCurrentMonth = " 
				+ averageSalesCurrentMonth
				+ ", "
				+ "averageSales = "
				+ averageSales
				+ ", "
				+ "bufferStock = "
				+ bufferStock
				+ ", "
				+ "targetCustomerCurrentMonth = " 
				+ targetCustomerCurrentMonth
				+ ", "
				+ "targetCustomerNextMonth = " 
				+ targetCustomerNextMonth
				+ ", "
				+ "qtyOnHand = "
				+ qtyOnHand
				+ ", "
				+ "outstandingOrder = "
				+ outstandingOrder
				+ ", "
				+ "outstandingQuotation = "
				+ outstandingQuotation
				+ ", "
				+ "invoiceByLeadTime = "
				+ invoiceByLeadTime
				+ ", "
				+ "CMOB = "
				+ cmob
				+ ", "
				+ "qty = "
				+ qty);		
		
		if(jumlahOrder === "1"){		
			
			tblOrder.rows[idxRow].cells[0].children[0].value = 
				formatTextValue(qty);
			tblOrder.rows[idxRow].cells[1].children[0].value = 0;
			tblOrder.rows[idxRow].cells[2].children[0].value = 0;
			tblOrder.rows[idxRow].cells[3].children[0].value = 0;
			tblOrder.rows[idxRow].cells[4].children[0].value = 0;
			tblOrder.rows[idxRow].cells[5].children[0].value = 
				formatTextValue(qty);
			
			totQty += qty;
			
			do1 += 
				qty
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
				/1000000000;
			
			var totAmountPerLine = 0;
			totAmountPerLine = 
				qty
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value);
			tblOrder.rows[idxRow].cells[6].children[0].value =
				formatTextValue(totAmountPerLine);
			totAmount += totAmountPerLine;
		}
		else if(jumlahOrder === "2"){
			
			tblOrder.rows[idxRow].cells[0].children[0].value = 
				formatTextValue(qty);
			tblOrder.rows[idxRow].cells[1].children[0].value = 
				formatTextValue(qty);
			tblOrder.rows[idxRow].cells[2].children[0].value = 0;
			tblOrder.rows[idxRow].cells[3].children[0].value = 0;
			tblOrder.rows[idxRow].cells[4].children[0].value = 0;
			tblOrder.rows[idxRow].cells[5].children[0].value = 
				formatTextValue(qty*2);
			
			totQty += (qty*2);
			
			do1 += 
				qty
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
				/1000000000;
			do2 += 
				qty
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
				/1000000000;
			
			var totAmountPerLine = 0;
			totAmountPerLine = 
				(qty
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
				+ (qty
	    		* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
			tblOrder.rows[idxRow].cells[6].children[0].value =
				formatTextValue(totAmountPerLine);
			totAmount += totAmountPerLine;
		}
		else if(jumlahOrder === "3"){
			
			tblOrder.rows[idxRow].cells[0].children[0].value = 
				formatTextValue(qty);
			tblOrder.rows[idxRow].cells[1].children[0].value = 
				formatTextValue(qty);
			tblOrder.rows[idxRow].cells[2].children[0].value = 
				formatTextValue(qty);
			tblOrder.rows[idxRow].cells[3].children[0].value = 0;
			tblOrder.rows[idxRow].cells[4].children[0].value = 0;
			tblOrder.rows[idxRow].cells[5].children[0].value = 
				formatTextValue(qty*3);
			
			totQty += (qty*3);

			do1 += 
				qty
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
				/1000000000;
			do2 += 
				qty
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
				/1000000000;
			do3 += 
				qty
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
				/1000000000;
			
			var totAmountPerLine = 0;
			totAmountPerLine = 
				(qty
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
				+ (qty
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
				+ (qty
	    		* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
			tblOrder.rows[idxRow].cells[6].children[0].value =
				formatTextValue(totAmountPerLine);
			totAmount += totAmountPerLine;
		}
		else if(jumlahOrder === "4"){
			tblOrder.rows[idxRow].cells[0].children[0].value = 
				formatTextValue(qty);
			tblOrder.rows[idxRow].cells[1].children[0].value = 
				formatTextValue(qty);
			tblOrder.rows[idxRow].cells[2].children[0].value = 
				formatTextValue(qty);
			tblOrder.rows[idxRow].cells[3].children[0].value = 
				formatTextValue(qty);
			tblOrder.rows[idxRow].cells[4].children[0].value = 0;
			tblOrder.rows[idxRow].cells[5].children[0].value = 
				formatTextValue(qty*4);	
			
			totQty += (qty*4);

			do1 += 
				qty
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
				/1000000000;
			do2 += 
				qty
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
				/1000000000;
			do3 += 
				qty
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
				/1000000000;
			do4 += 
				qty
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
				/1000000000;
			
			var totAmountPerLine = 0;
			totAmountPerLine = 
				(qty
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
				+ (qty
   				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
   				+ (qty
   				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
   				+ (qty
   	    		* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
			tblOrder.rows[idxRow].cells[6].children[0].value =
				formatTextValue(totAmountPerLine);
			totAmount += totAmountPerLine;
		}
		else if(jumlahOrder === "5"){
			tblOrder.rows[idxRow].cells[0].children[0].value = 
				formatTextValue(qty);
			tblOrder.rows[idxRow].cells[1].children[0].value = 
				formatTextValue(qty);
			tblOrder.rows[idxRow].cells[2].children[0].value = 
				formatTextValue(qty);
			tblOrder.rows[idxRow].cells[3].children[0].value = 
				formatTextValue(qty);
			tblOrder.rows[idxRow].cells[4].children[0].value = 
				formatTextValue(qty);
			tblOrder.rows[idxRow].cells[5].children[0].value = 
				formatTextValue(qty*5);
			
			totQty += (qty*5);

			do1 += 
				qty
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
				/1000000000;
			do2 += 
				qty
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
				/1000000000;
			do3 += 
				qty
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
				/1000000000;
			do4 += 
				qty
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
				/1000000000;
			do5 += 
				qty
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
				/1000000000;
			
			var totAmountPerLine = 0;
			totAmountPerLine = 
				(qty
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
				+ (qty
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
				+ (qty
   				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
   				+ (qty
   				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
   				+ (qty
   	    		* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
			tblOrder.rows[idxRow].cells[6].children[0].value =
				formatTextValue(totAmountPerLine);
			totAmount += totAmountPerLine;
		}
		
		totAmount1 += 
			(qty
				*parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
		totAmount2 += 
			(qty
				*parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
		totAmount3 += 
			(qty
				*parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
		totAmount4 += 
			(qty
				*parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
		totAmount5 += 
			(qty
				*parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));

	}

	if(jumlahOrder>0){
		
		dimensiOrder1.value = parseFloat(do1);
		dimensiOrder1Text.value = formatTextValue(do1);
		var sd1 = 0;
		sd1 =  parseFloat(dimensiMobil1.value - do1);
		selisihDimensi1.value = sd1;
		selisihDimensi1Text.value = formatTextValue(sd1);
		if(sd1<0){
			selisihDimensi1Text.style.backgroundColor = "yellow";
			//alert("Dimensi Mobil pada Order 1 Tidak Mencukupi. Mohon Periksa Kembali");
		}
		else{
			selisihDimensi1Text.style.backgroundColor = "#D3D3D3";
		}
		
		var sl1 = 0;
    	sl1 = sisaLimitInit - totAmount1;
    	sisaLimit1.value = formatTextValue(sl1);
    	if(sl1<0){
    		sisaLimit1.style.backgroundColor = "yellow";
    		alert("Sisa Limit pada Order 1 Tidak Mencukupi. Mohon Periksa Kembali");
    	}
    	else{
    		sisaLimit1.style.backgroundColor = "#D3D3D3";
    	}
		
		if(jumlahOrder>1){

			dimensiOrder2.value = parseFloat(do2);
			dimensiOrder2Text.value = formatTextValue(parseFloat(do2));
			var sd2 = 0;
			sd2 = parseFloat(dimensiMobil2.value) - parseFloat(do2);
			selisihDimensi2.value = sd2;
			selisihDimensi2Text.value = formatTextValue(sd2);
			if(sd2<0){
				selisihDimensi2Text.style.backgroundColor = "yellow";
				//alert("Dimensi Mobil pada Order 2 Tidak Mencukupi. Mohon Periksa Kembali");
			}
			else{
				selisihDimensi2Text.style.backgroundColor = "#D3D3D3";
			}

    		var sl2 = 0;
        	sl2 = sl1 - totAmount2;
        	sisaLimit2.value = formatTextValue(sl2);
        	if(sl2<0){
        		sisaLimit2.style.backgroundColor = "yellow";
        		alert("Sisa Limit pada Order 2 Tidak Mencukupi. Mohon Periksa Kembali");
        	}
        	else{
        		sisaLimit2.style.backgroundColor = "#D3D3D3";
        	}
			
			if(jumlahOrder>2){

				dimensiOrder3.value = parseFloat(do3);
				dimensiOrder3Text.value = formatTextValue(parseFloat(do3));
				var sd3 = 0;
				sd3 = parseFloat(dimensiMobil3.value) - parseFloat(do3);
				selisihDimensi3.value = sd3;
				selisihDimensi3Text.value = formatTextValue(sd3);
				if(sd3<0){
					selisihDimensi3Text.style.backgroundColor = "yellow";
					//alert("Dimensi Mobil pada Order 3 Tidak Mencukupi. Mohon Periksa Kembali");
				}
				else{
					selisihDimensi3Text.style.backgroundColor = "#D3D3D3";
				}

        		var sl3 = 0;
            	sl3 = sl2 - totAmount3;
            	sisaLimit3.value = formatTextValue(sl3);
            	if(sl3<0){
            		sisaLimit3.style.backgroundColor = "yellow";
            		alert("Sisa Limit pada Order 3 Tidak Mencukupi. Mohon Periksa Kembali");
            	}
            	else{
            		sisaLimit3.style.backgroundColor = "#D3D3D3";
            	}
				
				if(jumlahOrder>3){

					dimensiOrder4.value = parseFloat(do4);
					dimensiOrder4Text.value = formatTextValue(parseFloat(do4));
					var sd4 = 0;
					sd4 = parseFloat(dimensiMobil4.value) - parseFloat(do4);
					selisihDimensi4.value = sd4;
					selisihDimensi4Text.value = formatTextValue(sd4);
					if(sd4<0){
						selisihDimensi4Text.style.backgroundColor = "yellow";
						//alert("Dimensi Mobil pada Order 4 Tidak Mencukupi. Mohon Periksa Kembali");
					}
					else{
						selisihDimensi4Text.style.backgroundColor = "#D3D3D3";
					}

	        		var sl4 = 0;
	            	sl4 = sl3 - totAmount4;
	            	sisaLimit4.value = formatTextValue(sl4);
	            	if(sl4<0){
	            		sisaLimit4.style.backgroundColor = "yellow";
	            		alert("Sisa Limit pada Order 4 Tidak Mencukupi. Mohon Periksa Kembali");
	            	}
	            	else{
	            		sisaLimit4.style.backgroundColor = "#D3D3D3";
	            	}
					
					if(jumlahOrder>4){

						dimensiOrder5.value = parseFloat(do5);
						dimensiOrder5Text.value = formatTextValue(parseFloat(do5));
						var sd5 = 0;
						sd5 = parseFloat(dimensiMobil5.value) - parseFloat(do5);
						selisihDimensi5.value = sd5;
						selisihDimensi5Text.value = formatTextValue(sd5);
						if(sd5<0){
							selisihDimensi5Text.style.backgroundColor = "yellow";
							//alert("Dimensi Mobil pada Order 5 Tidak Mencukupi. Mohon Periksa Kembali");
						}
						else{
							selisihDimensi5Text.style.backgroundColor = "#D3D3D3";
						}

		        		var sl5 = 0;
		            	sl5 = sl4 - totAmount5;
		            	sisaLimit5.value = formatTextValue(sl5);
		            	if(sl5<0){
		            		sisaLimit5.style.backgroundColor = "yellow";
		            		alert("Sisa Limit pada Order 5 Tidak Mencukupi. Mohon Periksa Kembali");
		            	}
		            	else{
		            		sisaLimit5.style.backgroundColor = "#D3D3D3";
		            	}
						
					}
				}
			}
		}
	}
	
	totalAmount1.value = totAmount1;
	totalAmount2.value = totAmount2;
	totalAmount3.value = totAmount3;
	totalAmount4.value = totAmount4;
	totalAmount5.value = totAmount5;
	totalAmount1Text.value = formatTextValue(totAmount1);
	totalAmount2Text.value = formatTextValue(totAmount2);
	totalAmount3Text.value = formatTextValue(totAmount3);
	totalAmount4Text.value = formatTextValue(totAmount4);
	totalAmount5Text.value = formatTextValue(totAmount5);
	qtyTotal.value = formatTextValue(parseInt(totQty));
	amtTotal.value = formatTextValue(totAmount);
	var sl = 0;
	sl = sisaLimitInit - totAmount;
	sisaLimit.value = sl;
	sisaLimitText.value = formatTextValue(sl);
	if(sl<0){
		sisaLimitText.style.backgroundColor = "yellow";
		//alert("Sisa Limit Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		sisaLimitText.style.backgroundColor = "#D3D3D3";
	}
	
	console.log("========================================================");
	console.log("");
}*/

function resetOrder(){
	
	var jumlahOrder = document.getElementById("jumlahOrder").value;
	var orderBySelected = document.getElementById("orderBySelected");
	orderBySelected.value = "Manual";
	var rowLeadTime = document.getElementById("rowLeadTime");
	rowLeadTime.style.display = "none";
	var tblOrder = document.getElementById("tblOrder");
	var productQty = 
		parseFloat(document.getElementById("productQty").value);
	var totalAmount1 = document.getElementById("totalAmount1");
	var totalAmount2 = document.getElementById("totalAmount2");
	var totalAmount3 = document.getElementById("totalAmount3");
	var totalAmount4 = document.getElementById("totalAmount4");
	var totalAmount5 = document.getElementById("totalAmount5");
	var totalAmount1Text = document.getElementById("totalAmount1Text");
	var totalAmount2Text = document.getElementById("totalAmount2Text");
	var totalAmount3Text = document.getElementById("totalAmount3Text");
	var totalAmount4Text = document.getElementById("totalAmount4Text");
	var totalAmount5Text = document.getElementById("totalAmount5Text");
	var sisaLimit = document.getElementById("sisaLimit");
	var sisaLimitText = document.getElementById("sisaLimitText");
	var sisaLimit1 = document.getElementById("sisaLimit1");
	var sisaLimit2 = document.getElementById("sisaLimit2");
	var sisaLimit3 = document.getElementById("sisaLimit3");
	var sisaLimit4 = document.getElementById("sisaLimit4");
	var sisaLimit5 = document.getElementById("sisaLimit5");
	var sisaLimitInit = document.getElementById("sisaLimitInit").value;
	var amtTotal = document.getElementById("qtyTotal");
	var amtTotal = document.getElementById("amtTotal");
    var dimensiMobil1 = document.getElementById("dimensiMobil1").value;
    var dimensiMobil2 = document.getElementById("dimensiMobil2").value;
    var dimensiMobil3 = document.getElementById("dimensiMobil3").value;
    var dimensiMobil4 = document.getElementById("dimensiMobil4").value;
    var dimensiMobil5 = document.getElementById("dimensiMobil5").value;
	var dimensiOrder1 = document.getElementById("dimensiOrder1");
	var dimensiOrder2 = document.getElementById("dimensiOrder2");
	var dimensiOrder3 = document.getElementById("dimensiOrder3");
	var dimensiOrder4 = document.getElementById("dimensiOrder4");
	var dimensiOrder5 = document.getElementById("dimensiOrder5");
	var dimensiOrder1Text = document.getElementById("dimensiOrder1Text");
	var dimensiOrder2Text = document.getElementById("dimensiOrder2Text");
	var dimensiOrder3Text = document.getElementById("dimensiOrder3Text");
	var dimensiOrder4Text = document.getElementById("dimensiOrder4Text");
	var dimensiOrder5Text = document.getElementById("dimensiOrder5Text");
	var selisihDimensi1 = document.getElementById("selisihDimensi1");
	var selisihDimensi2 = document.getElementById("selisihDimensi2");
	var selisihDimensi3 = document.getElementById("selisihDimensi3");
	var selisihDimensi4 = document.getElementById("selisihDimensi4");
	var selisihDimensi5 = document.getElementById("selisihDimensi5");
	var selisihDimensi1Text = document.getElementById("selisihDimensi1Text");
	var selisihDimensi2Text = document.getElementById("selisihDimensi2Text");
	var selisihDimensi3Text = document.getElementById("selisihDimensi3Text");
	var selisihDimensi4Text = document.getElementById("selisihDimensi4Text");
	var selisihDimensi5Text = document.getElementById("selisihDimensi5Text");
	
	sisaLimitText.value = formatTextValue(sisaLimitInit);
	totalAmount1Text.value = "0";
	totalAmount2Text.value = "0";
	totalAmount3Text.value = "0";
	totalAmount4Text.value = "0";
	totalAmount5Text.value = "0";
	qtyTotal.value = 0;
	amtTotal.value = 0;
	dimensiOrder1Text.value = "0";
	dimensiOrder2Text.value = "0";
	dimensiOrder3Text.value = "0";
	dimensiOrder4Text.value = "0";
	dimensiOrder5Text.value = "0";
	selisihDimensi1Text.value = formatTextValue(dimensiMobil1);
	selisihDimensi2Text.value = formatTextValue(dimensiMobil2);
	selisihDimensi3Text.value = formatTextValue(dimensiMobil3);
	selisihDimensi4Text.value = formatTextValue(dimensiMobil4);
	selisihDimensi5Text.value = formatTextValue(dimensiMobil5);
	selisihDimensi1Text.style.backgroundColor = "#D3D3D3";
	selisihDimensi2Text.style.backgroundColor = "#D3D3D3";
	selisihDimensi3Text.style.backgroundColor = "#D3D3D3";
	selisihDimensi4Text.style.backgroundColor = "#D3D3D3";
	selisihDimensi5Text.style.backgroundColor = "#D3D3D3";
	sisaLimit1.value = formatTextValue(sisaLimitInit);
	sisaLimit2.value = formatTextValue(sisaLimitInit);
	sisaLimit3.value = formatTextValue(sisaLimitInit);
	sisaLimit4.value = formatTextValue(sisaLimitInit);
	sisaLimit5.value = formatTextValue(sisaLimitInit);
	sisaLimit1.style.backgroundColor = "#D3D3D3";
	sisaLimit2.style.backgroundColor = "#D3D3D3";
	sisaLimit3.style.backgroundColor = "#D3D3D3";
	sisaLimit4.style.backgroundColor = "#D3D3D3";
	sisaLimit5.style.backgroundColor = "#D3D3D3";
	sisaLimitText.style.backgroundColor = "#D3D3D3";
	
	for(var idxRow = 1; idxRow<=productQty; idxRow++){
		
		tblOrder.rows[idxRow].cells[0].children[0].value = 0;
		tblOrder.rows[idxRow].cells[1].children[0].value = 0;
		tblOrder.rows[idxRow].cells[2].children[0].value = 0;
		tblOrder.rows[idxRow].cells[3].children[0].value = 0;
		tblOrder.rows[idxRow].cells[4].children[0].value = 0;
		tblOrder.rows[idxRow].cells[5].children[0].value = 0;
		tblOrder.rows[idxRow].cells[6].children[0].value = 0;

	}
	
}

function changeMobil1(obj){
	
	var selectBox = obj;
	var dimensiMobil = obj.value;
	var jenisMobil = selectBox.options[selectBox.selectedIndex].text;
    var jenisMobilSelected = document.getElementById("mobil1Selected");
    jenisMobilSelected.value = jenisMobil;
    var dimensiMobil1 = document.getElementById("dimensiMobil1");
    var dimensiMobil1Text = document.getElementById("dimensiMobil1Text");
	var selisihDimensi1 = document.getElementById("selisihDimensi1");
	var selisihDimensi1Text = document.getElementById("selisihDimensi1Text");
    dimensiMobil1.value = obj.value;
    dimensiMobil1Text.value = formatTextValue(obj.value);
	var dimensiOrder = document.getElementById("dimensiOrder1").value;
	var selisihDimensi = 0;
	selisihDimensi =  parseFloat(dimensiMobil1.value - dimensiOrder);
	selisihDimensi1.value = selisihDimensi;
	selisihDimensi1Text.value = formatTextValue(selisihDimensi);
	if(selisihDimensi<0){
		selisihDimensi1Text.style.backgroundColor = "yellow";
		//alert("Dimensi Mobil pada Order 1 Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		selisihDimensi1Text.style.backgroundColor = "#D3D3D3";
	}
}

function changeMobil2(obj){
	
	var selectBox = obj;
	var dimensiMobil = obj.value;
	var jenisMobil = selectBox.options[selectBox.selectedIndex].text;
    var jenisMobilSelected = document.getElementById("mobil2Selected");
    jenisMobilSelected.value = jenisMobil;
    var dimensiMobil2 = document.getElementById("dimensiMobil2");
    var dimensiMobil2Text = document.getElementById("dimensiMobil2Text");
	var selisihDimensi2 = document.getElementById("selisihDimensi2");
	var selisihDimensi2Text = document.getElementById("selisihDimensi2Text");
    dimensiMobil2.value = obj.value;
    dimensiMobil2Text.value = formatTextValue(obj.value);
	var dimensiOrder = document.getElementById("dimensiOrder2").value;
	var selisihDimensi = 0;
	selisihDimensi =  parseFloat(dimensiMobil2.value - dimensiOrder);
	selisihDimensi2.value = selisihDimensi;
	selisihDimensi2Text.value = formatTextValue(selisihDimensi);
	if(selisihDimensi<0){
		selisihDimensi2Text.style.backgroundColor = "yellow";
		//alert("Dimensi Mobil pada Order 2 Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		selisihDimensi2Text.style.backgroundColor = "#D3D3D3";
	}
}

function changeMobil3(obj){
	
	var selectBox = obj;
	var dimensiMobil = obj.value;
	var jenisMobil = selectBox.options[selectBox.selectedIndex].text;
    var jenisMobilSelected = document.getElementById("mobil3Selected");
    jenisMobilSelected.value = jenisMobil;
    var dimensiMobil3 = document.getElementById("dimensiMobil3");
    var dimensiMobil3Text = document.getElementById("dimensiMobil3Text");
	var selisihDimensi3 = document.getElementById("selisihDimensi3");
	var selisihDimensi3Text = document.getElementById("selisihDimensi3Text");
    dimensiMobil3.value = obj.value;
    dimensiMobil3Text.value = formatTextValue(obj.value);
	var dimensiOrder = document.getElementById("dimensiOrder3").value;
	var selisihDimensi = 0;
	selisihDimensi =  parseFloat(dimensiMobil3.value - dimensiOrder);
	selisihDimensi3.value = selisihDimensi;
	selisihDimensi3Text.value = formatTextValue(selisihDimensi);
	if(selisihDimensi<0){
		selisihDimensi3Text.style.backgroundColor = "yellow";
		//alert("Dimensi Mobil pada Order 3 Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		selisihDimensi3Text.style.backgroundColor = "#D3D3D3";
	}
}

function changeMobil4(obj){
	
	var selectBox = obj;
	var dimensiMobil = obj.value;
	var jenisMobil = selectBox.options[selectBox.selectedIndex].text;
    var jenisMobilSelected = document.getElementById("mobil4Selected");
    jenisMobilSelected.value = jenisMobil;
    var dimensiMobil4 = document.getElementById("dimensiMobil4");
    var dimensiMobil4Text = document.getElementById("dimensiMobil4Text");
	var selisihDimensi4 = document.getElementById("selisihDimensi4");
	var selisihDimensi4Text = document.getElementById("selisihDimensi4Text");
    dimensiMobil4.value = obj.value;
    dimensiMobil4Text.value = formatTextValue(obj.value);
	var dimensiOrder = document.getElementById("dimensiOrder4").value;
	var selisihDimensi = 0;
	selisihDimensi =  parseFloat(dimensiMobil4.value - dimensiOrder);
	selisihDimensi4.value = selisihDimensi;
	selisihDimensi4Text.value = formatTextValue(selisihDimensi);
	if(selisihDimensi<0){
		selisihDimensi4Text.style.backgroundColor = "yellow";
		//alert("Dimensi Mobil pada Order 4 Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		selisihDimensi4Text.style.backgroundColor = "#D3D3D3";
	}
}

function changeMobil5(obj){
	
	var selectBox = obj;
	var dimensiMobil = obj.value;
	var jenisMobil = selectBox.options[selectBox.selectedIndex].text;
    var jenisMobilSelected = document.getElementById("mobil5Selected");
    jenisMobilSelected.value = jenisMobil;
    var dimensiMobil5 = document.getElementById("dimensiMobil5");
    var dimensiMobil5Text = document.getElementById("dimensiMobil5Text");
	var selisihDimensi5 = document.getElementById("selisihDimensi5");
	var selisihDimensi5Text = document.getElementById("selisihDimensi5Text");
    dimensiMobil5.value = obj.value;
    dimensiMobil5Text.value = formatTextValue(obj.value);
	var dimensiOrder = document.getElementById("dimensiOrder5").value;
	var selisihDimensi = 0;
	selisihDimensi =  parseFloat(dimensiMobil5.value - dimensiOrder);
	selisihDimensi5.value = selisihDimensi;
	selisihDimensi5Text.value = formatTextValue(selisihDimensi);
	if(selisihDimensi<0){
		selisihDimensi5Text.style.backgroundColor = "yellow";
		//alert("Dimensi Mobil pada Order 5 Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		selisihDimensi5Text.style.backgroundColor = "#D3D3D3";
	}
}

function changeExpedisi1(obj){
	var expedisi = obj.value;
    var expedisi1Selected = document.getElementById("expedisi1Selected");
    expedisi1Selected.value = expedisi;
}

function changeExpedisi2(obj){
	var expedisi = obj.value;
    var expedisi2Selected = document.getElementById("expedisi2Selected");
    expedisi2Selected.value = expedisi;
}

function changeExpedisi3(obj){
	var expedisi = obj.value;
    var expedisi3Selected = document.getElementById("expedisi3Selected");
    expedisi3Selected.value = expedisi;
}

function changeExpedisi4(obj){
	var expedisi = obj.value;
    var expedisi4Selected = document.getElementById("expedisi4Selected");
    expedisi4Selected.value = expedisi;
}

function changeExpedisi5(obj){
	var expedisi = obj.value;
    var expedisi5Selected = document.getElementById("expedisi5Selected");
    expedisi5Selected.value = expedisi;
}

function changeShipTo1(obj){
	var selectBox = obj;
	var shipTo = selectBox.options[selectBox.selectedIndex].value;
    var shipToSelected = document.getElementById("shipTo1Selected");
    shipToSelected.value = shipTo;
}

function changeShipTo2(obj){
	var selectBox = obj;
	var shipTo = selectBox.options[selectBox.selectedIndex].value;
    var shipToSelected = document.getElementById("shipTo2Selected");
    shipToSelected.value = shipTo;
}

function changeShipTo3(obj){
	var selectBox = obj;
	var shipTo = selectBox.options[selectBox.selectedIndex].value;
    var shipToSelected = document.getElementById("shipTo3Selected");
    shipToSelected.value = shipTo;
}

function changeShipTo4(obj){
	var selectBox = obj;
	var shipTo = selectBox.options[selectBox.selectedIndex].value;
    var shipToSelected = document.getElementById("shipTo4Selected");
    shipToSelected.value = shipTo;
}

function changeShipTo5(obj){
	var selectBox = obj;
	var shipTo = selectBox.options[selectBox.selectedIndex].value;
    var shipToSelected = document.getElementById("shipTo5Selected");
    shipToSelected.value = shipTo;
}

function changeOrderType(obj){
	
	var selectBox = obj;
	var orderType = selectBox.options[selectBox.selectedIndex].value;
    var orderTypeSelected = document.getElementById("orderTypeSelected");
    orderTypeSelected.value = orderType;
	var sisaLimit = document.getElementById("sisaLimit");
	var sisaLimitDP = document.getElementById("sisaLimitDP");
	var poNumber1 = document.getElementById("poNumber1");
	var poNumber2 = document.getElementById("poNumber2");
	var poNumber3 = document.getElementById("poNumber3");
	var poNumber4 = document.getElementById("poNumber4");
	var poNumber5 = document.getElementById("poNumber5");

	var tblOrder = document.getElementById("tblOrder");
	var tblOrderItemFixed = document.getElementById("tblOrderItemFixed");
	
	var productQty = 
		parseFloat(document.getElementById("productQty").value);
	
	if(orderType === "SO Lokal Food With CO"
			|| orderType === "SO Lokal Non Food With CO"){
		sisaLimit.style.display = "block";
		sisaLimitDP.style.display = "none";
	}
	else{
		sisaLimit.style.display = "none";
		sisaLimitDP.style.display = "block";
	}
	
	var oType = "Unknown";
	
	if(orderType === "SO Lokal Non Food With CO - DP"
		|| orderType === "SO Lokal Non Food With CO"){
		oType = "Non Food";
	}
	else if(orderType === "SO Lokal Food With CO - DP"
		|| orderType === "SO Lokal Food With CO"){
		oType = "Food";		
	}
	
	for(var idxRow = 1; idxRow<=productQty; idxRow++){
		
		//console.log(tblOrder.rows[idxRow].cells[0].children[10].value);
		if(tblOrder.rows[idxRow].cells[0].children[10].value
				=== oType){
			tblOrder.rows[idxRow].style.display = "table-row";
			tblOrderItemFixed.rows[idxRow].style.display = "table-row";
		}
		else{
			tblOrder.rows[idxRow].style.display = "none";
			tblOrderItemFixed.rows[idxRow].style.display = "none";
		}
	}
	
}

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement
    	+ this.substr(index + replacement.length);
}

function changePeriode(obj){
	var selectBox = obj;
    var periode = selectBox.options[selectBox.selectedIndex].text;
    var periodeSelected = document.getElementById("periodeSelected");
    periodeSelected.value = periode;
    var poDate1 = document.getElementById("poDate1");
    var poDate2 = document.getElementById("poDate2");
    var poDate3 = document.getElementById("poDate3");
    var poDate4 = document.getElementById("poDate4");
    var poDate5 = document.getElementById("poDate5");
    var poNumber1 = document.getElementById("poNumber1");
    var poNumber2 = document.getElementById("poNumber2");
    var poNumber3 = document.getElementById("poNumber3");
    var poNumber4 = document.getElementById("poNumber4");
    var poNumber5 = document.getElementById("poNumber5");
    
    var p = periode.split(" ");
    var month = p[0];
    var year = p[1];
    var minDate = '2017-01-01';
    var maxDate = '2117-12-31';
    var monthIndex = "00";
    
    if(month === "Januari"){
    	minDate = year + "-01-01";
    	maxDate = year + "-01-31";
    	monthIndex = "01";
    }
    else if(month === "Pebruari"){
    	minDate = year + "-02-01";
    	maxDate = year + "-02-28";
    	monthIndex = "02";
    }
    else if(month === "Maret"){
    	minDate = year + "-03-01";
    	maxDate = year + "-03-31";
    	monthIndex = "03";
    }
    else if(month === "April"){
    	minDate = year + "-04-01";
    	maxDate = year + "-04-30";
    	monthIndex = "04";
    }
    else if(month === "Mei"){
    	minDate = year + "-05-01";
    	maxDate = year + "-05-31";
    	monthIndex = "05";
    }
    else if(month === "Juni"){
    	minDate = year + "-06-01";
    	maxDate = year + "-06-30";
    	monthIndex = "06";
    }
    else if(month === "Juli"){
    	minDate = year + "-07-01";
    	maxDate = year + "-07-31";
    	monthIndex = "07";
    }
    else if(month === "Agustus"){
    	minDate = year + "-08-01";
    	maxDate = year + "-08-31";
    	monthIndex = "08";
    }
    else if(month === "September"){
    	minDate = year + "-09-01";
    	maxDate = year + "-09-30";
    	monthIndex = "09";
    }
    else if(month === "Oktober"){
    	minDate = year + "-10-01";
    	maxDate = year + "-10-31";
    	monthIndex = "10";
    }
    else if(month === "November"){
    	minDate = year + "-11-01";
    	maxDate = year + "-11-30";
    	monthIndex = "11";
    }
    else if(month === "Desember"){
    	minDate = year + "-12-01";
    	maxDate = year + "-12-31";
    	monthIndex = "12";
    } 
    
    poDate1.min = minDate;
    poDate1.max = maxDate;
    poDate2.min = minDate;
    poDate2.max = maxDate;
    poDate3.min = minDate;
    poDate3.max = maxDate;
    poDate4.min = minDate;
    poDate4.max = maxDate;
    poDate5.min = minDate;
    poDate5.max = maxDate;
    
    po1 = poNumber1.value;
    po1 = po1.replaceAt(6, monthIndex);
    poNumber1.value = po1;
    po2 = poNumber2.value;
    po2 = po2.replaceAt(6, monthIndex);
    poNumber2.value = po2;
    po3 = poNumber3.value;
    po3 = po3.replaceAt(6, monthIndex);
    poNumber3.value = po3;
    po4 = poNumber4.value;
    po4 = po4.replaceAt(6, monthIndex);
    poNumber4.value = po4;
    po5 = poNumber5.value;
    po5 = po5.replaceAt(6, monthIndex);
    poNumber5.value = po5;
}

function changeJumlahOrder(obj) {
	var selectBox = obj;
    var jumlahOrder = selectBox.options[selectBox.selectedIndex].value;
    var jumlahOrderSelected = document.getElementById("jumlahOrderSelected");
    jumlahOrderSelected.value = jumlahOrder;
    var tblOrder = document.getElementById("tblOrder");
    var productQty = 
    	parseFloat(document.getElementById("productQty").value);
    var cmob = document.getElementById("cmob");
    var manual = document.getElementById("manual");
    var order2 = document.getElementsByClassName("order2");
    var order3 = document.getElementsByClassName("order3");
    var order4 = document.getElementsByClassName("order4");
    var order5 = document.getElementsByClassName("order5");
    var unitPrice2 = document.getElementById("unitPrice2");
    var unitPrice3 = document.getElementById("unitPrice3");
    var unitPrice4 = document.getElementById("unitPrice4");
    var unitPrice5 = document.getElementById("unitPrice5");
    var amount2 = document.getElementById("amount2");
    var amount3 = document.getElementById("amount3");
    var amount4 = document.getElementById("amount4");
    var amount5 = document.getElementById("amount5");
    var sisaLimit = document.getElementById("sisaLimit");
    var sisaLimitText = document.getElementById("sisaLimitText");
    var sisaLimit1 = document.getElementById("sisaLimit1");
    var sisaLimit2 = document.getElementById("sisaLimit2");
    var sisaLimit3 = document.getElementById("sisaLimit3");
    var sisaLimit4 = document.getElementById("sisaLimit4");
    var sisaLimit5 = document.getElementById("sisaLimit5");
    var sisaLimitInit = document.getElementById("sisaLimitInit").value;
    var totalAmount1 = document.getElementById("totalAmount1");
    var totalAmount2 = document.getElementById("totalAmount2");
    var totalAmount3 = document.getElementById("totalAmount3");
    var totalAmount4 = document.getElementById("totalAmount4");
    var totalAmount5 = document.getElementById("totalAmount5");
    var totalAmount1Text = document.getElementById("totalAmount1Text");
    var totalAmount2Text = document.getElementById("totalAmount2Text");
    var totalAmount3Text = document.getElementById("totalAmount3Text");
    var totalAmount4Text = document.getElementById("totalAmount4Text");
    var totalAmount5Text = document.getElementById("totalAmount5Text");
	var dimensiMobil1 = document.getElementById("dimensiMobil1");
	var dimensiMobil2 = document.getElementById("dimensiMobil2");
	var dimensiMobil3 = document.getElementById("dimensiMobil3");
	var dimensiMobil4 = document.getElementById("dimensiMobil4");
	var dimensiMobil5 = document.getElementById("dimensiMobil5");
	var dimensiOrder1 = document.getElementById("dimensiOrder1");
	var dimensiOrder2 = document.getElementById("dimensiOrder2");
	var dimensiOrder3 = document.getElementById("dimensiOrder3");
	var dimensiOrder4 = document.getElementById("dimensiOrder4");
	var dimensiOrder5 = document.getElementById("dimensiOrder5");
	var dimensiOrder1Text = document.getElementById("dimensiOrder1Text");
	var dimensiOrder2Text = document.getElementById("dimensiOrder2Text");
	var dimensiOrder3Text = document.getElementById("dimensiOrder3Text");
	var dimensiOrder4Text = document.getElementById("dimensiOrder4Text");
	var dimensiOrder5Text = document.getElementById("dimensiOrder5Text");
	var selisihDimensi1 = document.getElementById("selisihDimensi1");
	var selisihDimensi2 = document.getElementById("selisihDimensi2");
	var selisihDimensi3 = document.getElementById("selisihDimensi3");
	var selisihDimensi4 = document.getElementById("selisihDimensi4");
	var selisihDimensi5 = document.getElementById("selisihDimensi5");

	var totAmount1 = 0;
	var totAmount2 = 0;
	var totAmount3 = 0;
	var totAmount4 = 0;
	var totAmount5 = 0;
	
	var qtyTotal = document.getElementById("qtyTotal");
    var totQty = 0;
	var amtTotal = document.getElementById("amtTotal");
    var totAmount = 0;
    
    var order2Length = 0;
    var order3Length = 0;
    var order4Length = 0;
    var order5Length = 0;
	order2Length = order2.length;
	order3Length = order3.length;
	order4Length = order4.length;
	order5Length = order5.length;

	var do1= 0;
	var do2= 0;
	var do3= 0;
	var do4= 0;
	var do5= 0;

    if(jumlahOrder === "1"){
    	
    	unitPrice2.style.display = "none";
    	unitPrice3.style.display = "none";
    	unitPrice4.style.display = "none";
    	unitPrice5.style.display = "none";
    	amount2.style.display = "none";
    	amount3.style.display = "none";
    	amount4.style.display = "none";
    	amount5.style.display = "none";
    	
    	for(var i=0; i<order2Length; i++){
    		order2[i].style.display = "none";
    		
    	}
    	for(var i=0; i<order3Length; i++){
    		order3[i].style.display = "none";
    		
    	}
    	for(var i=0; i<order4Length; i++){
    		order4[i].style.display = "none";
    		
    	}
    	for(var i=0; i<order5Length; i++){
    		order5[i].style.display = "none";
    		
    	}
    	
    	for(var idxRow = 1; idxRow<=productQty; idxRow++){
    		tblOrder.rows[idxRow].cells[1].style.display = "none";
    		tblOrder.rows[idxRow].cells[2].style.display = "none";
    		tblOrder.rows[idxRow].cells[3].style.display = "none";
    		tblOrder.rows[idxRow].cells[4].style.display = "none";

			if((idxRow !== 0)&&!cmob.checked){

				var qty1 =
					unformatText(tblOrder.rows[idxRow].cells[0].children[0].value);
				
				do1 += 
					qty1
					*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
					*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
					*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
					/1000000000;
				
				var totQtyPerLine = 0;
				totQtyPerLine = 
					qty1;
    			
				var totAmountPerLine = 0;
    			totAmountPerLine = 
    				qty1
    				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value);
    			
    			tblOrder.rows[idxRow].cells[5].children[0].value =
    				formatTextValue(totQtyPerLine);
    			tblOrder.rows[idxRow].cells[6].children[0].value =
    				formatTextValue(totAmountPerLine);
    			
    			totQty += totQtyPerLine;
    			totAmount += totAmountPerLine;
    			
    			totAmount1 += 
    				(qty1
    					*parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
    		}
			
    	}
    }
    else if(jumlahOrder === "2"){
    	
    	unitPrice2.style.display = "table-cell";
    	unitPrice3.style.display = "none";
    	unitPrice4.style.display = "none";
    	unitPrice5.style.display = "none";
    	amount2.style.display = "table-cell";
    	amount3.style.display = "none";
    	amount4.style.display = "none";
    	amount5.style.display = "none";
    	
    	for(var i=0; i<order2Length; i++){
    		order2[i].style.display = "table-cell";
    		
    	}
    	for(var i=0; i<order3Length; i++){
    		order3[i].style.display = "none";
    		
    	}
    	for(var i=0; i<order4Length; i++){
    		order4[i].style.display = "none";
    		
    	}
    	for(var i=0; i<order5Length; i++){
    		order5[i].style.display = "none";
    		
    	}
    	
    	for(var idxRow = 1; idxRow<=productQty; idxRow++){
    		tblOrder.rows[idxRow].cells[1].style.display = "table-cell";
    		tblOrder.rows[idxRow].cells[2].style.display = "none";
    		tblOrder.rows[idxRow].cells[3].style.display = "none";
    		tblOrder.rows[idxRow].cells[4].style.display = "none";
    		
			if((idxRow !== 0)&&!cmob.checked){

				var qty1 =
					unformatText(tblOrder.rows[idxRow].cells[0].children[0].value);
				var qty2 =
					unformatText(tblOrder.rows[idxRow].cells[1].children[0].value);

				do1 += 
					qty1
					*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
					*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
					*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
					/1000000000;
				do2 += 
					qty2
					*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
					*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
					*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
					/1000000000;
				
				var totQtyPerLine = 0;
				totQtyPerLine = 
					qty1
					+ qty2;
    			
				var totAmountPerLine = 0;
    			totAmountPerLine = 
    				(qty1
    				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
    				+ (qty2
    	    		* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
    			
    			tblOrder.rows[idxRow].cells[5].children[0].value =
    				formatTextValue(totQtyPerLine);
    			tblOrder.rows[idxRow].cells[6].children[0].value =
    				formatTextValue(totAmountPerLine);
    			
    			totQty += totQtyPerLine;
    			totAmount += totAmountPerLine;

    			totAmount1 += 
    				(qty1
    					*parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
    			totAmount2 += 
    				(qty2
    					*parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
    			
    		}
    		
    	}
    }
    else if(jumlahOrder === "3"){
    	
    	unitPrice2.style.display = "table-cell";
    	unitPrice3.style.display = "table-cell";
    	unitPrice4.style.display = "none";
    	unitPrice5.style.display = "none";
    	amount2.style.display = "table-cell";
    	amount3.style.display = "table-cell";
    	amount4.style.display = "none";
    	amount5.style.display = "none";
    	
    	for(var i=0; i<order2Length; i++){
    		order2[i].style.display = "table-cell";
    		
    	}
    	for(var i=0; i<order3Length; i++){
    		order3[i].style.display = "table-cell";
    		
    	}
    	for(var i=0; i<order4Length; i++){
    		order4[i].style.display = "none";
    		
    	}
    	for(var i=0; i<order5Length; i++){
    		order5[i].style.display = "none";
    		
    	}
    	
    	for(var idxRow = 1; idxRow<=productQty; idxRow++){
    		tblOrder.rows[idxRow].cells[1].style.display = "table-cell";
    		tblOrder.rows[idxRow].cells[2].style.display = "table-cell";
    		tblOrder.rows[idxRow].cells[3].style.display = "none";
    		tblOrder.rows[idxRow].cells[4].style.display = "none";
			
			if((idxRow !== 0)&&!cmob.checked){

				var qty1 =
					unformatText(tblOrder.rows[idxRow].cells[0].children[0].value);
				var qty2 =
					unformatText(tblOrder.rows[idxRow].cells[1].children[0].value);
				var qty3 =
					unformatText(tblOrder.rows[idxRow].cells[2].children[0].value);
				
				do1 += 
					qty1
					*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
					*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
					*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
					/1000000000;
				do2 += 
					qty2
					*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
					*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
					*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
					/1000000000;
				do3 += 
					qty3
					*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
					*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
					*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
					/1000000000;
				
				var totQtyPerLine = 0;
				totQtyPerLine = 
					qty1
					+ qty2
					+ qty3;
    			
				var totAmountPerLine = 0;
    			totAmountPerLine = 
    				(qty1
    				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
    				+ (qty2
    				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
    				+ (qty3
    	    		* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
    			
    			tblOrder.rows[idxRow].cells[5].children[0].value =
    				formatTextValue(totQtyPerLine);
    			tblOrder.rows[idxRow].cells[6].children[0].value =
    				formatTextValue(totAmountPerLine);
    			
    			totQty += totQtyPerLine;
    			totAmount += totAmountPerLine;

    			totAmount1 += 
    				(qty1
    				*parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
    			totAmount2 += 
    				(qty2
    				*parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
    			totAmount3 += 
    				(qty3
    				*parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
        		
    		}
			
    	}
    }
    else if(jumlahOrder === "4"){
    	
    	unitPrice2.style.display = "table-cell";
    	unitPrice3.style.display = "table-cell";
    	unitPrice4.style.display = "table-cell";
    	unitPrice5.style.display = "none";
    	amount2.style.display = "table-cell";
    	amount3.style.display = "table-cell";
    	amount4.style.display = "table-cell";
    	amount5.style.display = "none";
    	
    	for(var i=0; i<order2Length; i++){
    		order2[i].style.display = "table-cell";
    		
    	}
    	for(var i=0; i<order3Length; i++){
    		order3[i].style.display = "table-cell";
    		
    	}
    	for(var i=0; i<order4Length; i++){
    		order4[i].style.display = "table-cell";
    		
    	}
    	for(var i=0; i<order5Length; i++){
    		order5[i].style.display = "none";
    		
    	}
    	
    	for(var idxRow = 1; idxRow<=productQty; idxRow++){
    		tblOrder.rows[idxRow].cells[1].style.display = "table-cell";
    		tblOrder.rows[idxRow].cells[2].style.display = "table-cell";
    		tblOrder.rows[idxRow].cells[3].style.display = "table-cell";
    		tblOrder.rows[idxRow].cells[4].style.display = "none";
			
			if((idxRow !== 0)&&!cmob.checked){

				var qty1 =
					unformatText(tblOrder.rows[idxRow].cells[0].children[0].value);
				var qty2 =
					unformatText(tblOrder.rows[idxRow].cells[1].children[0].value);
				var qty3 =
					unformatText(tblOrder.rows[idxRow].cells[2].children[0].value);
				var qty4 =
					unformatText(tblOrder.rows[idxRow].cells[3].children[0].value);
				
				do1 += 
					qty1
					*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
					*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
					*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
					/1000000000;
				do2 += 
					qty2
					*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
					*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
					*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
					/1000000000;
				do3 += 
					qty3
					*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
					*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
					*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
					/1000000000;
				do4 += 
					qty4
					*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
					*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
					*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
					/1000000000;
				
				var totQtyPerLine = 0;
				totQtyPerLine = 
					qty1
					+ qty2
					+ qty3
					+ qty4;
    			
				var totAmountPerLine = 0;
    			totAmountPerLine = 
    				(qty1
    				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
    				+ (qty2
	   				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
	   				+ (qty3
	   				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
	   				+ (qty4
	   	    		* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
    			
    			tblOrder.rows[idxRow].cells[5].children[0].value =
    				formatTextValue(totQtyPerLine);
    			tblOrder.rows[idxRow].cells[6].children[0].value =
    				formatTextValue(totAmountPerLine);
    			
    			totQty += totQtyPerLine;
    			totAmount += totAmountPerLine;

    			totAmount1 += 
    				(qty1
    					*parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
    			totAmount2 += 
    				(qty2
    					*parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
    			totAmount3 += 
    				(qty3
    					*parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
    			totAmount4 += 
    				(qty4
    					*parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
        		
    		}
			
    	}
    }
    else if(jumlahOrder === "5"){
    	
    	unitPrice2.style.display = "table-cell";
    	unitPrice3.style.display = "table-cell";
    	unitPrice4.style.display = "table-cell";
    	unitPrice5.style.display = "table-cell";
    	amount2.style.display = "table-cell";
    	amount3.style.display = "table-cell";
    	amount4.style.display = "table-cell";
    	amount5.style.display = "table-cell";
    	
    	for(var i=0; i<order2Length; i++){
    		order2[i].style.display = "table-cell";
    		
    	}
    	for(var i=0; i<order3Length; i++){
    		order3[i].style.display = "table-cell";
    		
    	}
    	for(var i=0; i<order4Length; i++){
    		order4[i].style.display = "table-cell";
    		
    	}
    	for(var i=0; i<order5Length; i++){
    		order5[i].style.display = "table-cell";
    		
    	}
    	
    	for(var idxRow = 1; idxRow<=productQty; idxRow++){
    		tblOrder.rows[idxRow].cells[1].style.display = "table-cell";
    		tblOrder.rows[idxRow].cells[2].style.display = "table-cell";
    		tblOrder.rows[idxRow].cells[3].style.display = "table-cell";
    		tblOrder.rows[idxRow].cells[4].style.display = "table-cell";
   			
    		if((idxRow !== 0)&&!cmob.checked){

				var qty1 =
					unformatText(tblOrder.rows[idxRow].cells[0].children[0].value);
				var qty2 =
					unformatText(tblOrder.rows[idxRow].cells[1].children[0].value);
				var qty3 =
					unformatText(tblOrder.rows[idxRow].cells[2].children[0].value);
				var qty4 =
					unformatText(tblOrder.rows[idxRow].cells[3].children[0].value);
				var qty5 =
					unformatText(tblOrder.rows[idxRow].cells[4].children[0].value);

    			do1 += 
    				qty1
    				*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
    				*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
    				*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
    				/1000000000;
    			do2 += 
    				qty2
    				*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
    				*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
    				*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
    				/1000000000;
    			do3 += 
    				qty3
    				*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
    				*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
    				*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
    				/1000000000;
    			do4 += 
    				qty4
    				*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
    				*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
    				*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
    				/1000000000;
    			do5 += 
    				qty5
    				*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
    				*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
    				*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
    				/1000000000;
    			
				var totQtyPerLine = 0;
				totQtyPerLine = 
					qty1
					+ qty2
					+ qty3
					+ qty4
					+ qty5;
    			
				var totAmountPerLine = 0;
    			totAmountPerLine = 
    				(qty1
    				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
    				+ (qty2
    				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
    				+ (qty3
	   				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
	   				+ (qty4
	   				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
	   				+ (qty5
	   	    		* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
    			
    			tblOrder.rows[idxRow].cells[5].children[0].value =
    				formatTextValue(totQtyPerLine);
    			tblOrder.rows[idxRow].cells[6].children[0].value =
    				formatTextValue(totAmountPerLine);
    			
    			totQty += totQtyPerLine;
    			totAmount += totAmountPerLine;

        		totAmount1 += 
        			(qty1
        			*parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
        		totAmount2 += 
        			(qty2
        			*parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
        		totAmount3 += 
        			(qty3
        			*parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
        		totAmount4 += 
        			(qty4
        			*parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
        		totAmount5 += 
        			(qty5
        			*parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
        		
    		}
    		
    	}
    }

    if(cmob.checked){
    	generateCMOB();
    }
    else{
    	
    	if(jumlahOrder>0){
    		
    		dimensiOrder1.value = do1;
    		dimensiOrder1Text.value = formatTextValue(do1);
    		var sd1 = 0;
    		sd1 =  parseFloat(dimensiMobil1.value - do1);
    		selisihDimensi1.value = sd1;
    		selisihDimensi1Text.value = formatTextValue(sd1);
    		if(sd1<0){
    			selisihDimensi1Text.style.backgroundColor = "yellow";
    			//alert("Dimensi Mobil pada Order 1 Tidak Mencukupi. Mohon Periksa Kembali");
    		}
    		else{
    			selisihDimensi1Text.style.backgroundColor = "#D3D3D3";
    		}
    		
    		var sl1 = 0;
        	sl1 = sisaLimitInit - totAmount1;
        	sisaLimit1.value = formatTextValue(sl1);
        	if(sl1<0){
        		sisaLimit1.style.backgroundColor = "yellow";
        		alert("Sisa Limit pada Order 1 Tidak Mencukupi. Mohon Periksa Kembali");
        	}
        	else{
        		sisaLimit1.style.backgroundColor = "#D3D3D3";
        	}
    		
    		if(jumlahOrder>1){

        		dimensiOrder2.value = do2;
        		dimensiOrder2Text.value = formatTextValue(do2);
    			var sd1 = 0;
    			sd2 =  parseFloat(dimensiMobil2.value - do2);
    			selisihDimensi2.value = sd2;
        		selisihDimensi2Text.value = formatTextValue(sd2);
        		if(sd2<0){
        			selisihDimensi2Text.style.backgroundColor = "yellow";
        			//alert("Dimensi Mobil pada Order 2 Tidak Mencukupi. Mohon Periksa Kembali");
        		}
        		else{
        			selisihDimensi2Text.style.backgroundColor = "#D3D3D3";
        		}

        		var sl2 = 0;
            	sl2 = sl1 - totAmount2;
            	sisaLimit2.value = formatTextValue(sl2);
            	if(sl2<0){
            		sisaLimit2.style.backgroundColor = "yellow";
            		alert("Sisa Limit pada Order 2 Tidak Mencukupi. Mohon Periksa Kembali");
            	}
            	else{
            		sisaLimit2.style.backgroundColor = "#D3D3D3";
            	}
    			
    			if(jumlahOrder>2){

    	    		dimensiOrder3.value = do3;
    	    		dimensiOrder3Text.value = formatTextValue(do3);
    				var sd3 = 0;
    				sd3 =  parseFloat(dimensiMobil3.value - do3);
    				selisihDimensi3.value = sd3;
    	    		selisihDimensi3Text.value = formatTextValue(sd3);
    	    		if(sd3<0){
    	    			selisihDimensi3Text.style.backgroundColor = "yellow";
    	    			//alert("Dimensi Mobil pada Order 3 Tidak Mencukupi. Mohon Periksa Kembali");
    	    		}
    	    		else{
    	    			selisihDimensi3Text.style.backgroundColor = "#D3D3D3";
    	    		}

            		var sl3 = 0;
                	sl3 = sl2 - totAmount3;
                	sisaLimit3.value = formatTextValue(sl3);
                	if(sl3<0){
                		sisaLimit3.style.backgroundColor = "yellow";
                		alert("Sisa Limit pada Order 3 Tidak Mencukupi. Mohon Periksa Kembali");
                	}
                	else{
                		sisaLimit3.style.backgroundColor = "#D3D3D3";
                	}
    				
    				if(jumlahOrder>3){

    		    		dimensiOrder4.value = do4;
    		    		dimensiOrder4Text.value = formatTextValue(do4);
    					var sd4 = 0;
    					sd4 =  parseFloat(dimensiMobil4.value - do4);
    					selisihDimensi4.value = sd4;
    		    		selisihDimensi4Text.value = formatTextValue(sd4);
    		    		if(sd4<0){
    		    			selisihDimensi4Text.style.backgroundColor = "yellow";
    		    			//alert("Dimensi Mobil pada Order 4 Tidak Mencukupi. Mohon Periksa Kembali");
    		    		}
    		    		else{
    		    			selisihDimensi4Text.style.backgroundColor = "#D3D3D3";
    		    		}

    	        		var sl4 = 0;
    	            	sl4 = sl3 - totAmount4;
    	            	sisaLimit4.value = formatTextValue(sl4);
    	            	if(sl4<0){
    	            		sisaLimit4.style.backgroundColor = "yellow";
    	            		alert("Sisa Limit pada Order 4 Tidak Mencukupi. Mohon Periksa Kembali");
    	            	}
    	            	else{
    	            		sisaLimit4.style.backgroundColor = "#D3D3D3";
    	            	}
    					
    					if(jumlahOrder>4){

    			    		dimensiOrder5.value = do5;
    			    		dimensiOrder5Text.value = formatTextValue(do5);
    						var sd5 = 0;
    						sd5 =  parseFloat(dimensiMobil5.value - do5);
    						selisihDimensi5.value = sd5;
    		        		selisihDimensi5Text.value = formatTextValue(sd5);
    		        		if(sd5<0){
    		        			selisihDimensi5Text.style.backgroundColor = "yellow";
    		        			//alert("Dimensi Mobil pada Order 5 Tidak Mencukupi. Mohon Periksa Kembali");
    		        		}
    		        		else{
    		        			selisihDimensi5Text.style.backgroundColor = "#D3D3D3";
    		        		}

    		        		var sl5 = 0;
    		            	sl5 = sl4 - totAmount5;
    		            	sisaLimit5.value = formatTextValue(sl5);
    		            	if(sl5<0){
    		            		sisaLimit5.style.backgroundColor = "yellow";
    		            		alert("Sisa Limit pada Order 5 Tidak Mencukupi. Mohon Periksa Kembali");
    		            	}
    		            	else{
    		            		sisaLimit5.style.backgroundColor = "#D3D3D3";
    		            	}
    						
    					}
    				}
    			}
    		}
    	}
    	
    	totalAmount1.value = totAmount1;
    	totalAmount2.value = totAmount2;
    	totalAmount3.value = totAmount3;
    	totalAmount4.value = totAmount4;
    	totalAmount5.value = totAmount5;
    	totalAmount1Text.value = formatTextValue(totAmount1);
    	totalAmount2Text.value = formatTextValue(totAmount2);
    	totalAmount3Text.value = formatTextValue(totAmount3);
    	totalAmount4Text.value = formatTextValue(totAmount4);
    	totalAmount5Text.value = formatTextValue(totAmount5);
    	qtyTotal.value = formatTextValue(totQty);
    	amtTotal.value = formatTextValue(totAmount);
    	
    	var sl = 0;
    	sl = sisaLimitInit - totAmount;
    	sisaLimit.value = sl;
    	sisaLimitText.value = formatTextValue(sl);
    	if(sl<0){
    		sisaLimitText.style.backgroundColor = "yellow";
    		//alert("Sisa Limit Tidak Mencukupi. Mohon Periksa Kembali");
    	}
    	else{
    		sisaLimitText.style.backgroundColor = "#D3D3D3";
    	}
	}
}