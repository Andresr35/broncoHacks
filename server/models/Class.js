const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    professor: { type: String, required: true, trim: true }, // TODO: Link professor name to rate my professor
    students: [{ type: Schema.Types.ObjectId, ref: "User" }],
    picture: { type: String, required: false },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    events: [{ type: Schema.Types.ObjectId, ref: "Event" }], // TODO: Link to events study groups
    meeting_time: { type: String, required: true, trim: true },
    meeting_location: { type: String, required: true, trim: true }
});

module.exports = mongoose.model("Class", ClassSchema);