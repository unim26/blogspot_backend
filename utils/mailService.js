const nodemailer = require('nodemailer');


//initialize mail transporter first
const mailTransporter = nodemailer.createTransport({
    service:"gmail",
    port: 465,
    secure:true,
    auth: {
      user: "blogspotservice1@gmail.com",
      pass: "azlp amcf wtzw ruan"
    }
  });


//function to send otp for password reset
async function sendOtpForPasswordReset(email){
    await mailTransporter.sendMail({
        from:'"BlogSpot -share your Knowledge 👻" <blogspotservice1@gmail.com>',
        to:email,
        subject:"Your One-Time Password (OTP)",
        text:`Hello, \n\nYour OTP for password reset is: 1234 \n\nIf you didn’t request this, please ignore this email.\n\nBest Regards,\nBlogSpot Team`,
        html:`
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h3>Hello,</h3>
            <h2>Your OTP for password reset is: <strong>19934</strong></h2>
            <p>If you didn't request this, please ignore this email.</p>
            <p>Best Regards,<br>BlogSpot Team</p>
        </div>`,   
        
    });

}


//function to send otp for email verification
async function sendOtpForEmailverification(email){
    await mailTransporter.sendMail({
        from:'"BlogSpot -share your Knowledge 👻" <blogspotservice1@gmail.com>',
        to:email,
        subject:"Your One-Time Password (OTP)",
        text:`Hello, \n\nYour OTP for Email verification is: 1234 \n\nIf you didn’t request this, please ignore this email.\n\nBest Regards,\nBlogSpot Team`,
        html:`
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h2>Hello,</h2>
            <p>Your OTP for Email verification is: <strong>1234</strong></p>
            <p>If you didn't request this, please ignore this email.</p>
            <p>Best Regards,<br>BlogSpot Team</p>
        </div>`,   
        
    });
}


module.exports = {sendOtpForPasswordReset,sendOtpForEmailverification}