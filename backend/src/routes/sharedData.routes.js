const express = require("express");
const {
    getSharedApps,
    addSharedApp,
    updateSharedApp,
    deleteSharedApp,
} = require("../controllers/sharedApp.controller");
const { authUser } = require("../middleWare/userMiddleware");

const router = express.Router();

router.get("/", authUser, getSharedApps);
router.post("/", authUser, addSharedApp);
router.put("/:id", authUser, updateSharedApp);
router.delete("/:id", authUser, deleteSharedApp);

module.exports = router;
