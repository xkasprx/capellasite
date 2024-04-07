let scripts, config, bcrypt, bodyParser, cookieParser, express, fs, https, path, util, port, domain, self;

exports.server = {
	init: async function(s){
		// Scripts
		scripts = s;

		// Config
		config = scripts.config;
		port = config.server.port;

		// Packages
		bcrypt = scripts.packages.bcrypt;
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
			res.statusMessage = `Forgot:Alert:Forgotten Password Email Sent`;
			res.status(200).send();
		});

		app.post(`/getEdu`, async (req, res) => {

			res.status(200).send([{school: `Capella University`, degree: `Bachelors of Science`, from: 2023, to: 2024, current: 1}]);
		});

		app.post(`/getExp`, async (req, res) => {

			res.status(200).send([{company: `Winter Clan LLC`, title: `JavaScript Developer`, from: 2022, to: null, current: 1}]);
		});

		app.post(`/login`, async (req, res) => {


			await self.f.createCookie(res, `auth`, `test123`, self.v.exp);
			await self.f.createCookie(res, `id`, 1, self.v.exp);
			await self.f.createCookie(res, `firstName`, `Daniel`, self.v.exp);
			res.statusMessage = `Login:Alert:Logged In Successfully`;
			res.status(200).send();
		});

		app.post(`/register`, async (req, res) => {
			res.statusMessage = `Register:Alert:Registration Successful`;
			res.status(200).send();
		});

		app.post(`/logout`, async (req, res) => {
			let cookies = req.headers.authorization;

			await self.f.clearCookie(res, `auth`);
			await self.f.clearCookie(res, `id`);
			await self.f.clearCookie(res, `firstName`, `Daniel`, self.v.exp);
			res.statusMessage = `Logout:Alert:Logged Out Successfully`;
			res.status(200).send();
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
	},
	v: {
		exp: new Date(new Date().setDate(new Date().getDate() + 30)),
		testing: true,
	}
}