const nodemailer = require('nodemailer');
require('dotenv').config()

const sendEmail = async (email, subject, body) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: `<${process.env.EMAIL}>`,
            to: email,
            subject,
            html: body
        };

        return await transporter.sendMail(mailOptions);

    } catch (error) {
        // TODO: throws error
        console.log(error)
    }
}
// sendEmail("abdousfayhi12@gmail.com" , "test Subject", "test text","<h1>hello</h1>")

module.exports = sendEmail; 