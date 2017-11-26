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

/*$(document).keypress(
	    function(event){
	     if (event.which == '13') {
	    	 console.log("enter");
	        event.preventDefault();
	      }

});*/

function save(obj){
	alert("save");
}

function submit(obj){
	alert("submit");
	/*obj.addEventListener("click", function(event){
	    event.preventDefault()
	});*/
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
		obj.value = text;
		//obj.value = text.toFixed(2);
	//}
}

function formatTextValue(obj){
	
	text = obj;
	text = text.toString().replace(/[\D\s\._\-]+/g, "");
	text = text ? parseFloat( text, 10 ) : 0;
	text = ( text === 0 ) ? "" : text.toLocaleString( "en-US" )
	if(text===""){
		text = "0";
	}
	/*if(obj<0){
		text = "-" + obj;
	}*/
	return text;
}

function unformatText(obj){
	text = obj;
	var value = 0;
	text = text.replace(/,/g, "");
	value = parseFloat(text);
	return value;
}

function changeUom(obj){
	var uom = obj.value;
	var idxRowCurrent = parseFloat(obj.parentNode.parentNode.rowIndex);
	var uomSelected = document.getElementById("uomSelected");
	uomSelected.value = uom;
	var jumlahOrder = document.getElementById("jumlahOrder");
	var tblOrder = document.getElementById("tblOrder");
	var untPrice = tblOrder.rows[idxRowCurrent].cells[6].children[0];
	var untPriceInit = tblOrder.rows[idxRowCurrent].cells[7].children[0].value;
	var up = 0;
	up = parseFloat(uom)*parseFloat(untPriceInit);
	untPrice.value = formatTextValue(up);
	changeJumlahOrder(jumlahOrder);	
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
	
	up1.value = formatTextValue(untPrice);
	amt1.value = formatTextValue(untPrice*unformatText(dtl1));
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
	
	up2.value = formatTextValue(untPrice);
	amt2.value = formatTextValue(untPrice*unformatText(dtl2));
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
	
	up3.value = formatTextValue(untPrice);
	amt3.value = formatTextValue(untPrice*unformatText(dtl3));
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
	
	up4.value = formatTextValue(untPrice);
	amt4.value = formatTextValue(untPrice*unformatText(dtl4));
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
	
	up5.value = formatTextValue(untPrice);
	amt5.value = formatTextValue(untPrice*unformatText(dtl5));
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
	var productQty = 
		parseFloat(document.getElementById("productQty").value);
	var untPrice = tblOrder.rows[idxRowCurrent].cells[7].children[0].value;
	var qtyTotal = document.getElementById("qtyTotal");
	var amtTotal = document.getElementById("amtTotal");
	var dimensiMobil1 = document.getElementById("dimensiMobil1");
	var dimensiOrder1 = document.getElementById("dimensiOrder1");
	var selisihDimensi1 = document.getElementById("selisihDimensi1");
    var sisaLimit = document.getElementById("sisaLimit");
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

	dimensiOrder1.value = parseFloat(dimensiOrder);
	var selisihDimensi = 0;
	selisihDimensi =  parseFloat(dimensiMobil1.value - dimensiOrder);
	selisihDimensi1.value = selisihDimensi;
	if(selisihDimensi<0){
		selisihDimensi1.style.backgroundColor = "yellow";
		alert("Dimensi Mobil pada Order 1 Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		selisihDimensi1.style.backgroundColor = "white";
	}
	totalAmount1.value = totAmount1;
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
			sisaLimit1.style.backgroundColor = "white";
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
				sisaLimit2.style.backgroundColor = "white";
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
					sisaLimit3.style.backgroundColor = "white";
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
						sisaLimit4.style.backgroundColor = "white";
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
							sisaLimit5.style.backgroundColor = "white";
						}
						
						
					}
				}
			}
		}
	}
	
	var sl = 0;
	sl = sisaLimitInit - totAmount;
	sisaLimit.value = sl;
	if(sl<0){
		sisaLimit.style.backgroundColor = "yellow";
		alert("Sisa Limit Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		sisaLimit.style.backgroundColor = "white";
	}
	return;
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
	var productQty = 
		parseFloat(document.getElementById("productQty").value);
	var untPrice = tblOrder.rows[idxRowCurrent].cells[7].children[0].value;
	var qtyTotal = document.getElementById("qtyTotal");
	var amtTotal = document.getElementById("amtTotal");
	var dimensiMobil2 = document.getElementById("dimensiMobil2");
	var dimensiOrder2 = document.getElementById("dimensiOrder2");
	var selisihDimensi2 = document.getElementById("selisihDimensi2");
    var sisaLimit = document.getElementById("sisaLimit");
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

	dimensiOrder2.value = parseFloat(dimensiOrder);
	var selisihDimensi = 0;
	selisihDimensi =  parseFloat(dimensiMobil2.value - dimensiOrder);
	selisihDimensi2.value = selisihDimensi;
	if(selisihDimensi<0){
		selisihDimensi2.style.backgroundColor = "yellow";
		alert("Dimensi Mobil pada Order 2 Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		selisihDimensi2.style.backgroundColor = "white";
	}
	
	totalAmount2.value = totAmount2;
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
			sisaLimit1.style.backgroundColor = "white";
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
				sisaLimit2.style.backgroundColor = "white";
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
					sisaLimit3.style.backgroundColor = "white";
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
						sisaLimit4.style.backgroundColor = "white";
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
							sisaLimit5.style.backgroundColor = "white";
						}
						
						
					}
				}
			}
		}
	}
	
	var sl = 0;
	sl = sisaLimitInit - totAmount;
	sisaLimit.value = sl;
	if(sl<0){
		sisaLimit.style.backgroundColor = "yellow";
		alert("Sisa Limit Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		sisaLimit.style.backgroundColor = "white";
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
	var productQty = 
		parseFloat(document.getElementById("productQty").value);
	var untPrice = tblOrder.rows[idxRowCurrent].cells[7].children[0].value;
	var qtyTotal = document.getElementById("qtyTotal");
	var amtTotal = document.getElementById("amtTotal");
	var dimensiMobil3 = document.getElementById("dimensiMobil3");
	var dimensiOrder3 = document.getElementById("dimensiOrder3");
	var selisihDimensi3 = document.getElementById("selisihDimensi3");
    var sisaLimit = document.getElementById("sisaLimit");
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
				+ (parseFloat(tblOrder.rows[idxRow].cells[0].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value)) 
				+ (parseFloat(tblOrder.rows[idxRow].cells[1].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
				+ (parseFloat(tblOrder.rows[idxRow].cells[3].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
				+ (parseFloat(tblOrder.rows[idxRow].cells[4].children[0].value)
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

	dimensiOrder3.value = parseFloat(dimensiOrder);
	var selisihDimensi = 0;
	selisihDimensi =  parseFloat(dimensiMobil3.value - dimensiOrder);
	selisihDimensi3.value = selisihDimensi;
	if(selisihDimensi<0){
		selisihDimensi3.style.backgroundColor = "yellow";
		alert("Dimensi Mobil pada Order 3 Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		selisihDimensi3.style.backgroundColor = "white";
	}
	
	totalAmount3.value = totAmount3;
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
			sisaLimit1.style.backgroundColor = "white";
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
				sisaLimit2.style.backgroundColor = "white";
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
					sisaLimit3.style.backgroundColor = "white";
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
						sisaLimit4.style.backgroundColor = "white";
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
							sisaLimit5.style.backgroundColor = "white";
						}
						
						
					}
				}
			}
		}
	}
		
	var sl = 0;
	sl = sisaLimitInit - totAmount;
	sisaLimit.value = sl;
	if(sl<0){
		sisaLimit.style.backgroundColor = "yellow";
		alert("Sisa Limit Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		sisaLimit.style.backgroundColor = "white";
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
	var productQty = 
		parseFloat(document.getElementById("productQty").value);
	var untPrice = tblOrder.rows[idxRowCurrent].cells[7].children[0].value;
	var qtyTotal = document.getElementById("qtyTotal");
	var amtTotal = document.getElementById("amtTotal");
	var dimensiMobil4 = document.getElementById("dimensiMobil4");
	var dimensiOrder4 = document.getElementById("dimensiOrder4");
	var selisihDimensi4 = document.getElementById("selisihDimensi4");
    var sisaLimit = document.getElementById("sisaLimit");
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

	dimensiOrder4.value = parseFloat(dimensiOrder);
	var selisihDimensi = 0;
	selisihDimensi =  parseFloat(dimensiMobil4.value - dimensiOrder);
	selisihDimensi4.value = selisihDimensi;
	if(selisihDimensi<0){
		selisihDimensi4.style.backgroundColor = "yellow";
		alert("Dimensi Mobil pada Order 4 Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		selisihDimensi4.style.backgroundColor = "white";
	}
	
	totalAmount4.value = totAmount4;
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
			sisaLimit1.style.backgroundColor = "white";
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
				sisaLimit2.style.backgroundColor = "white";
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
					sisaLimit3.style.backgroundColor = "white";
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
						sisaLimit4.style.backgroundColor = "white";
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
							sisaLimit5.style.backgroundColor = "white";
						}
						
						
					}
				}
			}
		}
	}
	
	var sl = 0;
	sl = sisaLimitInit - totAmount;
	sisaLimit.value = formatTextValue(sl);
	if(sl<0){
		sisaLimit.style.backgroundColor = "yellow";
		alert("Sisa Limit Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		sisaLimit.style.backgroundColor = "white";
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
	var productQty = 
		parseFloat(document.getElementById("productQty").value);
	var untPrice = tblOrder.rows[idxRowCurrent].cells[7].children[0].value;
	var qtyTotal = document.getElementById("qtyTotal");
	var amtTotal = document.getElementById("amtTotal");
	var dimensiMobil5 = document.getElementById("dimensiMobil5");
	var dimensiOrder5 = document.getElementById("dimensiOrder5");
	var selisihDimensi5 = document.getElementById("selisihDimensi5");
    var sisaLimit = document.getElementById("sisaLimit");
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

	dimensiOrder5.value = parseFloat(dimensiOrder);
	var selisihDimensi = 0;
	selisihDimensi =  parseFloat(dimensiMobil5.value - dimensiOrder);
	selisihDimensi5.value = selisihDimensi;
	if(selisihDimensi<0){
		selisihDimensi5.style.backgroundColor = "yellow";
		alert("Dimensi Mobil pada Order 5 Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		selisihDimensi5.style.backgroundColor = "white";
	}
	totalAmount5.value = totAmount5;
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
			sisaLimit1.style.backgroundColor = "white";
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
				sisaLimit2.style.backgroundColor = "white";
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
					sisaLimit3.style.backgroundColor = "white";
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
						sisaLimit4.style.backgroundColor = "white";
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
							sisaLimit5.style.backgroundColor = "white";
						}
						
						
					}
				}
			}
		}
	}
	
	var sl = 0;
	sl = sisaLimitInit - totAmount;
	sisaLimit.value = sl;
	if(sl<0){
		sisaLimit.style.backgroundColor = "yellow";
		alert("Sisa Limit Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		sisaLimit.style.backgroundColor = "white";
	}
	return;
}

function generateCMOB(){

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
	var sisaLimit = document.getElementById("sisaLimit");
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
		averageSales =
			(averageSales3MonthBefore
			+ averageSales2MonthBefore
			+ averageSales1MonthBefore)
			/3;
		
		var bufferStock = 0;
		bufferStock =
			(averageSales/2)
			- (leadTime*averageSales/30)
			
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
			targetCustomerCurrentMonth
			+ bufferStock
			- invoiceByLeadTime
			- qtyOnHand
			- outstandingQuotation
			- outstandingOrder;
		
		if(cmob<0){
			cmob = 0;
		}
			
		var qty = cmob / jumlahOrder;
		
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
				formatTextValue(cmob);
			
			totQty += cmob;
			
			do1 += 
				tblOrder.rows[idxRow].cells[0].children[0].value
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
				/1000000000;
			
			var totAmountPerLine = 0;
			totAmountPerLine = 
				parseFloat(tblOrder.rows[idxRow].cells[0].children[0].value)
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
				formatTextValue(cmob);
			
			totQty += cmob;
			
			do1 += 
				tblOrder.rows[idxRow].cells[0].children[0].value
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
				/1000000000;
			do2 += 
				tblOrder.rows[idxRow].cells[1].children[0].value
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
				/1000000000;
			
			var totAmountPerLine = 0;
			totAmountPerLine = 
				(parseFloat(tblOrder.rows[idxRow].cells[0].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
				+ (parseFloat(tblOrder.rows[idxRow].cells[1].children[0].value)
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
				formatTextValue(cmob);
			
			totQty += cmob;

			do1 += 
				tblOrder.rows[idxRow].cells[0].children[0].value
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
				/1000000000;
			do2 += 
				tblOrder.rows[idxRow].cells[1].children[0].value
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
				/1000000000;
			do3 += 
				tblOrder.rows[idxRow].cells[2].children[0].value
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
				/1000000000;
			
			var totAmountPerLine = 0;
			totAmountPerLine = 
				(parseFloat(tblOrder.rows[idxRow].cells[0].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
				+ (parseFloat(tblOrder.rows[idxRow].cells[1].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
				+ (parseFloat(tblOrder.rows[idxRow].cells[2].children[0].value)
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
				formatTextValue(comb);	
			
			totQty += cmob;

			do1 += 
				tblOrder.rows[idxRow].cells[0].children[0].value
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
				/1000000000;
			do2 += 
				tblOrder.rows[idxRow].cells[1].children[0].value
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
				/1000000000;
			do3 += 
				tblOrder.rows[idxRow].cells[2].children[0].value
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
				/1000000000;
			do4 += 
				tblOrder.rows[idxRow].cells[3].children[0].value
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
				/1000000000;
			
			var totAmountPerLine = 0;
			totAmountPerLine = 
				(parseFloat(tblOrder.rows[idxRow].cells[0].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
				+ (parseFloat(tblOrder.rows[idxRow].cells[1].children[0].value)
   				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
   				+ (parseFloat(tblOrder.rows[idxRow].cells[2].children[0].value)
   				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
   				+ (parseFloat(tblOrder.rows[idxRow].cells[3].children[0].value)
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
				formatTextValue(cmob);
			
			totQty += (cmob);

			do1 += 
				tblOrder.rows[idxRow].cells[0].children[0].value
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
				/1000000000;
			do2 += 
				tblOrder.rows[idxRow].cells[1].children[0].value
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
				/1000000000;
			do3 += 
				tblOrder.rows[idxRow].cells[2].children[0].value
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
				/1000000000;
			do4 += 
				tblOrder.rows[idxRow].cells[3].children[0].value
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
				/1000000000;
			do5 += 
				tblOrder.rows[idxRow].cells[4].children[0].value
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[0].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[1].value)
				*parseFloat(tblOrder.rows[idxRow].cells[9].children[2].value)
				/1000000000;
			
			var totAmountPerLine = 0;
			totAmountPerLine = 
				(parseFloat(tblOrder.rows[idxRow].cells[0].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
				+ (parseFloat(tblOrder.rows[idxRow].cells[1].children[0].value)
				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
				+ (parseFloat(tblOrder.rows[idxRow].cells[2].children[0].value)
   				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
   				+ (parseFloat(tblOrder.rows[idxRow].cells[3].children[0].value)
   				* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value))
   				+ (parseFloat(tblOrder.rows[idxRow].cells[4].children[0].value)
   	    		* parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
			tblOrder.rows[idxRow].cells[6].children[0].value =
				formatTextValue(totAmountPerLine);
			totAmount += totAmountPerLine;
		}
		
		totAmount1 += 
			(parseFloat(tblOrder.rows[idxRow].cells[0].children[0].value)
				*parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
		totAmount2 += 
			(parseFloat(tblOrder.rows[idxRow].cells[1].children[0].value)
				*parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
		totAmount3 += 
			(parseFloat(tblOrder.rows[idxRow].cells[2].children[0].value)
				*parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
		totAmount4 += 
			(parseFloat(tblOrder.rows[idxRow].cells[3].children[0].value)
				*parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));
		totAmount5 += 
			(parseFloat(tblOrder.rows[idxRow].cells[4].children[0].value)
				*parseFloat(tblOrder.rows[idxRow].cells[7].children[0].value));

	}

	if(jumlahOrder>0){
		
		dimensiOrder1.value = parseFloat(do1);
		var sd1 = 0;
		sd1 =  parseFloat(dimensiMobil1.value - do1);
		selisihDimensi1.value = sd1;
		if(sd1<0){
			selisihDimensi1.style.backgroundColor = "yellow";
			alert("Dimensi Mobil pada Order 1 Tidak Mencukupi. Mohon Periksa Kembali");
		}
		else{
			selisihDimensi1.style.backgroundColor = "white";
		}
		
		var sl1 = 0;
    	sl1 = sisaLimitInit - totAmount1;
    	sisaLimit1.value = sl1;
    	if(sl1<0){
    		sisaLimit1.style.backgroundColor = "yellow";
    		alert("Sisa Limit pada Order 1 Tidak Mencukupi. Mohon Periksa Kembali");
    	}
    	else{
    		sisaLimit1.style.backgroundColor = "white";
    	}
		
		if(jumlahOrder>1){
			
			dimensiOrder2.value = parseFloat(do2);
			var sd1 = 0;
			sd2 =  parseFloat(dimensiMobil2.value - do2);
			selisihDimensi2.value = sd2;
			if(sd2<0){
				selisihDimensi2.style.backgroundColor = "yellow";
				alert("Dimensi Mobil pada Order 2 Tidak Mencukupi. Mohon Periksa Kembali");
			}
			else{
				selisihDimensi2.style.backgroundColor = "white";
			}

    		var sl2 = 0;
        	sl2 = sl1 - totAmount2;
        	sisaLimit2.value = sl2;
        	if(sl2<0){
        		sisaLimit2.style.backgroundColor = "yellow";
        		alert("Sisa Limit pada Order 2 Tidak Mencukupi. Mohon Periksa Kembali");
        	}
        	else{
        		sisaLimit2.style.backgroundColor = "white";
        	}
			
			if(jumlahOrder>2){
				
				dimensiOrder3.value = parseFloat(do3);
				var sd3 = 0;
				sd3 =  parseFloat(dimensiMobil3.value - do3);
				selisihDimensi3.value = sd3;
				if(sd3<0){
					selisihDimensi3.style.backgroundColor = "yellow";
					alert("Dimensi Mobil pada Order 3 Tidak Mencukupi. Mohon Periksa Kembali");
				}
				else{
					selisihDimensi3.style.backgroundColor = "white";
				}

        		var sl3 = 0;
            	sl3 = sl2 - totAmount3;
            	sisaLimit3.value = sl3;
            	if(sl3<0){
            		sisaLimit3.style.backgroundColor = "yellow";
            		alert("Sisa Limit pada Order 3 Tidak Mencukupi. Mohon Periksa Kembali");
            	}
            	else{
            		sisaLimit3.style.backgroundColor = "white";
            	}
				
				if(jumlahOrder>3){
					
					dimensiOrder4.value = parseFloat(do4);
					var sd4 = 0;
					sd4 =  parseFloat(dimensiMobil4.value - do4);
					selisihDimensi4.value = sd4;
					if(sd4<0){
						selisihDimensi4.style.backgroundColor = "yellow";
						alert("Dimensi Mobil pada Order 4 Tidak Mencukupi. Mohon Periksa Kembali");
					}
					else{
						selisihDimensi4.style.backgroundColor = "white";
					}

	        		var sl4 = 0;
	            	sl4 = sl3 - totAmount4;
	            	sisaLimit4.value = sl4;
	            	if(sl4<0){
	            		sisaLimit4.style.backgroundColor = "yellow";
	            		alert("Sisa Limit pada Order 4 Tidak Mencukupi. Mohon Periksa Kembali");
	            	}
	            	else{
	            		sisaLimit4.style.backgroundColor = "white";
	            	}
					
					if(jumlahOrder>4){
						
						dimensiOrder5.value = parseFloat(do5);
						var sd5 = 0;
						sd5 =  parseFloat(dimensiMobil5.value - do5);
						selisihDimensi5.value = sd5;

		        		var sl5 = 0;
		            	sl5 = sl4 - totAmount5;
		            	sisaLimit5.value = sl5;
		            	if(sl5<0){
		            		sisaLimit5.style.backgroundColor = "yellow";
		            		alert("Sisa Limit pada Order 5 Tidak Mencukupi. Mohon Periksa Kembali");
		            	}
		            	else{
		            		sisaLimit5.style.backgroundColor = "white";
		            	}
		            	
						if(sd5<0){
							selisihDimensi5.style.backgroundColor = "yellow";
							alert("Dimensi Mobil pada Order 5 Tidak Mencukupi. Mohon Periksa Kembali");
						}
						else{
							selisihDimensi5.style.backgroundColor = "white";
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
	qtyTotal.value = formatTextValue(totQty);
	amtTotal.value = formatTextValue(totAmount);
	var sl = 0;
	sl = sisaLimitInit - totAmount;
	sisaLimit.value = sl;
	if(sl<0){
		sisaLimit.style.backgroundColor = "yellow";
		alert("Sisa Limit Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		sisaLimit.style.backgroundColor = "white";
	}
	
	console.log("========================================================");
	console.log("");
}

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
	var sisaLimit = document.getElementById("sisaLimit");
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
	qtyTotal.value = 0;
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
	selisihDimensi1.style.backgroundColor = "white";
	selisihDimensi2.style.backgroundColor = "white";
	selisihDimensi3.style.backgroundColor = "white";
	selisihDimensi4.style.backgroundColor = "white";
	selisihDimensi5.style.backgroundColor = "white";
	sisaLimit1.value = 0;
	sisaLimit2.value = 0;
	sisaLimit3.value = 0;
	sisaLimit4.value = 0;
	sisaLimit5.value = 0;
	sisaLimit1.style.backgroundColor = "white";
	sisaLimit2.style.backgroundColor = "white";
	sisaLimit3.style.backgroundColor = "white";
	sisaLimit4.style.backgroundColor = "white";
	sisaLimit5.style.backgroundColor = "white";
	
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
	var selisihDimensi1 = document.getElementById("selisihDimensi1");
    dimensiMobil1.value = obj.value;
	var dimensiOrder = document.getElementById("dimensiOrder1").value;
	var selisihDimensi = 0;
	selisihDimensi =  parseFloat(dimensiMobil1.value - dimensiOrder);
	selisihDimensi1.value = selisihDimensi;
	if(selisihDimensi<0){
		selisihDimensi1.style.backgroundColor = "yellow";
		alert("Dimensi Mobil pada Order 1 Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		selisihDimensi1.style.backgroundColor = "white";
	}
}

function changeMobil2(obj){
	
	var selectBox = obj;
	var dimensiMobil = obj.value;
	var jenisMobil = selectBox.options[selectBox.selectedIndex].text;
    var jenisMobilSelected = document.getElementById("mobil2Selected");
    jenisMobilSelected.value = jenisMobil;
    var dimensiMobil2 = document.getElementById("dimensiMobil2");
	var selisihDimensi2 = document.getElementById("selisihDimensi2");
    dimensiMobil2.value = obj.value;
	var dimensiOrder = document.getElementById("dimensiOrder2").value;
	var selisihDimensi = 0;
	selisihDimensi =  parseFloat(dimensiMobil2.value - dimensiOrder);
	selisihDimensi2.value = selisihDimensi;
	if(selisihDimensi<0){
		selisihDimensi2.style.backgroundColor = "yellow";
		alert("Dimensi Mobil pada Order 2 Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		selisihDimensi2.style.backgroundColor = "white";
	}
}

function changeMobil3(obj){
	
	var selectBox = obj;
	var dimensiMobil = obj.value;
	var jenisMobil = selectBox.options[selectBox.selectedIndex].text;
    var jenisMobilSelected = document.getElementById("mobil3Selected");
    jenisMobilSelected.value = jenisMobil;
    var dimensiMobil3 = document.getElementById("dimensiMobil3");
	var selisihDimensi3 = document.getElementById("selisihDimensi3");
    dimensiMobil3.value = obj.value;
	var dimensiOrder = document.getElementById("dimensiOrder3").value;
	var selisihDimensi = 0;
	selisihDimensi =  parseFloat(dimensiMobil3.value - dimensiOrder);
	selisihDimensi3.value = selisihDimensi;
	if(selisihDimensi<0){
		selisihDimensi3.style.backgroundColor = "yellow";
		alert("Dimensi Mobil pada Order 3 Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		selisihDimensi3.style.backgroundColor = "white";
	}
}

function changeMobil4(obj){
	
	var selectBox = obj;
	var dimensiMobil = obj.value;
	var jenisMobil = selectBox.options[selectBox.selectedIndex].text;
    var jenisMobilSelected = document.getElementById("mobil4Selected");
    jenisMobilSelected.value = jenisMobil;
    var dimensiMobil4 = document.getElementById("dimensiMobil4");
	var selisihDimensi4 = document.getElementById("selisihDimensi4");
    dimensiMobil4.value = obj.value;
	var dimensiOrder = document.getElementById("dimensiOrder4").value;
	var selisihDimensi = 0;
	selisihDimensi =  parseFloat(dimensiMobil4.value - dimensiOrder);
	selisihDimensi4.value = selisihDimensi;
	if(selisihDimensi<0){
		selisihDimensi4.style.backgroundColor = "yellow";
		alert("Dimensi Mobil pada Order 4 Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		selisihDimensi4.style.backgroundColor = "white";
	}
}

function changeMobil5(obj){
	
	var selectBox = obj;
	var dimensiMobil = obj.value;
	var jenisMobil = selectBox.options[selectBox.selectedIndex].text;
    var jenisMobilSelected = document.getElementById("mobil5Selected");
    jenisMobilSelected.value = jenisMobil;
    var dimensiMobil5 = document.getElementById("dimensiMobil5");
	var selisihDimensi5 = document.getElementById("selisihDimensi5");
    dimensiMobil5.value = obj.value;
	var dimensiOrder = document.getElementById("dimensiOrder5").value;
	var selisihDimensi = 0;
	selisihDimensi =  parseFloat(dimensiMobil5.value - dimensiOrder);
	selisihDimensi5.value = selisihDimensi;
	if(selisihDimensi<0){
		selisihDimensi5.style.backgroundColor = "yellow";
		alert("Dimensi Mobil pada Order 5 Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		selisihDimensi5.style.backgroundColor = "white";
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
	
	for(var idxRow = 1; idxRow<=productQty; idxRow++){
		
		if(orderType === "SO Lokal Non Food With CO - DP"
			|| orderType === "SO Lokal Non Food With CO"){
			tblOrder.rows[idxRow].style.display = "none";
			tblOrderItemFixed.rows[idxRow].style.display = "none";
		}
		else{
			tblOrder.rows[idxRow].style.display = "table-row";
			tblOrderItemFixed.rows[idxRow].style.display = "table-row";
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
    var sisaLimit = document.getElementById("sisaLimit1");
    var sisaLimit = document.getElementById("sisaLimit2");
    var sisaLimit = document.getElementById("sisaLimit3");
    var sisaLimit = document.getElementById("sisaLimit4");
    var sisaLimit = document.getElementById("sisaLimit5");
    var sisaLimitInit = document.getElementById("sisaLimitInit").value;
    var totalAmount1 = document.getElementById("totalAmount1");
    var totalAmount2 = document.getElementById("totalAmount2");
    var totalAmount3 = document.getElementById("totalAmount3");
    var totalAmount4 = document.getElementById("totalAmount4");
    var totalAmount5 = document.getElementById("totalAmount5");
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
    		
    		dimensiOrder1.value = parseFloat(do1);
    		var sd1 = 0;
    		sd1 =  parseFloat(dimensiMobil1.value - do1);
    		selisihDimensi1.value = sd1;
    		if(sd1<0){
    			selisihDimensi1.style.backgroundColor = "yellow";
    			alert("Dimensi Mobil pada Order 1 Tidak Mencukupi. Mohon Periksa Kembali");
    		}
    		else{
    			selisihDimensi1.style.backgroundColor = "white";
    		}
    		
    		var sl1 = 0;
        	sl1 = sisaLimitInit - totAmount1;
        	sisaLimit1.value = sl1;
        	if(sl1<0){
        		sisaLimit1.style.backgroundColor = "yellow";
        		alert("Sisa Limit pada Order 1 Tidak Mencukupi. Mohon Periksa Kembali");
        	}
        	else{
        		sisaLimit1.style.backgroundColor = "white";
        	}
    		
    		if(jumlahOrder>1){
    			
    			dimensiOrder2.value = parseFloat(do2);
    			var sd1 = 0;
    			sd2 =  parseFloat(dimensiMobil2.value - do2);
    			selisihDimensi2.value = sd2;
    			if(sd2<0){
    				selisihDimensi2.style.backgroundColor = "yellow";
    				alert("Dimensi Mobil pada Order 2 Tidak Mencukupi. Mohon Periksa Kembali");
    			}
    			else{
    				selisihDimensi2.style.backgroundColor = "white";
    			}

        		var sl2 = 0;
            	sl2 = sl1 - totAmount2;
            	sisaLimit2.value = sl2;
            	if(sl2<0){
            		sisaLimit2.style.backgroundColor = "yellow";
            		alert("Sisa Limit pada Order 2 Tidak Mencukupi. Mohon Periksa Kembali");
            	}
            	else{
            		sisaLimit2.style.backgroundColor = "white";
            	}
    			
    			if(jumlahOrder>2){
    				
    				dimensiOrder3.value = parseFloat(do3);
    				var sd3 = 0;
    				sd3 =  parseFloat(dimensiMobil3.value - do3);
    				selisihDimensi3.value = sd3;
    				if(sd3<0){
    					selisihDimensi3.style.backgroundColor = "yellow";
    					alert("Dimensi Mobil pada Order 3 Tidak Mencukupi. Mohon Periksa Kembali");
    				}
    				else{
    					selisihDimensi3.style.backgroundColor = "white";
    				}

            		var sl3 = 0;
                	sl3 = sl2 - totAmount3;
                	sisaLimit3.value = sl3;
                	if(sl3<0){
                		sisaLimit3.style.backgroundColor = "yellow";
                		alert("Sisa Limit pada Order 3 Tidak Mencukupi. Mohon Periksa Kembali");
                	}
                	else{
                		sisaLimit3.style.backgroundColor = "white";
                	}
    				
    				if(jumlahOrder>3){
    					
    					dimensiOrder4.value = parseFloat(do4);
    					var sd4 = 0;
    					sd4 =  parseFloat(dimensiMobil4.value - do4);
    					selisihDimensi4.value = sd4;
    					if(sd4<0){
    						selisihDimensi4.style.backgroundColor = "yellow";
    						alert("Dimensi Mobil pada Order 4 Tidak Mencukupi. Mohon Periksa Kembali");
    					}
    					else{
    						selisihDimensi4.style.backgroundColor = "white";
    					}

    	        		var sl4 = 0;
    	            	sl4 = sl3 - totAmount4;
    	            	sisaLimit4.value = sl4;
    	            	if(sl4<0){
    	            		sisaLimit4.style.backgroundColor = "yellow";
    	            		alert("Sisa Limit pada Order 4 Tidak Mencukupi. Mohon Periksa Kembali");
    	            	}
    	            	else{
    	            		sisaLimit4.style.backgroundColor = "white";
    	            	}
    					
    					if(jumlahOrder>4){
    						
    						dimensiOrder5.value = parseFloat(do5);
    						var sd5 = 0;
    						sd5 =  parseFloat(dimensiMobil5.value - do5);
    						selisihDimensi5.value = sd5;

    		        		var sl5 = 0;
    		            	sl5 = sl4 - totAmount5;
    		            	sisaLimit5.value = sl5;
    		            	if(sl5<0){
    		            		sisaLimit5.style.backgroundColor = "yellow";
    		            		alert("Sisa Limit pada Order 5 Tidak Mencukupi. Mohon Periksa Kembali");
    		            	}
    		            	else{
    		            		sisaLimit5.style.backgroundColor = "white";
    		            	}
    		            	
    						if(sd5<0){
    							selisihDimensi5.style.backgroundColor = "yellow";
    							alert("Dimensi Mobil pada Order 5 Tidak Mencukupi. Mohon Periksa Kembali");
    						}
    						else{
    							selisihDimensi5.style.backgroundColor = "white";
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
    	qtyTotal.value = formatTextValue(totQty);
    	amtTotal.value = formatTextValue(totAmount);
    	
    	var sl = 0;
    	sl = sisaLimitInit - totAmount;
    	sisaLimit.value = sl;
    	if(sl<0){
    		sisaLimit.style.backgroundColor = "yellow";
    		alert("Sisa Limit Tidak Mencukupi. Mohon Periksa Kembali");
    	}
    	else{
    		sisaLimit.style.backgroundColor = "white";
    	}
	}
}