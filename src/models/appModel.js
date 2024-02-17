const { mongoose } = require('mongoose');
var todayTime = new Date(Date.now());

const urlSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    analysisDate: {
        type: Date,
        default: todayTime
    },
    analysisStatus: {
        type: String,
        required: true
    },
    maliciousRate: {
        type: Number,
        required: true
    },
    suspiciousRate: {
        type: Number
    },
    harmlessRate: {
        type: Number
    }
}, {
    versionKey: false
})
const dataURL = mongoose.model('collectionapps', urlSchema)

module.exports = dataURL


