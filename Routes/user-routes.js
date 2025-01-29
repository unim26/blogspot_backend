const router = require("express").Router();
const {
    signUpUser,
    loginUser,
    updateProfileImage,
    deleteUserAccount,
    sendOTPforPasswordreset,
    otpverification,
    changePassword,
} = require("../controllers/user-controller");
const { verifyAuthorization } = require("../middlewares/auth-middleware");
const isemailverified  = require("../middlewares/email-verification-middleware");


//route for creating user account
router.post("/signup",signUpUser);

//route for login user
router.post("/login",loginUser);

//route for updating profile image
router.patch("/updateprofile",verifyAuthorization,updateProfileImage)

//route for deleting user account
router.delete("/deleteaccount",verifyAuthorization,deleteUserAccount);

//route send otp to user email for password reset
router.get("/sendotp",sendOTPforPasswordreset);

//route for verifying otp
router.get("/verifyotp",otpverification);

//route for change password
router.patch("/changepassword",verifyAuthorization,isemailverified,changePassword);

//exports the router
module.exports = router