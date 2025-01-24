const contact_form = document.getElementById("btn-contact");
contact_form.addEventListener("click", (e) => {
	e.preventDefault();
	const name = document.getElementById("name").value;
	const email = document.getElementById("email").value;
	const message = document.getElementById("message").value;
	if (name === "" || email === "" || message === "") {
		alert("Please fill in all fields");
		return;
	}
	alert(
		`Thank you for your message, ${name}! We will get back to you as soon as possible.`
	);
	document.getElementById("name").value = "";
	document.getElementById("email").value = "";
	document.getElementById("message").value = "";
});
