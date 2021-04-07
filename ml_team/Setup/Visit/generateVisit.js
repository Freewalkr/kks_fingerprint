const Visit = require("./VisitSchema");
const DATA = require('./data');

function getFields(a){
    let keys = []
  
    Object.keys(a).forEach((item) =>{
      keys.push(item)
    })
  
    return keys;
}

function generateVisit(a){
    let currentVisit = {}

    Object.entries(a).forEach((item) =>{
        let random = Math.floor(Math.random() * item[1].length);
        let obj =  {[item[0]]: item[1][random]}
        Object.assign(currentVisit, obj)
    })
    return currentVisit;
}

function fillDB(size, clone){
    for(let i=0; i<size; i++){
        let visitData = generateVisit(DATA);

        for(let i=0; i< clone; i++){
            let visit = new Visit({...visitData});
            visit.save(function(err){
                if(err){
                    console.log(err);
                }
            })
        } 
        let index = DATA.name.indexOf(visitData.name)
        DATA.name.splice(index, 1);      
    }

}

function noise(){

   

    for(let i = 0; i < DATA.name.length; i++){

        let obj = {
            sessionStorage:DATA.sessionStorage[Math.floor(Math.random()*2)],
            localStorage: DATA.localStorage[Math.floor(Math.random()*2)],
            indexedDB: DATA.indexedDB[Math.floor(Math.random()*2)],
            openDatabase: DATA.openDatabase[Math.floor(Math.random()*2)],
            pluginsSupport: DATA.pluginsSupport[Math.floor(Math.random()*2)],
            chrome: DATA.chrome[Math.floor(Math.random()*2)],
        }
        Visit.updateMany({name: DATA.name[i]}, {...obj} ,function(err, docs){
            if(err){
                return err
            }else{
                return docs
            }       
        })
    }
}

module.exports ={
    fillDB,
    getFields, 
    noise
} ;
