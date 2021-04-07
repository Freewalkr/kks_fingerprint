const {getFields} = require('../Visit/generateVisit');
const DATA = require('../Visit/data');
const path =require('path')

let options = {
    database: process.env.DATABASE,
    collection: process.env.COLLECTION,
    fields: getFields(DATA),
    output: path.join(__dirname, `../output/${process.env.COLLECTION}_noise.csv`)
}



module.exports = options

