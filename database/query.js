let con;

exports.query = {
	bind: c => con = c,
	execute: (statement, details, callback) => {
		if(details){
			con.query(statement, details, function(error, results, fields){
				callback(error, results, fields);
			});
		}else{
			con.query(statement, function(error, results, fields){
				callback(error, results, fields);
			});
		}
	},
};