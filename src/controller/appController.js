const datadb = require('../models/appModel');
var moment = require('moment');

async function getAll(req, res) {
    var data;
    try {
        data = await datadb.find({});
        return res.status(200).send(data)
    } catch (err) {
        console.log(err);
    }
}

async function getDataBaseURL(req, res) {
    var data;
    var url = req.query.url
    console.log("URL informada", url)
    try {
        if (!url) {
            return res.status(200).send("Informe uma URL")
        }
        var data = await datadb.find({ url });
        if (data) {
            return res.status(200).send(data)
        }
    } catch (err) {
        console.log(err);
    }
}

async function getLatestDaily(req, res) {
    var dailyHours = moment().subtract(72, 'hour');
    try {
        data = await datadb.find({ analysisDate: { $gte: dailyHours } });
        console.log(data)
        const urls = []
        for (let i in data) {
            urls.push(data[i].url)
            console.log(i)
        }
        return res.status(200).send(urls)
    } catch (err) {
        console.log(err);
    }
}

async function getLatestHour(req, res) {
    var dailyHours = moment().subtract(1, 'hour');
    try {
        data = await datadb.find({ analysisDate: { $gte: dailyHours } });
        console.log(data)
        const urls = []
        for (let i in data) {
            urls.push(data[i].url)
            console.log(i)
        }
        return res.status(200).send(urls)
    } catch (err) {
        console.log(err);
    }
}

async function postURL(req, res) {
    console.log(req.body);
    try {
        let novaUrl = new datadb(req.body);
        novaUrl.save()
            .then(res.status(201).send(novaUrl.toJSON()))
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message })
    }
}

module.exports = {
    getDataBaseURL,
    getAll,
    getLatestDaily,
    getLatestHour,
    postURL
}