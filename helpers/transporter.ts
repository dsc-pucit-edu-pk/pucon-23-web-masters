import * as nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
   // host: "smtp.gmail.com",
   host: "smtp.gmail.com",
   // port: 465,
   // secure: true,
   service: "gmail",
   auth: {
      user: "maheerali131@gmail.com",
      pass: "cufbkswdaihpoxdt",
   },
});
export default transporter;
