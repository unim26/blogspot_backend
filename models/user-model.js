const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    profileImage:{
        type: String,
        default: ""
    },
    isEmailVerified:{
        type: Boolean,
        default: false
    },
    
            
},{timestamps: true},);

const user = mongoose.model("User",userSchema);


module.exports = user