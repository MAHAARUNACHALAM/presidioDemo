const { createAccessEntry } = require("./access.controller");

const { checkToken } = require("../../auth/token_validation");
const router = require("express").Router();

router.post("/", createAccessEntry);

module.exports = router;
