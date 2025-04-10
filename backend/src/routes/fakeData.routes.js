// routes/fakeData.routes.js
const express = require("express");
const router = express.Router();
const fakeDataController = require("../controllers/fakeData.controller");
const { authUser } = require("../middleWare/userMiddleware");


// POST - Generate new fake data
router.post("/generate", authUser, fakeDataController.generateFakeData);

// GET - Get all fake data entries for logged-in user
router.get("/all", authUser, fakeDataController.getFakeData);

// DELETE - Delete a specific fake data entry by ID
router.post("/delete", authUser, fakeDataController.deleteFakeData);

module.exports = router;
