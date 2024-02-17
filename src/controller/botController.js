const datadb = require('../models/appModel');
var moment = require('moment');
const axios = require("axios");
require('dotenv-safe').config({ allowEmptyValues: true });
const vToken = process.env.VT_TOKEN
const toAnalysis = process.env.VT_ANALYSES
const toURLs = process.env.VT_URLS

const postAnalysisVT = async (encodedParams) => {
    const analises = {
        method: 'POST',
        url: toURLs,
        headers: {
            accept: 'application/json',
            'x-apikey': vToken,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: encodedParams,
    };
    axios
        .request(analises)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            console.error(error);
        })
}

const getAnalysisVT = async (idAnalise) => {
    const analises = {
        method: 'GET',
        url: toAnalysis + idAnalise,
        headers: {
            accept: 'application/json',
            'x-apikey': vToken,
            'content-type': 'application/x-www-form-urlencoded'
        }
    };
    axios
        .request(analises)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            console.error(error);
        })
}

const getDataBaseURL = async (url) => {
    try {
        if (url) {
            var data = await datadb.find({ url });
        } else {
            var data = await datadb.find({});
        }
        return data

    } catch (error) {
        console.log(error);
    }
}

const postFromBot = async (sendToDB) => {
    let url = sendToDB.url
    let data = await datadb.find({ url });

    if (data.length === 0) {
        try {
            let newpost = new datadb(sendToDB);
            newpost.save()
            console.log("URL cadastrada com sucesso!")
        } catch (err) {
            console.log(err);
        }
    } else {
        console.log("URL ja casdastrada");
    }
}

const getLatestHour = async () => {
    var dailyHours = moment().subtract(1, 'hour');
    try {
        data = await datadb.find({ analysisDate: { $gte: dailyHours } });
        console.log(data)
        return data
    } catch (err) {
        console.log(err);
    }
}

const getLatestDay = async () => {
    var dailyHours = moment().subtract(24, 'hour');
    try {
        data = await datadb.find({ analysisDate: { $gte: dailyHours } });
        console.log(data)
        return data
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getDataBaseURL,
    getLatestHour,
    getLatestDay,
    postAnalysisVT,
    getAnalysisVT,
    postFromBot
}