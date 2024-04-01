import nodemailer from "nodemailer";
import "dotenv/config";

const { UKR_NET_PASSWORD, UKR_NET_FROME } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: UKR_NET_FROME,
    pass: UKR_NET_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = (data) => {
  const email = { ...data, from: UKR_NET_FROME };

  return transport.sendMail(email);
};

export default sendEmail;