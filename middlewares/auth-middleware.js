const jwt = require('jsonwebtoken');
const User = require('../models/user-model');


/// to verify user is authorized or not we will ask them for token

async function verifyAuthorization(req, res, next) {
    try {
        //get token from request header
        const token = req.headers.authorization;



        //check if token is present
        if (!token) {
            return res.status(401).json({ status: 401, message: "Unauthorized" });
        }

        const finalToken = token.split('Bearer ')[1];



        //verify token
        const payload = jwt.verify(finalToken, process.env.JWT_SECRET);

        //check if token is valid
        if (!payload) {
            return res.status(401).json({ status: 401, message: "Unauthorized" });
        }

        //set user id in request object 
        const user = await User.findOne({ _id: payload.id });



        if (!user) {
            return res.status(401).json({ status: 401, message: "Unauthorized" });
        }

        //set id in request object
        req.id = user._id;

        next();
    } catch (error) {
        return res.status(401).send({ status: 401, message: "Unauthorized", })

    }

}

module.exports = { verifyAuthorization }