const router = require("express").Router();
const emailController = require("../controllers/email.controller.js");
const { authUser } = require("../middleWare/userMiddleware.js");


router.post("/receive", emailController.reciveEmail);
  

router.get("/emails", authUser , emailController.getEmails);

module.exports = router;