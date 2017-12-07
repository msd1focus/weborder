/*function companyChange(obj){
	var company = obj.value;
	var name = document.getElementById("name").value;
	var username = document.getElementById("username");
	username.value = company + name;
}

function nameChange(obj){
	var name = obj.value;
	var company = document.getElementById("company").value;
	var username = document.getElementById("username");
	console.log("name: " + name);
	console.log("company: " + company);
	username.value = company + name;
}*/

function submitLogin(obj){
	var name = document.getElementById("name").value;
	var company = document.getElementById("company").value;
	var username = document.getElementById("username");
	console.log("name: " + name);
	console.log("company: " + company);
	username.value = company + name;
}