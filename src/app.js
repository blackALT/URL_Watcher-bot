// ===============================================================
// Author: Wanessa Souza
// Email: js2bqdb8m@mozmail.com
// GitHub: blackALT
// ===============================================================

require('dotenv').config({ silent: true, allowEmptyValues: true })
const { DATABASE_URL } = require('./.env');

const express = require("express");
const bodyParser = require("body-parser");
const index = require("./routes/index");
const api = require("./routes/appRoutes");
const app = express();
const mongoose = require("mongoose")

/** 
 * DB Connection */

mongoose.connect(DATABASE_URL, {

});

let db = mongoose.connection;

db.on("error", console.log.bind(console, "connection error:"))
db.once("open", function () {
    console.log("conexão feita com sucesso!")
})

/** 
 * App request Control */

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
})

app.use("/", index)
app.use("/api/v3", api)

module.exports = app