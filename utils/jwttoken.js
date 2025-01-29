const jwt = require('jsonwebtoken');

//generate token for user
async function generateToken(user){
    return await jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET);
}

module.exports = {generateToken};