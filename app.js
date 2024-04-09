
// Configuration
const config = require(`./config/config.json`);

// Database
const con = require(`./database/conn`).con;
const query = require(`./database/query`).query;

// Packages
const bcryptjs = require(`bcryptjs`);
const bodyParser = require(`body-parser`);
const cookieParser = require(`cookie-parser`);
const express = require(`express`);
const fs = require(`fs`);
const grid = require(`gridjs`);
const https = require(`https`);
const jso = require(`javascript-obfuscator`);
const mysql = require(`mysql2`);
const path = require(`path`);
const sass = require(`sass`);

// Server
const server = require(`./modules/server`).server;

// Utilities
const util = require(`./modules/util`).util;

const scripts = {
	config,
	database: {
		con,
		query,
	},
	packages: {
		bcryptjs,
		bodyParser,
		cookieParser,
		express,
		fs,
		grid,
		https,
		mysql,
		path,
	},
	util,
	versionInfo: {
		node: process.version,
	},
};

// Processes
let processes = {
	obfuscateMinify: async () => {
		let srcJSfiles = path.join(__dirname, `/siteFiles/js/`);
		let buildJSfiles = path.join(__dirname, `/site/js/`);
		let srcSCSSfiles = path.join(__dirname, `/siteFiles/scss/`);
		let buildCSSfiles = path.join(__dirname, `/site/css/`);

		let readDirectory = async function(dirPath, js){
			fs.readdir(dirPath, (e, f) => {
				if(e){
					console.log(`Could not read directory`, e);
					process.exit(1);
				}else{
					f.forEach((file, index) => {
						let filePath = path.join(dirPath, file);
						
						fs.stat(filePath, (e, stat) => {
							if(e){
								console.log(`Error stating file`, e);
								return;
							}else{								
								if(stat.isFile()){
									if(filePath.endsWith(`.js`)){
										buildJSfile(filePath);
									}else if(filePath.endsWith(`.scss`)){
										buildCSSfile(filePath);
									}
								}else if(stat.isDirectory()){
									if(!fs.existsSync(newPath)){
										fs.mkdirSync(newPath);
									}

									readDirectory(filePath);
								}
							}
						});
					})
				}
			});

		};
		let buildJSfile = async function(filePath){
			let content = fs.readFileSync(filePath).toString();
			let newPath = filePath.replace(srcJSfiles, buildJSfiles);

			let result = jso.obfuscate(content, {
				compact: true,
				controlFlowFlattening: true,
				target: `browser`,
				transformObjectKeys: true,
			});

			fs.writeFileSync(`${newPath.replace(`.js`, `.min.js`)}`, result.getObfuscatedCode());
		};
		let buildCSSfile = async function(filePath){
			let content = sass.compile(filePath, { style: 'compressed', sourceMap: true});
			let newPath = filePath.replace(srcSCSSfiles, buildCSSfiles);

			fs.writeFileSync(`${newPath.replace(`.scss`, `.min.css`)}`, content.css);
		};

		readDirectory(srcJSfiles, true);
		readDirectory(srcSCSSfiles, false);
		util.log(`Obfuscated & Minified JS             `, util.prettyDate(), `green`, `blue`);
		util.log(`Compiled & Minified SCSS             `, util.prettyDate(), `green`, `blue`);
	},
	connectDatabase: async () => {
		await new Promise(async (resolve) => con.init(scripts).then((connection) => {
			scripts.database.con = connection;
			scripts.database.query = query.bind(connection) && query.execute;
			util.log(`Database '${config.database.database}' connected at      `, util.prettyDate(), `green`, `blue`);
			resolve();
		})).catch(e => util.log(`[ERROR]                              `, `${util.prettyDate()}\nconnectDatabase ${e}`, `red`, `red`));
	},
	startServer: async () => {
		await new Promise(async (resolve) => server.init(scripts).then(resolve()));
		util.log(`Server listening on port             `, config.server.port, `blue2`, `green`);
	},
};

// Initialization
(async () => {
	// Log Versions
	console.log(` `);
	util.log(`Node version                         `, scripts.versionInfo.node, `magenta2`, `yellow2`);

	// Run Processes
	await processes.connectDatabase();
	await processes.obfuscateMinify();
	await processes.startServer();
})();