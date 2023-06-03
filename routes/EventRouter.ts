import { Router, Request } from "express";
import UserModel from "../models/User.model";
import { errors } from "../frontend/utils/errors";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import EventModel from "../models/Event.model";
import { verifyToken } from "../utils";

const router = Router();

interface CreateEventBody {
   title: string;
   description: string;
   date: string;
   poster: string;
   startTime: string;
   endTime: string;
   maxParticipants: number;
   type: string;
   participants: { user: string; status: string }[];
}

interface UpdateEventBody {
   title?: string;
   description?: string;
   date?: string;
   poster?: string;
   startTime?: string;
   endTime?: string;
   maxParticipants: number;
   participants: { user: string; status: string }[];
}
interface DeleteEventBody {
   eventId: string;
}
interface IUser {
   email: string;
   username: string;
}

interface SearchEventBody {
   keyword?: string;
   types?: string[];
}

//Create
router.post<"", {}, CreateEventBody>(
   "/create/",
   verifyToken,
   async (req, res) => {
      try {
         const event = await EventModel.create({
            ...req.body,
            owner: req.user.email,
         });
         res.json({ success: true, data: event }).sendStatus(200);
      } catch (err) {
         console.log(err);
      }
   }
);

//Update
router.put<"", {}, UpdateEventBody>(
   "/update/",
   verifyToken,
   async (req, res) => {
      try {
         const event = await EventModel.findOne({ _id: req.body.eventId });
         if (event && event.owner === req.user.email) {
            await EventModel.updateOne({ ...req.body });
         } else {
            res.json({
               success: false,
               message: "You are not the owner of this event",
            }).sendStatus(403);
         }
      } catch (err) {
         console.log(err);
      }
   }
);

//Delete
router.delete<"", {}, DeleteEventBody>(
   "/delete/:eventId/",
   verifyToken,
   async (req, res) => {
      try {
         const event = await EventModel.findOne({ _id: req.params.eventId });
         if (event && event.owner === req.user.email) {
            await event.delete();
            res.json({ success: true, message: "Event deleted" }).sendStatus(
               200
            );
         } else {
            res.json({
               success: false,
               message: "You are not the owner of this event",
            }).send(403);
         }
      } catch (err) {
         console.log(err);
      }
   }
);

//Get all events

router.get<"", {}, DeleteEventBody>("/all", verifyToken, async (req, res) => {
   console.log("All called");
   try {
      const events = await EventModel.find({});
      const myId = req.user.email;
      res.json({
         success: true,
         data: events,
      });
   } catch (err) {
      console.log(err);
   }
});

router.post<"", {}, SearchEventBody>(
   "/search/",
   verifyToken,
   async (req, res) => {
      try {
         let events;
         if (!(req.body.keyword === "" && req.body.types.length === 0)) {
            events = await EventModel.find({
               ...req.body,
            })
               .where({
                  $and: [
                     req.body.keyword
                        ? {
                             $or: [
                                {
                                   title: new RegExp(`.*${req.body.keyword}.*`),
                                },
                                {
                                   description: new RegExp(
                                      `.*${req.body.keyword}.*`
                                   ),
                                },
                             ],
                          }
                        : {},
                     req.body.types ? { type: { $in: req.body.types } } : {},
                  ],
               })
               .exec();
         } else {
            events = await EventModel.find({});
         }
         const myId = req.user.email;
         res.json({
            success: true,
            data: events.filter(
               (x) =>
                  x.participants.every((x) => x.user !== myId) &&
                  x.owner !== myId
            ),
         });
      } catch (err) {}
   }
);

//Get specific event
router.get<"", {}, SearchEventBody>(
   "/specific/:eventId/",
   verifyToken,
   async (req: Request<{ eventId: string }, {}, SearchEventBody>, res) => {
      try {
         const event = await EventModel.findOne({
            _id: req.params.eventId,
         });
         if (!event) {
            res.status(404).json({
               success: false,
               message: "Event not found",
            });
            return;
         }
         res.json({ success: true, data: event }).sendStatus(200);
      } catch (err) {}
   }
);

router.get<"", {}, SearchEventBody>(
   "/join/:eventId/",
   verifyToken,
   async (req, res) => {
      try {
         const event = await EventModel.findOne({
            _id: req.params.eventId,
         });
         if (!event) {
            res.status(404).json({
               success: false,
               message: "Event not found",
            });
            return;
         }
         if (event.participants.length >= event.maxParticipants) {
            res.status(403).json({
               success: false,
               message: "Event is full",
            });
            return;
         }

         if (event) {
            //@ts-ignore
            event.participants = [
               ...(event.participants || []),
               { status: "pending", user: req.user.email },
            ];
            try {
               await event.save();
               res.json({ success: true, data: event }).sendStatus(200);
            } catch (err) {
               console.log(err);
            }
         }
      } catch (err) {}
   }
);
interface ConfirmEventBody {
   eventId: string;
   userId: string;
}

router.post<"", {}, ConfirmEventBody>(
   "/confirm/",
   verifyToken,
   async (req, res) => {
      const body: ConfirmEventBody = req.body;
      console.log("body", JSON.stringify(body, null, 2));
      try {
         const event = await EventModel.findOne({ _id: body.eventId });

         console.log("event", JSON.stringify(event, null, 2));
         if (event && event.owner === req.user.email) {
            //@ts-ignore
            event.participants = event.participants.map((p) =>
               p.user === body.userId ? { ...p, status: "confirmed" } : p
            );
            console.log("event after change", JSON.stringify(event, null, 2));
            try {
               await event.save();
               res.json({ success: true, data: event }).sendStatus(200);
            } catch (err) {
               console.log(err);
            }
         } else {
            res.send(403).json({
               success: false,
               message: "You are not the owner of this event",
            });
         }
      } catch (err) {}
   }
);

router.get<"", {}, {}>("/myevents/", verifyToken, async (req, res) => {
   try {
      const events = await EventModel.find({ owner: req.user.email });
      res.json({ success: true, data: events }).sendStatus(200);
   } catch (err) {
      console.log(err);
   }
});

router.get("/test/", async (req, res) => {
   res.send("test");
});
export default router;
