const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    picture: { type: String, required: false },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
    meeting_times: { type: String, required: true, trim: true },
    meeting_location: { type: String, required: true, trim: true }
});

module.exports = mongoose.model("Class", ClassSchema);