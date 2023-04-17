const { create, getUserIdByRFID } = require("./access.service");
const { getUsernameById } = require("../users/user.service");

module.exports = {
	createAccessEntry: async (req, res) => {
		const body = req.body;
		//call the function getUserIdByRFID to get the id of the user
		getUserIdByRFID(body.rfid, async (err, results) => {
			if (err) {
				console.log(err);
				return res.status(500).json({
					success: 0,
					message: "RFID not found",
				});
			}
			if (results == null) {
				return res.status(500).json({
					success: 0,
					message: "RFID not found",
				});
			}
			body.id = results.id;
			getUsernameById(body.id, async (err, results) => {
				if (err) {
					console.log(err);
					return res.status(500).json({
						success: 0,
						message: "illegal access",
					});
				}
				if (results == null) {
					return res.status(500).json({
						success: 0,
						message: "illegal access",
					});
				}
				body.username = results.Username;
				create(body, async (err, results) => {
					if (err) {
						console.log(err);
						return res.status(500).json({
							success: 0,
							message: "Database connection error",
						});
					}
					return res.status(200).json({
						success: 1,
						data: results,
					});
				});
			});
		});
	},
};
