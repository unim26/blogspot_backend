const mongoose = require('mongoose');

 async function connectToMongooDb(url){
     await mongoose.connect(url).then((val)=>{
        console.log("Mongo database connected Successfully");
        
    })

}

module.exports = connectToMongooDb