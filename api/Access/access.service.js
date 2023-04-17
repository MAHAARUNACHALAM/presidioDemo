const pool = require("../../config/database");

module.exports = {
	getUserIdByRFID: (rfid, callBack) => {
		pool.query(
			`select id from user where RFID = ?`,
			[rfid],
			(error, results, fields) => {
				if (error) {
					callBack(error);
				}
				return callBack(null, results[0]);
			}
		);
	},

	create: (data, callBack) => {
		//get the data from the request user table
		var id = data.id;
		var username = data.username;
		console.log(username);
		//call the function getUserIdByRFID to get the id of the user

		//get the current time
		var timestamp = new Date();

		pool.query(
			`insert into access(idaccess, Name, Timestamp) 
                    values(?,?,?)`,
			[id, username, timestamp],
			(error, results, fields) => {
				if (error) {
					callBack(error);
				}
				return callBack(null, results);
			}
		);
	},
};
