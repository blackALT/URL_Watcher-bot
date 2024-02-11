const express = require("express");
const router = express.Router();
const controller = require("../controller/appController");

router.get("/urls", controller.getURL);

module.exports = router