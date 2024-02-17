const express = require("express");
const router = express.Router();
const controller = require("../controller/appController");

router.get("/search", controller.getDataBaseURL);
router.get("/latestday", controller.getLatestDaily);
router.get("/latesthour", controller.getLatestHour);
router.get("/", controller.getAll);
router.post("/send", controller.postURL);

module.exports = router