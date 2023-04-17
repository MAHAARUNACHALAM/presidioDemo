const {
	create,
	getUserByUserEmail,
	getUserByUserId,
	getUsers,
	updateUser,
	deleteUser,
} = require("./user.service");

const { genSaltSync, hashSync, compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
	createUser: (req, res) => {
		const body = req.body;
		console.log(body);
		const salt = genSaltSync(10);
		body.password = hashSync(body.password, salt);
		console.log(module.exports.create);
		create(body, (err, results) => {
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
	},
	login: async (req, res) => {
		const body = req.body;
		getUserByUserEmail(body.email, async (err, results) => {
			if (err) {
				console.log(err);
			}
			if (!results) {
				return res.json({
					success: 0,
					data: "Invalid email or password",
				});
			}

			console.log(results.Password);
			console.log(body.password);
			const result = await compare(body.password, results.Password);
			console.log(result);
			if (result) {
				results.password = undefined;
				const jsontoken = sign({ result: results }, process.env.JWT, {
					expiresIn: "15h",
				});
				return res.json({
					success: 1,
					message: "login successfully",
					token: jsontoken,
				});
			} else {
				return res.json({
					success: 0,
					data: "Invalid email or password",
				});
			}
		});
	},

	getUserByUserId: (req, res) => {
		console.log(req.params);
		const id = req.params.id;
		getUserByUserId(id, (err, results) => {
			if (err) {
				console.log(err);
				return;
			}
			if (!results) {
				return res.json({
					success: 0,
					message: "Record not Found",
				});
			}
			results.Password = undefined;
			return res.json({
				success: 1,
				data: results,
			});
		});
	},
	getUsers: (req, res) => {
		getUsers((err, results) => {
			if (err) {
				console.log(err);
				return;
			}
			return res.json({
				success: 1,
				data: results,
			});
		});
	},
	updateUsers: (req, res) => {
		const body = req.body;
		const salt = genSaltSync(10);
		body.password = hashSync(body.password, salt);
		updateUser(body, (err, results) => {
			if (err) {
				console.log(err);
				return;
			}
			return res.json({
				success: 1,
				message: "updated successfully",
			});
		});
	},
	deleteUser: (req, res) => {
		const data = req.body;
		deleteUser(data, (err, results) => {
			if (err) {
				console.log(err);
				return;
			}
			if (!results) {
				return res.json({
					success: 0,
					message: "Record Not Found",
				});
			}
			return res.json({
				success: 1,
				message: "user deleted successfully",
			});
		});
	},
};
