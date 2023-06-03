import { Router } from "express";
import UserModel from "../models/User.model";
import { errors } from "../frontend/utils/errors";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { verifyToken } from "../utils";

const router = Router();

interface RegisterBodyData {
   username: string;
   email: string;
   password: string;
}
interface LoginBodyData {
   email: string;
   password: string;
}
interface VerifyToken {
   token: string;
}

router.post<"", {}, RegisterBodyData>("/register", async (req, res) => {
   const users = await UserModel.find({ email: req.body.email });
   if (users.length) {
      res.status(409).json({ message: errors.auth.userAlreadyExist });
      return;
   }
   const encryptedPassword = await bcrypt.hash(req.body.password, 10);
   try {
      const user = await UserModel.create({
         username: req.body.username,
         password: encryptedPassword,
         email: req.body.email,
      });
      res.status(200).json({ success: true });
   } catch (err) {
      res.status(400).json({ message: err });
   }
});
router.post<"", {}, LoginBodyData>("/login", async (req, res) => {
   console.log(req.body, "req.body");
   const user = await UserModel.findOne({ email: req.body.email });
   if (!user) {
      res.status(401).json({ message: errors.auth.wrongEmailOrPass });
      return;
   }
   const passMatch = await bcrypt.compare(req.body.password, user.password);
   if (!passMatch) {
      res.status(401).json({ message: errors.auth.wrongEmailOrPass });
      return;
   }

   const token = jwt.sign(
      { email: user.email, username: user.username },
      process.env.JWT_SECRET_KEY
   );
   return res.status(200).json({ success: true, token });
});
router.post("/verify-token", verifyToken, (req, res) => {
   if (req.user) {
      res.sendStatus(200);
   } else {
      res.sendStatus(401);
   }
});
export default router;
