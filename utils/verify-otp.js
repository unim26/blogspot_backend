const otp_model = require("../models/otp-model");
const user = require("../models/user-model");



async function verifyOTP(email,otp){
    const otpmodel = await otp_model.findOne({email,otp});

    //check if otp model exist or not
    if(!otpmodel || otpmodel.otp != otp){
       return false;
    }

    //find user
    const currentuser = await user.findOne({email})

    
    if (currentuser.isEmailVerified == false) {
        await user.findOneAndUpdate({email},{isEmailVerified: true},{new:true});
    }

    await otp_model.findOneAndDelete({email,otp});

    return true;
}

module.exports = verifyOTP;