$('.ui.tiny.modal').modal({
	blurring: true
}).modal('attach events', '.delete.button', 'show');

$('.ui.mini.modal').modal({}).modal('attach events', '.deleteComment.button', 'show');
//$('.ui.small.modal').modal({ closable: false }).modal('attach events', '.editComment.button', 'show');


$('.edit-trigger').click(function(event){
	var triggerItem = $(this).attr('data-id');   

	$('#modal-' + triggerItem).modal('show');
});




// show tooltip on hover
$('.edit').popup({});
$('.delete').popup({});



// tiny mce init
tinymce.init({
	selector: '#campDescription',
	plugins: 'advlist autolink lists link image charmap print preview hr anchor pagebreak',
	toolbar_mode: 'floating',
});

// animated login

const inputs = document.querySelectorAll(".div .input");


function addcl() {
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl() {
	let parent = this.parentNode.parentNode;
	if (this.value == "") {
		parent.classList.remove("focus");
	}
}


inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});


// login validation
// Selecting form elements
const username = document.getElementById('username')
const password = document.getElementById('password')
const email = document.getElementById('email')
const firstName = document.getElementById('firstName')
const lastName = document.getElementById('lastName')

const comment = document.getElementById('comment')
const editComment = document.getElementById('editComment')
const error = document.getElementById('error')
const uierror = document.getElementById('uierror')

const campName = document.getElementById('campName')
const campPrice = document.getElementById('campPrice')
const campImageUrl = document.getElementById('campImageUrl')
const campDescription = document.getElementById('campDescription')


//login validate
function validateLogin() {
	if(username.value.trim() === '' || username.value == null) {
		error.innerHTML = `<div class="alert alert-danger"><strong><i class="fas fa-exclamation-triangle"></i> Username is required</strong></div>`;
		return false;
	}

	if(password.value.trim() === '' || password.value == null) {
		error.innerHTML = `<div class="alert alert-danger"><strong><i class="fas fa-exclamation-triangle"></i> Password is required</strong></div>`;
		return false;
	}
}

// validate forgot password field
function validateForgot() {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if(email.value.trim() === '' || email.value == null) {
		error.innerHTML = `<div class="alert alert-danger"><strong><i class="fas fa-exclamation-triangle"></i> Email is required</strong></div>`;
		return false;
	}

	if (!re.test(String(email.value.trim()).toLowerCase())) {
    error.innerHTML = `<div class="alert alert-danger"><strong><i class="fas fa-exclamation-triangle"></i> Email is not valid!</strong></div>`;
		return false;
  } 
}


// validate signup

function validateSignUp() {
	const usernameRegex = /^[a-zA-Z0-9]+$/;
	const nameRegex = /^[a-zA-Z\-]+$/;
	const urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if(username.value.trim() === '' || username.value == null) {
		error.innerHTML = `<div class="alert alert-danger"><strong><i class="fas fa-exclamation-triangle"></i> Username is required!</strong></div>`;
		return false;
	}
	else if (!usernameRegex.test(String(username.value.trim()).toLowerCase())) {
		error.innerHTML = `<div class="alert alert-danger"><strong><i class="fas fa-exclamation-triangle"></i> Name should only contains alphanumeric characters!</strong></div>`;
		return false;
	}

	else if(password.value === '' || password.value == null) {
		error.innerHTML = `<div class="alert alert-danger"><strong><i class="fas fa-exclamation-triangle"></i> Password is required!</strong></div>`;
		return false;
	}

	else if(password.value.length < 6) {
		error.innerHTML = `<div class="alert alert-danger"><strong><i class="fas fa-exclamation-triangle"></i> Password needs to be at least 6 characters!</strong></div>`;
		return false;
	}

	else if(email.value.trim() === '' || email.value == null) {
		error.innerHTML = `<div class="alert alert-danger"><strong><i class="fas fa-exclamation-triangle"></i> Email is required</strong></div>`;
		return false;
	}

	else if (!re.test(String(email.value.trim()).toLowerCase())) {
    error.innerHTML = `<div class="alert alert-danger"><strong><i class="fas fa-exclamation-triangle"></i> Email is not valid!</strong></div>`;
		return false;
  } 

	else if(firstName.value.trim() === '' || firstName.value == null) {
		error.innerHTML = `<div class="alert alert-danger"><strong><i class="fas fa-exclamation-triangle"></i> Firstname is required!</strong></div>`;
		return false;
	}

	else if (!nameRegex.test(String(firstName.value.trim()).toLowerCase())) {
		error.innerHTML = `<div class="alert alert-danger"><strong><i class="fas fa-exclamation-triangle"></i> Your first name is not valid. Only characters A-Z, a-z and '-' are  acceptable.</strong></div>`;
		return false;
	}

	else if(lastName.value.trim() === '' || firstName.value == null) {
		error.innerHTML = `<div class="alert alert-danger"><strong><i class="fas fa-exclamation-triangle"></i> Firstname is required!</strong></div>`;
		return false;
	}

	else if (!nameRegex.test(String(lastName.value.trim()).toLowerCase())) {
		error.innerHTML = `<div class="alert alert-danger"><strong><i class="fas fa-exclamation-triangle"></i> Your last name is not valid. Only characters A-Z, a-z and '-' are  acceptable.</strong></div>`;
		return false;
	}

	

}

//validate comment
function validateComment() {
	if(comment.value.trim() === '' || comment.value == null) {
		error.innerHTML = `<div class="alert alert-danger"><strong><i class="fas fa-exclamation-triangle"></i> Comment can not be empty!</strong></div>`;
		return false;
	}
	else if(comment.value.trim().length < 3) {
		error.innerHTML = `<div class="alert alert-danger"><strong><i class="fas fa-exclamation-triangle"></i> Comment is too small</strong></div>`;
		return false;
	}
}

function validateEditComment() {
	if(editComment.value.trim() === '' || editComment.value == null) {
		uierror.innerHTML = `<div class="ui error message"><strong><i class="fas fa-exclamation-triangle"></i> Comment can not be empty!</strong></div>`;
		return false;
	}
	else if(editComment.value.trim().length < 3) {
		uierror.innerHTML = `<div class="ui error message"><strong><i class="fas fa-exclamation-triangle"></i> Comment is too small</strong></div>`;
		return false;
	}
}

// validate camp
function validateCreatCamp() {
	const campNameRegex = /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/;
	const campPriceRegex = /^[0-9]*$/;
	const urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

	if(campName.value.trim() === '' || campName.value == null) {
		error.innerHTML = `<div class="alert alert-danger"><strong><i class="fas fa-exclamation-triangle"></i> Camp Name is required!</strong></div>`;
		return false;
	}

	else if(campName.value.trim().length < 10) {
		error.innerHTML = `<div class="alert alert-danger"><strong><i class="fas fa-exclamation-triangle"></i> Camp Name is too Small!</strong></div>`;
		return false;
	}

	else if (!campNameRegex.test(String(campName.value.trim()).toLowerCase())) {
		error.innerHTML = `<div class="alert alert-danger"><strong><i class="fas fa-exclamation-triangle"></i> Name should only contains alphanumeric characters!</strong></div>`;
		return false;
	}

	else if(campPrice.value.trim() === '' ) {
		error.innerHTML = `<div class="alert alert-danger"><strong><i class="fas fa-exclamation-triangle"></i> Price can not be empty!</strong></div>`;
		return false;
	}

	else if (!urlRegex.test(String(campImageUrl.value.trim()).toLowerCase())) {
		error.innerHTML = `<div class="alert alert-danger"><strong><i class="fas fa-exclamation-triangle"></i> Picture Url is not valid</strong></div>`;
		return false;
	}

}
