let scripts, config, bcrypt, express, fs, https, path, util, port, domain, self;

exports.server = {
	init: async function(s){
		// Scripts
		scripts = s;

		// Config
		config = scripts.config;
		port = config.server.port;
		// Packages
		bcrypt = scripts.packages.bcrypt;
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

		app.use(express.static(`site`));
		app.use(function(req, res, next) {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization, Accept");
			next();
		});
	},
	f: {

	},
	v: {
		testing: true,
	}
}