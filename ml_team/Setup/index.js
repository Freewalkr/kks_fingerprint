require('dotenv').config();

const initDB = require('./initDb');

const {fillDB, noise} = require('./Visit/generateVisit');

const toCSV = require('./convertCSV/toCSV');
const options = require('./convertCSV/options')

initDB();

//fillDB(0, 0);

//noise();

toCSV(options, function(err, success){
  if(err){
    console.log(err)
  }else{
    console.log(success)
  }
})








