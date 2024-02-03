const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, select: false },
  password: { type: String, trim: true, required: true, select: false },
  age: { type: Number, min: 0, max: 110 },
  gender: { type: String, trim: true, enum: ["male", "female", "other"] },
  bio: { type: String, trim: true, maxLength: 100 },
  friendRequests: [{ type: Schema.Types.ObjectId, ref: "User" }],
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  ratings: { type: Number, required: true, default: 0, min: 0, max: 5 },
  tags: [{ type: String, trim: true }],
  picture: {
    type: String,
  },
  social: {
    facebook: { type: String, trim: true },
    instagram: { type: String, trim: true },
    linkedin: { type: String, trim: true },
    
  },
});
UserSchema.virtual("url").get(function () {
  return `/user/${this._id}`;
});
UserSchema.set("toObject", { virtuals: true });
UserSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("User", UserSchema);
