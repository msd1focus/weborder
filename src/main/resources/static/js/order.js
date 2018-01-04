var firstLoadCMOB = true;

window.onload = function(){

	inputProductInit();
	dimensiMobilInit();
	poDateInit();
	
	var orderBySelected = document.getElementById("orderBySelected").value;
	var manual = document.getElementById("manual");
	var cmob = document.getElementById("cmob");
	var rowLeadTime = document.getElementById("rowLeadTime");

	var shipTo1 = document.getElementById("shipTo1");
	var shipTo2 = document.getElementById("shipTo2");
	var shipTo3 = document.getElementById("shipTo3");
	var shipTo4 = document.getElementById("shipTo4");
	var shipTo5 = document.getElementById("shipTo5");
	var shipTo1Selected = document.getElementById("shipTo1Selected").value;
	var shipTo2Selected = document.getElementById("shipTo2Selected").value;
	var shipTo3Selected = document.getElementById("shipTo3Selected").value;
	var shipTo4Selected = document.getElementById("shipTo4Selected").value;
	var shipTo5Selected = document.getElementById("shipTo5Selected").value;
	
	if(orderBySelected=="CMOB"){
		cmob.checked = "checked";
		rowLeadTime.style.display = "table-row";
	}
	else if(orderBySelected="Manual"){
		manual.checked = "checked";
		rowLeadTime.style.display = "none";
	}
	
	if(shipTo1Selected!=null){
		shipTo1.value = shipTo1Selected;
	}
	if(shipTo2Selected!=null){
		shipTo2.value = shipTo2Selected;
	}
	if(shipTo3Selected!=null){
		shipTo3.value = shipTo3Selected;
	}
	if(shipTo4Selected!=null){
		shipTo4.value = shipTo4Selected;
	}
	if(shipTo5Selected!=null){
		shipTo5.value = shipTo5Selected;
	}
	
	//var jumlahOrder = document.getElementById("jumlahOrder");
    //changeJumlahOrder(jumlahOrder);
}

/* $(document).keypress(
	    function(event){
	     if (event.which == '13') {
	    	 console.log("enter");
	        event.preventDefault();
	      }

});*/

function inputProductInit(){
	var company = 
		document.getElementById("company").value;
	var custLocation = 
		document.getElementById("custLocation").value;
	var custId = 
		document.getElementById("custId").value;
	var orderId1 = 
		document.getElementById("orderId1").value;
	var orderId2 = 
		document.getElementById("orderId2").value;
	var orderId3 = 
		document.getElementById("orderId3").value;
	var orderId4 = 
		document.getElementById("orderId4").value;
	var orderId5 = 
		document.getElementById("orderId5").value;
	
	var data = {}
	data["company"] = company;
	data["custid"] = custId;
	data["orderid1"] = orderId1;
	data["orderid2"] = orderId2;
	data["orderid3"] = orderId3;
	data["orderid4"] = orderId4;
	data["orderid5"] = orderId5;
	data["periodecurrent"] = null;
	
	$.ajax({
		type: "GET",
		url: "/weborder/rest/inputproduct",
		contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    data: data,
		success: function(result, textStatus, xhr){
			console.log("inputproduct >> status: " + xhr.status);
			
			var tblOrderItemFixed = 
				document.getElementById("tblOrderItemFixed");
			var tblOrder = 
				document.getElementById("tblOrder");
			var productQty = 
				document.getElementById("productQty");
			var searchSelect = document.getElementById("searchSelect");
			productQty.value = Object.keys(result).length;
			
			
			$.each(result, function(i, field){
				
				var productName = field.product.productName;
				if(custLocation=="BATAM"){
					productName = field.product.productName2;
				}
				
				var toif = 
					'<tr><td>'
					+ '<input readonly="readonly" style="width: 100px" value="'
					+ field.product.productCode +'"/>'
					+ '</td><td>'
					+ '<input readonly="readonly" style="width: 320px" value="'
					+ productName +'"/>'
					+ '</td><td>'
					+ '<select id="uom" style="width: 60px" onchange="changeUom(this)"/>'
				
				$.each(field.prodUoms, function(j, pu){				
					toif += '<option'
						
					if(pu.uomCode==field.custProd.priceUom){
						toif += ' selected';
					}
					
					toif += ' value="'+ pu.conversionRate 
						+ '">' 
						+ pu.uomCode
						+ '</option>'
				});
				
				toif += '</select>'
					+ '</td></tr>';
				tblOrderItemFixed.insertRow(i+1).outerHTML = toif;
				
				var option = document.createElement("option");
				option.value = productName;
				option.text = field.product.productCode;
				searchSelect.add(option);
				
				var to =
					'<tr><td>'
					+ '<input id="dtl1" type="text" value="'
					+ field.orderQty1
					+ '" onchange="calcAmount1(this)"'
					+ 'onfocus="focus1(this)"'
					+ 'onkeyup="formatText(this)"'
					+ 'style="text-align: right;"/>'
					+ '<input type="hidden" value="'
					+ field.orderDetailId1
					+ '"/>'
					+ '<input type="hidden" value="'
					+ field.product.company
					+ '"/>'
					+ '<input type="hidden" value="'
					+ field.product.prodUom1
					+ '"/>'
					+ '<input type="hidden" value="'
					+ field.custProd.company
					+ '"/>'
					+ '<input type="hidden" value="'
					+ field.custProd.productCode
					+ '"/>'
					+ '<input type="hidden" value="'
					+ field.custProd.custId
					+ '"/>'
					+ '<input type="hidden" value="'
					+ field.custProd.price
					+ '"/>'
					+ '<input type="hidden" value="'
					+ field.custProd.outstandingSo
					+ '"/>'
					+ '<input type="hidden" value="'
					+ field.custProd.outstandingQuote
					+ '"/>'
					+ '<input type="hidden" value="'
					+ field.product.productCat1
					+ '"/>'
					+ '<input type="hidden" id="cmobValue" value="0"/>'
					+ '</td><td class="order2" width="150px" id="detail2" style="display: none;">'
					+ '<input id="dtl2" type="text" value="'
					+ field.orderQty2
					+ '" onchange="calcAmount2(this)"'
					+ 'onfocus="focus2(this)"'
					+ 'onkeyup="formatText(this)"'
					+ 'style="text-align: right;"/>'
					+ '<input type="hidden" value="'
					+ field.orderDetailId2
					+ '"/>'
					+ '</td><td class="order3" width="150px" id="detail3" style="display: none;">'
					+ '<input id="dtl3" type="text" value="'
					+ field.orderQty3
					+ '" onchange="calcAmount3(this)"'
					+ 'onfocus="focus3(this)"'
					+ 'onkeyup="formatText(this)"'
					+ 'style="text-align: right;"/>'
					+ '<input type="hidden" value="'
					+ field.orderDetailId3
					+ '"/>'
					+ '</td><td class="order4" width="150px" id="detail4" style="display: none;">'
					+ '<input id="dtl4" type="text" value="'
					+ field.orderQty4
					+ '" onchange="calcAmount4(this)"'
					+ 'onfocus="focus4(this)"'
					+ 'onkeyup="formatText(this)"'
					+ 'style="text-align: right;"/>'
					+ '<input type="hidden" value="'
					+ field.orderDetailId4
					+ '"/>'
					+ '</td><td class="order5" width="150px" id="detail5" style="display: none;">'
					+ '<input id="dtl5" type="text" value="'
					+ field.orderQty5
					+ '" onchange="calcAmount5(this)"'
					+ 'onfocus="focus5(this)"'
					+ 'onkeyup="formatText(this)"'
					+ 'style="text-align: right;"/>'
					+ '<input type="hidden" value="'
					+ field.orderDetailId5
					+ '"/>'
					+ '</td><td>'
					+ '<input id="dtlTotalQty" type="text" value="0"'
					+ 'disabled="disabled"'
					+ 'style="text-align: right;"/>'
					+ '</td><td>'
					+ '<input id="dtlTotal" type="text" value="0"'
					+ 'disabled="disabled"'
					+ 'style="text-align: right;"/>'
					+ '</td><td style="display: none;">'
					+ '<input type="hidden" id="untPrice1" value="'
					+ field.custProd.price
					+ '"/>'
					+ '</td><td style="display: none;">'
					+ '<input type="hidden" id="untPrice" value="'
					+ field.custProd.price
					+ '"/>'
					+ '<input type="hidden" id="untPriceInit" value="'
					+ field.custProd.price
					+ '"/>'
					+ '<input type="hidden" id="uomInit" value="'
					+ field.custProd.priceUom
					+ '"/>'
					+ '<input type="hidden" id="uomSelected" value="'
					+ field.custProd.priceUom
					+ '"/>'
					+ '</td><td style="display: none;">'
					+ '<input type="hidden" id="prodWidth" value="'
					+ field.product.prodWidth
					+ '"/>'
					+ '<input type="hidden" id="prodLength" value="'
					+ field.product.prodLength
					+ '"/>'
					+ '<input type="hidden" id="prodHeight" value="'
					+ field.product.prodHeight
					+ '"/>'
					+ '<input type="hidden" id="productCat1" value="'
					+ field.product.productCat1
					+ '"/>'
					+ '</td><td style="display: none;">'
					+ '<input type="hidden" id="averageSales3MonthBefore" value="'
					+ field.averageSales3MonthBefore
					+ '"/>'
					+ '<input type="hidden" id="averageSales2MonthBefore" value="'
					+ field.averageSales2MonthBefore
					+ '"/>'
					+ '<input type="hidden" id="averageSales1MonthBefore" value="'
					+ field.averageSales1MonthBefore
					+ '"/>'
					+ '<input type="hidden" id="averageSalesCurrentMonth" value="'
					+ field.averageSalesCurrentMonth
					+ '"/>'
					+ '<input type="hidden" id="targetCustomerCurrentMonth" value="'
					+ field.targetCustomerCurrentMonth
					+ '"/>'
					+ '<input type="hidden" id="targetCustomerNextMonth" value="'
					+ field.targetCustomerNextMonth
					+ '"/>'
					+ '<input type="hidden" id="qtyOnHand" value="'
					+ field.qtyOnHand
					+ '"/>'
					+ '</td></tr>';
				
				tblOrder.insertRow(i+1).outerHTML = to;
		     });
		},
	    complete: function( xhr, status ) {
	    	
	    	var isOrderNull = true;
	    	if(orderId1!=null){
	    		if(orderId1!=""){
		    		isOrderNull = false;
			    	initOrderDetail(1, orderId1);
	    		}
	    	}
	    	
	    	if(orderId2!=null){
	    		if(orderId2!=""){
		    		isOrderNull = false;
			    	initOrderDetail(2, orderId2);
	    		}
	    	}
	    	
	    	if(orderId3!=null){
	    		if(orderId3!=""){
		    		isOrderNull = false;
			    	initOrderDetail(3, orderId3);
	    		}
	    	}
	    	
	    	if(orderId4!=null){
	    		if(orderId4!=""){
		    		isOrderNull = false;
			    	initOrderDetail(4, orderId4);
	    		}
	    	}

	    	if(orderId5!=null){
	    		if(orderId5!=""){
		    		isOrderNull = false;
			    	initOrderDetail(5, orderId5);
	    		}
	    	}

	    	if(isOrderNull){
		    	var jumlahOrder = document.getElementById("jumlahOrder");
	    		var orderType = document.getElementById("orderType");
	    		changeOrderType(orderType);
		    	changeJumlahOrder(jumlahOrder);	
	    	}
	    	
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
	});
}

var initOrderCount = 0;
function initOrderDetail(o, oi){
	
	var data = {}
	data["orderid"] = oi;
	$.ajax({
		type: "GET",
		url: "/weborder/rest/orderdetail",
		contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    data: data,
		success: function(result, textStatus, xhr){
		
			console.log("orderdetail"+ o + " >> status: " + xhr.status + " - " + oi);
			if(Object.keys(result).length>0){	

				var tblOrderItemFixed = 
					document.getElementById("tblOrderItemFixed");
				var tblOrder = 
					document.getElementById("tblOrder");
				var productQty = 
					document.getElementById("productQty").value;
				
				$.each(result, function(i, field){
					
					for(var idxRow = 1; idxRow<=productQty; idxRow++){
						
						var productCode = 
							tblOrder.rows[idxRow].cells[0].children[5];
						
						if(productCode!=null){
							
							if(productCode.value==field.productCode){
								
								tblOrder.rows[idxRow].cells[o-1].children[0].value =
									field.jumlah;
								tblOrder.rows[idxRow].cells[o-1].children[1].value =
									field.orderDetailId;
								tblOrder.rows[idxRow].cells[8].children[0].value =
									field.unitPrice;
								tblOrder.rows[idxRow].cells[8].children[3].value =
									field.uom;
								
								var uom = 
									tblOrderItemFixed.rows[idxRow].cells[2].children[0];
								for (var i=0; i<uom.length; i++){
									if(field.uom==uom.options[i].text){
										uom.options[i].selected = "selected";
									}
								}
							}					
						}	
					}
					
				});
				
			}
	    	
		},
	    complete: function( xhr, status ) {
	    	
	    	initOrderCount += 1;
	    	var jumlahOrder = document.getElementById("jumlahOrder");
	    	if(initOrderCount==jumlahOrder.value){
	    		var orderType = document.getElementById("orderType");
	    		changeOrderType(orderType);
		    	changeJumlahOrder(jumlahOrder);	
	    	}
	    	
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
	});
			
}

function saveForm(obj){

	var loading = document.getElementById('loading');
    var submitStatus = 
		document.getElementById("submitStatus");
    var btnSubmit = 
		document.getElementById("btnSubmit");
    
	if(submitStatus.value==="false"){
		
        submitStatus.value = "true";
        obj.name = "action";
        btnSubmit.name = "action";
	
		var selisihDimensi1 = 
			unformatText(document.getElementById("selisihDimensi1Text").value);
		var selisihDimensi2 = 
			unformatText(document.getElementById("selisihDimensi2Text").value);
		var selisihDimensi3 = 
			unformatText(document.getElementById("selisihDimensi3Text").value);
		var selisihDimensi4 = 
			unformatText(document.getElementById("selisihDimensi4Text").value);
		var selisihDimensi5 = 
			unformatText(document.getElementById("selisihDimensi5Text").value);
		
		/*console.log("selisihDimensi1: " + selisihDimensi1);
		console.log("selisihDimensi2: " + selisihDimensi2);
		console.log("selisihDimensi3: " + selisihDimensi3);
		console.log("selisihDimensi4: " + selisihDimensi4);
		console.log("selisihDimensi5: " + selisihDimensi5);*/
		
		var isWarning = "false";
		var alertText = "Dimensi Order pada : \n";
		
		if(selisihDimensi1<0){
			alertText += "- Order 1\n";
			isWarning = "true";
		}
		if(selisihDimensi2<0){
			alertText += "- Order 2\n";
			isWarning = "true";
		}
		if(selisihDimensi3<0){
			alertText += "- Order 3\n";
			isWarning = "true";
		}
		if(selisihDimensi4<0){
			alertText += "- Order 4\n";
			isWarning = "true";
		}
		if(selisihDimensi5<0){
			alertText+= "- Order 5\n";
			isWarning = "true";
		}
		
		if(isWarning==="true"){
			alertText += "Melebihi Kapasitas Mobil. Mobon Diperiksa Kembali.";
			alert(alertText);
		}
		
		loading.style.display = "block";
		saveOrderGrp("DRAFT");

	}
	else{

		//alert ("Already saved, please wait!");
		loading.style.display = "block";
        obj.name = "action1";
        btnSubmit.name = "action1";
	}
		
	return false;
}

function submitForm(obj){

	var loading = document.getElementById('loading');
	
	var tblOrder = 
		document.getElementById("tblOrder");
	var jumlahOrderSelected = 
		parseFloat(document.getElementById("jumlahOrderSelected").value);
	var productQty = 
		parseFloat(document.getElementById("productQty").value);
	var orderItem1 = 0;
	var orderItem2 = 0;
	var orderItem3 = 0;
	var orderItem4 = 0;
	var orderItem5 = 0;
	var isOrderQuantityFilled = true;
	for(var o = 1; o<=jumlahOrderSelected; o++){
		var item = 0;
		for(var idxRow = 1; idxRow<=productQty; idxRow++){
			var qty =
				unformatText(tblOrder.rows[idxRow].cells[o-1].children[0].value);	
			if(qty>0){
				item += 1;
				if(o==1){
					orderItem1 += 1;
				}
				else if(o==2){
					orderItem2 += 1;
				}
				else if(o==3){
					orderItem3 += 1;
				}
				else if(o==4){
					orderItem4 += 1;
				}
				else if(o==5){
					orderItem5 += 1;
				}
			}
		}	
		if(item<=0){
			isOrderQuantityFilled = false;
		}
	}
	
	if(isOrderQuantityFilled){
		var submitStatus = 
			document.getElementById("submitStatus");    
	    var btnSave = 
			document.getElementById("btnSave");
	    
	    if(submitStatus.value==="false"){
		    
	    	submitStatus.value = "true";
	        obj.name = "action";
	        btnSave.name = "action";
	        
	        var selisihDimensi1 = 
				unformatText(document.getElementById("selisihDimensi1Text").value);
			var selisihDimensi2 = 
				unformatText(document.getElementById("selisihDimensi2Text").value);
			var selisihDimensi3 = 
				unformatText(document.getElementById("selisihDimensi3Text").value);
			var selisihDimensi4 = 
				unformatText(document.getElementById("selisihDimensi4Text").value);
			var selisihDimensi5 = 
				unformatText(document.getElementById("selisihDimensi5Text").value);
			
			/*console.log("selisihDimensi1: " + selisihDimensi1);
			console.log("selisihDimensi2: " + selisihDimensi2);
			console.log("selisihDimensi3: " + selisihDimensi3);
			console.log("selisihDimensi4: " + selisihDimensi4);
			console.log("selisihDimensi5: " + selisihDimensi5);*/
			
			var isWarning = "false";
			var alertText = "Dimensi Order pada : \n";
			
			if(selisihDimensi1<0){
				alertText += "- Order 1\n";
				isWarning = "true";
			}
			if(selisihDimensi2<0){
				alertText += "- Order 2\n";
				isWarning = "true";
			}
			if(selisihDimensi3<0){
				alertText += "- Order 3\n";
				isWarning = "true";
			}
			if(selisihDimensi4<0){
				alertText += "- Order 4\n";
				isWarning = "true";
			}
			if(selisihDimensi5<0){
				alertText+= "- Order 5\n";
				isWarning = "true";
			}
	    	
	    	if(isWarning==="true"){
	    		alertText += "Melebihi Kapasitas Mobil. Mobon Diperiksa Kembali.";
	    		alert(alertText);
	    	}	


	    	loading.style.display = "block";
			saveOrderGrp("SUBMITTED");
		}
		else{
			//alert("Already submitted, please wait!");
			loading.style.display = "block";
	        obj.name = "action1";
	        btnSave.name = "action1";
		}
	}
	else{
        var alertText = "Jumlah produk yang diorder pada: \n";
        
        if(jumlahOrderSelected>0){
        	if(orderItem1<=0){
        		alertText+= "- Order 1\n";
            }
        	if(jumlahOrderSelected>1){
            	if(orderItem2<=0){
            		alertText+= "- Order 2\n";
                }
            	if(jumlahOrderSelected>2){
                	if(orderItem3<=0){
                		alertText+= "- Order 3\n";
                    }
                	if(jumlahOrderSelected>3){
                    	if(orderItem4<=0){
                    		alertText+= "- Order 4\n";
                        }
                    	if(jumlahOrderSelected>4){
                        	if(orderItem5<=0){
                        		alertText+= "- Order 5\n";
                            }
                    	}
                	}
            	}
        	}
        }
        
        alertText+= "minimum 1. Silahkan isi jumlah produk pada Order di atas atau simpan dahulu data dengan Button Save!";
		alert(alertText);
	}
	
	return false;
}

function saveOrderGrp(ss){
	
	var orderGrpId = 
		document.getElementById("orderGrpId").value;
	var company = 
		document.getElementById("company").value;
	var custId = 
		document.getElementById("custId").value;
	var jumlahOrderSelected = 
		document.getElementById("jumlahOrderSelected").value;
	var periodeSelected = 
		document.getElementById("periodeSelected").value;
	var orderTypeSelected = 
		document.getElementById("orderTypeSelected").value;
	var orderBySelected = 
		document.getElementById("orderBySelected").value;
	var leadTime = 
		document.getElementById("leadTime").value;
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
            
            //----delete order----//
            var orderids = [];
            if(jumlahOrderSelected<5){
            	var orderId5 = 
            		document.getElementById("orderId5").value;
            	if(orderId5.trim().length>0){
    				orderids.push(orderId5);
    			}
                if(jumlahOrderSelected<4){
                	var orderId4 = 
                		document.getElementById("orderId4").value;
                	if(orderId4.trim().length>0){
        				orderids.push(orderId4);
        			}
                    if(jumlahOrderSelected<3){
                    	var orderId3 = 
                    		document.getElementById("orderId3").value;
                    	if(orderId3.trim().length>0){
            				orderids.push(orderId3);
            			}
                        if(jumlahOrderSelected<2){
                        	var orderId2 = 
                        		document.getElementById("orderId2").value;
                        	if(orderId2.trim().length>0){
                				orderids.push(orderId2);
                			}
                        }
                    }
                }
            }
            
            if(orderids.length>0){
            	$.ajax({
                    type: "DELETE",
                    url: "/weborder/rest/order",
                    data: JSON.stringify(orderids),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(result){
            	    	console.log("order >> delete: " + orderids);
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
            
            //----end of delete order----//
            
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
	var tblMobil = 
		document.getElementById("tblMobil"+o);
	var dimensiMobil = 
		document.getElementById("dimensiMobil"+o).value;
	var dimensiOrder = 
		document.getElementById("dimensiOrder"+o).value;
	var selisihDimensi = 
		document.getElementById("selisihDimensi"+o).value;
	var totalAmount = 
		document.getElementById("totalAmount"+o).value;
	
	var mobilSelected = "";

    var rowCount = tblMobil.rows.length - 1;
    for(var idxRow=1; idxRow<=rowCount; idxRow++){
        var jumlah = 0;
        jumlah = parseFloat(tblMobil.rows[idxRow].cells[4].children[0].value);
        if(jumlah>0){
        	var desc = tblMobil.rows[idxRow].cells[0].children[0].value;
        	if(mobilSelected!=""){
        		mobilSelected += "-/-";
        	}
    		mobilSelected += desc + ":" + jumlah;
        }
    }
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
	var orderdetailids = [];
	
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
		var orderDetailId =
			tblOrder.rows[idxRow].cells[o-1].children[1].value;
		
		if(qty>0){
			item += 1;
			var productCode=
				tblOrderItemFixed.rows[idxRow].cells[0].children[0].value;
			var productDesc=
				tblOrderItemFixed.rows[idxRow].cells[1].children[0].value;
			var uomSelected = 
				tblOrder.rows[idxRow].cells[8].children[3].value;
			var unitPrice = 
				unformatText(tblOrder.rows[idxRow].cells[8].children[0].value);
			var totalPrice = 
				qty*unitPrice;
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
		else{
			if(orderDetailId!== 'null'){
				orderdetailids.push(orderDetailId);
			}
		}
	}
	
	console.log("orderdetail: " + orderdetail);
	console.log("orderdetailids.length: " + orderdetailids.length);
	
	if(orderdetailids.length>0){
		console.log("orderdetailids: " + orderdetailids);
		$.ajax({
	        type: "DELETE",
	        url: "/weborder/rest/orderdetail",
	        data: JSON.stringify(orderdetailids),
	        contentType: "application/json; charset=utf-8",
	        dataType: "json",
	        success: function(result){
		    	console.log("orderdetail >> delete");
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
	
	$.ajax({
	    type: "PUT",
	    url: "/weborder/rest/orderdetail",
	    // The key needs to match your method's input parameter (case-sensitive).
	    data: JSON.stringify(orderdetail),
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    success: function(result){
	    	console.log("orderdetail >> put: " 
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
	var jumlahOrder = document.getElementById("jumlahOrder").value;
	if(jumlahOrder>0){
		dimensiMobilInit1();
		if(jumlahOrder>1){
			dimensiMobilInit2();
			if(jumlahOrder>2){
				dimensiMobilInit3();
				if(jumlahOrder>3){
					dimensiMobilInit4();
					if(jumlahOrder>4){
						dimensiMobilInit5();
					}
				}
			}
		}
	}
}

function dimensiMobilInit1(){
	var tblMobil = document.getElementById("tblMobil1");
    var jumlahMobil = document.getElementById("jumlahMobil1");
    var dimensiMobil = document.getElementById("dimensiMobil1");
    var dimensiMobilText = document.getElementById("dimensiMobil1Text");
    var dimensiOrder = 0;
    dimensiOrder = parseFloat(document.getElementById("dimensiOrder1").value);
    var selisihDimensi = document.getElementById("selisihDimensi1");
    var selisihDimensiText = document.getElementById("selisihDimensi1Text");
    var mobilSelected = document.getElementById("mobil1Selected").value;
    var dm = 0;
    var jumlahMobilValue = 0;
    var rowCount = tblMobil.rows.length - 1;
    for(var idxRow=1; idxRow<=rowCount; idxRow++){
    	var desc = tblMobil.rows[idxRow].cells[0].children[0].value;
    	var panjang = 0;
    	panjang = parseFloat(tblMobil.rows[idxRow].cells[1].children[0].value);
        var lebar = 0;
        lebar = parseFloat(tblMobil.rows[idxRow].cells[2].children[0].value);
        var tinggi = 0;
        tinggi = parseFloat(tblMobil.rows[idxRow].cells[3].children[0].value);
        var ms = mobilSelected.split("-/-");
        for(var i=0; i<ms.length; i++){
        	var d = ms[i].split(":");
        	if(d[0]==desc){
                tblMobil.rows[idxRow].cells[4].children[0].value = parseInt(d[1]);
        	}
        }
        var jumlah = 0;
        jumlah = parseFloat(tblMobil.rows[idxRow].cells[4].children[0].value);
        jumlahMobilValue += jumlah;
        dm += (panjang*lebar*tinggi*jumlah);
    }
    jumlahMobil.value = formatTextValue(jumlahMobilValue);
    dimensiMobil.value = dm;
    dimensiMobilText.value = formatTextValue(dm);
    selisihDimensi.value = dm - dimensiOrder;
    selisihDimensiText.value = formatTextValue(dm - dimensiOrder);
}

function dimensiMobilInit2(){
	var tblMobil = document.getElementById("tblMobil2");
    var jumlahMobil = document.getElementById("jumlahMobil2");
    var dimensiMobil = document.getElementById("dimensiMobil2");
    var dimensiMobilText = document.getElementById("dimensiMobil2Text");
    var dimensiOrder = 0;
    dimensiOrder = parseFloat(document.getElementById("dimensiOrder2").value);
    var selisihDimensi = document.getElementById("selisihDimensi2");
    var selisihDimensiText = document.getElementById("selisihDimensi2Text");
    var mobilSelected = document.getElementById("mobil2Selected").value;
    var dm = 0;
    var jumlahMobilValue = 0;
    var rowCount = tblMobil.rows.length - 1;
    for(var idxRow=1; idxRow<=rowCount; idxRow++){
    	var desc = tblMobil.rows[idxRow].cells[0].children[0].value;
    	var panjang = 0;
    	panjang = parseFloat(tblMobil.rows[idxRow].cells[1].children[0].value);
        var lebar = 0;
        lebar = parseFloat(tblMobil.rows[idxRow].cells[2].children[0].value);
        var tinggi = 0;
        tinggi = parseFloat(tblMobil.rows[idxRow].cells[3].children[0].value);
        var ms = mobilSelected.split("-/-");
        for(var i=0; i<ms.length; i++){
        	var d = ms[i].split(":");
        	if(d[0]==desc){
                tblMobil.rows[idxRow].cells[4].children[0].value = parseInt(d[1]);
        	}
        }
        var jumlah = 0;
        jumlah = parseFloat(tblMobil.rows[idxRow].cells[4].children[0].value);
        jumlahMobilValue += jumlah;
        dm += (panjang*lebar*tinggi*jumlah);
    }
    jumlahMobil.value = formatTextValue(jumlahMobilValue);
    dimensiMobil.value = dm;
    dimensiMobilText.value = formatTextValue(dm);
    selisihDimensi.value = dm - dimensiOrder;
    selisihDimensiText.value = formatTextValue(dm - dimensiOrder);
}

function dimensiMobilInit3(){
	var tblMobil = document.getElementById("tblMobil3");
    var jumlahMobil = document.getElementById("jumlahMobil3");
    var dimensiMobil = document.getElementById("dimensiMobil3");
    var dimensiMobilText = document.getElementById("dimensiMobil3Text");
    var dimensiOrder = 0;
    dimensiOrder = parseFloat(document.getElementById("dimensiOrder3").value);
    var selisihDimensi = document.getElementById("selisihDimensi3");
    var selisihDimensiText = document.getElementById("selisihDimensi3Text");
    var mobilSelected = document.getElementById("mobil3Selected").value;
    var dm = 0;
    var jumlahMobilValue = 0;
    var rowCount = tblMobil.rows.length - 1;
    for(var idxRow=1; idxRow<=rowCount; idxRow++){
    	var desc = tblMobil.rows[idxRow].cells[0].children[0].value;
    	var panjang = 0;
    	panjang = parseFloat(tblMobil.rows[idxRow].cells[1].children[0].value);
        var lebar = 0;
        lebar = parseFloat(tblMobil.rows[idxRow].cells[2].children[0].value);
        var tinggi = 0;
        tinggi = parseFloat(tblMobil.rows[idxRow].cells[3].children[0].value);
        var ms = mobilSelected.split("-/-");
        for(var i=0; i<ms.length; i++){
        	var d = ms[i].split(":");
        	if(d[0]==desc){
                tblMobil.rows[idxRow].cells[4].children[0].value = parseInt(d[1]);
        	}
        }
        var jumlah = 0;
        jumlah = parseFloat(tblMobil.rows[idxRow].cells[4].children[0].value);
        jumlahMobilValue += jumlah;
        dm += (panjang*lebar*tinggi*jumlah);
    }
    jumlahMobil.value = formatTextValue(jumlahMobilValue);
    dimensiMobil.value = dm;
    dimensiMobilText.value = formatTextValue(dm);
    selisihDimensi.value = dm - dimensiOrder;
    selisihDimensiText.value = formatTextValue(dm - dimensiOrder);
}

function dimensiMobilInit4(){
	var tblMobil = document.getElementById("tblMobil4");
    var jumlahMobil = document.getElementById("jumlahMobil4");
    var dimensiMobil = document.getElementById("dimensiMobil4");
    var dimensiMobilText = document.getElementById("dimensiMobil4Text");
    var dimensiOrder = 0;
    dimensiOrder = parseFloat(document.getElementById("dimensiOrder4").value);
    var selisihDimensi = document.getElementById("selisihDimensi4");
    var selisihDimensiText = document.getElementById("selisihDimensi4Text");
    var mobilSelected = document.getElementById("mobil4Selected").value;
    var dm = 0;
    var jumlahMobilValue = 0;
    var rowCount = tblMobil.rows.length - 1;
    for(var idxRow=1; idxRow<=rowCount; idxRow++){
    	var desc = tblMobil.rows[idxRow].cells[0].children[0].value;
    	var panjang = 0;
    	panjang = parseFloat(tblMobil.rows[idxRow].cells[1].children[0].value);
        var lebar = 0;
        lebar = parseFloat(tblMobil.rows[idxRow].cells[2].children[0].value);
        var tinggi = 0;
        tinggi = parseFloat(tblMobil.rows[idxRow].cells[3].children[0].value);
        var ms = mobilSelected.split("-/-");
        for(var i=0; i<ms.length; i++){
        	var d = ms[i].split(":");
        	if(d[0]==desc){
                tblMobil.rows[idxRow].cells[4].children[0].value = parseInt(d[1]);
        	}
        }
        var jumlah = 0;
        jumlah = parseFloat(tblMobil.rows[idxRow].cells[4].children[0].value);
        jumlahMobilValue += jumlah;
        dm += (panjang*lebar*tinggi*jumlah);
    }
    jumlahMobil.value = formatTextValue(jumlahMobilValue);
    dimensiMobil.value = dm;
    dimensiMobilText.value = formatTextValue(dm);
    selisihDimensi.value = dm - dimensiOrder;
    selisihDimensiText.value = formatTextValue(dm - dimensiOrder);
}

function dimensiMobilInit5(){
	var tblMobil = document.getElementById("tblMobil5");
    var jumlahMobil = document.getElementById("jumlahMobil5");
    var dimensiMobil = document.getElementById("dimensiMobil5");
    var dimensiMobilText = document.getElementById("dimensiMobil5Text");
    var dimensiOrder = 0;
    dimensiOrder = parseFloat(document.getElementById("dimensiOrder5").value);
    var selisihDimensi = document.getElementById("selisihDimensi5");
    var selisihDimensiText = document.getElementById("selisihDimensi5Text");
    var mobilSelected = document.getElementById("mobil5Selected").value;
    var dm = 0;
    var jumlahMobilValue = 0;
    var rowCount = tblMobil.rows.length - 1;
    for(var idxRow=1; idxRow<=rowCount; idxRow++){
    	var desc = tblMobil.rows[idxRow].cells[0].children[0].value;
    	var panjang = 0;
    	panjang = parseFloat(tblMobil.rows[idxRow].cells[1].children[0].value);
        var lebar = 0;
        lebar = parseFloat(tblMobil.rows[idxRow].cells[2].children[0].value);
        var tinggi = 0;
        tinggi = parseFloat(tblMobil.rows[idxRow].cells[3].children[0].value);
        var ms = mobilSelected.split("-/-");
        for(var i=0; i<ms.length; i++){
        	var d = ms[i].split(":");
        	if(d[0]==desc){
                tblMobil.rows[idxRow].cells[4].children[0].value = parseInt(d[1]);
        	}
        }
        var jumlah = 0;
        jumlah = parseFloat(tblMobil.rows[idxRow].cells[4].children[0].value);
        jumlahMobilValue += jumlah;
        dm += (panjang*lebar*tinggi*jumlah);
    }
    jumlahMobil.value = formatTextValue(jumlahMobilValue);
    dimensiMobil.value = dm;
    dimensiMobilText.value = formatTextValue(dm);
    selisihDimensi.value = dm - dimensiOrder;
    selisihDimensiText.value = formatTextValue(dm - dimensiOrder);
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
			tblOrder.rows[idxRow].cells[0].children[0].select();
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
	
	var uomCurrentRate = obj.value;
	var idxRowCurrent = parseFloat(obj.parentNode.parentNode.rowIndex);
	console.log("idxRowCurrent: " + idxRowCurrent);
	console.log("obj.selectedIndex: " + obj.selectedIndex);
	var jumlahOrder = document.getElementById("jumlahOrder");
	var tblOrder = document.getElementById("tblOrder");
	var tblOrderItemFixed = document.getElementById("tblOrderItemFixed");
	var uom = tblOrderItemFixed.rows[idxRowCurrent].cells[2].children[0];
	var untPrice = tblOrder.rows[idxRowCurrent].cells[8].children[0];
	var untPriceInit = tblOrder.rows[idxRowCurrent].cells[8].children[1];
	var uomInit = tblOrder.rows[idxRowCurrent].cells[8].children[2];
	var uomSelected = tblOrder.rows[idxRowCurrent].cells[8].children[3];
	var prodWidth = tblOrder.rows[idxRowCurrent].cells[9].children[0];
	var prodLength = tblOrder.rows[idxRowCurrent].cells[9].children[1];
	var prodHeight = tblOrder.rows[idxRowCurrent].cells[9].children[2];
	var prodWidthValue = prodWidth.value;
	var prodLengthValue = prodLength.value;
	var prodHeightValue = prodHeight.value;

	var uomCurrent;
		
	var uomInitRate = 0;
	var uomSelectedRate = 0;
	
	for (var i=0; i<uom.length; i++){
		if(uomInit.value==uom.options[i].text){
			uomInitRate = uom.options[i].value;
		}
		if(uomSelected.value==uom.options[i].text){
			uomSelectedRate = uom.options[i].value;
		}
		if(obj.selectedIndex==i){
			uomCurrent = uom.options[i].text;
		}
	}
	
	var up = 0;
	up =
		parseFloat(untPriceInit.value)
		* parseFloat(uomCurrentRate)
		/ parseFloat(uomInitRate);
	
	console.log("prodWidthValue: " + prodWidthValue);
	console.log("prodLengthValue: " + prodLengthValue);
	console.log("prodHeightValue: " + prodHeightValue);
	
	prodWidthValue = 
		parseFloat(prodWidthValue)
		* parseFloat(uomCurrentRate)
		/ parseFloat(uomSelectedRate);

	prodLengthValue = 
		parseFloat(prodLengthValue)
		* parseFloat(uomCurrentRate)
		/ parseFloat(uomSelectedRate);
	
	prodHeightValue = 
		parseFloat(prodHeightValue)
		* parseFloat(uomCurrentRate)
		/ parseFloat(uomSelectedRate);
	
	console.log("====================================");
	console.log("prodWidthValue: " + prodWidthValue);
	console.log("prodLengthValue: " + prodLengthValue);
	console.log("prodHeightValue: " + prodHeightValue);
	
	if(jumlahOrder.value>0){
		
		var up1 = 
			document.getElementById("up1");
		var amt1 = 
			document.getElementById("amt1");
		var quantity1 = tblOrder.rows[idxRowCurrent].cells[0].children[0];
		var qty1 = 
			parseFloat(quantity1.value);
		
		qty1 = 
			parseFloat(qty1)
			* parseFloat(uomSelectedRate)
			/ parseFloat(uomCurrentRate);
		

		quantity1.value = qty1;
		up1.value = up;
		amt1.value = up*qty1;
		
		if(jumlahOrder.value>1){
			
			var up2 = 
				document.getElementById("up2");
			var amt2 = 
				document.getElementById("amt2");
			var quantity2 = tblOrder.rows[idxRowCurrent].cells[1].children[0];
			var qty2 = 
				parseFloat(quantity2.value);
			
			qty2 = 
				parseFloat(qty2)
				* parseFloat(uomSelectedRate)
				/ parseFloat(uomCurrentRate);
			

			quantity2.value = qty2;
			up2.value = up;
			amt2.value = up*qty2;
			
			if(jumlahOrder.value>2){
				
				var up3 = 
					document.getElementById("up3");
				var amt3 = 
					document.getElementById("amt3");
				var quantity3 = 
					tblOrder.rows[idxRowCurrent].cells[2].children[0];
				var qty3 = 
					parseFloat(quantity3.value);
				
				qty3 = 
					parseFloat(qty3)
					* parseFloat(uomSelectedRate)
					/ parseFloat(uomCurrentRate);
				

				quantity3.value = qty3;
				up3.value = up;
				amt3.value = up*qty3;
				
				if(jumlahOrder.value>3){

					var up4 = 
						document.getElementById("up4");
					var amt4 = 
						document.getElementById("amt4");
					var quantity4 = 
						tblOrder.rows[idxRowCurrent].cells[3].children[0];
					var qty4 = 
						parseFloat(quantity4.value);
					
					qty4 = 
						parseFloat(qty4)
						* parseFloat(uomSelectedRate)
						/ parseFloat(uomCurrentRate);
					

					quantity4.value = qty4;
					up4.value = up;
					amt4.value = up*qty4;
					
					if(jumlahOrder.value>4){
						
						var up5 = 
							document.getElementById("up5");
						var amt5 = 
							document.getElementById("amt5");
						var quantity5 = 
							tblOrder.rows[idxRowCurrent].cells[4].children[0];
						var qty5 = 
							parseFloat(quantity5.value);
						
						qty5 = 
							parseFloat(qty5)
							* parseFloat(uomSelectedRate)
							/ parseFloat(uomCurrentRate);
						

						quantity5.value = qty5;
						up5.value = up;
						amt5.value = up*qty5;
					}
					
				}
			}		
		}	
	}
	
	console.log("uomCurrentRate: " + uomCurrentRate);
	console.log("untPriceInit: " + untPriceInit.value);
	console.log("uomCurrent: " + uomCurrent);
	console.log("uomSelected.value: " + uomSelected.value);
	console.log("uomSelectedRate: " + uomSelectedRate);
	console.log("untPrice: " + untPrice.value);
	console.log("up: " + up);
	
	untPrice.value = up;
	prodWidth.value = prodWidthValue;
	prodLength.value = prodLengthValue;
	prodHeight.value = prodHeightValue;
	uomSelected.value = uomCurrent;
	changeJumlahOrder(jumlahOrder);	
	console.log("===============================================================");
}

function focusSearch(obj){
	obj.select();
}

function focus1(obj){
	var dtl1 = obj.value;
	var idxRowCurrent = parseFloat(obj.parentNode.parentNode.rowIndex);
	var tblOrder = document.getElementById("tblOrder");
	var productQty = 
		parseFloat(document.getElementById("productQty").value);
	var untPrice = tblOrder.rows[idxRowCurrent].cells[8].children[0].value;
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
	var untPrice = tblOrder.rows[idxRowCurrent].cells[8].children[0].value;
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
	var untPrice = tblOrder.rows[idxRowCurrent].cells[8].children[0].value;
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
	var untPrice = tblOrder.rows[idxRowCurrent].cells[8].children[0].value;
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
	var untPrice = tblOrder.rows[idxRowCurrent].cells[8].children[0].value;
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
	
//	console.log("===============================================================");
//	console.log("calcAmount1");
//	console.log("===============================================================");
//	
//	console.log("obj.value: " + obj.value);
	
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
	var untPrice = tblOrder.rows[idxRowCurrent].cells[8].children[0].value;
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
			*parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value);
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
				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value));
			
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
				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value)) 
				+ (qty3
				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value));
			
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
				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value)) 
				+ (qty3
				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value))
				+ (qty4
				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value));
			
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
				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value)) 
				+ (qty3
				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value))
				+ (qty4
				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value))
				+ (qty5
				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value));
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
	/*if(selisihDimensi<0){
		selisihDimensi1Text.style.backgroundColor = "yellow";
		//alert("Dimensi Mobil pada Order 1 Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		selisihDimensi1Text.style.backgroundColor = "#D3D3D3";
	}*/
	
	totalAmount1.value = totAmount1;
	totalAmount1Text.value = formatTextValue(totAmount1);
	qtyTotal.value = formatTextValue(totQty);
	amtTotal.value = formatTextValue(totAmount);
	
	if(jumlahOrder>0){
		
		var sl1 = 0;
		sl1 = sisaLimitInit - totAmount1;
		sisaLimit1.value = formatTextValue(sl1);
		if(sl1<0){
			//sisaLimit1.style.backgroundColor = "yellow";
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
				//sisaLimit2.style.backgroundColor = "yellow";
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
					//sisaLimit3.style.backgroundColor = "yellow";
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
						//sisaLimit4.style.backgroundColor = "yellow";
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
							//sisaLimit5.style.backgroundColor = "yellow";
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
	/*if(sl<0){
		sisaLimitText.style.backgroundColor = "yellow";
		//alert("Sisa Limit Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		sisaLimitText.style.backgroundColor = "#D3D3D3";
	}*/
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
	var untPrice = tblOrder.rows[idxRowCurrent].cells[8].children[0].value;
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
			*parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value);
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
				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value));
			
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
				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value)) 
				+ (qty3
				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value));
			
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
				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value)) 
				+ (qty3
				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value))
				+ (qty4
				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value));
			
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
				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value)) 
				+ (qty3
				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value))
				+ (qty4
				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value))
				+ (qty5
				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value));
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
	/*if(selisihDimensi<0){
		selisihDimensi2Text.style.backgroundColor = "yellow";
		//alert("Dimensi Mobil pada Order 2 Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		selisihDimensi2Text.style.backgroundColor = "#D3D3D3";
	}*/
	
	totalAmount2.value = totAmount2;
	totalAmount2Text.value = formatTextValue(totAmount2);
	qtyTotal.value = formatTextValue(totQty);
	amtTotal.value = formatTextValue(totAmount);

	if(jumlahOrder>0){
		
		var sl1 = 0;
		sl1 = sisaLimitInit - totAmount1;
		sisaLimit1.value = formatTextValue(sl1);
		if(sl1<0){
			//sisaLimit1.style.backgroundColor = "yellow";
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
				//sisaLimit2.style.backgroundColor = "yellow";
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
					//sisaLimit3.style.backgroundColor = "yellow";
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
						//sisaLimit4.style.backgroundColor = "yellow";
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
							//sisaLimit5.style.backgroundColor = "yellow";
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
	/*if(sl<0){
		sisaLimitText.style.backgroundColor = "yellow";
		//alert("Sisa Limit Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		sisaLimitText.style.backgroundColor = "#D3D3D3";
	}*/
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
	var untPrice = tblOrder.rows[idxRowCurrent].cells[8].children[0].value;
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
			*parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value);
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
				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value)) 
				+ (qty2
				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value));
			
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
				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value)) 
				+ (qty2
				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value))
				+ (qty4
				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value));
			
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
				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value)) 
				+ (qty2
				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value))
				+ (qty4
				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value))
				+ (qty5
				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value));
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
	/*if(selisihDimensi<0){
		selisihDimensi3Text.style.backgroundColor = "yellow";
		//alert("Dimensi Mobil pada Order 3 Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		selisihDimensi3Text.style.backgroundColor = "#D3D3D3";
	}*/
	
	totalAmount3.value = totAmount3;
	totalAmount3Text.value = formatTextValue(totAmount3);
	qtyTotal.value = formatTextValue(totQty);
	amtTotal.value = formatTextValue(totAmount);

	if(jumlahOrder>0){
		
		var sl1 = 0;
		sl1 = sisaLimitInit - totAmount1;
		sisaLimit1.value = formatTextValue(sl1);
		if(sl1<0){
			//sisaLimit1.style.backgroundColor = "yellow";
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
				//sisaLimit2.style.backgroundColor = "yellow";
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
					//sisaLimit3.style.backgroundColor = "yellow";
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
						//sisaLimit4.style.backgroundColor = "yellow";
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
							//sisaLimit5.style.backgroundColor = "yellow";
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
	/*if(sl<0){
		sisaLimitText.style.backgroundColor = "yellow";
		//alert("Sisa Limit Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		sisaLimitText.style.backgroundColor = "#D3D3D3";
	}*/
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
	var untPrice = tblOrder.rows[idxRowCurrent].cells[8].children[0].value;
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
			*parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value);
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
				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value)) 
				+ (qty2
				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value))
				+ (qty3
				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value));
			
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
				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value)) 
				+ (qty2
				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value))
				+ (qty3
				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value))
				+ (qty5
				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value));
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
	/*if(selisihDimensi<0){
		selisihDimensi4Text.style.backgroundColor = "yellow";
		//alert("Dimensi Mobil pada Order 4 Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		selisihDimensi4Text.style.backgroundColor = "#D3D3D3";
	}*/
	
	totalAmount4.value = totAmount4;
	totalAmount4Text.value = formatTextValue(totAmount4);
	qtyTotal.value = formatTextValue(totQty);
	amtTotal.value = formatTextValue(totAmount);

	if(jumlahOrder>0){
		
		var sl1 = 0;
		sl1 = sisaLimitInit - totAmount1;
		sisaLimit1.value = formatTextValue(sl1);
		if(sl1<0){
			//sisaLimit1.style.backgroundColor = "yellow";
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
				//sisaLimit2.style.backgroundColor = "yellow";
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
					//sisaLimit3.style.backgroundColor = "yellow";
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
						//sisaLimit4.style.backgroundColor = "yellow";
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
							//sisaLimit5.style.backgroundColor = "yellow";
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
	/*if(sl<0){
		sisaLimitText.style.backgroundColor = "yellow";
		//alert("Sisa Limit Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		sisaLimitText.style.backgroundColor = "#D3D3D3";
	}*/
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
	var untPrice = tblOrder.rows[idxRowCurrent].cells[8].children[0].value;
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
			*parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value);
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
			* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value)) 
			+ (qty2
			* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value))
			+ (qty3
			* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value))
			+ (qty4
			* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value));
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
	/*if(selisihDimensi<0){
		selisihDimensi5Text.style.backgroundColor = "yellow";
		//alert("Dimensi Mobil pada Order 5 Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		selisihDimensi5Text.style.backgroundColor = "#D3D3D3";
	}*/
	totalAmount5.value = totAmount5;
	totalAmount5Text.value = formatTextValue(totAmount5);
	qtyTotal.value = formatTextValue(totQty);
	amtTotal.value = formatTextValue(totAmount);

	if(jumlahOrder>0){
		
		var sl1 = 0;
		sl1 = sisaLimitInit - totAmount1;
		sisaLimit1.value = formatTextValue(sl1);
		if(sl1<0){
			//sisaLimit1.style.backgroundColor = "yellow";
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
				//sisaLimit2.style.backgroundColor = "yellow";
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
					//sisaLimit3.style.backgroundColor = "yellow";
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
						//sisaLimit4.style.backgroundColor = "yellow";
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
							//sisaLimit5.style.backgroundColor = "yellow";
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
	/*if(sl<0){
		sisaLimitText.style.backgroundColor = "yellow";
		//alert("Sisa Limit Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		sisaLimitText.style.backgroundColor = "#D3D3D3";
	}*/
	return;
}

function calcAmount(){
	
}

function generateCMOB(){
	
	var company = document.getElementById("company").value;
	var custId = document.getElementById("custId").value;
	var periodeSelected = document.getElementById("periodeSelected").value;
	var leadTime = document.getElementById("leadTime").value;
	
	var tblOrderItemFixed = 
		document.getElementById("tblOrderItemFixed");
	var jumlahOrderSelected = 
		document.getElementById("jumlahOrderSelected").value;
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
	
    var orderdetail = [];
    
	for(var idxRow = 1; idxRow<=productQty; idxRow++){
		
		var productCode =
			tblOrderItemFixed.rows[idxRow].cells[0].children[0].value;
		var primaryUom =
			tblOrder.rows[idxRow].cells[0].children[3].value;
		var selectedUom =
			tblOrder.rows[idxRow].cells[8].children[3].value;
		var outstandingSo =
			tblOrder.rows[idxRow].cells[0].children[8].value;
		var outstandingQuote =
			tblOrder.rows[idxRow].cells[0].children[9].value;
		var uom = 
			tblOrderItemFixed.rows[idxRow].cells[2].children[0];
	
		var uomPrimaryRate = 0;
		var uomSelectedRate = 0;
		
		for (var i=0; i<uom.length; i++){
			if(primaryUom==uom.options[i].text){
				primaryUomRate = uom.options[i].value;
			}
			if(selectedUom==uom.options[i].text){
				selectedUomRate = uom.options[i].value;
			}
		}
		
		orderdetail.push({ 
	        "company" : company,
			"custId": custId,
			"productCode": productCode,
			"periode": periodeSelected,
			"leadTime": leadTime,
	        "primaryUomRate"  : primaryUomRate,
			"selectedUomRate": selectedUomRate,
			"outstandingSo": outstandingSo,
			"outstandingQuote": outstandingQuote
	    });

	}
	
	console.log(orderdetail);
	
	$.ajax({
	    type: "POST",
	    url: "/weborder/rest/inputproduct/cmob",
	    // The key needs to match your method's input parameter (case-sensitive).
	    data: JSON.stringify(orderdetail),
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    success: function(result, textStatus, xhr){
	    	console.log("cmob >> status: " + xhr.status);
			if(Object.keys(result).length>0){	
				
				$.each(result, function(i, field){
					
					for(var idxRow = 1; idxRow<=productQty; idxRow++){
						
						var productCode = 
							tblOrder.rows[idxRow].cells[0].children[5];
						
						if(productCode!=null){
							if(productCode.value==field.productCode){
								console.log(
										field.productCode
										+ " - "
										+ field.quantity);
								tblOrder.rows[idxRow].cells[0].children[11].value =
									field.quantity;
							}					
						}	
					}		
				});	
			}
	    },
	    complete: function( xhr, status ) {

	    	firstLoadCMOB = false;
	    	var jumlahOrder = document.getElementById("jumlahOrder");
		    changeJumlahOrder(jumlahOrder);	
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
	
	return false;
}

function selectCMOB(){
	var rowLeadTime = document.getElementById("rowLeadTime");
	rowLeadTime.style.display = "table-row";
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
	/*if(selisihDimensi<0){
		selisihDimensi1Text.style.backgroundColor = "yellow";
		//alert("Dimensi Mobil pada Order 1 Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		selisihDimensi1Text.style.backgroundColor = "#D3D3D3";
	}*/
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
	/*if(selisihDimensi<0){
		selisihDimensi2Text.style.backgroundColor = "yellow";
		//alert("Dimensi Mobil pada Order 2 Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		selisihDimensi2Text.style.backgroundColor = "#D3D3D3";
	}*/
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
	/*if(selisihDimensi<0){
		selisihDimensi3Text.style.backgroundColor = "yellow";
		//alert("Dimensi Mobil pada Order 3 Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		selisihDimensi3Text.style.backgroundColor = "#D3D3D3";
	}*/
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
	/*if(selisihDimensi<0){
		selisihDimensi4Text.style.backgroundColor = "yellow";
		//alert("Dimensi Mobil pada Order 4 Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		selisihDimensi4Text.style.backgroundColor = "#D3D3D3";
	}*/
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
	/*if(selisihDimensi<0){
		selisihDimensi5Text.style.backgroundColor = "yellow";
		//alert("Dimensi Mobil pada Order 5 Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		selisihDimensi5Text.style.backgroundColor = "#D3D3D3";
	}*/
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
	var up1 = document.getElementById("up1");
	var up2 = document.getElementById("up2");
	var up3 = document.getElementById("up3");
	var up4 = document.getElementById("up4");
	var up5 = document.getElementById("up5");
	var amt1 = document.getElementById("amt1");
	var amt2 = document.getElementById("amt2");
	var amt3 = document.getElementById("amt3");
	var amt4 = document.getElementById("amt4");
	var amt5 = document.getElementById("amt5");

	var tblOrder = document.getElementById("tblOrder");
	var tblOrderItemFixed = document.getElementById("tblOrderItemFixed");
	
	var productQty = 
		parseFloat(document.getElementById("productQty").value);
	
	up1.value = "0";
	up2.value = "0";
	up3.value = "0";
	up4.value = "0";
	up5.value = "0";
	amt1.value = "0";
	amt2.value = "0";
	amt3.value = "0";
	amt4.value = "0";
	amt5.value = "0";
	
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
    var poNumber1CurrentMonth = document.getElementById("poNumber1CurrentMonth").value;
    var poNumber2CurrentMonth = document.getElementById("poNumber2CurrentMonth").value;
    var poNumber3CurrentMonth = document.getElementById("poNumber3CurrentMonth").value;
    var poNumber4CurrentMonth = document.getElementById("poNumber4CurrentMonth").value;
    var poNumber5CurrentMonth = document.getElementById("poNumber5CurrentMonth").value;
    var poNumber1NextMonth = document.getElementById("poNumber1NextMonth").value;
    var poNumber2NextMonth = document.getElementById("poNumber2NextMonth").value;
    var poNumber3NextMonth = document.getElementById("poNumber3NextMonth").value;
    var poNumber4NextMonth = document.getElementById("poNumber4NextMonth").value;
    var poNumber5NextMonth = document.getElementById("poNumber5NextMonth").value;
    
    var p = periode.split(" ");
    var month = p[0];
    var year = p[1];
    var minDate = '2017-01-01';
    var maxDate = '2117-12-31';
    var monthIndex = "00"; 

	var currentdate = new Date();
	var dayCurrent = currentdate.getDate();
	var monthCurrent = currentdate.getMonth()+1;
    
    if(month === "Januari"){
    	if(monthCurrent==1){
    		if(dayCurrent<10){
            	minDate = year + "-01-0" + dayCurrent;
    		}
    		else{
    			minDate = year + "-01-" + dayCurrent;
    		}
    	}
    	else{
        	minDate = year + "-01-01";
    	}
    	maxDate = year + "-01-31";
    	monthIndex = "01";
    }
    else if(month === "Pebruari"){
    	if(monthCurrent==2){
    		if(dayCurrent<10){
            	minDate = year + "-02-0" + dayCurrent;
    		}
    		else{
    			minDate = year + "-02-" + dayCurrent;
    		}
    	}
    	else{
        	minDate = year + "-02-01";
    	}
    	maxDate = year + "-02-28";
    	monthIndex = "02";
    }
    else if(month === "Maret"){
    	if(monthCurrent==3){
    		if(dayCurrent<10){
            	minDate = year + "-03-0" + dayCurrent;
    		}
    		else{
    			minDate = year + "-03-" + dayCurrent;
    		}
    	}
    	else{
        	minDate = year + "-03-01";
    	}
    	maxDate = year + "-03-31";
    	monthIndex = "03";
    }
    else if(month === "April"){
    	if(monthCurrent==4){
    		if(dayCurrent<10){
            	minDate = year + "-04-0" + dayCurrent;
    		}
    		else{
    			minDate = year + "-04-" + dayCurrent;
    		}
    	}
    	else{
        	minDate = year + "-04-01";
    	}
    	maxDate = year + "-04-30";
    	monthIndex = "04";
    }
    else if(month === "Mei"){
    	if(monthCurrent==5){
    		if(dayCurrent<10){
            	minDate = year + "-05-0" + dayCurrent;
    		}
    		else{
    			minDate = year + "-05-" + dayCurrent;
    		}
    	}
    	else{
        	minDate = year + "-05-01";
    	}
    	maxDate = year + "-05-31";
    	monthIndex = "05";
    }
    else if(month === "Juni"){
    	if(monthCurrent==6){
    		if(dayCurrent<10){
            	minDate = year + "-06-0" + dayCurrent;
    		}
    		else{
    			minDate = year + "-06-" + dayCurrent;
    		}
    	}
    	else{
        	minDate = year + "-06-01";
    	}
    	maxDate = year + "-06-30";
    	monthIndex = "06";
    }
    else if(month === "Juli"){
    	if(monthCurrent==7){
    		if(dayCurrent<10){
            	minDate = year + "-07-0" + dayCurrent;
    		}
    		else{
    			minDate = year + "-07-" + dayCurrent;
    		}
    	}
    	else{
        	minDate = year + "-07-01";
    	}
    	maxDate = year + "-07-31";
    	monthIndex = "07";
    }
    else if(month === "Agustus"){
    	if(monthCurrent==8){
    		if(dayCurrent<10){
            	minDate = year + "-08-0" + dayCurrent;
    		}
    		else{
    			minDate = year + "-08-" + dayCurrent;
    		}
    	}
    	else{
        	minDate = year + "-08-01";
    	}
    	maxDate = year + "-08-31";
    	monthIndex = "08";
    }
    else if(month === "September"){
    	if(monthCurrent==9){
    		if(dayCurrent<10){
            	minDate = year + "-09-0" + dayCurrent;
    		}
    		else{
    			minDate = year + "-09-" + dayCurrent;
    		}
    	}
    	else{
        	minDate = year + "-09-01";
    	}
    	maxDate = year + "-09-30";
    	monthIndex = "09";
    }
    else if(month === "Oktober"){
    	if(monthCurrent==10){
    		if(dayCurrent<10){
            	minDate = year + "-10-0" + dayCurrent;
    		}
    		else{
    			minDate = year + "-10-" + dayCurrent;
    		}
    	}
    	else{
        	minDate = year + "-10-01";
    	}
    	maxDate = year + "-10-31";
    	monthIndex = "10";
    }
    else if(month === "November"){
    	if(monthCurrent==11){
    		if(dayCurrent<10){
            	minDate = year + "-11-0" + dayCurrent;
    		}
    		else{
    			minDate = year + "-11-" + dayCurrent;
    		}
    	}
    	else{
        	minDate = year + "-11-01";
    	}
    	maxDate = year + "-11-30";
    	monthIndex = "11";
    }
    else if(month === "Desember"){
    	if(monthCurrent==12){
    		if(dayCurrent<10){
            	minDate = year + "-12-0" + dayCurrent;
    		}
    		else{
    			minDate = year + "-12-" + dayCurrent;
    		}
    	}
    	else{
        	minDate = year + "-12-01";
    	}
    	maxDate = year + "-12-31";
    	monthIndex = "12";
    } 
    
    poDate1.min = minDate;
    poDate1.max = maxDate;
    poDate1.value = minDate;
    poDate2.min = minDate;
    poDate2.max = maxDate;
    poDate2.value = minDate;
    poDate3.min = minDate;
    poDate3.max = maxDate;
    poDate3.value = minDate;
    poDate4.min = minDate;
    poDate4.max = maxDate;
    poDate4.value = minDate;
    poDate5.min = minDate;
    poDate5.max = maxDate;
    poDate5.value = minDate;
    
    //PO201801009/AN00201
    console.log("poNumber1CurrentMonth: " + poNumber1CurrentMonth);
    console.log("poNumber1NextMonth: " + poNumber1NextMonth);
    //console.log("monthIndex: " + monthIndex);
    if(poNumber1CurrentMonth.substring(6, 8)==monthIndex){
        poNumber1.value = poNumber1CurrentMonth;
        poNumber2.value = poNumber2CurrentMonth;
        poNumber3.value = poNumber3CurrentMonth;
        poNumber4.value = poNumber4CurrentMonth;
        poNumber5.value = poNumber5CurrentMonth;
    }
    else if(poNumber1NextMonth.substring(6, 8)==monthIndex){
        poNumber1.value = poNumber1NextMonth;
        poNumber2.value = poNumber2NextMonth;
        poNumber3.value = poNumber3NextMonth;
        poNumber4.value = poNumber4NextMonth;
        poNumber5.value = poNumber5NextMonth;
    }
    else{
    	po1 = poNumber1.value;
    	po1 = po1.replaceAt(2, "---------");
        //po1 = po1.replaceAt(6, monthIndex);
        //po1 = po1.replaceAt(2, year);
        poNumber1.value = po1;
        po2 = poNumber2.value;
    	po2 = po2.replaceAt(2, "---------");
        //po2 = po2.replaceAt(6, monthIndex);
        //po2 = po2.replaceAt(2, year);
        poNumber2.value = po2;
        po3 = poNumber3.value;
    	po3 = po3.replaceAt(2, "---------");
        //po3 = po3.replaceAt(6, monthIndex);
        //po3 = po3.replaceAt(2, year);
        poNumber3.value = po3;
        po4 = poNumber4.value;
    	po4 = po4.replaceAt(2, "---------");
        //po4 = po4.replaceAt(6, monthIndex);
        //po4 = po4.replaceAt(2, year);
        poNumber4.value = po4;
        po5 = poNumber5.value;
    	po5 = po5.replaceAt(2, "---------");
        //po5 = po5.replaceAt(6, monthIndex);
        //po5 = po5.replaceAt(2, year);
        poNumber5.value = po5;
    }
    
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
	
	if(cmob.checked){
    	if(firstLoadCMOB){
    		firstLoadCMOB = false;
    		generateCMOB();
    	}
    	else{
    		for(var idxRow = 1; idxRow<=productQty; idxRow++){
            	var cmob = parseFloat(tblOrder.rows[idxRow].cells[0].children[11].value);
            	if(jumlahOrder==1){
                	tblOrder.rows[idxRow].cells[0].children[0].value =
                		cmob;
                }
        		else if(jumlahOrder==2){
        			var qty = Math.ceil(cmob/2);
                	tblOrder.rows[idxRow].cells[0].children[0].value =
                		qty;
                	tblOrder.rows[idxRow].cells[1].children[0].value =
                		qty;
        		}
        		else if(jumlahOrder==3){
        			var qty = Math.ceil(cmob/3);
                	tblOrder.rows[idxRow].cells[0].children[0].value =
                		qty;
                	tblOrder.rows[idxRow].cells[1].children[0].value =
                		qty;
                	tblOrder.rows[idxRow].cells[2].children[0].value =
                		qty;
        		}
        		else if(jumlahOrder==4){
        			var qty = Math.ceil(cmob/4);
                	tblOrder.rows[idxRow].cells[0].children[0].value =
                		qty;
                	tblOrder.rows[idxRow].cells[1].children[0].value =
                		qty;
                	tblOrder.rows[idxRow].cells[2].children[0].value =
                		qty;
                	tblOrder.rows[idxRow].cells[3].children[0].value =
                		qty;
        		}
        		else if(jumlahOrder==5){
        			var qty = Math.ceil(cmob/5);
                	tblOrder.rows[idxRow].cells[0].children[0].value =
                		qty;
                	tblOrder.rows[idxRow].cells[1].children[0].value =
                		qty;
                	tblOrder.rows[idxRow].cells[2].children[0].value =
                		qty;
                	tblOrder.rows[idxRow].cells[3].children[0].value =
                		qty;
                	tblOrder.rows[idxRow].cells[4].children[0].value =
                		qty;
        		}
        	}
    	}
    }

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

			if(idxRow!==0){

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
    				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value);
    			
    			tblOrder.rows[idxRow].cells[5].children[0].value =
    				formatTextValue(totQtyPerLine);
    			tblOrder.rows[idxRow].cells[6].children[0].value =
    				formatTextValue(totAmountPerLine);
    			
    			totQty += totQtyPerLine;
    			totAmount += totAmountPerLine;
    			
    			totAmount1 += 
    				(qty1
    					*parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value));
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
    		
			if(idxRow!==0){

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
    				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value))
    				+ (qty2
    	    		* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value));
    			
    			tblOrder.rows[idxRow].cells[5].children[0].value =
    				formatTextValue(totQtyPerLine);
    			tblOrder.rows[idxRow].cells[6].children[0].value =
    				formatTextValue(totAmountPerLine);
    			
    			totQty += totQtyPerLine;
    			totAmount += totAmountPerLine;

    			totAmount1 += 
    				(qty1
    					*parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value));
    			totAmount2 += 
    				(qty2
    					*parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value));
    			
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
			
			if(idxRow!==0){

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
    				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value))
    				+ (qty2
    				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value))
    				+ (qty3
    	    		* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value));
    			
    			tblOrder.rows[idxRow].cells[5].children[0].value =
    				formatTextValue(totQtyPerLine);
    			tblOrder.rows[idxRow].cells[6].children[0].value =
    				formatTextValue(totAmountPerLine);
    			
    			totQty += totQtyPerLine;
    			totAmount += totAmountPerLine;

    			totAmount1 += 
    				(qty1
    				*parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value));
    			totAmount2 += 
    				(qty2
    				*parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value));
    			totAmount3 += 
    				(qty3
    				*parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value));
        		
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
			
			if(idxRow!==0){

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
    				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value))
    				+ (qty2
	   				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value))
	   				+ (qty3
	   				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value))
	   				+ (qty4
	   	    		* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value));
    			
    			tblOrder.rows[idxRow].cells[5].children[0].value =
    				formatTextValue(totQtyPerLine);
    			tblOrder.rows[idxRow].cells[6].children[0].value =
    				formatTextValue(totAmountPerLine);
    			
    			totQty += totQtyPerLine;
    			totAmount += totAmountPerLine;

    			totAmount1 += 
    				(qty1
    					*parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value));
    			totAmount2 += 
    				(qty2
    					*parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value));
    			totAmount3 += 
    				(qty3
    					*parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value));
    			totAmount4 += 
    				(qty4
    					*parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value));
        		
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
   			
    		if(idxRow!==0){

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
    				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value))
    				+ (qty2
    				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value))
    				+ (qty3
	   				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value))
	   				+ (qty4
	   				* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value))
	   				+ (qty5
	   	    		* parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value));
    			
    			tblOrder.rows[idxRow].cells[5].children[0].value =
    				formatTextValue(totQtyPerLine);
    			tblOrder.rows[idxRow].cells[6].children[0].value =
    				formatTextValue(totAmountPerLine);
    			
    			totQty += totQtyPerLine;
    			totAmount += totAmountPerLine;

        		totAmount1 += 
        			(qty1
        			*parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value));
        		totAmount2 += 
        			(qty2
        			*parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value));
        		totAmount3 += 
        			(qty3
        			*parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value));
        		totAmount4 += 
        			(qty4
        			*parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value));
        		totAmount5 += 
        			(qty5
        			*parseFloat(tblOrder.rows[idxRow].cells[8].children[0].value));
        		
    		}
    		
    	}
    }
    	
	if(jumlahOrder>0){
		
		dimensiOrder1.value = do1;
		dimensiOrder1Text.value = formatTextValue(do1);
		var sd1 = 0;
		sd1 =  parseFloat(dimensiMobil1.value - do1);
		selisihDimensi1.value = sd1;
		selisihDimensi1Text.value = formatTextValue(sd1);
		/*if(sd1<0){
			selisihDimensi1Text.style.backgroundColor = "yellow";
			//alert("Dimensi Mobil pada Order 1 Tidak Mencukupi. Mohon Periksa Kembali");
		}
		else{
			selisihDimensi1Text.style.backgroundColor = "#D3D3D3";
		}*/
		
		var sl1 = 0;
    	sl1 = sisaLimitInit - totAmount1;
    	sisaLimit1.value = formatTextValue(sl1);
    	if(sl1<0){
    		//sisaLimit1.style.backgroundColor = "yellow";
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
    		/*if(sd2<0){
    			selisihDimensi2Text.style.backgroundColor = "yellow";
    			//alert("Dimensi Mobil pada Order 2 Tidak Mencukupi. Mohon Periksa Kembali");
    		}
    		else{
    			selisihDimensi2Text.style.backgroundColor = "#D3D3D3";
    		}*/

    		var sl2 = 0;
        	sl2 = sl1 - totAmount2;
        	sisaLimit2.value = formatTextValue(sl2);
        	if(sl2<0){
        		//sisaLimit2.style.backgroundColor = "yellow";
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
	    		/*if(sd3<0){
	    			selisihDimensi3Text.style.backgroundColor = "yellow";
	    			//alert("Dimensi Mobil pada Order 3 Tidak Mencukupi. Mohon Periksa Kembali");
	    		}
	    		else{
	    			selisihDimensi3Text.style.backgroundColor = "#D3D3D3";
	    		}*/

        		var sl3 = 0;
            	sl3 = sl2 - totAmount3;
            	sisaLimit3.value = formatTextValue(sl3);
            	if(sl3<0){
            		//sisaLimit3.style.backgroundColor = "yellow";
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
		    		/*if(sd4<0){
		    			selisihDimensi4Text.style.backgroundColor = "yellow";
		    			//alert("Dimensi Mobil pada Order 4 Tidak Mencukupi. Mohon Periksa Kembali");
		    		}
		    		else{
		    			selisihDimensi4Text.style.backgroundColor = "#D3D3D3";
		    		}*/

	        		var sl4 = 0;
	            	sl4 = sl3 - totAmount4;
	            	sisaLimit4.value = formatTextValue(sl4);
	            	if(sl4<0){
	            		//sisaLimit4.style.backgroundColor = "yellow";
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
		        		/*if(sd5<0){
		        			selisihDimensi5Text.style.backgroundColor = "yellow";
		        			//alert("Dimensi Mobil pada Order 5 Tidak Mencukupi. Mohon Periksa Kembali");
		        		}
		        		else{
		        			selisihDimensi5Text.style.backgroundColor = "#D3D3D3";
		        		}*/

		        		var sl5 = 0;
		            	sl5 = sl4 - totAmount5;
		            	sisaLimit5.value = formatTextValue(sl5);
		            	if(sl5<0){
		            		//sisaLimit5.style.backgroundColor = "yellow";
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
	/*if(sl<0){
		sisaLimitText.style.backgroundColor = "yellow";
		//alert("Sisa Limit Tidak Mencukupi. Mohon Periksa Kembali");
	}
	else{
		sisaLimitText.style.backgroundColor = "#D3D3D3";
	}*/
	
}

function addMobil1(){
	var mobilInput = document.getElementById("mobil1Input");
	mobilInput.style.display = "block";
	
    return false;
}

function addMobil2(){
	var mobilInput = document.getElementById("mobil2Input");
	mobilInput.style.display = "block";
	
    return false;
}

function addMobil3(){
	var mobilInput = document.getElementById("mobil3Input");
	mobilInput.style.display = "block";
	
    return false;
}

function addMobil4(){
	var mobilInput = document.getElementById("mobil4Input");
	mobilInput.style.display = "block";
	
    return false;
}

function addMobil5(){
	var mobilInput = document.getElementById("mobil5Input");
	mobilInput.style.display = "block";
	
    return false;
}

function deleteMobil12(){
    var rowMobil = document.getElementById("rowMobil12");
    rowMobil.style.display = "none";
    return;
}


function deleteMobil13(){
    var rowMobil = document.getElementById("rowMobil13");
    rowMobil.style.display = "none";
    return;
}


function deleteMobil14(){
    var rowMobil = document.getElementById("rowMobil14");
    rowMobil.style.display = "none";
    return;
}


function deleteMobil15(){
    var rowMobil = document.getElementById("rowMobil15");
    rowMobil.style.display = "none";
    //deleteMobil.style.display = "table-row";
    return;
}

function cancelMobil1(){
    var mobil1Input = document.getElementById("mobil1Input");
    mobil1Input.style.display = "none";
    return false;
}

function saveMobil1(){
    var mobilInput = document.getElementById("mobil1Input");
    var tblMobil = document.getElementById("tblMobil1");
    var jumlahMobil = document.getElementById("jumlahMobil1");
    var dimensiMobil = document.getElementById("dimensiMobil1");
    var dimensiMobilText = document.getElementById("dimensiMobil1Text");
    var dimensiOrder = 0;
    dimensiOrder = parseFloat(document.getElementById("dimensiOrder1").value);
    var selisihDimensi = document.getElementById("selisihDimensi1");
    var selisihDimensiText = document.getElementById("selisihDimensi1Text");
    var dm = 0;
    var jumlahMobilValue = 0;
    var rowCount = tblMobil.rows.length - 1;
    for(var idxRow=1; idxRow<=rowCount; idxRow++){
    	var panjang = 0;
    	panjang = parseFloat(tblMobil.rows[idxRow].cells[1].children[0].value);
        var lebar = 0;
        lebar = parseFloat(tblMobil.rows[idxRow].cells[2].children[0].value);
        var tinggi = 0;
        tinggi = parseFloat(tblMobil.rows[idxRow].cells[3].children[0].value);
        var jumlah = 0;
        jumlah = parseFloat(tblMobil.rows[idxRow].cells[4].children[0].value);
        jumlahMobilValue += jumlah;
        dm += (panjang*lebar*tinggi*jumlah);
    }
    jumlahMobil.value = formatTextValue(jumlahMobilValue);
    dimensiMobil.value = dm;
    dimensiMobilText.value = formatTextValue(dm);
    selisihDimensi.value = dm - dimensiOrder;
    selisihDimensiText.value = formatTextValue(dm - dimensiOrder);
    mobilInput.style.display = "none"; 
    return false;
}

function saveMobil2(){
    var mobilInput = document.getElementById("mobil2Input");
    var tblMobil = document.getElementById("tblMobil2");
    var jumlahMobil = document.getElementById("jumlahMobil2");
    var dimensiMobil = document.getElementById("dimensiMobil2");
    var dimensiMobilText = document.getElementById("dimensiMobil2Text");
    var dimensiOrder = 0;
    dimensiOrder = parseFloat(document.getElementById("dimensiOrder2").value);
    var selisihDimensi = document.getElementById("selisihDimensi2");
    var selisihDimensiText = document.getElementById("selisihDimensi2Text");
    var dm = 0;
    var jumlahMobilValue = 0;
    var rowCount = tblMobil.rows.length - 1;
    for(var idxRow=1; idxRow<=rowCount; idxRow++){
    	var panjang = 0;
    	panjang = parseFloat(tblMobil.rows[idxRow].cells[1].children[0].value);
        var lebar = 0;
        lebar = parseFloat(tblMobil.rows[idxRow].cells[2].children[0].value);
        var tinggi = 0;
        tinggi = parseFloat(tblMobil.rows[idxRow].cells[3].children[0].value);
        var jumlah = 0;
        jumlah = parseFloat(tblMobil.rows[idxRow].cells[4].children[0].value);
        jumlahMobilValue += jumlah;
        dm += (panjang*lebar*tinggi*jumlah);
    }
    jumlahMobil.value = formatTextValue(jumlahMobilValue);
    dimensiMobil.value = dm;
    dimensiMobilText.value = formatTextValue(dm);
    selisihDimensi.value = dm - dimensiOrder;
    selisihDimensiText.value = formatTextValue(dm - dimensiOrder);
    mobilInput.style.display = "none"; 
    return false;
}

function saveMobil3(){
    var mobilInput = document.getElementById("mobil3Input");
    var tblMobil = document.getElementById("tblMobil3");
    var jumlahMobil = document.getElementById("jumlahMobil3");
    var dimensiMobil = document.getElementById("dimensiMobil3");
    var dimensiMobilText = document.getElementById("dimensiMobil3Text");
    var dimensiOrder = 0;
    dimensiOrder = parseFloat(document.getElementById("dimensiOrder3").value);
    var selisihDimensi = document.getElementById("selisihDimensi3");
    var selisihDimensiText = document.getElementById("selisihDimensi3Text");
    var dm = 0;
    var jumlahMobilValue = 0;
    var rowCount = tblMobil.rows.length - 1;
    for(var idxRow=1; idxRow<=rowCount; idxRow++){
    	var panjang = 0;
    	panjang = parseFloat(tblMobil.rows[idxRow].cells[1].children[0].value);
        var lebar = 0;
        lebar = parseFloat(tblMobil.rows[idxRow].cells[2].children[0].value);
        var tinggi = 0;
        tinggi = parseFloat(tblMobil.rows[idxRow].cells[3].children[0].value);
        var jumlah = 0;
        jumlah = parseFloat(tblMobil.rows[idxRow].cells[4].children[0].value);
        jumlahMobilValue += jumlah;
        dm += (panjang*lebar*tinggi*jumlah);
    }
    jumlahMobil.value = formatTextValue(jumlahMobilValue);
    dimensiMobil.value = dm;
    dimensiMobilText.value = formatTextValue(dm);
    selisihDimensi.value = dm - dimensiOrder;
    selisihDimensiText.value = formatTextValue(dm - dimensiOrder);
    mobilInput.style.display = "none"; 
    return false;
}

function saveMobil4(){
    var mobilInput = document.getElementById("mobil4Input");
    var tblMobil = document.getElementById("tblMobil4");
    var jumlahMobil = document.getElementById("jumlahMobil4");
    var dimensiMobil = document.getElementById("dimensiMobil4");
    var dimensiMobilText = document.getElementById("dimensiMobil4Text");
    var dimensiOrder = 0;
    dimensiOrder = parseFloat(document.getElementById("dimensiOrder4").value);
    var selisihDimensi = document.getElementById("selisihDimensi4");
    var selisihDimensiText = document.getElementById("selisihDimensi4Text");
    var dm = 0;
    var jumlahMobilValue = 0;
    var rowCount = tblMobil.rows.length - 1;
    for(var idxRow=1; idxRow<=rowCount; idxRow++){
    	var panjang = 0;
    	panjang = parseFloat(tblMobil.rows[idxRow].cells[1].children[0].value);
        var lebar = 0;
        lebar = parseFloat(tblMobil.rows[idxRow].cells[2].children[0].value);
        var tinggi = 0;
        tinggi = parseFloat(tblMobil.rows[idxRow].cells[3].children[0].value);
        var jumlah = 0;
        jumlah = parseFloat(tblMobil.rows[idxRow].cells[4].children[0].value);
        jumlahMobilValue += jumlah;
        dm += (panjang*lebar*tinggi*jumlah);
    }
    jumlahMobil.value = formatTextValue(jumlahMobilValue);
    dimensiMobil.value = dm;
    dimensiMobilText.value = formatTextValue(dm);
    selisihDimensi.value = dm - dimensiOrder;
    selisihDimensiText.value = formatTextValue(dm - dimensiOrder);
    mobilInput.style.display = "none"; 
    return false;
}

function saveMobil5(){
    var mobilInput = document.getElementById("mobil5Input");
    var tblMobil = document.getElementById("tblMobil5");
    var jumlahMobil = document.getElementById("jumlahMobil5");
    var dimensiMobil = document.getElementById("dimensiMobil5");
    var dimensiMobilText = document.getElementById("dimensiMobil5Text");
    var dimensiOrder = 0;
    dimensiOrder = parseFloat(document.getElementById("dimensiOrder5").value);
    var selisihDimensi = document.getElementById("selisihDimensi5");
    var selisihDimensiText = document.getElementById("selisihDimensi5Text");
    var dm = 0;
    var jumlahMobilValue = 0;
    var rowCount = tblMobil.rows.length - 1;
    for(var idxRow=1; idxRow<=rowCount; idxRow++){
    	var panjang = 0;
    	panjang = parseFloat(tblMobil.rows[idxRow].cells[1].children[0].value);
        var lebar = 0;
        lebar = parseFloat(tblMobil.rows[idxRow].cells[2].children[0].value);
        var tinggi = 0;
        tinggi = parseFloat(tblMobil.rows[idxRow].cells[3].children[0].value);
        var jumlah = 0;
        jumlah = parseFloat(tblMobil.rows[idxRow].cells[4].children[0].value);
        jumlahMobilValue += jumlah;
        dm += (panjang*lebar*tinggi*jumlah);
    }
    jumlahMobil.value = formatTextValue(jumlahMobilValue);
    dimensiMobil.value = dm;
    dimensiMobilText.value = formatTextValue(dm);
    selisihDimensi.value = dm - dimensiOrder;
    selisihDimensiText.value = formatTextValue(dm - dimensiOrder);
    mobilInput.style.display = "none"; 
    return false;
}