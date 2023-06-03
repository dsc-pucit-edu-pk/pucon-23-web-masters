import { defineConfig } from "cypress";
import * as mongo from "cypress-mongodb";
import mongoose from "mongoose";
import UserModel from "./models/User.model";
import * as ms from "smtp-tester";
const MONGO_URI = "mongodb://127.0.0.1:27017";
export default defineConfig({
   e2e: {
      experimentalSessionAndOrigin: true,
      setupNodeEvents(on, config) {
         const port = 7777;
         const mailServer = ms.init(port);
         console.log("mail server at port %d", port);

         // [receiver email]: email text
         let lastEmail = {};

         // process all emails
         mailServer.bind((addr, id, email) => {
            console.log(email, "email");
            console.log("--- email to %s ---", email.headers.to);
            console.log(email.body);
            console.log("--- end ---");
            // store the email by the receiver email
            lastEmail[email.headers.to] = email.html || email.body;
         });
         on("task", {
            async connectDb() {
               return new Promise((res, rej) => {
                  mongoose.connect(MONGO_URI, res);
               });
            },
            async findUserWithName(username: string) {
               return (await UserModel.findOne({ username })) || null;
            },
            async findUserWithEmail(email: string) {
               return (await UserModel.findOne({ email })) || null;
            },
            async dropUsers() {
               const list = await UserModel.db.db
                  .listCollections({ name: UserModel.collection.name })
                  .toArray();
               if (list.length !== 0) {
                  return await UserModel.db.dropCollection(
                     UserModel.collection.name
                  );
               }
               return null;
            },
            getLastEmail(email) {
               return lastEmail[email] || null;
            },
         });
      },
   },
   env: {
      host: "http://localhost:3000",
      server: "http://localhost:5000",
      mongodb: {
         uri: "mongodb+srv://maheerali121:VQF64OAhDiOw4MbG@cluster0.rfn0j.mongodb.net/?retryWrites=true&w=majority",
         database: "Cluster0",
         collection: "Users",
      },
      mailslurpApi:
         "8e788353226cd8b1ee9ac07a197f1e44cf94ce9e8aa1d370caf8ecaa8cb93369",
      MAILOSAUR_API_KEY: "fbDNiq8L0s9dnb6h",
   },
});
