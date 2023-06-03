import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
   username: { type: String, required: true },
   password: { type: String, required: true },
   email: { type: String, required: true },
   // otp: { type: String },
   // isVerified: { type: Boolean, required: true },
   // otpTries: { type: Number, required: true },
   // resentOtpTimes: { type: Number },
   // allowedToResetPass: { type: Boolean, default: false },
   // otpExpiresAt: { type: Date },
});
const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
