const express = require("express");
const router = express.Router();
const controller = require("../controller/appController");
const datadb = require('../models/appModel');


router.get("/consulta", controller.getDataBaseURL);
router.get("/", controller.getAll);
router.post("/send", controller.postURL);
router.get("/latestday", controller.getLatestDaily);
router.get("/latesthour", controller.getLatestHour);

module.exports = router