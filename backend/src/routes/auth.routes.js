const router = require("express").Router();
const authController = require("../controllers/auth.controller");

//routes
router.post("/register" , authController.registerController);



module.exports = router;