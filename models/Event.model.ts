import mongoose from "mongoose";
const ParticipantSchema = new mongoose.Schema({
   user: { type: String, required: true },
   status: { type: String, enum: ["pending", "confirmed"], required: true },
});
const eventTypes = [
   "sports",
   "music",
   "religion",
   "motivation",
   "concert",
   "politics",
   "competition",
];
const UserSchema = new mongoose.Schema({
   title: { type: String, required: true },
   description: { type: String, required: true },
   date: { type: String, required: true },
   poster: { type: String, required: true },
   maxParticipants: { type: Number, required: true },
   participants: { type: [ParticipantSchema], required: true, default: [] },
   type: { type: String, enum: eventTypes, required: true },
   startTime: { type: String, required: true },
   endTime: { type: String, required: true },
   owner: { type: String, required: true },
});
const EventModel = mongoose.model("Event", UserSchema);
export default EventModel;
