const mysql = require("mysql");
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

var server = {
	port: process.env.PORT,
};

app.use(express.json());

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

const userRouter = require("./api/users/user.router");

app.use("/api/users", userRouter);

const accessRouter = require("./api/Access/access.router");

app.use("/api/access", accessRouter);

app.listen(server.port, () =>
	console.log(`Server started, listening port: ${server.port}`)
);
