// Variables
let html = document.getElementsByTagName(`html`)[0];
let body = document.getElementsByTagName(`body`)[0];
let root = document.getElementsByTagName(`root`)[0];
let greetings = [`Hi`, `Greetings`, `Hello there`, `Nice to see you`];
let cookies, hash, loggedIn;

//Functions
async function createTopBar(){
	let header = document.createElement(`div`);
	let title = document.createElement(`div`);
	let menu = document.createElement(`div`);
	let titleLink = document.createElement(`a`);
	let titleImg = new Image(300, 75);
	
	titleLink.href = `#home`;
	titleImg.src = `../images/header.png`;
	header.id = `header`;
	title.id = `title`;
	menu.id = `menu`;
	
	titleLink.appendChild(titleImg);
	title.appendChild(titleLink);
	
	if(loggedIn){
		let directoryLink = document.createElement(`div`);
		let postsLink = document.createElement(`div`);
		let dashboardLink = document.createElement(`div`);
		let logoutLink = document.createElement(`div`);
		
		directoryLink.className = `headerLinks`;
		directoryLink.innerHTML = `<a href="#directory"><i class="fa-solid fa-code"></i> Developers</a>`;
		postsLink.className = `headerLinks`;
		postsLink.innerHTML = `<a href="#posts"><i class="fa-solid fa-comment"></i>  Posts</a>`;
		dashboardLink.className = `headerLinks`;
		dashboardLink.innerHTML = `<a href="#dashboard"><i class="fa-solid fa-user"></i>  Dashboard</a>`;
		logoutLink.className = `headerLinks`;
		logoutLink.innerHTML = `<a href="javascript:void(0)"><i class="fa-solid fa-right-from-bracket"></i>  Logout</a>`;
		
		logoutLink.setAttribute(`onclick`, `processButton(this);`)
		logoutLink.back = `/logout`;

		menu.appendChild(directoryLink);
		menu.appendChild(postsLink);
		menu.appendChild(dashboardLink);
		menu.appendChild(logoutLink);
	}else{
		let loginLink = document.createElement(`div`);
		let registerLink = document.createElement(`div`);

		loginLink.className = `headerLinks`;
		loginLink.innerHTML = `<a href="#login"><i class="fa-solid fa-arrow-right-to-bracket"></i>  Login</a>`;
		registerLink.className = `headerLinks`;
		registerLink.innerHTML = `<a href="#register"><i class="fa-solid fa-file-lines"></i>  Register</a>`;

		menu.appendChild(loginLink);
		menu.appendChild(registerLink);
	}

	header.appendChild(title);
	header.appendChild(menu);
	root.appendChild(header);
};

async function loadAddEdu(){
	let section = document.createElement(`section`);
	let pageTitle = document.createElement(`div`);
	let greeting = document.createElement(`div`);
	let inputSection = document.createElement(`div`);
	let institution = document.createElement(`div`);
	let degree = document.createElement(`div`);
	let field = document.createElement(`div`);
	let datesSection = document.createElement(`div`);
	let fromDate = document.createElement(`div`);
	let current = document.createElement(`div`);
	let toDate = document.createElement(`div`);
	let description = document.createElement(`div`);
	let bottomButtons = document.createElement(`div`);
	let submitButton = document.createElement(`button`);
	let cancelButton = document.createElement(`button`);
	let today = await prettyDate();
	let eightyYearsAgo = await prettyDate(new Date(new Date().setFullYear(new Date().getFullYear() - 80)));

	section.className = `topSection`;
	section.id = `addEdu`;
	section.back = `/addEdu`;
	pageTitle.innerHTML = `<h1>Add Your Education</h1>`;
	greeting.innerHTML = `<h2>Add any school or bootcamp that you have attended</h2>`;
	institution.innerHTML = `<label for="school">College/Bootcamp</label><input id="school" autocomplete="off">`;
	degree.innerHTML = `<label for="degree">Degree/Certificate</label><input id="degree" autocomplete="off">`;
	field.innerHTML = `<label for="fieldofstudy">Field of Study</label><input id="fieldofstudy" autocomplete="off">`;
	fromDate.innerHTML = `<label for="from">From Date</label><input id="from" type="date" value="${today}" min="${eightyYearsAgo}" max="${today}">`;
	current.innerHTML = `<label for="current">Current</label><input id="current" type="checkbox">`;
	toDate.innerHTML = `<label for="to">To Date</label><input id="to" type="date" value="${today}" min="${eightyYearsAgo}" max="${today}">`;
	description.innerHTML = `<label for="description">Program Description</label><textarea id="description" style="height: 100px; margin-top: 10px;" placeholder="Short description about the program"></textarea>`;

	inputSection.id = `addEduInput`;
	datesSection.id = `dateSectionInput`;
	submitButton.id = `submitButton`;
	fromDate.className = `fromDate`;
	current.className = `current`;
	toDate.className = `toDate`;
	cancelButton.className = `cancelButton`;
	submitButton.textContent = `Add`;
	cancelButton.textContent = `Cancel`;
	submitButton.setAttribute(`submitType`, `addEdu`);
	submitButton.setAttribute(`onclick`, `processButton(this.parentElement.parentElement);`);
	cancelButton.setAttribute(`onclick`, `history.back();`);

	inputSection.appendChild(institution);
	inputSection.appendChild(degree);
	inputSection.appendChild(field);

	datesSection.appendChild(fromDate);
	datesSection.appendChild(current);
	datesSection.appendChild(toDate);
	datesSection.appendChild(description);

	bottomButtons.appendChild(submitButton);
	bottomButtons.appendChild(cancelButton);

	section.appendChild(pageTitle);
	section.appendChild(greeting);
	section.appendChild(inputSection);
	section.appendChild(datesSection);
	section.appendChild(bottomButtons);

	root.appendChild(section);
};

async function loadAddExp(){
	let section = document.createElement(`section`);
	let pageTitle = document.createElement(`div`);
	let greeting = document.createElement(`div`);
	let inputSection = document.createElement(`div`);
	let title = document.createElement(`div`);
	let company = document.createElement(`div`);
	let location = document.createElement(`div`);
	let datesSection = document.createElement(`div`);
	let fromDate = document.createElement(`div`);
	let current = document.createElement(`div`);
	let toDate = document.createElement(`div`);
	let description = document.createElement(`div`);
	let bottomButtons = document.createElement(`div`);
	let submitButton = document.createElement(`button`);
	let cancelButton = document.createElement(`button`);
	let today = await prettyDate();
	let eightyYearsAgo = await prettyDate(new Date(new Date().setFullYear(new Date().getFullYear() - 80)));

	section.className = `topSection`;
	section.id = `addExp`;
	section.back = `/addExp`;
	pageTitle.innerHTML = `<h1>Add an Experience</h1>`;
	greeting.innerHTML = `<h2>Add any developer/programming positions that you have had in the past</h2>`;
	title.innerHTML = `<label for="jobtitle">Job Title</label><input id="jobtitle" autocomplete="off">`;
	company.innerHTML = `<label for="company">Company</label><input id="company" autocomplete="off">`;
	location.innerHTML = `<label for="location">Location</label><input id="location" autocomplete="off">`;
	fromDate.innerHTML = `<label for="from">From Date</label><input type="date" id="from" value="${today}" min="${eightyYearsAgo}" max="${today}">`;
	current.innerHTML = `<label for="current">Current</label><input type="checkbox" id="current">`;
	toDate.innerHTML = `<label for="to">To Date</label><input type="date" id="to" value="${today}" min="${eightyYearsAgo}" max="${today}">`;
	description.innerHTML = `<label for="description">Job Description</label><textarea id="description" style="height: 100px; margin-top: 10px;" placeholder="Short description about your job duties"></textarea>`;

	inputSection.id = `addExpInput`;
	datesSection.id = `dateSectionInput`;
	submitButton.id = `submitButton`;
	fromDate.className = `fromDate`;
	current.className = `current`;
	toDate.className = `toDate`;
	cancelButton.className = `cancelButton`;
	submitButton.textContent = `Add`;
	cancelButton.textContent = `Cancel`;
	submitButton.setAttribute(`submitType`, `addExp`);
	submitButton.setAttribute(`onclick`, `processButton(this.parentElement.parentElement);`);
	cancelButton.setAttribute(`onclick`, `history.back();`);

	inputSection.appendChild(company);
	inputSection.appendChild(title);
	inputSection.appendChild(location);

	datesSection.appendChild(fromDate);
	datesSection.appendChild(current);
	datesSection.appendChild(toDate);
	datesSection.appendChild(description);

	bottomButtons.appendChild(submitButton);
	bottomButtons.appendChild(cancelButton);

	section.appendChild(pageTitle);
	section.appendChild(greeting);
	section.appendChild(inputSection);
	section.appendChild(datesSection);
	section.appendChild(bottomButtons);

	root.appendChild(section);
};

async function loadDashboard(){
	let section = document.createElement(`section`);
	let pageTitle = document.createElement(`div`);
	let greeting = document.createElement(`div`);
	let experienceSection = document.createElement(`div`);
	let expTable = document.createElement(`div`);
	let educationSection = document.createElement(`div`);
	let eduTable = document.createElement(`div`);
	let accountManagement = document.createElement(`div`);
	let deleteAccountButton = document.createElement(`button`);
	let resetPassword = document.createElement(`button`);
	let topButtons = document.createElement(`div`);
	let viewProfileButton = document.createElement(`button`);
	let editProfileButton = document.createElement(`button`);
	let addExpButton = document.createElement(`button`);
	let addEduButton = document.createElement(`button`);

	let userInfo = await fetchData({
		id: cookies.id,
		token: cookies.token,
		target: `/getUser`,
	});

	section.className = `topSection`;
	section.id = `dashboard`;
	deleteAccountButton.className = `deleteButton`;
	pageTitle.innerHTML = `<h1>Dashboard</h1>`;
	greeting.innerHTML = `<h2>${greetings[Math.floor(Math.random() * greetings.length)]}, ${userInfo.user.firstName ? userInfo.user.firstName : `Member`}.</h2>`;
	experienceSection.innerHTML = `<h2>Experience Credentials</h2>`;
	educationSection.innerHTML = `<h2>Education Credentials</h2>`;
	accountManagement.innerHTML = `<h2>Account Management</h2>`;
	topButtons.id = `dashButtons`;
	viewProfileButton.innerHTML = `<a href="#profile?id=${cookies.id}"><i class="fa-solid fa-user"></i>  View Profile</a>`;
	editProfileButton.innerHTML = `<a href="#editProfile"><i class="fa-solid fa-user-pen"></i>  Edit Profile</a>`;
	addExpButton.innerHTML = `<a href="#addExperience"><i class="fa-solid fa-briefcase"></i>  Add Experience</a>`;
	addEduButton.innerHTML = `<a href="#addEducation"><i class="fa-solid fa-graduation-cap"></i>  Add Education</a>`;
	deleteAccountButton.textContent = `Delete Account`;
	deleteAccountButton.setAttribute(`onclick`, `alert("Delete account feature not enabled. If it were enabled, an email would be sent to begin the process of deleting the account.");`)
	resetPassword.textContent = `Reset Password`;
	resetPassword.setAttribute(`onclick`, `alert("Reset password feature not enabled. If it were enabled, an email would be sent to begin the process of changing the password.");`);

	new gridjs.Grid({
		columns: [{
			name: `Company`,
			width: `25%`,
		}, {
			name: `Title`,
			width: `25%`,
		}, {
			name: `Years`,
			width: `25%`,
		}, {
			name: `\u200b`,
			width: `25%`,
		}],
		data: await(async(a = []) => {
			let info = cookies && await fetchData({
				id: cookies.id,
				token: cookies.token,
				target: `/getExp`,
			});

			for(let i = 0; i < info.length; i++){
				let dataRow = info[i];
				let deleteButton = document.createElement(`button`);
					deleteButton.setAttribute(`onclick`, `deleteInfo(this.id);`);				
					deleteButton.className = `deleteButton`;
					deleteButton.textContent = `Delete`;
					deleteButton.id = `Experience:${dataRow.id}`;

				let fromDate = dataRow.from && dataRow.from.length && new Date(dataRow.from).toLocaleDateString('en-US', {timeZone: 'UTC'});
				let toDate = dataRow.to && dataRow.to.length && new Date(dataRow.to).toLocaleDateString('en-US', {timeZone: 'UTC'});

				a.push([dataRow.company, dataRow.jobtitle, `${fromDate} to ${dataRow.current ? `Present` : toDate}`, deleteButton]);
			}
			return a.length ? a : [];
		})(),
	}).render(expTable);

	new gridjs.Grid({
		columns: [{
			name: `School`,
			width: `25%`,
		}, {
			name: `Degree`,
			width: `25%`,
		}, {
			name: `Years`,
			width: `25%`,
		}, {
			name: `\u200b`,
			width: `25%`,
		}],
		data: await(async(a = []) => {
			let info = cookies && await fetchData({
				id: cookies.id,
				token: cookies.token,
				target: `/getEdu`,
			});

			for(let i = 0; i < info.length; i++){
				let dataRow = info[i];
				let deleteButton = document.createElement(`button`);
					deleteButton.setAttribute(`onclick`, `deleteInfo(this.id);`);
					deleteButton.className = `deleteButton`;
					deleteButton.textContent = `Delete`;
					deleteButton.id = `Education:${dataRow.id}`;

				let fromDate = dataRow.from && dataRow.from.length && new Date(dataRow.from).toLocaleDateString('en-US', {timeZone: 'UTC'});
				let toDate = dataRow.to && dataRow.to.length && new Date(dataRow.to).toLocaleDateString('en-US', {timeZone: 'UTC'});

				a.push([dataRow.school, dataRow.degree, `${fromDate} to ${dataRow.current ? `Present` : toDate}`, deleteButton]);
			}
			return a.length ? a : [];
		})(),
	}).render(eduTable);

	topButtons.appendChild(viewProfileButton);
	topButtons.appendChild(editProfileButton);
	topButtons.appendChild(addExpButton);
	topButtons.appendChild(addEduButton);
	
	accountManagement.appendChild(deleteAccountButton);
	accountManagement.appendChild(resetPassword);
	experienceSection.appendChild(expTable);
	educationSection.appendChild(eduTable);
	

	section.appendChild(pageTitle);
	section.appendChild(greeting);
	section.appendChild(topButtons);
	section.appendChild(experienceSection);
	section.appendChild(educationSection);
	section.appendChild(accountManagement);

	root.appendChild(section);
}

async function loadDirectory(){
	let section = document.createElement(`section`);
	let pageTitle = document.createElement(`div`);
	let greeting = document.createElement(`div`);

	section.className = `topSection`;
	section.id = `directory`;
	pageTitle.innerHTML = `<h1>Developers</h1>`;
	greeting.innerHTML = `<h2>Browse and connect with developers</h2>`;

	
	section.appendChild(pageTitle);
	section.appendChild(greeting);

	root.appendChild(section);
};

async function loadEditProfile(){
	let section = document.createElement(`section`);
	let pageTitle = document.createElement(`div`);
	let greeting = document.createElement(`div`);
	let inputSection = document.createElement(`div`);
	let firstName = document.createElement(`div`);
	let lastName = document.createElement(`div`);
	let email = document.createElement(`div`);
	let professionalStatus = document.createElement(`div`);
	let company = document.createElement(`div`);
	let website = document.createElement(`div`);
	let location = document.createElement(`div`);
	let skills = document.createElement(`div`);
	let github = document.createElement(`div`);
	let bio = document.createElement(`div`);
	let socialLinks = document.createElement(`div`);
	let twitter = document.createElement(`div`);
	let facebook = document.createElement(`div`);
	let youtube = document.createElement(`div`);
	let linkedin = document.createElement(`div`);
	let instagram = document.createElement(`div`);
	let bottomButtons = document.createElement(`div`);
	let submitButton = document.createElement(`button`);
	let cancelButton = document.createElement(`button`);

	let userInfo = await fetchData({
		id: cookies.id,
		token: cookies.token,
		target: `/getInfo`,
	});

	section.className = `topSection`;
	section.id = `editProfile`;
	section.back = `/updateInfo`;
	pageTitle.innerHTML = `<h1>Edit Your Profile</h1>`;
	greeting.innerHTML = `<h2>Let's get some information to make your profile stand out</h2>`;
	inputSection.id = `editProfileInput`;
	socialLinks.id = `socialLinks`;
	inputSection.innerHTML = `<h2>Personal Information</h2>`;
	professionalStatus.innerHTML = `<label for="proStatus">Professional Status</label>` + await new Promise((resolve) => {
		let s = ``;
		let choices = [
			`Click to Select`,
			`Back-end Developer`,
			`Developer`,
			`DevOps Engineer`,
			`Full Stack Developer`,
			`Front-end Developer`,
			`Instructor`,
			`Intern`,
			`Junior Developer`,
			`Senior Developer`,
			`Student`,
			`Other`,
		];

		s += `<select name="proStatus" id="proStatus">`;

		for(let i = 0; i < choices.length; i++){
			let choice = choices[i];

			s += `<option value="${i === 0 ? 0 : choice}" ${userInfo.proStatus === choice ? `selected` : ``}>${choice}</option>`;
		}

		s += `</select>`;

		resolve(s);
	});

	firstName.innerHTML = `<label for="firstName">First Name</label><input id="firstName" placeholder="John" value="${userInfo.firstName || ``}">`;
	lastName.innerHTML = `<label for="lastName">Last Name</label><input id="lastName" placeholder="Smith" value="${userInfo.lastName || ``}">`;
	email.innerHTML = `<label for="email">Email</label><input id="email" autocomplete="off" value="${userInfo.email}">`;
	company.innerHTML = `<label for="company">Company</label><input id="company" autocomplete="off" placeholder="Your own copmany or one you work for" value="${userInfo.company || ``}">`;
	website.innerHTML = `<label for="website">Website</label><input id="website" placeholder="Portfolio site, Company website, etc" value="${userInfo.website || ``}">`;
	location.innerHTML = `<label for="location">City, State</label><input id="location" placeholder="Denver, CO" value="${userInfo.location || ``}">`;
	skills.innerHTML = `<label for="skills">Skills</label><input id="skills" placeholder="Comma Seperated" value="${userInfo.skills || ``}">`;
	bio.innerHTML = `<label for="bio">Bio</label><textarea id="bio" style="height: 100px; margin-top: 10px;" placeholder="Short description about what you do, what you like, etc">${userInfo.bio || ``}</textarea>`;
	socialLinks.innerHTML = `<h2>Across the Internet</h2>`;
	github.innerHTML = `<label for="github"><i class="fa-brands fa-github"></i>  GitHub</label><input id="github" placeholder="myGitName" value="${userInfo.github || ``}">`;
	twitter.innerHTML = `<label for="twitter"><i class="fa-brands fa-x-twitter"></i>  Twitter</label><input id="twitter" placeholder="https://twitter.com/yourusername" value="${userInfo.twitter || ``}">`;
	facebook.innerHTML = `<label for="facebook"><i class="fa-brands fa-facebook"></i>  Facebook</label><input id="facebook" placeholder="https://facebook.com/yourusername" value="${userInfo.facebook || ``}">`;
	youtube.innerHTML = `<label for="youtube"><i class="fa-brands fa-youtube"></i>  YouTube</label><input id="youtube" placeholder="https://youtube.com/@yourusername" value="${userInfo.youtube || ``}">`;
	linkedin.innerHTML = `<label for="linkedin"><i class="fa-brands fa-linkedin"></i>  LinkedIn</label><input id="linkedin" placeholder="https://linkedin.com/in/yourusername" value="${userInfo.linkedin || ``}">`;
	instagram.innerHTML = `<label for="instagram"><i class="fa-brands fa-instagram"></i>  Instagram</label><input id="instagram" placeholder="https://instagram.com/yourusername" value="${userInfo.instagram || ``}">`;

	submitButton.id = `submitButton`;
	cancelButton.className = `cancelButton`;
	submitButton.textContent = `Update Profile`;
	cancelButton.textContent = `Cancel`;
	submitButton.setAttribute(`submitType`, `updateProfile`);
	submitButton.setAttribute(`onclick`, `processButton(this.parentElement);`);
	cancelButton.setAttribute(`onclick`, `history.back();`);

	socialLinks.appendChild(github);
	socialLinks.appendChild(twitter);
	socialLinks.appendChild(facebook);
	socialLinks.appendChild(youtube);
	socialLinks.appendChild(linkedin);
	socialLinks.appendChild(instagram);

	inputSection.appendChild(firstName);
	inputSection.appendChild(lastName);
	inputSection.appendChild(professionalStatus);
	inputSection.appendChild(email);
	inputSection.appendChild(company);
	inputSection.appendChild(website);
	inputSection.appendChild(location);
	inputSection.appendChild(skills);
	inputSection.appendChild(bio);
	
	bottomButtons.appendChild(submitButton);
	bottomButtons.appendChild(cancelButton);

	section.appendChild(pageTitle);
	section.appendChild(greeting);
	section.appendChild(inputSection);
	section.appendChild(socialLinks);
	section.appendChild(bottomButtons);

	root.appendChild(section);
};

async function loadForgotPass(){
	let section = document.createElement(`section`);
	let formCell = document.createElement(`div`);
	let formTitle = document.createElement(`h1`);
	let sectionForm = document.createElement(`form`);
	let formEmail = document.createElement(`div`);
	let submitButton = document.createElement(`button`);
	let reminder = document.createElement(`div`);
	
	section.className = `topSection`;
	sectionForm.id = `loginForm`;
	sectionForm.back = `/forgot`;
	sectionForm.setAttribute(`onsubmit`, `return false;`);
	formCell.className = `regloginform`;
	formEmail.className = `emailInput`;
	submitButton.id = `submitButton`;
	submitButton.textContent = `Submit`;
	submitButton.setAttribute(`submitType`, `forgot`);
	submitButton.setAttribute(`onclick`, `processButton(this.parentElement);`);
	reminder.className = `regloginReminder`;

	formTitle.innerText = `Forgot Password`;
	formEmail.innerHTML = `<label for="email">Email</label><input id="email" autocomplete="off" type="email" onchange="validateInput(this, this.type);">`;
	reminder.innerHTML = `<a href="#home"><h4>Cancel</h4></a>`

	formCell.appendChild(formTitle);
	sectionForm.appendChild(formEmail);
	sectionForm.appendChild(submitButton);
	sectionForm.appendChild(reminder);
	formCell.appendChild(sectionForm);
	section.appendChild(formCell);
	root.appendChild(section);

	setTimeout(() => root.querySelector(`input`).focus(), 100);

};

async function loadHome(){
	let section = document.createElement(`section`);
	let landingContent = document.createElement(`div`);
	let blockContainer = document.createElement(`div`);
	let container = document.createElement(`div`);
	let imgContainer = document.createElement(`section`);
	let sectionImg = new Image();

	section.className = `topSection`;
	sectionImg.src = `../images/hero-img.svg`;
	imgContainer.id = `landingImage`;

	landingContent.innerHTML = `<h1>DevBook</h1><p>Create a developer profile, share posts and get help from other developers</p><a href="#login"><button id="login">Get Started</button></a>`;
	blockContainer.innerHTML = `<h1>How to get started</h1><p><strong>1 </strong>Customize your profile. Click your profile image in the top right corner, then select the gear icon to make your profile uniquely yours.</p><p><strong>2 </strong>Explore fellow developers and posts.</p><p><strong>3 </strong>Like the posts you like to share the love and start getting to know the community.</p><p><strong>4 </strong>Reply to a question in an existing thread or ask a question by creating a new topic.</p>`;
	container.innerHTML = `<h1>What is DevBook</h1><p>DevBook is a community for growing developers.</p>`;
	
	imgContainer.appendChild(sectionImg);
	section.appendChild(landingContent);
	
	section.appendChild(blockContainer);
	section.appendChild(container);
	root.appendChild(section);
	root.appendChild(imgContainer);
};

async function loadLogin(){
	let section = document.createElement(`section`);
	let formCell = document.createElement(`div`);
	let formTitle = document.createElement(`h1`);
	let sectionForm = document.createElement(`form`);
	let formEmail = document.createElement(`div`);
	let formPassword = document.createElement(`div`);
	let submitButton = document.createElement(`button`);
	let reminder = document.createElement(`div`);
	
	section.className = `topSection`;
	sectionForm.id = `loginForm`;
	sectionForm.back = `/login`;
	sectionForm.setAttribute(`onsubmit`, `return false;`);
	formCell.className = `regloginform`;
	formEmail.className = `emailInput`;
	formPassword.className = `passInput`;
	submitButton.id = `submitButton`;
	submitButton.textContent = `Submit`;
	submitButton.setAttribute(`submitType`, `login`);
	submitButton.setAttribute(`onclick`, `processButton(this.parentElement);`);
	reminder.className = `regloginReminder`;

	formTitle.innerText = `Login`;
	formEmail.innerHTML = `<label for="email">Email</label><input id="email" autocomplete="off" type="email" onchange="validateInput(this, this.type);">`;
	formPassword.innerHTML = `<label for="pass">Password</label><input id="pass" type="password" onchange="validateInput(this, this.type);">`;
	reminder.innerHTML = `<h4>Don't have an account? <a href="#register">Sign Up</a> | <a href="#forgot">Forgot Password</a></h4>`;

	formCell.appendChild(formTitle);
	sectionForm.appendChild(formEmail);
	sectionForm.appendChild(formPassword);
	sectionForm.appendChild(submitButton);
	sectionForm.appendChild(reminder);
	formCell.appendChild(sectionForm);
	section.appendChild(formCell);
	root.appendChild(section);

	setTimeout(() => root.querySelector(`input`).focus(), 100);

};

async function loadPosts(){
	let section = document.createElement(`section`);
	let pageTitle = document.createElement(`div`);
	let greeting = document.createElement(`div`);
	let inputSection = document.createElement(`div`);
	let postList = document.createElement(`div`);
	let inputBox = document.createElement(`textarea`);
	let submitButton = document.createElement(`button`);

	let userInfo = await fetchData({
		id: cookies.id,
		token: cookies.token,
		target: `/getUser`,
	});

	section.className = `topSection`;
	section.id = `posts`;
	inputBox.id = `postInput`;
	inputSection.id = `postInputSection`;
	pageTitle.innerHTML = `<h1>Posts</h1>`;
	greeting.innerHTML = `<h2>${greetings[Math.floor(Math.random() * greetings.length)]}, ${userInfo.user.firstName ? userInfo.user.firstName : `Member`}.</h2>`;
	submitButton.id = `submitButton`;
	submitButton.textContent = `Submit`;
	submitButton.setAttribute(`submitType`, `newPost`);
	submitButton.setAttribute(`onclick`, `processButton(this.parentElement);`)

	// add posts to postList

	inputSection.appendChild(inputBox);
	inputSection.appendChild(submitButton);

	section.appendChild(pageTitle);
	section.appendChild(greeting);
	section.appendChild(inputSection);
	section.appendChild(postList);

	root.appendChild(section);
};

async function loadRegister(){
	let section = document.createElement(`section`);
	let formCell = document.createElement(`div`);
	let formTitle = document.createElement(`h1`);
	let sectionForm = document.createElement(`form`);
	let formFirstName = document.createElement(`div`);
	let formLastName = document.createElement(`div`);
	let formEmail = document.createElement(`div`);
	let formPassword = document.createElement(`div`);
	let formVerify = document.createElement(`div`);
	let submitButton = document.createElement(`button`);
	let reminder = document.createElement(`div`);

	section.className = `topSection`;
	sectionForm.id = `registerForm`;
	sectionForm.back = `/register`;
	sectionForm.setAttribute(`onsubmit`, `return false;`);
	formCell.className = `regloginform`;
	formFirstName.className = `firstNameInput`;
	formLastName.className = `lastNameInput`;
	formEmail.className = `emailInput`;
	formPassword.className = `passInput`;
	formVerify.className = `passInput`;
	submitButton.id = `submitButton`;
	submitButton.textContent = `Submit`;
	submitButton.setAttribute(`submitType`, `register`);
	submitButton.setAttribute(`onclick`, `processButton(this.parentElement);`);
	reminder.className = `regloginReminder`;

	formTitle.innerText = `Register`;
	formFirstName.innerHTML = `<label for="firstName">First Name</label><input id="firstName">`;
	formLastName.innerHTML = `<label for="lastName">Last Name</label><input id="lastName">`;
	formEmail.innerHTML = `<label for="email">Email</label><input id="email" autocomplete="off" type="email" onchange="validateInput(this, this.type);">`;
	formPassword.innerHTML = `<label for="pass">Password</label><input id="pass" type="password" onchange="validateInput(this, this.type);">`;
	formVerify.innerHTML = `<label for="passVerify">Verify</label><input id="passverify" type="password" onchange="validateInput(this, this.type);">`;
	reminder.innerHTML = `<h4>Already have an account? <a href="#login">Login</a></h4>`;

	formCell.appendChild(formTitle);
	sectionForm.appendChild(formFirstName);
	sectionForm.appendChild(formLastName);
	sectionForm.appendChild(formEmail);
	sectionForm.appendChild(formPassword);
	sectionForm.appendChild(formVerify);
	sectionForm.appendChild(submitButton);
	sectionForm.appendChild(reminder);
	formCell.appendChild(sectionForm);
	section.appendChild(formCell);
	root.appendChild(section);

	setTimeout(() => root.querySelector(`input`).focus(), 100);
};

async function loadProfile(){
	let section = document.createElement(`section`);

	section.className = `topSection`;
	section.id = `profile`;

	root.appendChild(section);
};

// Events
window.onhashchange = async function(){
	hash = location.hash && location.hash.slice(1);
	cookies = await str2arr(document.cookie, `; `);
	loggedIn = cookies.token && await verifyLogin();
	hash = hash.includes(`?`) ? hash.split(`?`)[0] : hash;

	await removeElements();

	if(loggedIn){
		switch (hash) {
			case `profile`:
				await loadProfile();
				break;
			case `directory`:
				await loadDirectory();
				break;
			case `dashboard`:
				await loadDashboard();
				break;
			case `posts`:
				await loadPosts();
				break;
			case `logout`:
				await logout();
				break;
			case `editProfile`:
				await loadEditProfile();
				break;
			case `addEducation`:
				await loadAddEdu();
				break;
			case `addExperience`:
				await loadAddExp();
				break;
			default:
				await loadDashboard();
				location.hash = `#dashboard`;
				break;
		}
	}else{
		switch (hash) {
			case `home`:
				await loadHome();
				break;
			case `register`:
				await loadRegister();
				break;
			case `login`:
				await loadLogin();
				break;
			case `forgot`:
				await loadForgotPass();
				break;
			default:
				await loadHome();
				location.hash = `#home`;
				break;
		}
	}
};

window.onload = async function(){
	hash = location.hash && location.hash.slice(1);
	cookies = await str2arr(document.cookie, `; `);
	loggedIn = cookies.token && await verifyLogin();
	hash = hash.includes(`?`) ? hash.split(`?`)[0] : hash;

	await removeElements();

	if(loggedIn){
		switch (hash) {
			case `profile`:
				await loadProfile();
				break;
			case `directory`:
				await loadDirectory();
				break;
			case `posts`:
				await loadPosts();
				break;
			case `logout`:
				await logout();
				break;
			case `editProfile`:
				await loadEditProfile();
				break;
			case `addEducation`:
				await loadAddEdu();
				break;
			case `addExperience`:
				await loadAddExp();
				break;
			default:
				await loadDashboard();
				location.hash = `#dashboard`;
				break;
		}
	}else{
		switch (hash) {
			case `home`:
				await loadHome();
				break;
			case `register`:
				await loadRegister();
				break;
			case `login`:
				await loadLogin();
				break;
			case `forgot`:
				await loadForgotPass();
				break;
			default:
				await loadHome();
				location.hash = `#home`;
				break;
		}
	}
};

// Utilities
async function deleteInfo(data){
	return await fetch(`/deleteInfo`, {
		headers: {
			'Content-Type': `application/json`,
			'Authorization': `${cookies.id}:${cookies.token}`,
		},
		method: `POST`,
		mode: `cors`,
		body: JSON.stringify({data}),
	}).then(async r => {
		let removed =  await r.json();
		let message = r.statusText;
		
		if(message.includes(`Alert:`)){
			let msg = message.split(`:`)[2];
			alert(msg);
		}

		if(removed){
			location.reload();
		}
	});
};
async function fetchData(data){
	return await fetch(data.target, {
		headers: {
			'Content-Type': `application/json`,
			'Authorization': `${data.id}:${data.token}`,
		},
		method: `POST`,
		mode: `cors`,
		body: JSON.stringify(data),
	}).then(async r => {
		return await r.json();
	});
};
async function prettyDate(e){
	e = e || new Date();

	let y = e.getFullYear();
	let m = e.getMonth();
	m = m < 9 ? `0${m + 1}` : (m + 1);
	let d = e.getDate();
	d = d < 10 ? `0${d}` : d;

	return `${y}-${m}-${d}`;
};
async function processButton(el){
	let target = el.back;
	let data = {};
	
	let inputs = el.getElementsByTagName(`input`);
	let textareas = el.getElementsByTagName(`textarea`);
	let selectLists = el.getElementsByTagName(`select`);

	for(let i = 0; i < inputs.length; i++){
		
		let field = inputs[i];
		let key = field.id;
		let value = field.checked ? true : field.value;

		data[key] = value;
	}

	for(let i = 0; i < textareas.length; i++){
		let textarea = textareas[i];
		let key = textarea.id;
		let value = textarea.value;

		data[key] = value;
	}

	for(let i = 0; i < selectLists.length; i++){
		let select = selectLists[i];

		for(let j = 0; j < select.children.length; j++){
			let option = select.children[j];

			if(option.selected){
				let key = select.id;
				let value = option.value;
				
				data[key] = value;
			}
		}
	}

	await fetch(target, {
		headers: {
			'Content-Type': `application/json`,
			'Authorization': loggedIn ? `${cookies.id}:${cookies.token}` : ``,
		},
		method: `POST`,
		mode: `cors`,
		body: JSON.stringify(data),
	}).then(async r => {
		let message = r.statusText;
		let url = window.location.origin;

		if(message.includes(`Alert:`)){
			let msg = message.split(`:`)[2];
			alert(msg);
		}

		if(message.startsWith(`Register`)){
			window.location.href = `${url}/#login`;
		}else if(message.startsWith(`Login`)){
			loggedIn = true;
			window.location.href = `${url}/#dashboard`;
		}else if(message.startsWith(`Forgot`)){
			window.location.href = `${url}/#login`;
		}else if(message.startsWith(`Logout`)){
			loggedIn = false;
			window.location.href = `${url}/#home`;
		}else if(message.startsWith(`Profile`)){
			window.location.href = `${url}/#profile`;
		}else if(message.startsWith(`Dashboard`)){
			window.location.href = `${url}/#dashboard`;
		}
	});
};
async function removeElements(){
	let elements = root.children;
	let elementsToRemove = [];
	
	for(let i = 0; i < elements.length; i++){
		let element = elements[i];
		elementsToRemove.push(element);
	}

	for(let i = 0; i < elementsToRemove.length; i++){
		let element = elementsToRemove[i];
		element.remove();
	}

	await createTopBar();
};
async function str2arr(string, split, a = []){
	let str = string.split(split);
	
	for(let i in str){
		let cur = str[i].split('=');
		a[cur[0]] = cur[1];
	}
	return a;
};
async function validateInput(el, type){
	let markedInvalid = el.classList.contains(`invalid`);

	if(type === `email`){
		let emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
		let value = el.value;
		let isEmail = emailRegex.test(value);
	
		if(isEmail && markedInvalid){
			el.classList.remove(`invalid`);
		}else if(!isEmail && !markedInvalid){
			el.classList.add(`invalid`);
		}
	}else if(type === `number`){
		let list = el.parentElement.parentElement;
		let value = el.value;
		let max = list.children.length;
		
		if(value > max || value < 1){
			el.classList.add(`invalid`);
		}else if(markedInvalid){
			el.classList.remove(`invalid`);
		}
	}else if(type === `password`){
		let passInputs = el.parentElement.parentElement.getElementsByClassName(`passInput`);
		let newInput = passInputs[0].getElementsByTagName(`input`)[0];
		let verifiedInput = passInputs[1] && passInputs[1].getElementsByTagName(`input`)[0];

		if(verifiedInput && verifiedInput.value){
			if(newInput.value === verifiedInput.value && markedInvalid){
				newInput.classList.remove(`invalid`);
				el.classList.remove(`invalid`);
			}else if(newInput.value !== verifiedInput.value && !markedInvalid){
				el.classList.add(`invalid`);
			}
		}
	}else if(type === `url`){
		let imageRegex = /(https:\/\/.+\.\w{2,3}\/.+\.(?:png|jpg))/i;
		let newInput = el.parentElement.parentElement.querySelector(`newAvatar`).querySelector(`input`);
		let valid = imageRegex.test(newInput.value)

		if(valid && markedInvalid){
			newInput.classList.remove(`invalid`);
			el.classList.remove(`invalid`);
		}else if(!valid && !markedInvalid){
			el.classList.add(`invalid`);
		}
	}else if(type === `text`){
		let valid = el.value.length > 0;
		
		if(valid && markedInvalid){
			el.classList.remove(`invalid`);
		}else if(!valid && !markedInvalid){
			el.classList.add(`invalid`);
		}

		return valid;
	}
};
async function verifyLogin(){
	let id = cookies.id;
	let token = cookies.token;
	
	return await fetch(`/verifyLogin`, {
		headers: {
			'Content-Type': `application/json`,
			'Authorization': `${id}:${token}`,
		},
		method: `POST`,
		mode: `cors`,
	}).then(async r => {
		let message = r.statusText;

		if(message.includes(`Alert:`)){
			let msg = message.split(`:`)[2];
			alert(msg);
		}

		return await r.json();
	});
};

// Alt Defaults
body.ondragstart = function(){return false};
body.ondrop = function(){return false};
document.onkeydown = async function(e){
	let enter = e.key === `Enter`;
	let esc = e.key === `Escape`;
	let closeButtonShowing = document.getElementById(`closeButton`);
	let submitButtonShowing = document.getElementById(`submitButton`);
	
	if(enter && submitButtonShowing){
		e.preventDefault();
		submitButtonShowing.click()
	}else if(esc && closeButtonShowing){
		closeButtonShowing.click();
	}
};
html.onmousedown = async function(e){
	if(e.button === 2){
		e.preventDefault();
		alert(`Right click is disabled.`);
		return;
	}
};