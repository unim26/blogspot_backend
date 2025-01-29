const user = require("../models/user-model");
const blog = require("../models/blogs-model");
const { generateToken } = require("../utils/jwttoken");
const { encryptPassword, comparePassword } = require("../utils/password");
const {} = require("../utils/password_generator");
const generatePassword = require("../utils/password_generator");
const {sendOtpForEmailverification,sendOtpForPasswordReset} = require("../utils/mailService");


///function to create account of user
async function signUpUser(req, res) {
    //get user data from request
    const { fullName, email, password} = req.body;

    //check if user is allready exist
    const userExists = await user.findOne({ email });

    if (userExists) {
        return res.status(400).json({ status: 400, message: "User-already-exists" });
    }

    //encrypt password
    const hashedPawword = await encryptPassword(password);

    try {
        //create user account
        const newUser = await user.create({
            fullName,
            email,
            password: hashedPawword,
        });


        //generate jwt token for user
        const token = await generateToken(newUser);

        

        //send response that user is created and also send token
        res.status(201).json({ status: 201, message: "User created", "token": token, "user": newUser });
    } catch (error) {
        console.log(`ERROR in create user or token generation ${error}`);


    }

}

//function to login user
async function loginUser(req, res) {   
    
    
    //get user data from request
    const { email, password } = req.body;

    //check if user is allready exist
    const userExists = await user.findOne({ email });

    if (!userExists) {
        return res.status(400).json({ status: 400, message: "User-does-not-exist" });
    }

    //check if password is correct
    const isPasswordCorrect = await comparePassword(password, userExists.password);

    if (!isPasswordCorrect) {
        return res.status(406).json({ message: "Invalid-email-or-password" });
    }

    //generate jwt token for user
    const token = await generateToken(userExists);


    
    

    //send response that user is created and also send token
    return res.status(200).json({ message: "User-logged-in", token, "user": userExists });
}

//function to update profile photo
async function updateProfileImage(req,res){
    //get id of user
    const userId = req.query.USERID;

    //get profile image link from body
    const {imageUrl} = req.body;

    try {
        //try to update profile image
        await user.updateOne({_id:userId},{profileImage:imageUrl});

        res.status(201).json({status:201,message:"profile successfully updated...!"});
    } catch (error) {
        console.log(`ERROR in updating profile image ${error}`);
        
    }
}

//function to delete account
async function deleteUserAccount(req,res){
    //get user id from query
    const userId = req.query.USERID;

    try{
        //try deleting user
        await user.findByIdAndDelete({_id:userId});

        //try deleting all blogs of this user
        await blog.deleteMany({author:userId})

        res.status(200).json({status:200,message:"user account successfully deleted...!"});
    } catch (error){
        res.status(400).json({status:400,message:"unauthorize"});
    }
}


//send opt to email for password reset
async function sendOTPforPasswordreset(req,res){
    //get email from request
    const email =  req.query.EMAIL; 
    

    //check if user exists
    const userExists = await user.findOne({email});

    //check for user
    if(!userExists){
        return res.status(400).json({status:400,message:"user-does-not-exist"});
    }

    try {          
        //send otp to email
        const info = await sendOtpForPasswordReset(email);

              

        //send response
        res.status(200).json({status:200,message:"otp-sent-to-email"});
    
} catch (error) {
        res.status(500).json({status:500,message:error});
        
        
    }


}


module.exports = {
    signUpUser,
    loginUser,
    updateProfileImage,
    deleteUserAccount,
    sendOTPforPasswordreset,
}