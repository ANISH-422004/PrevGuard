const router = require("express").Router();
const userControllers = require("../controllers/user.controller");
const { authUser } = require("../middleWare/userMiddleware");

router.get("/getuser" ,authUser , userControllers.getUserController)



module.exports = router;