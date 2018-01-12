function changePasswordUser(obj){
	var isMatch = true;
	var newpassword = document.getElementById("newpassword").value;
	var repassword = document.getElementById("repassword").value;
	var alert = document.getElementById("alert");
	var name = document.getElementById("name").value;
	var company = document.getElementById("company").value;
	var username = document.getElementById("username");
	username.value = company + name;
	if(newpassword!==repassword){
		alert.style.display = "block";
		isMatch = false;
	}
	return isMatch;
}