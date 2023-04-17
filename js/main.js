let eventDate = document.getElementById(`eventDate`);
let hostName = document.getElementById(`hostName`);
let organizationName = document.getElementById(`organizationName`);
let recipientName = document.getElementById(`recipientName`);
let submittedDate = document.getElementById(`submittedDate`);
let submittedHost = document.getElementById(`submittedHost`);
let submittedName = document.getElementById(`submittedName`);
let submittedOrganization = document.getElementById(`submittedOrganization`);
let submittedURL = document.getElementById(`submittedURL`);
let websiteURL = document.getElementById(`websiteURL`);

// Clear fields to prep for more invites
async function clearFields(){
	submittedName.value = ``;
	submittedOrganization.value = ``;
	submittedDate.value = ``;
	submittedURL.value = ``;
	submittedHost.value = ``;
	
	return;
}

// Print input variables in form
async function updateInvite(){
	recipientName.innerText = submittedName.value;
	organizationName.innerText = submittedOrganization.value;
	eventDate.innerText = submittedDate.value;
	websiteURL.innerText = submittedURL.value;
	hostName.innerText = submittedHost.value;

	await clearFields();
	return;
}
