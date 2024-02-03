const asyncHandler = require("express-async-handler");
const Club = require("../models/Club");
const Event = require("../models/Event");
const Post = require("../models/Post");
const mongoose = require("mongoose");

// Get all clubs that a user is in or all clubs with a specific name
exports.getClubs = asyncHandler(async (req, res, next) => {
  const clubs = await Club.find({
    $or: [{ members : req.params.members.userID }, { admins: req.params.admins.userID }],
  }).exec();
  return res.status(200).json({ message: "Success", status: 200, clubs });
});

// Create a new club
exports.postClub = asyncHandler(async (req, res, next) => {
  const {
    name,
    description,
    picture,
    meeting_times,
    meeting_location,
  } = req.body;
  if (!name || !description || !meeting_times || !meeting_location)
    return res
      .status(400)
      .json({ status: 400, message: "Missing required fields" });
  try {
    const newClub = await new Club({
      name,
      description,
      picture,
      admins: [req.userID],
      meeting_times,
      meeting_location,
    });
    await newClub.save();
    return res.status(201).json({
      status: 201,
      message: "Club Created",
      newClub,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        status: 400,
        message: "Duplicate classId",
      });
    }
  }
});

// Update a club
exports.updateClub = asyncHandler(async (req, res, next) => {
  const { name, description, picture, meeting_times, meeting_location } =
    req.body;
  if (!name || !description || !meeting_times || !meeting_location)
    return res
      .status(400)
      .json({ status: 400, message: "Missing required fields" });
  const admin = await Club.find({ admin: req.params.admins }).exec();
  if (!admin)
    return res.status(401).json({
      status: 401,
      message: "You must be an admin to update this club",
    });
  else {
    const updatedClub = await Club.findByIdAndUpdate(req.params._id, {
      name,
      description,
      picture,
      meeting_times,
      meeting_location,
    });
    return res.status(201).json({
      status: 201,
      message: "Club Updated",
      updatedClub,
    });
  }
});

// Delete a club
exports.deleteClub = asyncHandler(async (req, res, next) => {
  const admin = await Club.find({ admin: req.params.admins }).exec();
  if (!admin)
    return res.status(401).json({
      status: 401,
      message: "You must be an admin to delete this club",
    });
  else {
    const deletedClub = await Club.findByIdAndDelete(req.params.clubID);
    return res.status(201).json({
      status: 201,
      message: "Club Deleted",
      deletedClub,
    });
  }
});

// Add a user to a club
exports.addUserToClub = asyncHandler(async (req, res, next) => {
  const club = await Club.findById(req.params.id).exec();
  if (!club) return res.status(400).json({ status: 400, message: "Club not found" });
  else {
    club.members.push(req.params.userID);
    await club.save();
    return res.status(201).json({
      status: 201,
      message: "User Added to Club",
      club,
    });
  }
});

// Remove a user from a club
exports.removeUserFromClub = asyncHandler(async (req, res, next) => {
  const club = await Club.findById(req.params.clubID).exec();
  if (!club) return res.status(400).json({ status: 400, message: "Club not found" });
  else {
    club.members.pull(req.params.userID);
    await club.save();
    return res.status(201).json({
      status: 201,
      message: "User Removed from Club",
      club,
    });
  }
});

// Add an admin to a club
exports.addAdminToClub = asyncHandler(async (req, res, next) => {
  const club = await Club.findById(req.params.clubID).exec();
  if (!club) return res.status(400).json({ status: 400, message: "Club not found" });
  else {
    club.admins.push(req.params.userID);
    await club.save();
    return res.status(201).json({
      status: 201,
      message: "Admin Added to Club",
      club,
    });
  }
});

// Remove an admin from a club
exports.removeAdminFromClub = asyncHandler(async (req, res, next) => {
  const club = await Club.findById(req.params.clubID).exec();
  if (!club) return res.status(400).json({ status: 400, message: "Club not found" });
  else {
    club.admins.pull(req.params.userID);
    await club.save();
    return res.status(201).json({
      status: 201,
      message: "Admin Removed from Club",
      club,
    });
  }
});

// Get all admins in a club
exports.getAdmins = asyncHandler(async (req, res, next) => {
  const club = await Club.findById(req.params.clubID).exec();
  if (!club) return res.status(400).json({ status: 400, message: "Club not found" });
  else {
    const admins = await club.admins;
    return res.status(200).json({
      status: 200,
      message: "Success",
      admins,
    });
  }
});

// Get all members in a club
exports.getClubMembers = asyncHandler(async (req, res, next) => {
  const club = await Club.findById(req.params.clubID).exec();
  if (!club) return res.status(400).json({ status: 400, message: "Club not found" });
  else {
    const members = await club.members;
    return res.status(200).json({
      status: 200,
      message: "Success",
      members,
    });
  }
});

// Editing / Deleting Event and Post we will let Post and Event handle their own controllers

// Get all events in a club
exports.getClubEvents = asyncHandler(async (req, res, next) => {
  const club = await Club.findOne({ clubId: req.params.clubId }).exec();
  if (!club) return res.status(400).json({ status: 400, message: "Club not found" });
  else {
    const events = club.events;
    return res.status(200).json({
      status: 200,
      message: "Success",
      events,
    });
  }
});

exports.postClubEvent = asyncHandler(async (req, res, next) => {
  const club = await Club.findOne({ _id: req.params.id }).exec();
  if (!club) return res.status(400).json({ status: 400, message: "Club not found" });
  else {
    const newEvent = await new Event({
      name: req.body.title,
      description: req.body.description,
      meeting_location: req.body.location,
      picture: req.body.picture,
      date: new Date(req.body.date).toISOString(),
      meeting_time: req.body.time,
    });
    await newEvent.save();
    club.events.push(newEvent._id);
    await club.save();
    return res.status(201).json({
      status: 201,
      message: "Event Created",
      newEvent,
    });
  }
});

// Get all posts in a club
exports.getClubPosts = asyncHandler(async (req, res, next) => {
  const club = await Club.findOne({ clubId: req.params.clubId }).exec();
  if (!club) return res.status(400).json({ status: 400, message: "Club not found" });
  else {
    const posts = club.posts;
    return res.status(200).json({
      status: 200,
      message: "Success",
      posts,
    });
  }
});

// Create a post in a club
exports.postClubPost = asyncHandler(async (req, res, next) => {
  const club = await Club.findOne({ clubId: req.params.clubId }).exec();
  if (!club) return res.status(400).json({ status: 400, message: "Club not found" });
  else {
    const newPost = await new Post({
      title: req.body.title,
      message: req.body.content,
      userID: req.user._id,
      author: req.params.name,
      timestamp: Date.now(),
    });
    await newPost.save();
    club.posts.push(newPost._id);
    await club.save();
    return res.status(201).json({
      status: 201,
      message: "Post Created",
      newPost,
    });
  }
});
