import bcryptjs from "bcryptjs";
import UserModel from "../models/UserModel";
import nodemailer from "nodemailer";

export const sendEmail = async({email, emailType, userId}: any) => {
    try {
        // create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if(emailType === "VERIFY"){
            await UserModel.findByIdAndUpdate(userId, {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000}, {new: true});
        } else if (emailType === "RESET"){
            await UserModel.findByIdAndUpdate(userId, {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000}, {new: true});
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "b6fde499e153b1",
                pass: "1aa96ce4ad60fc"
            }
        });

        const mailOptions = {
            from: 'aryanofficialjain@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset Your Password",
            html: emailType === "VERIFY" 
                ? `<p> <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Click</a> here to verify your email.
                    If the link is not working, then copy and paste this URL: <br> <b>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</b> </p>`
                : `<p> <a href="${process.env.DOMAIN}/reset?token=${hashedToken}">Click</a> here to reset your password.
                    If the link is not working, then copy and paste this URL: <br> <b>${process.env.DOMAIN}/reset?token=${hashedToken}</b> </p>`
        };

        const mailresponse = await transport.sendMail(mailOptions);

        return mailresponse;
    } catch (error: any) {
        console.log("Error in the mailer helper function", error);
        throw new Error(error.message);
    }
};