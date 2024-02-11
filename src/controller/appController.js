const datadb = require('../models/appModel');

const getURL = async () => {
    try {
        return await datadb.find({});
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    getURL
}