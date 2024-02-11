const datadb = require('../models/appModel');

const getDataBaseURL = async (url) => {
    console.log("No controller", url);
    try {
        if (url) {
            const data = await datadb.find({ url });
        } else {
            const data = await datadb.find({});
        }
        if (data) {
            console.log("Tem data", data)
            return data
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getDataBaseURL
}