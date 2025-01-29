const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    comment:{
        type:String,
        required:true,
    },
    commentby:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required: true,
    },
    
    

},{timestamps: true});


const comment = mongoose.model('Comment',commentSchema);

module.exports = comment;