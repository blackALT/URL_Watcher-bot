const mongoose = require('mongoose');
const urlSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    url: {
        type: String,
        required: true
    },
    analysisDate: {
        type: Date,
        default: Date.now
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

/*
urlSchema.pre('save', () => console.log('Hello from pre save'));

const data = new dataURL({
    url: "promocaocasas.txte",
    analysisDate: 15 / 12 / 12,
    analysisStatus: "Completed",
    maliciousRate: 20,
    suspiciousRate: 50,
    harmlessRate: 10
});
data.save();*/

module.exports = dataURL