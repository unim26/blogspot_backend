const user = require("../models/user-model");
const blog = require("../models/blogs-model");
const { generateToken } = require("../utils/jwttoken");
const { encryptPassword, comparePassword } = require("../utils/password");
const verifyOTP = require("../utils/verify-otp");

const {sendOtpForEmailverification,sendOtpForPasswordReset} = require("../utils/mailService");
const otp_model = require("../models/otp-model");


///function to create account of user
async function signUpUser(req, res) {
    //get user data from request
    const { fullName, email, password } = req.body;

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

        //generate and send otp
        const otp = await sendOtpForEmailverification(email);

        //save otp
        await otp_model.create({
            email:email,
            otp:otp,
        });        

        //send response that user is created and also send token
        res.status(201).json({ status: 201, message: "OTP-sent-successfully", "token": token, "user": newUser });
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
        const otp = await sendOtpForPasswordReset(email);

        await otp_model.create({
            email:email,
            otp:otp,
        })

        //send response
        res.status(200).json({status:200,message:"otp-sent-to-email"});
    
} catch (error) {
        res.status(500).json({status:500,message:error});
        
        
    }
}

//verify otp
async function otpverification(req,res){
    const email = req.query.EMAIL;
    const otp = req.query.OTP;

   try {
     //verify if otp is valid
     const result = await verifyOTP(email,otp);
   
     if (!result) {        
         //if otp is ok
         res.status(400).json({status:400,message:"invalid-otp"});
     }   

     //if otp is ok
     res.status(200).json({status:200,message:"Otp-verified"});        
   } catch (error) {
    
   }

}


module.exports = {
    signUpUser,
    loginUser,
    updateProfileImage,
    deleteUserAccount,
    sendOTPforPasswordreset,
    otpverification,
}