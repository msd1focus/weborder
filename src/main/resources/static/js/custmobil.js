function readcsv(){
	console.log("read csv");
	var csvfile = document.getElementById("csvfile");
	var reader = new FileReader();
    var myfile = csvfile.files[0];
        
    if(!myfile){
        alert("No file selected.");
        return;
    }
    
    console.log("myfile: " + myfile);
    
    reader.readAsBinaryString(myfile);
    
    console.log("result: " + reader.result);
}