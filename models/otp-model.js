const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    email: String,
    otp: Number,
    createdAt: { type: Date, expires: 300, default: Date.now }
});

const OTP = mongoose.model("OTP",otpSchema);

module.exports = OTP;