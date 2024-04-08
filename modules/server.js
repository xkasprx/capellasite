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
		let scheme, options, server;

		if(config.testing){
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
			res.header("Access-Control-Allow-Origin", "https://capella.dmskaspr.com");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization, Accept");
			next();
		});

		app.post(`/forgot`, async (req, res) => {
			res.statusMessage = `Forgot:Alert:FORGOT PASSWORD DISABLED AS MAILER IS NOT SET UP. THIS PAGE IS FOR DEMONSTRATION PURPOSES ONLY, IF MAILER WAS ENABLED, AN EMAIL WOULD BE SENT TO RESET THE PASSWORD.`;
			res.status(200).send();
		});

		app.post(`/getEdu`, async (req, res) => {
			let info = req.body;
			let id = info.id;
			let eduInfo = await self.f.fetchEdu(id);

			res.status(200).send(eduInfo);
		});

		app.post(`/getExp`, async (req, res) => {
			let info = req.body;
			let id = info.id;
			let expInfo = await self.f.fetchExp(id);

			res.status(200).send(expInfo);
		});

		app.post(`/getInfo`, async (req, res) => {
			let data = req.headers.authorization.split(`:`);
			let id = data[0];
			let token = data[1];
			let userInfo = {};
			let msg = ``;

			let existingUser = await self.f.fetchExisting(`id`, id);

			if(existingUser.status && existingUser.user.token === token){
				let profileData = await self.f.fetchProfile(id);
				let socialData = await self.f.fetchSocial(id);


				userInfo = {
					firstName: existingUser.user.firstName || ``,
					lastName: existingUser.user.lastName || ``,
					email: existingUser.user.email,
					company: profileData && profileData.company || ``,
					website: profileData && profileData.website || ``,
					location: profileData && profileData.location || ``,
					proStatus: profileData && profileData.proStatus || ``,
					skills: profileData && profileData.skills || ``,
					bio: profileData && profileData.bio || ``,
					github: socialData && socialData.github || ``,
					twitter: socialData && socialData.twitter || ``,
					facebook: socialData && socialData.facebook || ``,
					linkedin: socialData && socialData.linkedin || ``,
					youtube: socialData && socialData.youtube || ``,
					instagram: socialData && socialData.instagram || ``,
				};

				msg = `Success:Data Retreived`;
			}else{
				msg = `Failed:Alert:There was an error retreiving your data, please logout and back in. If the issue continues please try again at a later time.`;
			}

			res.statusMessage = msg;
			res.status(200).send(userInfo);
		});

		app.post(`/getUser`, async (req, res) => {
			let data = req.body;
			let id = data.id;
			let token = data.token;
			let msg = ``;

			let existingUser = await self.f.fetchExisting(`id`, id);

			if(existingUser && existingUser.token === token){
				msg = `Success:Data Retreived`;
			}else{
				msg = `Failed:Alert:There was an error retreiving your data, please logout and back in. If the issue continues please try again at a later time.`;
			}

			res.statusMessage = msg;
			res.status(200).send(existingUser ? existingUser : null);
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

		app.post(`/logout`, async (req, res) => {
			let info = req.headers.authorization.split(`:`);
			let id = info[0];

			await self.f.logoutUser(id);
			await self.f.clearCookie(res, `id`);
			await self.f.clearCookie(res, `token`);

			res.statusMessage = `Logout:Alert:Logged Out Successfully`;
			res.status(200).send();
		});

		app.post(`/register`, async (req, res) => {
			let data = req.body;
			let email = data.email;
			let pass = data.pass;
			let passverify = data.passverify;
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
					let registered = await self.f.registerUser(data);
					
					if(registered.status){
						let createdProfile = await self.f.createTableData(registered.id, `profiles`);
						let createdSocial = await self.f.createTableData(registered.id, `social`);

						if(createdProfile && createdSocial){
							await self.f.createCookie(res, `id`, registered.id, self.v.exp);
							await self.f.createCookie(res, `token`, registered.token, self.v.exp);
	
							msg = `Register:Alert:${email} has been registered successfully.`;
						}else{
							await self.f.deleteAccount(registered.id, `user`, `id`);
							await self.f.deleteAccount(registered.id, `profiles`, `user`);
							await self.f.deleteAccount(registered.id, `social`, `user`);

							msg = `Failed:Alert:There was an error during registration, please try again. If the issue continues, please try again later.`
						}
					}else{
						msg = `Failed:Alert:An error occurred while registering, please try again. If the issue persists, please try again at a later time.`;
					}
				}
			}

			res.statusMessage = msg;
			res.status(200).send();
		});

		app.post(`/updateInfo`, async (req, res) => {
			let info = req.headers.authorization.split(`:`);
			let data = req.body;
			let id = info[0];
			let token = info[1];

			let userData = {
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
			};

			let profileData = {
				company: data.company,
				website: data.website,
				location: data.location,
				proStatus: data.proStatus === 0 ? `` : data.proStatus,
				skills: data.skills,
				bio: data.bio,
			};

			let socialData = {
				github: data.github,
				twitter: data.twitter,
				facebook: data.facebook,
				linkedin: data.linkedin,
				youtube: data.youtube,
				instagram: data.instagram,
			};

			let userUpdated = await self.f.updateInfo(`id`, id, token, `user`, userData);
			let profilesUpdated = await self.f.updateInfo(`user`, id, false, `profiles`, profileData);
			let socialUpdated = await self.f.updateInfo(`user`, id, false, `social`, socialData);

			if(userUpdated && profilesUpdated && socialUpdated){

				msg = `Profile:Alert:Your profile information has been successfully updated.`;
			}else{
				msg = `Failed:Alert:An error occurred updating your information, some of the information below may not be updated to the new information. Please try again. If the issue continues, please try again at a later time.`;
			}

			res.statusMessage = msg;
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
		createTableData: async (id, table) => {
			return await new Promise((resolve) => {
				query(`INSERT IGNORE INTO \`${table}\` SET \`user\` = ${id}`, (e, r, f) => resolve(!e ? true : false));
			});
		},
		deleteAccount: async (id, table, column) => {
			query(`DELETE FROM \`${table}\` WHERE \`${column}\` = ${id}`);
		},
		fetchEdu: async (id) => {
			return await new Promise((resolve) => {
				query(`SELECT * FROM \`education\` WHERE \`user\` = ${id}`, (e, r, f) => {
					if(e){
						resolve([]);
					}else{
						resolve(r);
					}
				});
			});
		},
		fetchExp: async (id) => {
			return await new Promise((resolve) => {
				query(`SELECT * FROM \`experience\` WHERE \`user\` = ${id}`, (e, r, f) => {
					if(e){
						resolve([]);
					}else{
						resolve(r);
					}
				});
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
		fetchProfile: async (id) => {
			return await new Promise(async (resolve) => {
				query(`SELECT * FROM \`profiles\` WHERE \`id\` = ${id}`, (e, r, f) => {
					if(e){
						resolve(false);
					}else{
						if(r && r.length){
							resolve(r[0]);
						}else{
							resolve(false);
						}
					}
				});
			});
		},
		fetchSocial: async (id) => {
			return await new Promise(async (resolve) => {
				query(`SELECT * FROM \`social\` WHERE \`id\` = ${id}`, (e, r, f) => {
					if(e){
						resolve(false);
					}else{
						if(r && r.length){
							resolve(r[0]);
						}else{
							resolve(false);
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
		registerUser: async (data) => {
			let encryptedPassword = await bcrypt.hash(data.pass, 10);
			let token = await self.f.generateToken();

			let userInfo = {
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
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
		updateInfo: async (column, id, token, table, data) => {
			return await new Promise((resolve) => {
				let sql1 = `UPDATE \`${table}\` SET ? WHERE \`id\` = ${id}`;
				let sql2 = `AND \`token\` = "${token}"`;
				query(`${sql1}${token ? ` ${sql2}` : ``}`, data, (e, r, f) => {
					if(e){
						resolve(false);
					}else{
						resolve(true);
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
	}
}