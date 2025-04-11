// routes/breach.routes.js
const express = require("express");
const router = express.Router();
const breachController = require("../controllers/breach.controller");
const { authUser } = require("../middleWare/userMiddleware");

router.get("/:email", authUser, breachController.getBreachesByEmail);

module.exports = router;
