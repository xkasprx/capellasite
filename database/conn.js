let config, db, mysql, self;

exports.con = {
	init: async function(scripts){
		// Configuration
		config = scripts.config;
		db = config.database;

		// Packages
		mysql = scripts.packages.mysql;

		// Utilities
		util = scripts.util;

		self = this;

		return new Promise((resolve, reject) => {
			self.connection = mysql.createPool({
				connectionLimit: 100,
				host     : db.host,
				user     : db.user,
				password : db.pass,
				database : db.database,
			});

			self.connection.getConnection((error, con) => error ? reject(error) : resolve(con));
		})
	},
	connection: {},
};