let eventDate = document.getElementsByClassName(`eventDate`);
let gallery = document.getElementsByClassName(`gallery`);
let hostName = document.getElementsByClassName(`hostName`);
let inviteContent = document.getElementsByClassName(`inviteContent`);
let invites = document.getElementById(`invites`);
let inviteRecipient = document.getElementsByClassName(`inviteRecipient`);
let inviteText = document.getElementById(`placeholderContent`);
let labels = document.getElementsByTagName(`label`);
let orgName = document.getElementsByClassName(`organizationName`);
let recipientNames = document.getElementsByClassName(`recipientName`);
let submittedCount = document.getElementById(`submittedCount`);
let submittedDate = document.getElementById(`submittedDate`);
let submittedHost = document.getElementById(`submittedHost`);
let submittedNames = document.getElementsByClassName(`submittedName`);
let submittedOrganization = document.getElementById(`submittedOrganization`);
let submittedURL = document.getElementById(`submittedURL`);
let websiteURL = document.getElementsByClassName(`websiteURL`);
let banner = document.getElementById(`banner`);
let banners = {};
let galleryImgs = [];

let loopedImages;
let childrenCount;
let needed;
let imgNum = 2;
let path = location.pathname;

// Add recipients to form
async function addRecipients(){
	let divToRemove;
	let newRecipient;

	childrenCount = Number(invites.children.length);
	needed = (submittedCount.value || 1) - childrenCount;

	if(needed === 0){
		return;
	}else if(needed > 0){
		for(let i = 0; i < needed; i++){
			newRecipient = inviteRecipient[0].cloneNode(true);

			newRecipient.className = `${newRecipient.className}`;
			newRecipient.id = `${newRecipient.className} ${childrenCount + 1}`;
			invites.appendChild(newRecipient);
			childrenCount++;
		}
	}else{
		for(let i = 0; i < Math.abs(needed); i++){
			divToRemove = document.getElementById(`inviteRecipient ${childrenCount}`);

			invites.removeChild(divToRemove);
			childrenCount--;
		}
	}
	return;
}

// Clear fields to prep for more invites
async function clearFields(){
	for(let i = 0; i < submittedNames.length; i++){
		submittedNames[i].value = ``;
	}

	submittedOrganization.value = ``;
	submittedDate.value = ``;
	submittedURL.value = ``;
	submittedHost.value = ``;

	return;
}

async function getRandNum(x, y){
	x = Math.ceil(x);
	y = Math.floor(y);

	return Math.floor(Math.random() * (y - x)) + x;
}

// Loop banners on index.html
async function loopBanners(time = 3000){
	loopedImages = setInterval(() => {
		banner && banner.setAttribute(`src`, banners[imgNum - 1].src);
		imgNum === 3 ? imgNum = 1 : imgNum++;
	}, time);
}

// Preload all images
async function preloadImages(){
	for(let i = 0; i < 3; i++){
		banners[i] = {
			src: `./images/banner${i + 1}.jpg`,
		}
	}
	
	for(let i = 0; i < gallery.length; i++){
		galleryImgs.push(gallery[i].getElementsByTagName(`img`)[0].src);
	}
}

async function rollover(image){
	let num = await getRandNum(0, 4);
	let replacement = galleryImgs[num];

	if(image.src === replacement){
		rollover(image);
	}else{
		image.src = replacement;
	}
}

// Print input variables in form
async function updateInvite(){
	let newInvite;
	let information = [];
		information.org = submittedOrganization.value;
		information.eventDate = submittedDate.value;
		information.websiteURL = submittedURL.value;
		information.hostName = submittedHost.value;

	for(let i = 0; i < submittedNames.length; i++){
		let name = submittedNames[i].value;

		information[i] = {
			name,
		};
	}

	for(let i = 0; i < information.length - 1; i++){
		newInvite = inviteContent[0].cloneNode(true);

		newInvite.className = `${newInvite.className}`;
		newInvite.id = `${newInvite.className} ${i + 1}`;

		inviteText.appendChild(newInvite);
	}

	await updateIndividualInvites(information);
	await clearFields();
	return false;
}

// Fill all invites with information
async function updateIndividualInvites(information){
	for(let i = 0; i < information.length; i++){
		let invite = inviteText.children[i];
		let rName = invite.getElementsByClassName(`recipientName`);
		let org = invite.getElementsByClassName(`organizationName`);
		let eDate = invite.getElementsByClassName(`eventDate`);
		let url = invite.getElementsByClassName(`websiteURL`);
		let host = invite.getElementsByClassName(`hostName`);

		rName[0].innerText = information[i].name;
		org[0].innerText = information.org;
		eDate[0].innerText = information.eventDate;
		url[0].innerText = information.websiteURL;
		host[0].innerText = information.hostName;
	}
}

window.onload = async function(){
	await preloadImages();
	await loopBanners();

	if(path.includes(`/interests`)){
		await prefillForm();
	}else if(path.includes(`/confirm`)){
		await prefillPage();
	}
}

// Independent functions
banner && banner.addEventListener(`mouseover`, async function(e){
	window.clearInterval(loopedImages);
})

banner && banner.addEventListener(`mouseleave`, async function(e){
	await loopBanners();
})

// Validate first registration page
async function validateForm(e){
	let form = e.parentNode;
	let formInputs = form.getElementsByTagName(`input`);
	let username = formInputs[0];
	let password = formInputs[1];
	let passwordVerify = formInputs[2];
	let firstName = formInputs[3];
	let lastName = formInputs[4];
	let email = formInputs[5];
	let phoneNumber = formInputs[6];
	let newsletterYes = formInputs[7];
	let newsletterNo = formInputs[8];
	let usernameError = document.getElementById(`userName`);
	let passwordError = document.getElementById(`password`);
	let passwordVerifyError = document.getElementById(`passwordVerify`);
	let firstNameError = document.getElementById(`firstName`);
	let lastNameError = document.getElementById(`lastName`);
	let emailError = document.getElementById(`email`);
	let phoneNumberError = document.getElementById(`phoneNumber`);
	let signUpNewsletterError = document.getElementById(`signUpNewsletter`);
	let message;
	let errors = false;

	for(let i = 0; i < 5; i++){
		let input = formInputs[i];
		let errorElement = document.getElementById(input.name);
		if(input.value === ``){
			let label = ((s = ``) => {
				for(let k of labels){
					let labelName = k.innerText.trim().slice(0, -1);
					
					if(k.htmlFor === input.name){
						s = labelName;
					}
				}
				return s;
			})();
			
			
			message = `Error: ${label} is empty!`;
			errorElement.innerText = message;
			errorElement.removeAttribute(`hidden`);
			errorElement.setAttribute(`style`, `color: red;`)
			input.focus();
			return false;
		}else{
			errorElement.setAttribute(`hidden`, ``);
		}
	}

	if(/[^A-Z0-9]+/gi.test(username.value)){
		message = `Error: Username may only contain letters and/or numbers!`;
		usernameError.innerText = message;
		usernameError.removeAttribute(`hidden`);
		usernameError.setAttribute(`style`, `color: red;`)
		username.focus();
		errors = true;
	}else{
		usernameError.setAttribute(`hidden`, ``);
	}

	if(password.value !== passwordVerify.value){
		message = `Error: Passwords do not match!`;
		passwordVerifyError.innerText = message;
		passwordVerifyError.removeAttribute(`hidden`);
		passwordVerifyError.setAttribute(`style`, `color: red;`)
		passwordVerify.focus();
		errors = true;
	}else{
		passwordVerifyError.setAttribute(`hidden`, ``);
	}

	if(password.value.length <= 7 || passwordVerify.value.length <= 7){
		message = `Error: Passwords must be at least 8 characters in length!`;
		passwordError.innerText = message;
		passwordError.removeAttribute(`hidden`);
		passwordError.setAttribute(`style`, `color: red;`)
		password.focus();
		errors = true;
	}else{
		passwordError.setAttribute(`hidden`, ``);
	}

	if(/[^A-Z]+/gi.test(firstName.value)){
		message = `Error: First Name may only contain letters!`;
		firstNameError.innerText = message;
		firstNameError.removeAttribute(`hidden`);
		firstNameError.setAttribute(`style`, `color: red;`)
		firstName.focus();
		errors = true;
	}else{
		firstNameError.setAttribute(`hidden`, ``);
	}

	if(/[^A-Z]+/gi.test(lastName.value)){
		message = `Error: Last Name may only contain letters!`;
		lastNameError.innerText = message;
		lastNameError.removeAttribute(`hidden`);
		lastNameError.setAttribute(`style`, `color: red;`)
		lastName.focus();
		errors = true;
	}else{
		lastNameError.setAttribute(`hidden`, ``);
	}
	
	if(email.value && !/^[A-Z0-9]+@[A-Z0-9.]+\.[A-Z]{3}/gi.test(email.value)){
		message = `Error: Email must be in xxx@xxx.xxx format!`;
		emailError.innerText = message;
		emailError.removeAttribute(`hidden`);
		emailError.setAttribute(`style`, `color: red;`)
		email.focus();
		errors = true;
	}else{
		emailError.setAttribute(`hidden`, ``);
	}

	if(phoneNumber.value && !/^\(\d{3}\)\ \d{3}\-\d{4}/g.test(phoneNumber.value)){
		message = `Error: Phone number must be numbers in (xxx) xxx-xxxx format!`;
		phoneNumberError.innerText = message;
		phoneNumberError.removeAttribute(`hidden`);
		phoneNumberError.setAttribute(`style`, `color: red;`)
		phoneNumber.focus();
		errors = true;
	}else{
		phoneNumberError.setAttribute(`hidden`, ``);
	}

	if(!newsletterYes.checked && !newsletterNo.checked){
		message = `Error: Please select Yes/No`;
		signUpNewsletterError.innerText = message;
		signUpNewsletterError.removeAttribute(`hidden`);
		signUpNewsletterError.setAttribute(`style`, `color: red;`)
		errors = true;
	}else{
		signUpNewsletterError.setAttribute(`hidden`, ``);
	}

	let formData = {
		username: username.value,
		password: password.value,
		passwordVerify: passwordVerify.value,
		firstName: firstName.value,
		lastName: lastName.value,
		email: email.value,
		phoneNumber: phoneNumber.value,
		signUpNewsletter: newsletterYes.checked ? `Yes` : `No`,
	};

	// Create cookies
	for(let k in formData){
		document.cookie = `${k.trim()}=${formData[k.trim()]}`;
	}

	location.href = `./interests.html`;
}

// Prefill 2nd page of registration
async function prefillForm(){
	let cookies = document.cookie.split(`; `);
	let inputs = document.getElementsByTagName(`input`);

	for(let i = 0; i < cookies.length; i++){
		let cookie = cookies[i];
		let cookieName = cookie.split(`=`)[0];
		let cookieValue = cookie.split(`=`)[1];

		for(let i = 0; i < inputs.length; i++){
			let input = inputs[i];

			if(input.name === `signUpNewsletter`){
				if(cookieValue === `Yes`){
					input.value === `Yes` ? input.setAttribute(`checked`, ``) : 0;
					input.value === `No` ? input.removeAttribute(`checked`) : 0;
				}else{
					input.value === `No` ? input.setAttribute(`checked`, ``) : 0;
					input.value === `Yes` ? input.removeAttribute(`checked`) : 0;
				}
			}else if(input.name === cookieName){
				input.value = cookieValue;
			}
		}
	}
}

// Validate 2nd page form
async function validateForm2(e){
	let form = e.parentNode;
	let formInputs = form.getElementsByTagName(`input`);
	let comments = form.getElementsByTagName(`textarea`)[0];
	let newsletterYes = formInputs[15];
	let interests = [];

	console.log(`asdf`,newsletterYes);

	document.cookie = `comments=${comments.value}`;
	document.cookie = `signUpNewsletter=${newsletterYes.checked ? `Yes` : `No`}`;
	
	for(let i = 0; i < formInputs.length; i++){
		let input = formInputs[i];
		
		if(input.type === `checkbox`){
			input.checked ? interests.push(input.name) : 0;
		}else if(input.type !== `hidden` && input.type !== `button` && input.name !== `signUpNewsletter`){
			
			document.cookie = `${input.name}=${input.value}`;
		}
	}
	
	document.cookie = `interests=${interests.toString()}`;

	location.href = `./confirm.html`;
}

// FIll confirmation page with cookie data
async function prefillPage(){
	let cookies = document.cookie.split(`; `);
	let registrationInformation = document.getElementById(`registrationInformation`);
	let data = ``;

	for(let i = 0; i < cookies.length; i++){
		let cookie = cookies[i];
		let cookieName = cookie.split(`=`)[0];
		let cookieValue = cookie.split(`=`)[1];

		data += `${cookieName}: ${cookieValue}\n\n`;
	}

	registrationInformation.innerText = data;
}