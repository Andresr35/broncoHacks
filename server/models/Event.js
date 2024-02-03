const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  picture: { type: String, required: false },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  type: {
    type: String,
    required: true,
    trim: true,
    enum: ["Study", "School", "Club", "ASI", "Personal"],
  },
  attendees: [{ type: Schema.Types.ObjectId, ref: "User" }],
  meeting_times: { type: String, required: true, trim: true },
  meeting_location: { type: String, required: true, trim: true },
});

module.exports = mongoose.model("Event", EventSchema);
