var jenisPeriode = '';
var parameter = {};
$(document).ready(function() {
  
   
    $('#jenisReport').prop('selectedIndex',0);
    $('#periode').prop('selectedIndex',0);
    
});

jQuery(function ($) {
	//Jenis Report Change
	$("#jenisReport").change(function() {
	
	   var id = $("#jenisReport").val();
	   
		var data = {}
		data["input"] = id;
		
		if(id != ''){
			$.ajax({
				  type: "GET",
				  url: "/weborder/getParamterById",
				  data: data
			}).then(function(result) {
			  	parameter = result;
			});	   
		}
		
	   if(id == '' || parameter.jenisPeriode == '10'){
	   		$("#id").val('');
		    $("#periode").val('');
		   
		    $('#periode')
			    .find('option')
			    .remove()
			    .end()
			    .append('<option value="A">Select Periode</option>');
			 ;
	   }else{
	   		
	   	   $("#id").val(id);
		   $("#periode").val('');
		   
		   $('#periode')
			    .find('option')
			    .remove()
			    .end()
			    .append('<option value="">Select Periode</option>');
			;
		   
		  	$.ajax({
			  type: "GET",
			  url: "/weborder/generatePeriode",
			  data: data
			}).then(function(result) {
			  //console.log(result);
			  
			  	for(var a= 0; a <= result.length-1; a++){
			  	
					 var x = document.getElementById("periode");
					 var option = document.createElement("option");
					 option.text = result[a].periodeString;
					 option.value = result[a].periodeValue;
					 x.add(option);
			 	}
			});
	   }
	   
	});
	
	
	//Validasi
	function validasi(){
		
		var status = true;
		
		if($('#jenisReport').val() == ''){
			 $("#alertJenisReport").show();
			status = false;
		}else{
			$("#alertJenisReport").hide();
			 
			var id = $("#jenisReport").val();
		
			
			
			if(parameter.jenisPeriode != '10'){
				if($('#periode').val() == '' ){
					$("#alertPeriode").show();
					status = false;
				}else{
					 $("#alertPeriode").hide();
				}
			}
			 
		}
		
		return status;
		
	}
	
	//function button Download
	$("#buttonDownload").click(function() {
		
		if(validasi()){
			
			var id = $("#jenisReport").val();
			var custCode = $("#custCode").val();
			var periode =  $("#periode").val();
			
			var fileName = '';
			
			//jika jenis report None Periode
			if(parameter.jenisPeriode != '10'){
				 fileName = parameter.prefix+'_'+custCode+'_'+periode+parameter.jenisFile;
			}else{
				 fileName = parameter.prefix+'_'+custCode+parameter.jenisFile;
			}
			
			
			var data = {}
			data["id"] = id;
			data["fileName"] = fileName;
			
			//proses Download
			$.ajax({		
				  type: "GET",
				  url: "/weborder/downloadFile",
				  data: data,
	              xhrFields:{
	                 responseType: 'blob'
	              },
		       	  success: function (data) {
			            var a = document.createElement('a');
			            var url = window.URL.createObjectURL(data);
			            a.href = url;
			            a.download = fileName;
			            document.body.append(a);
			            a.click();
			            a.remove();
			            window.URL.revokeObjectURL(url);
			      },
				  error: function( xhr, textStatus, errorThrown ) {
			            alert("File "+ fileName+ " Tidak Ditemukan !");
			      }
		    });
			
		}
	});
});

