const datadb = require('../models/appModel');
var moment = require('moment');

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
    getLatestDay
}