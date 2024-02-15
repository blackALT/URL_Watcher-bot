const datadb = require('../models/appModel');
var moment = require('moment');


/**
 * @description Web API - returns all data in MongoDB 
 * @function
 * @param {Object} req Express request
 * @param {Object} res Express response
 * @returns {Object}
 */

async function getAll(req, res) {
    var data;
    try {
        data = await datadb.find({});
        return res.status(200).send(data)
    } catch (err) {
        console.log(err);
    }
}

/**
 * @description Web API - search a urls in MongoDB 
 * @function
 * @param {Object} req Express request
 * @param {Object} res Express response
 * @param req.query.url {String}
 * @returns {Object}
 */

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

/**
 * @description Web API - returns urls registered in the past day  
 * @function
 * @param {Object} req Express request
 * @param {Object} res Express response
 * @returns {undefined}
 */

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

/**
 * @description Web API - returns urls registered in the past hour  
 * @function
 * @param {Object} req Express request
 * @param {Object} res Express response
 * @returns {undefined}
 */

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

/**
 * @description Web API - send urls to be registered in MongoDB 
 * @function
 * @param {Object} req Express request
 * @param {Object} res Express response
 * @param req.body {Object} JSON payload
 * @returns {undefined}
 */

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