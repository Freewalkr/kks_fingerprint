///mongoexport --db users --collection contacts --type=csv --fields [fields] --out /opt/backups/contacts.csv
/*options{
    database: 'test'
    collection: 'users'
    fields: array
    output:absolute path for file
}*/
const exec = require('child_process').exec;

function toCSV(options, callback){

    if(typeof(callback) === null || typeof(callback) === 'undefined'){
        throw new Error('callback is required');
    }

    if(typeof(options) === null  || typeof(options) ==='undeefined' || !Object.keys(options).length){
        throw new Error('options are required')
    }

    if(!options.hasOwnProperty('database')){
        return callback('database is required', null);
    }else if(typeof(options.database)!== 'string'){
        return callback('database has a string value', null);
    }

    if(!options.hasOwnProperty('collection')){
        return callback('collection is required', null);
    }else if(typeof(options.collection)!== 'string'){
        return callback('collection has a string value', null);
    }

    if(!options.hasOwnProperty('fields')){
        return callback('fields are required', null);
    }else if(typeof(options.fields)!== 'object'){
        return callback('fields has array type', null);
    }

    if(!options.hasOwnProperty('output')){
        return callback('output is required', null);
    }else if(typeof(options.output)!=='string'){
        return callback('output has a string value', null);
    }

    let arr = ['C:\\tools\\mongoexport', '--type=csv'];
    let db = `--db=${options.database}`;
    let collection = `--collection=${options.collection}`;
    let fields = `--fields=${options.fields.join(',')}`;
    let out = `--out=${options.output}`;

    arr.push(db, collection, fields, out);

    let cmd = arr.join(" ");

    exec(cmd, function(err, stdout, stderr){
            callback(err, stdout || stderr)
    })
}

module.exports = toCSV;