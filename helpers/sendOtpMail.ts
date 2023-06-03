import transporter from "./transporter";

interface EmailProps {
   otp: string;
   to: string;
}

const sendOptMail = async (params: EmailProps) => {
   // const auth = {
   //    user: process.env.MAIL_EMAIL,
   //    pass: process.env.EMAIL_PASS,
   // };
   // console.log(auth);
   // const MAIL_SETTINGS = {
   //    service: "gmail",
   //    host: "smtp.gmail.com",

   //    auth,
   // };
   try {
      let info = await transporter.sendMail({
         from: "maheerali131@gmail.com",
         to: params.to,
         subject: "Hello ✔",
         html: `
      <div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
        <h2>Welcome to the club.</h2>
        <h4>You are officially In ✔</h4>
        <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
        <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${params.otp}</h1>
   </div>
    `,
      });
      return info;
   } catch (error) {
      console.log(error);
      return false;
   }
};

export default sendOptMail;
