const model = require("./models/Club");

/*
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    picture: { type: String, required: true },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    admins: [{ type: Schema.Types.ObjectId, ref: "User" }],
    meeting_times: { type: String, required: true, trim: true },
    meeting_location: { type: String, required: true, trim: true }
    */
   
const club = new model({
    name: "Test Club",
    description: "This is a test club",
    members: ["Test Member"],
    events: ["Test Event"],
});

club.save();
console.log(club);