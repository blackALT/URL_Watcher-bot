const express = require("express");
const router = express.Router();
const controller = require("../controller/appController");

router.get("/search", controller.getDataBaseURL);
router.post("/send", controller.postURL);
router.patch("/update/:id", controller.patchURL);
router.delete("/delete/:id", controller.deleteURL);

module.exports = router

router.get("/latestday", controller.getLatestDaily);
router.get("/latesthour", controller.getLatestHour);
router.get("/", controller.getAll);


