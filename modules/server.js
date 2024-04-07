let scripts, query, config, bcrypt, bodyParser, cookieParser, express, fs, https, path, util, port, domain, self;

exports.server = {
	init: async function(s){
		// Scripts
		scripts = s;
		query = scripts.database.query;

		// Config
		config = scripts.config;
		port = config.server.port;

		// Packages
		bcrypt = scripts.packages.bcryptjs;
		bodyParser = scripts.packages.bodyParser;
		cookieParser = scripts.packages.cookieParser;
		express = scripts.packages.express;
		fs = scripts.packages.fs;
		https = scripts.packages.https;
		path = scripts.packages.path;

		// Utilities
		util = scripts.util;

		self = this;

		await self.startServer();
	},
	startServer: async () => {
		let app = express();
		let jsonParser = bodyParser.json();
		let scheme, options, server;

		if(self.v.testing){
			domain = `localhost`;
			scheme = `http`;
			app.listen(port);
		}else{
			options = {
				key: fs.readFileSync(config.server.certificate),
				cert: fs.readFileSync(config.server.certificate),
			}
			domain = `capella.dmskaspr.com`;
			scheme = `https`;

			server = https.createServer(options, app);
			server.listen(port);
		}

		app.use(cookieParser());
		app.use(bodyParser.urlencoded({ extended: true }));
		app.use(express.json());
		app.use(`/`, express.static(`site`));

		app.use(function(req, res, next) {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization, Accept");
			next();
		});

		app.post(`/forgot`, async (req, res) => {
			res.statusMessage = `Forgot:Alert:FORGOT PASSWORD DISABLED AS MAILER IS NOT SET UP. THIS PAGE IS FOR DEMONSTRATION PURPOSES ONLY, IF MAILER WAS ENABLED, AN EMAIL WOULD BE SENT TO RESET THE PASSWORD.`;
			res.status(200).send();
		});

		app.post(`/getEdu`, async (req, res) => {
			let userId = 

			res.status(200).send([]);
		});

		app.post(`/getExp`, async (req, res) => {

			res.status(200).send([]);
		});

		app.post(`/getUser`, async (req, res) => {
			let data = req.body;
			let id = data.id;
			let msg = ``;

			let existingUser = await self.f.fetchExisting(`id`, id);

			if(existingUser){
				msg = `Success:Data Retreived`;
			}else{
				msg = `Failed:Alert:There was an error retreiving your data, please logout and back in. If the issue continues please try again at a later time.`;
			}

			res.statusMessage = msg;
			res.status(200).send(existingUser ? existingUser : null)
		});

		app.post(`/login`, async (req, res) => {
			let data = req.body;
			let email = data.email;
			let password = data.pass;
			let msg = ``;

			let existing = await self.f.fetchExisting(`email`, email);

			if(existing.status === `failed`){
				msg = `Failed:Alert:An error occurred while attempting to login, please try again. If the issue persists, please try again at a later time.`;
			}else{
				if(existing.status){
					let passMatch = await bcrypt.compare(password, existing.user.password);

					if(passMatch){
						let token = await self.f.generateToken();

						let loggedIn = await self.f.loginUser(existing.user.id, token);

						if(loggedIn){
							await self.f.createCookie(res, `id`, existing.user.id, self.v.exp);
							await self.f.createCookie(res, `token`, token, self.v.exp);
	
							msg = `Login:Success`;
						}else{
							msg = `Failed:Alert:An error occurred while attempting to login, please try again. If the issue persists, please try again at a later time.`;
						}
					}else{
						msg = `Failed:Alert:Incorrect password, please try again.`;
					}
				}else{
					msg = `Failed:Alert:There is no user registered with the email ${email}. Please check your information and try again, otherwise, please register.`;
				}
			}

			res.statusMessage = msg;
			res.status(200).send();
		});

		app.post(`/register`, async (req, res) => {
			let data = req.body;
			let passverify = data.passverify;
			let email = data.email;
			let pass = data.pass;
			let msg = ``;

			if(pass !== passverify){
				msg = `Failed:Alert:Passwords do not match, please correct before continuing.`;
			}else{
				let existing = await self.f.fetchExisting(`email`, email);

				if(existing.status === true){
					msg = `Register:Alert:This email address is already registered. Please login to continue.`;
				}else if(existing.status === `failed`){
					msg = `Failed:Alert:An error occurred while registering, please try again. If the issue persists, please try again at a later time.`;
				}else{
					let registered = await self.f.registerUser(email, pass);

					if(registered.status){
						await self.f.createCookie(res, `id`, registered.id, self.v.exp);
						await self.f.createCookie(res, `token`, registered.token, self.v.exp);

						msg = `Register:Alert:${email} has been registered successfully.`;
					}else{
						msg = `Failed:Alert:An error occurred while registering, please try again. If the issue persists, please try again at a later time.`;
					}
				}
			}

			res.statusMessage = msg;
			res.status(200).send();
		});

		app.post(`/logout`, async (req, res) => {
			let cookies = req.headers.authorization;


			await self.f.clearCookie(res, `id`);
			await self.f.clearCookie(res, `token`);

			res.statusMessage = `Logout:Alert:Logged Out Successfully`;
			res.status(200).send();
		});

		app.post(`/verifyLogin`, async (req, res) => {
			let info = req.headers.authorization.split(`:`);
			let id = info[0];
			let token = info[1];
			let verified = await self.f.verifyUser(id, token);
			let msg;
			
			if(verified){
				msg = `Verified:Login Verified`;
			}else{
				await self.f.logoutUser(id);
				await self.f.clearCookie(res, `id`);
				await self.f.clearCookie(res, `token`);

				msg = `Logout:Alert:Login expired, for security you have been logged out.`;
			}

			res.statusMessage = msg;
			res.status(200).send(verified);
		});
	},
	f: {
		clearCookie: async (res, title) => {
			res.clearCookie(title, {
				path: `/`,
				domain: domain,
			});
		},
		createCookie: async (res, title, string, exp) => {
			res.cookie(title, string, {
				path: `/`,
				domain,
				secure: true,
				expires: exp,
			});
		},
		fetchExisting: async (column, data) => {
			return await new Promise(async (resolve) => {
				query(`SELECT * FROM \`user\` WHERE \`${column}\` = "${data}"`, (e, r, f) => {
					if(e){
						resolve({status: `failed`});
					}else{
						if(r && r.length){
							resolve({status: true, user: r[0]});
						}else{
							resolve({status: false});
						}
					}
				});
			});
		},
		generateToken: async (s = ``) => {
			let random1 = await util.random.number(25, 50);
			let random2 = await util.random.number(10, 20);
			let token1 = await util.random.string(random1);
			let token2 = new Date().getTime();
			let token3 = await util.random.string(random2);
			let token = `${token1}${token2}${token3}`;
			s = token.split('').sort(
				function(){
					return 0.5 - Math.random();
				}).join('');

			return s;
		},
		loginUser: async (id, token) => {
			return await new Promise(async (resolve) => {
				query(`UPDATE \`user\` SET \`token\` = "${token}" WHERE \`id\` = ${id}`, (e, r, f) => {
					if(e){
						resolve(false);
					}else{
						resolve(true);
					}
				})
			});
		},
		logoutUser: async (id) => {
			return await new Promise(async (resolve) => {
				query(`UPDATE \`user\` SET \`token\` = NULL WHERE \`id\` = ${id}`, (e, r, f) => {
					if(e){
						resolve(false);
					}else{
						resolve(true);
					}
				})
			});
		},
		registerUser: async (email, password) => {
			let encryptedPassword = await bcrypt.hash(password, 10);
			let token = await self.f.generateToken();

			let userInfo = {
				email,
				password: encryptedPassword,
				token,
			};

			return await new Promise(async (resolve) => {
				query(`INSERT INTO \`user\` SET ?`, userInfo, (e, r, f) => {
					if(e){
						resolve(false);
					}else{
						resolve({status:true, id:r.insertId, token});
					}
				})
			});
		},
		verifyUser: async (id, token) => {
			return await new Promise(async (resolve) => {
				query(`SELECT * FROM  \`user\` WHERE \`id\` = ${id}`, (e, r, f) => {
					let data = r && r[0];

					if(e){
						resolve(false);
					}else{
						if(data){
							if(token === data.token){
								resolve(true);
							}else{
								resolve(false);
							}
						}else{
							resolve(false);
						}
					}
				})
			});
		},
	},
	v: {
		exp: new Date(new Date().setDate(new Date().getDate() + 30)),
		testing: true,
	}
}