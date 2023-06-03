import * as otpGenerator from "otp-generator";
const genOtp = () => {
   const OTP = otpGenerator.generate(5, {
      digits: true,
      specialChars: false,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
   });
   return OTP;
};

export default genOtp;
