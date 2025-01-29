const mongoose = require('mongoose');

function connectToMongooDb(url){
    mongoose.connect(url).then((val)=>{
        console.log("Mongo database connected Successfully");
        
    })

}

module.exports = connectToMongooDb