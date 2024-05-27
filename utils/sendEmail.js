const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const { emailHost, serverEmail, serverEmailPassword, fromEmail } = require('../config');

const sendEmail = async (email, subject, payload, template) => {
  try {
    console.log("sendEmail function called");
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: emailHost,
      port: 465,
      auth: {
        user: serverEmail,
        pass: serverEmailPassword,
      },
    });

    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);
    const options = () => {
      return {
        from: fromEmail,
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
      };
    };

    // Send email
    transporter.sendMail(options(), (error, info) => {
      if (error) {
        console.log(error);
        return error;
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(200).json({
          success: true,
        });
      }
    });
  } catch (error) {
    return error;
  }
};

/*
Example:
sendEmail(
  "youremail@gmail.com,
  "Email subject",
  { name: "Tizio" },
  "./templates/layouts/main.handlebars"
);
*/

module.exports = sendEmail;