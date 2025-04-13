const router = require("express").Router();
const userControllers = require("../controllers/user.controller");


router.get("/:id" , userControllers.getUserById);

module.exports = router;