window.onload = function(){
	
	
	var orderBySelected = document.getElementById("orderBySelected").value;
	var manual = document.getElementById("manual");
	var cmob = document.getElementById("cmob");
	
	var orderType = document.getElementById("orderType");
	changeOrderType(orderType);
	
	
	if(orderBySelected=="CMOB"){
		cmob.checked = "checked";
	}
	else if(orderBySelected="Manual"){
		manual.checked = "checked";
	}
	
	changeJumlahOrder(jumlahOrder);	
}

function changeUom(obj){
	var uom = obj.value;
	var idxRowCurrent = parseFloat(obj.parentNode.parentNode.rowIndex);
	var uomSelected = document.getElementById("uomSelected");
	uomSelected.value = uom;
	var jumlahOrder = document.getElementById("jumlahOrder");
	var tblOrder = document.getElementById("tblOrder");
	var untPrice = tblOrder.rows[idxRowCurrent].cells[9].children[0];
	var untPriceInit = tblOrder.rows[idxRowCurrent].cells[10].children[0].value;
	var up = 0;
	up = parseFloat(uom)*parseFloat(untPriceInit);
	untPrice.value = up;
	changeJumlahOrder(jumlahOrder);	
}

function calcAmount1(obj){
	var dtl1 = obj.value;
	var idxRowCurrent = parseFloat(obj.parentNode.parentNode.rowIndex);
	var jumlahOrder = document.getElementById("jumlahOrder").value;
	var tblOrder = document.getElementById("tblOrder");
	var totalAmount1 = document.getElementById("totalAmount1");
	var productQty = 
		parseFloat(document.getElementById("productQty").value) + 2;
	var untPrice = tblOrder.rows[idxRowCurrent].cells[9].children[0].value;
	var up1 = document.getElementById("up1");
	var amt1 = document.getElementById("amt1");
	var amtTotal = document.getElementById("amtTotal");
	var dimensiMobil1 = document.getElementById("dimensiMobil1");
	var dimensiOrder1 = document.getElementById("dimensiOrder1");
	var selisihDimensi1 = document.getElementById("selisihDimensi1");
    var sisaLimit = document.getElementById("sisaLimit");
    var sisaLimitInit = document.getElementById("sisaLimitInit").value;
    
	up1.value = untPrice;
	amt1.value = untPrice*dtl1;
	var totAmount1 = 0;
	var totAmount = 0;
	var dimensiOrder = 0;
	
	for(var idxRow = 3, productQty;; idxRow++){	
		
		dimensiOrder += 
			tblOrder.rows[idxRow].cells[3].children[0].value
			*parseFloat(tblOrder.rows[idxRow].cells[11].children[0].value)
			*parseFloat(tblOrder.rows[idxRow].cells[11].children[1].value)
			*parseFloat(tblOrder.rows[idxRow].cells[11].children[2].value)
			/1000000;
		
		var amountCurrentLine = 0;
		amountCurrentLine = 
			parseFloat(tblOrder.rows[idxRow].cells[3].children[0].value)
			*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value);
		totAmount1 += amountCurrentLine;	
		
		if(jumlahOrder === "1"){
			if(idxRow === idxRowCurrent){
				tblOrder.rows[idxRow].cells[8].children[0].value =
					amountCurrentLine;
			}
			totAmount += amountCurrentLine;
		}
		else if(jumlahOrder === "2"){
			var totAmountPerLine = 0;
			totAmountPerLine = 
				amountCurrentLine
				+ (parseFloat(tblOrder.rows[idxRow].cells[4].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value));
			
			if(idxRow === idxRowCurrent){
				tblOrder.rows[idxRow].cells[8].children[0].value =
					totAmountPerLine;	
			}
			totAmount += totAmountPerLine; 
		}
		else if(jumlahOrder === "3"){
			var totAmountPerLine = 0;
			totAmountPerLine = 
				amountCurrentLine
				+ (parseFloat(tblOrder.rows[idxRow].cells[4].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)) 
				+ (parseFloat(tblOrder.rows[idxRow].cells[5].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value));
			
			if(idxRow === idxRowCurrent){
				tblOrder.rows[idxRow].cells[8].children[0].value =
					totAmountPerLine;
			}
			totAmount += totAmountPerLine;
		}
		else if(jumlahOrder === "4"){
			var totAmountPerLine = 0;
			totAmountPerLine = 
				amountCurrentLine
				+ (parseFloat(tblOrder.rows[idxRow].cells[4].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)) 
				+ (parseFloat(tblOrder.rows[idxRow].cells[5].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value))
				+ (parseFloat(tblOrder.rows[idxRow].cells[6].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value));
			
			if(idxRow === idxRowCurrent){
				tblOrder.rows[idxRow].cells[8].children[0].value =
					totAmountPerLine;	
			}
			totAmount += totAmountPerLine;
		}
		else if(jumlahOrder === "5"){
			var totAmountPerLine = 0;
			totAmountPerLine = 
				amountCurrentLine
				+ (parseFloat(tblOrder.rows[idxRow].cells[4].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)) 
				+ (parseFloat(tblOrder.rows[idxRow].cells[5].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value))
				+ (parseFloat(tblOrder.rows[idxRow].cells[6].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value))
				+ (parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value));
			if(idxRow === idxRowCurrent){
				tblOrder.rows[idxRow].cells[8].children[0].value =
					totAmountPerLine;	
			}
			totAmount += totAmountPerLine;
		}
		
		if(idxRow===productQty){
			break;
		}
	}

	dimensiOrder1.value = parseInt(dimensiOrder);
	selisihDimensi1.value = parseInt(dimensiMobil1.value - dimensiOrder);
	totalAmount1.value = totAmount1;
	amtTotal.value = totAmount;
	sisaLimit.value = sisaLimitInit - totAmount;
	return;
}

function calcAmount2(obj){
	var dtl2 = obj.value;
	var idxRowCurrent = parseFloat(obj.parentNode.parentNode.rowIndex);
	var jumlahOrder = document.getElementById("jumlahOrder").value;
	var tblOrder = document.getElementById("tblOrder");
	var totalAmount2 = document.getElementById("totalAmount2");
	var productQty = 
		parseFloat(document.getElementById("productQty").value) + 2;
	var untPrice = tblOrder.rows[idxRowCurrent].cells[9].children[0].value;
	var up2 = document.getElementById("up2");
	var amt2 = document.getElementById("amt2");
	var amtTotal = document.getElementById("amtTotal");
	var dimensiMobil2 = document.getElementById("dimensiMobil2");
	var dimensiOrder2 = document.getElementById("dimensiOrder2");
	var selisihDimensi2 = document.getElementById("selisihDimensi2");
    var sisaLimit = document.getElementById("sisaLimit");
    var sisaLimitInit = document.getElementById("sisaLimitInit").value;
    
	up2.value = untPrice;
	amt2.value = untPrice*dtl2;
	var totAmount2 = 0;
	var totAmount = 0;
	var dimensiOrder = 0;
	
	for(var idxRow = 3, productQty;; idxRow++){	
		
		dimensiOrder += 
			tblOrder.rows[idxRow].cells[4].children[0].value
			*parseFloat(tblOrder.rows[idxRow].cells[11].children[0].value)
			*parseFloat(tblOrder.rows[idxRow].cells[11].children[1].value)
			*parseFloat(tblOrder.rows[idxRow].cells[11].children[2].value)
			/1000000;
		
		var amountCurrentLine = 0;
		amountCurrentLine = 
			parseFloat(tblOrder.rows[idxRow].cells[4].children[0].value)
			*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value);
		totAmount2 += amountCurrentLine;
		
		if(jumlahOrder === "2"){
			var totAmountPerLine = 0;
			totAmountPerLine = 
				amountCurrentLine
				+ (parseFloat(tblOrder.rows[idxRow].cells[3].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value));
			
			if(idxRow === idxRowCurrent){
				tblOrder.rows[idxRow].cells[8].children[0].value =
					totAmountPerLine;	
			}
			totAmount += totAmountPerLine; 
		}
		else if(jumlahOrder === "3"){
			var totAmountPerLine = 0;
			totAmountPerLine = 
				amountCurrentLine
				+ (parseFloat(tblOrder.rows[idxRow].cells[3].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)) 
				+ (parseFloat(tblOrder.rows[idxRow].cells[5].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value));
			
			if(idxRow === idxRowCurrent){
				tblOrder.rows[idxRow].cells[8].children[0].value =
					totAmountPerLine;
			}
			totAmount += totAmountPerLine;
		}
		else if(jumlahOrder === "4"){
			var totAmountPerLine = 0;
			totAmountPerLine = 
				amountCurrentLine
				+ (parseFloat(tblOrder.rows[idxRow].cells[3].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)) 
				+ (parseFloat(tblOrder.rows[idxRow].cells[5].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value))
				+ (parseFloat(tblOrder.rows[idxRow].cells[6].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value));
			
			if(idxRow === idxRowCurrent){
				tblOrder.rows[idxRow].cells[8].children[0].value =
					totAmountPerLine;	
			}
			totAmount += totAmountPerLine;
		}
		else if(jumlahOrder === "5"){
			var totAmountPerLine = 0;
			totAmountPerLine = 
				amountCurrentLine
				+ (parseFloat(tblOrder.rows[idxRow].cells[3].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)) 
				+ (parseFloat(tblOrder.rows[idxRow].cells[5].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value))
				+ (parseFloat(tblOrder.rows[idxRow].cells[6].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value))
				+ (parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value));
			if(idxRow === idxRowCurrent){
				tblOrder.rows[idxRow].cells[8].children[0].value =
					totAmountPerLine;	
			}
			totAmount += totAmountPerLine;
		}
		
		if(idxRow===productQty){
			break;
		}
	}

	dimensiOrder2.value = parseInt(dimensiOrder);
	selisihDimensi2.value = parseInt(dimensiMobil2.value - dimensiOrder);
	totalAmount2.value = totAmount2;
	amtTotal.value = totAmount;
	sisaLimit.value = sisaLimitInit - totAmount;
	return;
}

function calcAmount3(obj){
	var dtl3 = obj.value;
	var idxRowCurrent = parseFloat(obj.parentNode.parentNode.rowIndex);
	var jumlahOrder = document.getElementById("jumlahOrder").value;
	var tblOrder = document.getElementById("tblOrder");
	var totalAmount3 = document.getElementById("totalAmount3");
	var productQty = 
		parseFloat(document.getElementById("productQty").value) + 2;
	var untPrice = tblOrder.rows[idxRowCurrent].cells[9].children[0].value;
	var up3 = document.getElementById("up3");
	var amt3 = document.getElementById("amt3");
	var amtTotal = document.getElementById("amtTotal");
	var dimensiMobil3 = document.getElementById("dimensiMobil3");
	var dimensiOrder3 = document.getElementById("dimensiOrder3");
	var selisihDimensi3 = document.getElementById("selisihDimensi3");
    var sisaLimit = document.getElementById("sisaLimit");
    var sisaLimitInit = document.getElementById("sisaLimitInit").value;
    
	up3.value = untPrice;
	amt3.value = untPrice*dtl3;
	var totAmount3 = 0;
	var totAmount = 0;
	var dimensiOrder = 0;
	
	for(var idxRow = 3, productQty;; idxRow++){	
		
		dimensiOrder += 
			tblOrder.rows[idxRow].cells[5].children[0].value
			*parseFloat(tblOrder.rows[idxRow].cells[11].children[0].value)
			*parseFloat(tblOrder.rows[idxRow].cells[11].children[1].value)
			*parseFloat(tblOrder.rows[idxRow].cells[11].children[2].value)
			/1000000;
		
		amountCurrentLine = 
			parseFloat(tblOrder.rows[idxRow].cells[5].children[0].value)
			*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value);
		totAmount3 += amountCurrentLine;
		
		if(jumlahOrder === "3"){
			var totAmountPerLine = 0;
			totAmountPerLine = 
				amountCurrentLine
				+ (parseFloat(tblOrder.rows[idxRow].cells[3].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)) 
				+ (parseFloat(tblOrder.rows[idxRow].cells[4].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value));
			
			if(idxRow === idxRowCurrent){
				tblOrder.rows[idxRow].cells[8].children[0].value =
					totAmountPerLine;
			}
			totAmount += totAmountPerLine;
		}
		else if(jumlahOrder === "4"){
			var totAmountPerLine = 0;
			totAmountPerLine = 
				amountCurrentLine
				+ (parseFloat(tblOrder.rows[idxRow].cells[3].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)) 
				+ (parseFloat(tblOrder.rows[idxRow].cells[4].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value))
				+ (parseFloat(tblOrder.rows[idxRow].cells[6].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value));
			
			if(idxRow === idxRowCurrent){
				tblOrder.rows[idxRow].cells[8].children[0].value =
					totAmountPerLine;	
			}
			totAmount += totAmountPerLine;
		}
		else if(jumlahOrder === "5"){
			var totAmountPerLine = 0;
			totAmountPerLine = 
				amountCurrentLine
				+ (parseFloat(tblOrder.rows[idxRow].cells[3].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)) 
				+ (parseFloat(tblOrder.rows[idxRow].cells[4].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value))
				+ (parseFloat(tblOrder.rows[idxRow].cells[6].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value))
				+ (parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value));
			if(idxRow === idxRowCurrent){
				tblOrder.rows[idxRow].cells[8].children[0].value =
					totAmountPerLine;	
			}
			totAmount += totAmountPerLine;
		}
		
		if(idxRow===productQty){
			break;
		}
	}

	dimensiOrder3.value = parseInt(dimensiOrder);
	selisihDimensi3.value = parseInt(dimensiMobil3.value - dimensiOrder);
	totalAmount3.value = totAmount3;
	amtTotal.value = totAmount;
	sisaLimit.value = sisaLimitInit - totAmount;
	return;
}

function calcAmount4(obj){
	var dtl4 = obj.value;
	var idxRowCurrent = parseFloat(obj.parentNode.parentNode.rowIndex);
	var jumlahOrder = document.getElementById("jumlahOrder").value;
	var tblOrder = document.getElementById("tblOrder");
	var totalAmount4 = document.getElementById("totalAmount4");
	var productQty = 
		parseFloat(document.getElementById("productQty").value) + 2;
	var untPrice = tblOrder.rows[idxRowCurrent].cells[9].children[0].value;
	var up4 = document.getElementById("up4");
	var amt4 = document.getElementById("amt4");
	var amtTotal = document.getElementById("amtTotal");
	var dimensiMobil4 = document.getElementById("dimensiMobil4");
	var dimensiOrder4 = document.getElementById("dimensiOrder4");
	var selisihDimensi4 = document.getElementById("selisihDimensi4");
    var sisaLimit = document.getElementById("sisaLimit");
    var sisaLimitInit = document.getElementById("sisaLimitInit").value;
    
	up4.value = untPrice;
	amt4.value = untPrice*dtl4;
	var totAmount4 = 0;
	var totAmount = 0;
	var dimensiOrder = 0;
	
	for(var idxRow = 3, productQty;; idxRow++){	
		
		dimensiOrder += 
			tblOrder.rows[idxRow].cells[6].children[0].value
			*parseFloat(tblOrder.rows[idxRow].cells[11].children[0].value)
			*parseFloat(tblOrder.rows[idxRow].cells[11].children[1].value)
			*parseFloat(tblOrder.rows[idxRow].cells[11].children[2].value)
			/1000000;
		
		var amountCurrentLine = 0;
		amountCurrentLine = 
			parseFloat(tblOrder.rows[idxRow].cells[6].children[0].value)
			*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value);
		totAmount4 += amountCurrentLine;
		
		if(jumlahOrder === "4"){
			var totAmountPerLine = 0;
			totAmountPerLine = 
				amountCurrentLine
				+ (parseFloat(tblOrder.rows[idxRow].cells[3].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)) 
				+ (parseFloat(tblOrder.rows[idxRow].cells[4].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value))
				+ (parseFloat(tblOrder.rows[idxRow].cells[5].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value));
			
			if(idxRow === idxRowCurrent){
				tblOrder.rows[idxRow].cells[8].children[0].value =
					totAmountPerLine;	
			}
			totAmount += totAmountPerLine;
		}
		else if(jumlahOrder === "5"){
			var totAmountPerLine = 0;
			totAmountPerLine = 
				amountCurrentLine
				+ (parseFloat(tblOrder.rows[idxRow].cells[3].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)) 
				+ (parseFloat(tblOrder.rows[idxRow].cells[4].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value))
				+ (parseFloat(tblOrder.rows[idxRow].cells[5].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value))
				+ (parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value));
			if(idxRow === idxRowCurrent){
				tblOrder.rows[idxRow].cells[8].children[0].value =
					totAmountPerLine;	
			}
			totAmount += totAmountPerLine;
		}
		
		if(idxRow===productQty){
			break;
		}
	}

	dimensiOrder4.value = parseInt(dimensiOrder);
	selisihDimensi4.value = parseInt(dimensiMobil4.value - dimensiOrder);
	totalAmount4.value = totAmount4;
	amtTotal.value = totAmount;
	sisaLimit.value = sisaLimitInit - totAmount;
	return;
}

function calcAmount5(obj){
	var dtl5 = obj.value;
	var idxRowCurrent = parseFloat(obj.parentNode.parentNode.rowIndex);
	var jumlahOrder = document.getElementById("jumlahOrder").value;
	var tblOrder = document.getElementById("tblOrder");
	var totalAmount5 = document.getElementById("totalAmount5");
	var productQty = 
		parseFloat(document.getElementById("productQty").value) + 2;
	var untPrice = tblOrder.rows[idxRowCurrent].cells[9].children[0].value;
	var up5 = document.getElementById("up5");
	var amt5 = document.getElementById("amt5");
	var amtTotal = document.getElementById("amtTotal");
	var dimensiMobil5 = document.getElementById("dimensiMobil5");
	var dimensiOrder5 = document.getElementById("dimensiOrder5");
	var selisihDimensi5 = document.getElementById("selisihDimensi5");
    var sisaLimit = document.getElementById("sisaLimit");
    var sisaLimitInit = document.getElementById("sisaLimitInit").value;
    
	up5.value = untPrice;
	amt5.value = untPrice*dtl5;
	var totAmount5 = 0;
	var totAmount = 0;
	var dimensiOrder = 0;
	
	for(var idxRow = 3, productQty;; idxRow++){	
		
		dimensiOrder += 
			tblOrder.rows[idxRow].cells[7].children[0].value
			*parseFloat(tblOrder.rows[idxRow].cells[11].children[0].value)
			*parseFloat(tblOrder.rows[idxRow].cells[11].children[1].value)
			*parseFloat(tblOrder.rows[idxRow].cells[11].children[2].value)
			/1000000;
		
		var amountCurrentLine = 0;
		amountCurrentLine = 
			parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value)
			*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value);
		totAmount5 += amountCurrentLine;
		
		var totAmountPerLine = 0;
		totAmountPerLine = 
			amountCurrentLine
			+ (parseFloat(tblOrder.rows[idxRow].cells[3].children[0].value)
			* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)) 
			+ (parseFloat(tblOrder.rows[idxRow].cells[4].children[0].value)
			* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value))
			+ (parseFloat(tblOrder.rows[idxRow].cells[5].children[0].value)
			* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value))
			+ (parseFloat(tblOrder.rows[idxRow].cells[6].children[0].value)
			* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value));
		if(idxRow === idxRowCurrent){
			tblOrder.rows[idxRow].cells[8].children[0].value =
				totAmountPerLine;	
		}
		totAmount += totAmountPerLine;
		
		if(idxRow===productQty){
			break;
		}
	}

	dimensiOrder5.value = parseInt(dimensiOrder);
	selisihDimensi5.value = parseInt(dimensiMobil5.value - dimensiOrder);
	totalAmount5.value = totAmount5;
	amtTotal.value = totAmount;
	sisaLimit.value = sisaLimitInit - totAmount;
	return;
}

function generateCMOB(){
	var jumlahOrder = document.getElementById("jumlahOrder").value;
	var orderBySelected = document.getElementById("orderBySelected");
	orderBySelected.value = "CMOB";
	var tblOrder = document.getElementById("tblOrder");
	var productQty = 
		parseFloat(document.getElementById("productQty").value) + 2;
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
	
	var cmobInitial = 5;
	var cmobMultiplier = 0;
	
	for(var idxRow = 3, productQty;; idxRow++){
		
		cmobMultiplier += 1;
		var qty = (cmobInitial * cmobMultiplier) / jumlahOrder;
		
		if(jumlahOrder === "1"){
			tblOrder.rows[idxRow].cells[3].children[0].value = qty;
			tblOrder.rows[idxRow].cells[4].children[0].value = 0;
			tblOrder.rows[idxRow].cells[5].children[0].value = 0;
			tblOrder.rows[idxRow].cells[6].children[0].value = 0;
			tblOrder.rows[idxRow].cells[7].children[0].value = 0;
			
			var totAmountPerLine = 0;
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
		
		if(idxRow===productQty){
			break;
		}
	}
	
	totalAmount1.value = totAmount1;
	totalAmount2.value = totAmount2;
	totalAmount3.value = totAmount3;
	totalAmount4.value = totAmount4;
	totalAmount5.value = totAmount5;
	amtTotal.value = totAmount;
	sisaLimit.value = sisaLimitInit - totAmount;
}

function resetOrder(){
	
	var jumlahOrder = document.getElementById("jumlahOrder").value;
	var orderBySelected = document.getElementById("orderBySelected");
	orderBySelected.value = "Manual";
	var tblOrder = document.getElementById("tblOrder");
	var productQty = 
		parseFloat(document.getElementById("productQty").value) + 2;
	var totalAmount1 = document.getElementById("totalAmount1");
	var totalAmount2 = document.getElementById("totalAmount2");
	var totalAmount3 = document.getElementById("totalAmount3");
	var totalAmount4 = document.getElementById("totalAmount4");
	var totalAmount5 = document.getElementById("totalAmount5");
	var sisaLimit = document.getElementById("sisaLimit");
	var sisaLimitInit = document.getElementById("sisaLimitInit").value;
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
	var selisihDimensi1 = document.getElementById("selisihDimensi1");
	var selisihDimensi2 = document.getElementById("selisihDimensi2");
	var selisihDimensi3 = document.getElementById("selisihDimensi3");
	var selisihDimensi4 = document.getElementById("selisihDimensi4");
	var selisihDimensi5 = document.getElementById("selisihDimensi5");
	
	sisaLimit.value = sisaLimitInit;
	totalAmount1.value = 0;
	totalAmount2.value = 0;
	totalAmount3.value = 0;
	totalAmount4.value = 0;
	totalAmount5.value = 0;
	amtTotal.value = 0;
	dimensiOrder1.value = 0;
	dimensiOrder2.value = 0;
	dimensiOrder3.value = 0;
	dimensiOrder4.value = 0;
	dimensiOrder5.value = 0;
	selisihDimensi1.value = dimensiMobil1;
	selisihDimensi2.value = dimensiMobil2;
	selisihDimensi3.value = dimensiMobil3;
	selisihDimensi4.value = dimensiMobil4;
	selisihDimensi5.value = dimensiMobil5;
	
	for(var idxRow = 3, productQty;; idxRow++){
		
		tblOrder.rows[idxRow].cells[3].children[0].value = 0;
		tblOrder.rows[idxRow].cells[4].children[0].value = 0;
		tblOrder.rows[idxRow].cells[5].children[0].value = 0;
		tblOrder.rows[idxRow].cells[6].children[0].value = 0;
		tblOrder.rows[idxRow].cells[7].children[0].value = 0;
		tblOrder.rows[idxRow].cells[8].children[0].value = 0;
		
		if(idxRow===productQty){
			break;
		}
	}
	
}

function changeMobil1(obj){
	
	var selectBox = obj;
	var dimensiMobil = obj.value;
	var jenisMobil = selectBox.options[selectBox.selectedIndex].text;
    var jenisMobilSelected = document.getElementById("mobil1Selected");
    jenisMobilSelected.value = jenisMobil;
    var dimensiMobil1 = document.getElementById("dimensiMobil1");
	var selisihDimensi = document.getElementById("selisihDimensi1");
    dimensiMobil1.value = obj.value;
	var dimensiOrder = document.getElementById("dimensiOrder1").value;
	var sd = 0;
	sd = parseFloat(dimensiMobil) - parseFloat(dimensiOrder);
	selisihDimensi.value = sd;
}

function changeMobil2(obj){
	
	var selectBox = obj;
	var dimensiMobil = obj.value;
	var jenisMobil = selectBox.options[selectBox.selectedIndex].text;
    var jenisMobilSelected = document.getElementById("mobil2Selected");
    jenisMobilSelected.value = jenisMobil;
    var dimensiMobil2 = document.getElementById("dimensiMobil2");
	var selisihDimensi = document.getElementById("selisihDimensi2");
    dimensiMobil2.value = obj.value;
	var dimensiOrder = document.getElementById("dimensiOrder2").value;
	var sd = 0;
	sd = parseFloat(dimensiMobil) - parseFloat(dimensiOrder);
	selisihDimensi.value = sd;
}

function changeMobil3(obj){
	
	var selectBox = obj;
	var dimensiMobil = obj.value;
	var jenisMobil = selectBox.options[selectBox.selectedIndex].text;
    var jenisMobilSelected = document.getElementById("mobil3Selected");
    jenisMobilSelected.value = jenisMobil;
    var dimensiMobil3 = document.getElementById("dimensiMobil3");
	var selisihDimensi = document.getElementById("selisihDimensi3");
    dimensiMobil3.value = obj.value;
	var dimensiOrder = document.getElementById("dimensiOrder3").value;
	var sd = 0;
	sd = parseFloat(dimensiMobil) - parseFloat(dimensiOrder);
	selisihDimensi.value = sd;
}

function changeMobil4(obj){
	
	var selectBox = obj;
	var dimensiMobil = obj.value;
	var jenisMobil = selectBox.options[selectBox.selectedIndex].text;
    var jenisMobilSelected = document.getElementById("mobil4Selected");
    jenisMobilSelected.value = jenisMobil;
    var dimensiMobil4 = document.getElementById("dimensiMobil4");
	var selisihDimensi = document.getElementById("selisihDimensi4");
    dimensiMobil4.value = obj.value;
	var dimensiOrder = document.getElementById("dimensiOrder4").value;
	var sd = 0;
	sd = parseFloat(dimensiMobil) - parseFloat(dimensiOrder);
	selisihDimensi.value = sd;
}

function changeMobil5(obj){
	
	var selectBox = obj;
	var dimensiMobil = obj.value;
	var jenisMobil = selectBox.options[selectBox.selectedIndex].text;
    var jenisMobilSelected = document.getElementById("mobil5Selected");
    jenisMobilSelected.value = jenisMobil;
    var dimensiMobil5 = document.getElementById("dimensiMobil5");
	var selisihDimensi = document.getElementById("selisihDimensi5");
    dimensiMobil5.value = obj.value;
	var dimensiOrder = document.getElementById("dimensiOrder5").value;
	var sd = 0;
	sd = parseFloat(dimensiMobil) - parseFloat(dimensiOrder);
	selisihDimensi.value = sd;
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
	var productQty = 
		parseFloat(document.getElementById("productQty").value) + 2;
	
	if(orderType === "SO Lokal Food With CO"
			|| orderType === "SO Lokal Non Food With CO"){
		sisaLimit.style.display = "block";
		sisaLimitDP.style.display = "none";
	}
	else{
		sisaLimit.style.display = "none";
		sisaLimitDP.style.display = "block";
	}
	
	for(var idxRow = 3, productQty;; idxRow++){
		
		if(orderType === "SO Lokal Non Food With CO - DP"
			|| orderType === "SO Lokal Non Food With CO"){
			tblOrder.rows[idxRow].style.display = "none";
		}
		else{
			tblOrder.rows[idxRow].style.display = "table-row";
		}
		
		if(idxRow===productQty){
			break;
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
    	parseFloat(document.getElementById("productQty").value) + 2;
    var cmob = document.getElementById("cmob");
    var manual = document.getElementById("manual");
    var orderHeader2 = document.getElementById("orderHeader2");
    var orderHeader3 = document.getElementById("orderHeader3");
    var orderHeader4 = document.getElementById("orderHeader4");
    var orderHeader5 = document.getElementById("orderHeader5");
    var order2 = document.getElementsByClassName("order2");
    var order3 = document.getElementsByClassName("order3");
    var order4 = document.getElementsByClassName("order4");
    var order5 = document.getElementsByClassName("order5");
    var detailHeader2 = document.getElementById("detailHeader2");
    var detailHeader3 = document.getElementById("detailHeader3");
    var detailHeader4 = document.getElementById("detailHeader4");
    var detailHeader5 = document.getElementById("detailHeader5");
    var unitPrice2 = document.getElementById("unitPrice2");
    var unitPrice3 = document.getElementById("unitPrice3");
    var unitPrice4 = document.getElementById("unitPrice4");
    var unitPrice5 = document.getElementById("unitPrice5");
    var amount2 = document.getElementById("amount2");
    var amount3 = document.getElementById("amount3");
    var amount4 = document.getElementById("amount4");
    var amount5 = document.getElementById("amount5");
    var sisaLimit = document.getElementById("sisaLimit");
    var sisaLimitInit = document.getElementById("sisaLimitInit").value;
    var totalAmount1 = document.getElementById("totalAmount1").value;
    var totalAmount2 = document.getElementById("totalAmount2").value;
    var totalAmount3 = document.getElementById("totalAmount3").value;
    var totalAmount4 = document.getElementById("totalAmount4").value;
    var totalAmount5 = document.getElementById("totalAmount5").value;

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

    if(jumlahOrder === "1"){
    	
    	sisaLimit.value = sisaLimitInit 
    		- totalAmount1;
    	
    	orderHeader2.style.display = "none";
    	orderHeader3.style.display = "none";
    	orderHeader4.style.display = "none";
    	orderHeader5.style.display = "none";
    	detailHeader2.style.display = "none";
    	detailHeader3.style.display = "none";
    	detailHeader4.style.display = "none";
    	detailHeader5.style.display = "none";
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
    	
    	for(var idxRow = 2, productQty;; idxRow++){
    		tblOrder.rows[idxRow].cells[4].style.display = "none";
    		tblOrder.rows[idxRow].cells[5].style.display = "none";
    		tblOrder.rows[idxRow].cells[6].style.display = "none";
    		tblOrder.rows[idxRow].cells[7].style.display = "none";
    		
    		if(cmob.checked){
    			this.generateCMOB();
    		}
    		else{
    			if(idxRow !== 2){
        			var totAmountPerLine = 0;
        			totAmountPerLine = 
        				parseFloat(tblOrder.rows[idxRow].cells[3].children[0].value)
        				* parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value);
        			tblOrder.rows[idxRow].cells[8].children[0].value =
        				totAmountPerLine;
        			totAmount += totAmountPerLine;
        		}
    		}
    		
    		if(idxRow === productQty){
   				break;
   			}
    	}
    }
    else if(jumlahOrder === "2"){
    	
    	sisaLimit.value = sisaLimitInit 
    		- totalAmount1
    		- totalAmount2;
    	
    	orderHeader2.style.display = "table-cell";
    	orderHeader3.style.display = "none";
    	orderHeader4.style.display = "none";
    	orderHeader5.style.display = "none";
    	detailHeader2.style.display = "table-cell";
    	detailHeader3.style.display = "none";
    	detailHeader4.style.display = "none";
    	detailHeader5.style.display = "none";
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
    	
    	for(var idxRow = 2, productQty;; idxRow++){
    		tblOrder.rows[idxRow].cells[4].style.display = "table-cell";
    		tblOrder.rows[idxRow].cells[5].style.display = "none";
    		tblOrder.rows[idxRow].cells[6].style.display = "none";
    		tblOrder.rows[idxRow].cells[7].style.display = "none";

    		if(cmob.checked){
    			this.generateCMOB();
    		}
    		else{
    			if(idxRow !== 2){
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
    		}
    		
    		if(idxRow === productQty){
   				break;
   			}
    	}
    }
    else if(jumlahOrder === "3"){
    	
    	sisaLimit.value = sisaLimitInit 
    		- totalAmount1
    		- totalAmount2
    		- totalAmount3;
    	
    	orderHeader2.style.display = "table-cell";
    	orderHeader3.style.display = "table-cell";
    	orderHeader4.style.display = "none";
    	orderHeader5.style.display = "none";
    	detailHeader2.style.display = "table-cell";
    	detailHeader3.style.display = "table-cell";
    	detailHeader4.style.display = "none";
    	detailHeader5.style.display = "none";
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
    	
    	for(var idxRow = 2, productQty;; idxRow++){
    		tblOrder.rows[idxRow].cells[4].style.display = "table-cell";
    		tblOrder.rows[idxRow].cells[5].style.display = "table-cell";
    		tblOrder.rows[idxRow].cells[6].style.display = "none";
    		tblOrder.rows[idxRow].cells[7].style.display = "none";
			
    		if(cmob.checked){
    			this.generateCMOB();
    		}
    		else{
    			if(idxRow !== 2){
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
    		}
    		
    		if(idxRow === productQty){
   				break;
   			}
    	}
    }
    else if(jumlahOrder === "4"){
    	
    	sisaLimit.value = sisaLimitInit 
    		- totalAmount1
    		- totalAmount2
    		- totalAmount3
    		- totalAmount4;
    	
    	orderHeader2.style.display = "table-cell";
    	orderHeader3.style.display = "table-cell";
    	orderHeader4.style.display = "table-cell";
    	orderHeader5.style.display = "none";
    	detailHeader2.style.display = "table-cell";
    	detailHeader3.style.display = "table-cell";
    	detailHeader4.style.display = "table-cell";
    	detailHeader5.style.display = "none";
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
    	
    	for(var idxRow = 2, productQty;; idxRow++){
    		tblOrder.rows[idxRow].cells[4].style.display = "table-cell";
    		tblOrder.rows[idxRow].cells[5].style.display = "table-cell";
    		tblOrder.rows[idxRow].cells[6].style.display = "table-cell";
    		tblOrder.rows[idxRow].cells[7].style.display = "none";
			
    		if(cmob.checked){
    			this.generateCMOB();
    		}
    		else{
    			if(idxRow !== 2){
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
    		}
    		
    		if(idxRow === productQty){
   				break;
   			}
    	}
    }
    else if(jumlahOrder === "5"){
    	
    	sisaLimit.value = sisaLimitInit 
    		- totalAmount1
    		- totalAmount2
    		- totalAmount3
    		- totalAmount4
    		- totalAmount5;
    	
    	orderHeader2.style.display = "table-cell";
    	orderHeader3.style.display = "table-cell";
    	orderHeader4.style.display = "table-cell";
    	orderHeader5.style.display = "table-cell";
    	detailHeader2.style.display = "table-cell";
    	detailHeader3.style.display = "table-cell";
    	detailHeader4.style.display = "table-cell";
    	detailHeader5.style.display = "table-cell";
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
    	
    	for(var idxRow = 2, productQty;; idxRow++){
    		tblOrder.rows[idxRow].cells[4].style.display = "table-cell";
    		tblOrder.rows[idxRow].cells[5].style.display = "table-cell";
    		tblOrder.rows[idxRow].cells[6].style.display = "table-cell";
    		tblOrder.rows[idxRow].cells[7].style.display = "table-cell";
   			
    		if(cmob.checked){
    			this.generateCMOB();
    		}
    		else{
    			if(idxRow !== 2){
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
    		}
    		
    		if(idxRow === productQty){
   				break;
   			}
    	}
    }
    if(!cmob.checked){
    	amtTotal.value = totAmount;
	}
}