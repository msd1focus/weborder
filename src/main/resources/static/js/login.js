function submitLogin(obj){
	var name = document.getElementById("name").value;
	var company = document.getElementById("company").value;
	var username = document.getElementById("username");
	username.value = company + name;
}