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
	let directoryLink = document.createElement(`div`);
	let titleImg = new Image(300, 75);
	
	titleImg.src = `../images/header.png`;
	header.id = `header`;
	title.id = `title`;
	menu.id = `menu`;

	directoryLink.className = `headerLinks`;
	directoryLink.innerHTML = `<a href="#directory"><i class="fa-solid fa-user"></i> Developers</a>`;

	title.appendChild(titleImg);
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
	let blockContainer = document.createElement(`section`);
	let container = document.createElement(`section`);
	let topBox = document.createElement(`div`);
	let title = document.createElement(`h1`);
	let landingContent = document.createElement(`p`);
	let button = document.createElement(`button`);

	title.innerText = `DevBook`;
	landingContent.innerText = `Create a developer profile, share posts and get help from other developers`;
	blockContainer.innerHTML = `<h1>How to get started</h1><br><br><p><strong>1 </strong>Customize your profile. Click your profile image in the top right corner, then select the gear icon to make your profile uniquely yours.</p><br><p><strong>2 </strong>Explore fellow developers and posts.</p><br><p><strong>3 </strong>Like the posts you like to share the love and start getting to know the community.</p><br><p><strong>4 </strong>Reply to a question in an existing thread or ask a question by creating a new topic.</p>`

}

window.onhashchange = async function(){
	if(atHome){
		await loadHome();
	}else if(atRegister){
	
	}else if(atLogin){
	
	}else if(atProfile){
	
	}else if(atDirectory){
	
	}else if(atDashboard){
	
	}else if(atPosts){
	
	}else if(loggingOut){

	}
}

window.onload = async function(){
	await createTopBar();

	if(atHome){
		await loadHome();
	}else if(atRegister){
	
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