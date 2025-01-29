

function generateOTP() {
    var otp = "";
    var otpLength = 6;
    var optcharset = "0123456789";
    for (var i = 0; i < otpLength; i++) {
        var randomIndex = Math.floor(Math.random() * optcharset.length);
        otp += optcharset.charAt(randomIndex);
    }
    return Number(otp);
}


module.exports = generateOTP;