const datadb = require('../models/appModel');

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

module.exports = {
    getDataBaseURL
}