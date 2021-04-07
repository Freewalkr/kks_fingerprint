const mongoose = require('mongoose')

function initDB(){

    mongoose.connect(process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true});
    const db = mongoose.connection;
    db.once('open', function() {    
        console.log('Connected')     
    }).catch((err) => {
        console.log(err);
    })
 
}

module.exports = initDB