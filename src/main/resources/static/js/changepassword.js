function changePassword(obj){
	var isMatch = true;
	var newpassword = document.getElementById("newpassword").value;
	var repassword = document.getElementById("repassword").value;
	var alert = document.getElementById("alert");
	if(newpassword!==repassword){
		alert.style.display = "block";
		isMatch = false;
	}
	return isMatch;
}