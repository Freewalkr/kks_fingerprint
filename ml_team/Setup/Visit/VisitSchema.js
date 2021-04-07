const mongoose = require('mongoose');

const {Schema, model } = mongoose;

const VisitSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    languages:{
        type: String,
        required: true
    },
    colorDepth:{
        type: Number,
        required: true
    },
    deviceMemory:{
        type: Number,
        required: true
    },
    screenResolution:{
        type: [Number],
        required: true
    },
    hardwareConcurrency:{
        type: Number,
        required: true
    },
    timezoneOffset:{
        type: Number,
        required: true
    },
    sessionStorage:{
        type: Boolean,
        required: true
    },
    localStorage:{
        type: Boolean,
        required: true
    },
    indexedDB:{
        type: Boolean,
        required: true
    },
    openDatabase:{
        type: Boolean,
        required: true
    },
    platform:{
        type: String,
        required: true
    },
    touchSupport:{
        type: Boolean,
        required: true
    },
    fonts:{
        type: [String],
        required: true
    },
    pluginsSupport:{
        type: Boolean,
        required: true
    },
    chrome:{
        type: Boolean,
        required: true
    },
    cookiesEnabled:{
        type: Boolean,
        required: true
    }
})

const Visit = model('Visit', VisitSchema);

module.exports = Visit