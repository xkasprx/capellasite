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
}

// Independent functions
banner && banner.addEventListener(`mouseover`, async function(e){
	window.clearInterval(loopedImages);
})

banner && banner.addEventListener(`mouseleave`, async function(e){
	await loopBanners();
})


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
	let newsletter = formInputs[7];
	
	for(let i = 0; i < 5; i++){
		let input = formInputs[i];
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

			alert(`Error: ${label} is empty!`);
			input.focus();
			return false;
		}
	}

	if(/[^A-Z0-9]+/gi.test(username.value)){
		alert(`Error: Username may only contain letters and/or numbers!`);
		username.focus();
		return false;
	}

	if(password.value !== passwordVerify.value){
		alert(`Error: Passwords do not match!`);
		passwordVerify.focus();
		return false;
	}

	if(password.value.length <= 7 || passwordVerify.value.length <= 7){
		alert(`Error: Passwords must be at least 8 characters in length!`);
		password.focus();
		return false;
	}

	if(/[^A-Z]+/gi.test(firstName.value)){
		alert(`Error: First Name may only contain letters!`);
		firstName.focus();
		return false;
	}

	if(/[^A-Z]+/gi.test(lastName.value)){
		alert(`Error: First Name may only contain letters!`);
		lastName.focus();
		return false;
	}
	
	if(!/^[A-Z0-9]+@[A-Z0-9.]+\.[A-Z]{3}/gi.test(email.value)){
		alert(`Error: Email must be in xxx@xxx.xx or xxx@xxx.xxx format!`);
		email.focus();
		return false;
	}

	if(!/^\(\d{3}\)\ \d{3}\-\d{4}/g.test(phoneNumber.value)){
		alert(`Error: Phone number must be in (xxx) xxx-xxxx format!`);
		phoneNumber.focus();
		return false;
	}

	if(!newsletter.value){
		alert(`Error: Sign up for newsletter must be Yes/No!`);
		newsletter.focus();
		return false;
	}

	form.submit();
}
