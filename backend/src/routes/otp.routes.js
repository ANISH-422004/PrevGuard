const router = require("express").Router();
const otpControllers = require("../controllers/otp.controller");

//routes
router.post("/verifyotp" , otpControllers.verifyOTPController )
router.post("/resendotp" , otpControllers.resendOTPController )
// router.get("/forgotpassword" , otpControllers.forgotPasswordController )



module.exports = router;