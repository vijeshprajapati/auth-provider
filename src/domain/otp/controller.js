const OTP = require('./model');
const generateOTP = require('../../util/generateOTP');
const sendEmail = require('../../util/sendEmail');
const hashData = require('../../util/hashData');
const { AUTH_EMAIL } = process.env;

const sendOTP = async({ email, subject, message, duration = 1 }) => {
    try {
        if(!(email && subject && message)){
            throw Error("Provide appropriate email, subject, message");
        }

        await OTP.deleteOne({ email });

        const generatedOTP = await generateOTP();

        const mailOptions = {
            from: AUTH_EMAIL,
            to: email,
            subject,
            html: `<p>${message}</p><p style="color:red; fontsize:25px; letter-spacing:2px;"><b>${generatedOTP}</b></p><p>This code <b>expires in ${duration} hour(s)</b>.</p>`,
        }

        await sendEmail(mailOptions);

        const hashedOTP = await hashData(generateOTP);
        const newOTP = await new OTP({
            email,
            otp : hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000 * +duration,
        });

        const createdOTPrecord = await newOTP.save();
        return createdOTPrecord;

    } catch (error) {
        throw error;
    }
};

module.exports = {sendOTP}