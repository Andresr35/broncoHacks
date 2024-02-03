const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Class = require("../models/Class");
const Event = require("../models/Event");
const Post = require("../models/Post");
const { postEvent } = require("./eventController");

// Get all classes that a user is in or all classes with a specific name
exports.getClasses = asyncHandler(async (req, res, next) => {
  const classes = await Class.find({
    $or: [{ name: req.params.name }, { user: req.params.userID }],
  }).exec();
  return res.status(200).json({ message: "Success", status: 200, classes });
});

// Create a new class
exports.postClass = asyncHandler(async (req, res, next) => {
  const {
    name,
    description,
    picture,
    professor,
    students,
    meeting_time,
    meeting_location,
  } = req.body;
  if (!name || !description || !meeting_time || !meeting_location || !professor)
    return res
      .status(400)
      .json({ status: 400, message: "Missing required fields" });

  try {
    const newClass = await new Class({
      name,
      description,
      picture,
      professor,
      students,
      meeting_time,
      meeting_location,
    });
    await newClass.save();
    return res.status(201).json({
      status: 201,
      message: "Class Created",
      newClass,
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

// Update a class
exports.updateClass = asyncHandler(async (req, res, next) => {
  const {
    name,
    description,
    picture,
    meeting_time,
    professor,
    students,
    meeting_location,
  } = req.body;
  if (
    !name ||
    !description ||
    !meeting_time ||
    !meeting_location ||
    !professor ||
    !students
  )
    return res
      .status(400)
      .json({ status: 400, message: "Missing required fields" });
  const updatedClass = await Class.findByIdAndUpdate(req.params.id, {
    name,
    description,
    picture,
    professor,
    students,
    meeting_time,
    meeting_location,
  }, {new: true} // Return the updated document
  );
  return res.status(201).json({
    status: 201,
    message: "Class Updated",
    updatedClass,
  });
});


// Delete a class
exports.deleteClass = asyncHandler(async (req, res, next) => {
  const deletedClass = await Class.findByIdAndDelete(req.params.id);
  return res.status(201).json({
    status: 201,
    message: "Class Deleted",
    deletedClass,
  });
});

// Get all students in a class
exports.getAllStudents = asyncHandler(async (req, res, next) => {
  const students = await Class.findById(req.params.id).students;
  return res.status(200).json({
    status: 200,
    message: "Success",
    students,
  });
});

// Return the name and rate my professor link of the professor
exports.getProfessor = asyncHandler(async (req, res, next) => {
  const classDocument = await Class.findById(req.params.id).exec();
  if (!classDocument) {
    return res.status(404).json({
      status: 404,
      message: "Class not found",
    });
  }

  const professor = classDocument.professor;
  const professorInfo = {
    name: professor,
    link: `https://www.ratemyprofessors.com/search/professors/14774?q=${professor
      .replace(" ", "+")
      .toLowerCase()}`,
  };

  return res.status(200).json({
    status: 200,
    message: "Success",
    professorInfo,
  });
});

// Populate the study session events of a class
exports.getStudySessions = asyncHandler(async (req, res, next) => {
  const studySessions = await Class.findOne({ classId: req.body.classId })
    .events.populate("studySessions")
    .exec();
  return res.status(200).json({
    status: 200,
    message: "Success",
    studySessions,
  });
});

// TODO: TEST Modifying Study Sessions
// Add an study session event to a class
exports.addStudySession = asyncHandler(async (req, res, next) => {
  var newEvent = postEvent(req.body, res, next);
  const _class = await Class.findOne({ classId: req.body.classId }).exec();
  _class.events.push(newEvent);
  await _class.save();
  return res.status(201).json({
    status: 201,
    message: "Event Created",
    newEvent,
  });
});

// Update a study session event (eventController will handle the actual event update)
// Delete a study session event
exports.deleteStudySession = asyncHandler(async (req, res, next) => {
  const _class = await Class.findOne({ classId: req.body.classId }).exec();
  _class.events = _class.events.filter(
    (event) => event._id != req.params.eventID
  ); // Remove the event from the class
  await _class.save();
  var deletedEvent = deleteEvent(req.body, res, next); // Delete the event
  return res.status(201).json({
    status: 201,
    message: "Event Deleted",
    deletedEvent,
  });
});

// Get all events in a class
exports.getEvents = asyncHandler(async (req, res, next) => {
  const event = await Class.findOne( req.params.id ).exec();
  if (!event) return res.status(400).json({ status: 400, message: "Class not found" });
  else 
  var events = event.events;
  return res.status(200).json({
    status: 200,
    message: "Success",
    events,
  });
});

// Post an event to a class
exports.addPost = asyncHandler(async (req, res, next) => {
  const _class = await Class.findOne( req.params.id ).exec();
  if (!_class) return res.status(400).json({ status: 400, message: "Class not found" });
  else {
    const new_post = await new Post({
      author: req.body.author,
      title: req.body.title,
      message: req.body.message,
      timestamp: new Date(req.body.date).toISOString(),
    });
    await newEvent.save();
    _class.events.push(newEvent._id);
    await _class.save();
    return res.status(201).json({
      status: 201,
      message: "Event Created",
      newEvent,
    });
  }
});