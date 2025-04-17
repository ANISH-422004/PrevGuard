const router = require("express").Router();
const userControllers = require("../controllers/user.controller");
const upload = require("../middleWare/Multer");
const { authUser } = require("../middleWare/userMiddleware");


router.get("/:id" ,authUser ,  userControllers.getUserById);
router.put("/update", authUser, upload.single("profilePicture"), userControllers.updateUserProfile);


module.exports = router;