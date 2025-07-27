import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
import { google } from "googleapis";
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.GMAIL_GOOGLE_CLIENT_ID,
  process.env.GMAIL_GOOGLE_CLIENT_SECRET,
  process.env.GMAIL_GOOGLE_CLIENT_REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.OAUTH_REFRESH_TOKEN,
});

export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html: string
) => {
  try {
    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.COMPANY_EMAIL,
        clientId: process.env.GMAIL_GOOGLE_CLIENT_ID,
        clientSecret: process.env.GMAIL_GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        accessToken: accessToken?.token ?? "",
      },
    } as SMTPTransport.Options);

    const mailOptions = {
      from: process.env.COMPANY_EMAIL,
      to,
      subject,
      text,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
