let root = document.getElementsByTagName(`root`)[0];
let currentHash = window.location.hash && window.location.hash.slice(1);
let loggedIn = false;
let atHome = !loggedIn && currentHash === `home`;
let atRegister = !loggedIn && currentHash === `register`;
let atLogin = !loggedIn && currentHash === `login`;
let atProfile = loggedIn && currentHash === `profile`;
let atDirectory = currentHash === `directory`;
let atDashboard = loggedIn && currentHash === `dashboard`;
let atPosts = loggedIn && currentHash === `posts`;
let loggingOut = loggedIn && currentHash === `logout`;

async function createTopBar(){
	let header = document.createElement(`div`);
	let title = document.createElement(`div`);
	let menu = document.createElement(`div`);
	let titleLink = document.createElement(`a`);
	let directoryLink = document.createElement(`div`);
	let titleImg = new Image(300, 75);
	
	titleLink.href = `#home`;
	titleImg.src = `../images/header.png`;
	header.id = `header`;
	title.id = `title`;
	menu.id = `menu`;

	directoryLink.className = `headerLinks`;
	directoryLink.innerHTML = `<a href="#directory"><i class="fa-solid fa-user"></i> Developers</a>`;

	titleLink.appendChild(titleImg);
	title.appendChild(titleLink);
	menu.appendChild(directoryLink);

	if(loggedIn){
		let postsLink = document.createElement(`div`);
		let dashboardLink = document.createElement(`div`);
		let logoutLink = document.createElement(`div`);

		postsLink.className = `headerLinks`;
		postsLink.innerHTML = `<a href="#posts"><i class="fa-solid fa-comment"></i>  Posts</a>`;
		dashboardLink.className = `headerLinks`;
		dashboardLink.innerHTML = `<a href="#dashboard"><i class="fa-solid fa-user"></i>  Dashboard</a>`;
		logoutLink.className = `headerLinks`;
		logoutLink.innerHTML = `<a href="#logout"><i class="fa-solid fa-right-from-bracket"></i>  Logout</a>`;

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

async function loadHome(){
	let heroSection = document.createElement(`section`);
	let landingContent = document.createElement(`div`);
	let blockContainer = document.createElement(`div`);
	let container = document.createElement(`div`);
	let imgContainer = document.createElement(`section`);
	let heroImg = new Image();

	heroSection.className = `hero`;
	heroImg.src = `../images/hero-img.svg`;
	imgContainer.id = `landingImage`;

	landingContent.innerHTML = `<h1>DevBook</h1><p>Create a developer profile, share posts and get help from other developers</p><a href="#register"><button id="register">Get Started</button></a>`;
	blockContainer.innerHTML = `<h1>How to get started</h1><p><strong>1 </strong>Customize your profile. Click your profile image in the top right corner, then select the gear icon to make your profile uniquely yours.</p><p><strong>2 </strong>Explore fellow developers and posts.</p><p><strong>3 </strong>Like the posts you like to share the love and start getting to know the community.</p><p><strong>4 </strong>Reply to a question in an existing thread or ask a question by creating a new topic.</p>`;
	container.innerHTML = `<h1>What is DevBook</h1><p>DevBook is a community for growing developers.</p>`;
	
	imgContainer.appendChild(heroImg);
	heroSection.appendChild(landingContent);
	
	heroSection.appendChild(blockContainer);
	heroSection.appendChild(container);
	root.appendChild(heroSection);
	root.appendChild(imgContainer);
};

async function loadRegister(){
	let formCell = document.createElement(`div`);
	let formTitle = document.createElement(`h1`);
	let formEmail = document.createElement(`div`);
	let formPassword = document.createElement(`div`);
	let formVerify = document.createElement(`div`);

	formCell.innerText(`Test`);

	root.appendChild(formCell);

};

async function processClick(el){
	let elementID = el.id;

	switch (elementID){
		case `home`:
			await removeElements();
			await loadHome();
			break;
		case `register`:
			await removeElements();
			await loadRegister();
			break;
		default:
			break;
	}
};

async function removeElements(){
	console.log(`running`);
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



window.onhashchange = async function(){
	await removeElements();

	console(loggedIn, currentHash === `register`);
	if(atHome){
		await loadHome();
	}else if(atRegister){
		console.log(true);
		await loadRegister();
	}else if(atLogin){
	
	}else if(atProfile){
	
	}else if(atDirectory){
	
	}else if(atDashboard){
	
	}else if(atPosts){
	
	}else if(loggingOut){

	}
}

window.onload = async function(){
	await removeElements();
	
	if(atHome){
		await loadHome();
	}else if(atRegister){
		await loadRegister();
	}else if(atLogin){
	
	}else if(atProfile){
	
	}else if(atDirectory){
	
	}else if(atDashboard){
	
	}else if(atPosts){
	
	}else if(loggingOut){

	}else if(!loggedIn){
		window.location.hash = `home`;
	}
}