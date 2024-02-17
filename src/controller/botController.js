const datadb = require('../models/appModel');
var moment = require('moment');
const axios = require("axios");
require('dotenv-safe').config({
    allowEmptyValues: true
});

const vToken = process.env.VT_TOKEN
const toAnalysis = process.env.VT_ANALYSES
const toURLs = process.env.VT_URLS

/**
 * 
 * @param {*} encodedParams 
 */

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

const getAnalysisV2T = async (idAnalise) => {
    const analyse = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'x-apikey': vToken
        }
    };
    fetch(toAnalysis + idAnalise, analyse)
        .then(response => response.json())
        .then(response => console.log(response))
        /*axios
            .request(analyse)
            .then(function (response) {
                console.log("Resultado:", response)
                return response
            }) */
        .catch(err => console.error(err));
}

const getAnalysisVT = async (idAnalise) => {
    const analises = {
        method: 'GET',
        url: 'https://www.virustotal.com/api/v3/analyses/' + idAnalise,
        headers: {
            accept: 'application/json',
            'x-apikey': vToken,
            'content-type': 'application/x-www-form-urlencoded'
        }
    };
    const res = await (
        axios
            .request(analises)
            .then(function (response) {
                return response
            })
            .catch(function (error) {
                console.error(error);
            })
    )
    console.log(res.data)
    return await res
}

const getDataBaseURL = async (url) => {
    console.log("No controller", url);
    try {
        if (url) {
            var data = await datadb.find({ url });
        } else {
            var data = await datadb.find({});
        }
        console.log("Tem data", data)
        return data

    } catch (error) {
        console.log(error);
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
    getAnalysisVT
}