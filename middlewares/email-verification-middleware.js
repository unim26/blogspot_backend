const user_model = require("../models/user-model");



async function isEmailVerified(req,res,next){
    const userid = req.id;

    try {
        const user = await user_model.findById({_id:userid})

        const isemailverified = user.isEmailVerified;

        if (!isemailverified) {
            return res.status(401).json({status:401,message:"Email-not-verified"});
        }

        next();
    } catch (error) {
        return res.status(401).json({status:401,message: `ERROR ${error.message}`});
        
    }
}


module.exports = isEmailVerified;