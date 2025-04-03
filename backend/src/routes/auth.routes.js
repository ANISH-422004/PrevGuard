const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const { authUser } = require("../middleWare/userMiddleware");

//routes
router.post("/register" , authController.registerController);
router.post("/login" , authController.loginController);
router.get("/authme" , authUser ,  authController.authMe)



module.exports = router;