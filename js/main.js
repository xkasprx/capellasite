let eventDate = document.getElementsByClassName(`eventDate`);
let gallery = document.getElementsByClassName(`gallery`);
let hostName = document.getElementsByClassName(`hostName`);
let inviteContent = document.getElementsByClassName(`inviteContent`);
let invites = document.getElementById(`invites`);
let inviteRecipient = document.getElementsByClassName(`inviteRecipient`);
let inviteText = document.getElementById(`placeholderContent`);
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

