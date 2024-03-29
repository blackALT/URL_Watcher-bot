const express = require("express");
const router = express.Router()

router.get("/", function (req, res) {
    res.status(200).send({
        title: "URL Watcher Bot - API",
        version: "1.0.1 - Novo BOT",
        developer: "blackALT",
        documentation: "Go to https://app.swaggerhub.com/home to see all endpoint available"
    })
})

module.exports = router