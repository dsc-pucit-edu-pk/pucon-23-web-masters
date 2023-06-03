import * as express from "express";
import { createServer } from "http";
import mongoose from "mongoose";
import * as cors from "cors";
import UserModel from "./models/User.model";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import genOtp from "./helpers/genOtp";
import sendOptMail from "./helpers/sendOtpMail";
import { OTP_EXPIRE_TIME } from "./constants";
import AuthRouter from "./routes/AuthRouter";
import EventRouter from "./routes/EventRouter";
import * as bodyParser from "body-parser";
dotenv.config({ path: __dirname + "/.env" });
const app = express();
app.use(bodyParser.json());
const server = createServer(app);

const MONGO_URI = "mongodb://127.0.0.1:27017";

const db = mongoose.connect(MONGO_URI).then((x) => console.log("connected"));

mongoose.set("strictQuery", false);
app.use(cors());
app.get("/", (_, res) => {
   res.send("Hello world");
});
server.listen(5000, () => {
   console.log("Listening  at post 5000");
});

app.use("/auth", AuthRouter);
app.use("/event", EventRouter);
