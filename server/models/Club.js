const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClubSchema = new Schema({
    clubId: { type: String, required: true, unique: true, trim: true }, 
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    picture: { type: String, required: false },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
    admins: [{ type: Schema.Types.ObjectId, ref: "User" }],
    meeting_times: { type: String, required: true, trim: true },
    meeting_location: { type: String, required: true, trim: true }
});

module.exports = mongoose.model("Club", ClubSchema);

