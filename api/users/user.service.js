const pool = require("../../config/database");

module.exports = {
	create: (data, callBack) => {
		pool.query(
			`insert into User(Username, Password, Email) 
					values(?,?,?)`,
			[data.Username, data.password, data.email],
			(error, results, fields) => {
				if (error) {
					callBack(error);
				}
				return callBack(null, results);
			}
		);
	},
	getUserByUserEmail: (email, callBack) => {
		pool.query(
			`select * from User where Email = ?`,
			[email],
			(error, results, fields) => {
				if (error) {
					callBack(error);
				}
				return callBack(null, results[0]);
			}
		);
	},
	getUserByUserId: (id, callBack) => {
		pool.query(
			`select Username, Password, Email from User where ID = ?`,
			[id],
			(error, results, fields) => {
				if (error) {
					callBack(error);
				}
				return callBack(null, results[0]);
			}
		);
	},
	getUsers: (callBack) => {
		pool.query(
			`select ID,Username, Password, Email from User`,
			[],
			(error, results, fields) => {
				if (error) {
					callBack(error);
				}
				return callBack(null, results);
			}
		);
	},
	updateUser: (data, callBack) => {
		pool.query(
			`update User set Username=?, Password=?, Email=? where ID = ?`,
			[data.Username, data.email, data.password, data.id],
			(error, results, fields) => {
				if (error) {
					callBack(error);
				}
				return callBack(null, results[0]);
			}
		);
	},
	deleteUser: (data, callBack) => {
		pool.query(
			`delete from User where ID = ?`,
			[data.id],
			(error, results, fields) => {
				if (error) {
					callBack(error);
				}
				return callBack(null, results[0]);
			}
		);
	},
	getUsernameById: (id, callBack) => {
		console.log("getUsernameById");
		console.log(id);
		pool.query(
			`select Username from User where ID = ?`,
			[id],
			(error, results, fields) => {
				if (error) {
					callBack(error);
				}
				return callBack(null, results[0]);
			}
		);
	},
};
