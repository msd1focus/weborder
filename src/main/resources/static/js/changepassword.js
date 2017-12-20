window.onload = function(){

	/*var messageInfo = document.getElementById("messageInfo").value;
	var messageDiv = document.getElementById("messageDiv");
	console.log("messageInfo: " + messageInfo);
	if(messageInfo=="Success"){
		messageDiv.style.display = "block";
	}*/
}

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