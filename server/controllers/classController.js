const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Class = require("../models/Class");
const Event = require("../models/Event");
const { postEvent } = require("./eventController");

// Get all classes that a user is in or all classes with a specific name
exports.getClasses = asyncHandler(async (req, res, next) => {
    const classes = await Class.find({
        $or: [{ name: req.params.name }, { user: req.params.userID }]
    }).exec();
    return res.status(200).json({ message: "Success", status: 200, classes });
});

// Create a new class
exports.postClass = asyncHandler(async (req, res, next) => {
    const { name, description, picture, meeting_times, meeting_location } = req.body;
    if (!name || !description || !meeting_times || !meeting_location)
        res
            .status(400)
            .json({ status: 400, message: "Missing required fields" });
    const newClass = await new
        Class({
            name,
            description,
            picture,
            meeting_times,
            meeting_location
        });
    await newClass.save();
    res.status(201).json({
        status: 201,
        message: "Class Created",
        newClass,
    });
});

// Update a class
exports.updateClass = asyncHandler(async (req, res, next) => {
    const { name, description, picture, meeting_times, meeting_location } = req.body;
    if (!name || !description || !meeting_times || !meeting_location)
        res
            .status(400)
            .json({ status: 400, message: "Missing required fields" });
    const updatedClass = await Class.findByIdAndUpdate(req.params.classID, {
        name,
        description,
        picture,
        meeting_times,
        meeting_location
    });
    res.status(201).json({
        status: 201,
        message: "Class Updated",
        updatedClass,
    });
});

// Delete a class
exports.deleteClass = asyncHandler(async (req, res, next) => {
    const deletedClass = await Class.findByIdAndDelete(req.params.classID);
    res.status(201).json({
        status: 201,
        message: "Class Deleted",
        deletedClass,
    });
});

// Get all students in a class
exports.getAllStudents = asyncHandler(async (req, res, next) => {
    const students = await Class.findById(req.params.classID).students;
    res.status(200).json({
        status: 200,
        message: "Success",
        students
    });
});

// Return the name and rate my professor link of the professor
exports.getProfessor = asyncHandler(async (req, res, next) => {
    const professorInfo = {
        name: await Class.findById(req.params.classID).professor,
        link: `https://www.ratemyprofessors.com/search/professors?q=${professor.replace(" ", "+").toLowerCase()}`
    }
    res.status(200).json({
        status: 200,
        message: "Success",
        professorInfo
    });
});

// Populate the study session events of a class
exports.getStudySessions = asyncHandler(async (req, res, next) => {
    const studySessions = await Class.findById(req.params.classID).events.populate("studySessions").exec();
    res.status(200).json({
        status: 200,
        message: "Success",
        studySessions
    });
});

// TODO: TEST Modifying Study Sessions
// Add an study session event to a class
exports.addStudySession = asyncHandler(async (req, res, next) => {
    var newEvent = postEvent(req.body, res, next);
    const _class = await Class.findById(req.params.classID).exec();
    _class.events.push(newEvent);
    await _class.save();
    res.status(201).json({
        status: 201,
        message: "Event Created",
        newEvent,
    });
});

// Update a study session event (eventController will handle the actual event update)
// Delete a study session event
exports.deleteStudySession = asyncHandler(async (req, res, next) => {
    const _class = await Class.findById(req.params.classID).exec();
    _class.events = _class.events.filter(event => event._id != req.params.eventID); // Remove the event from the class
    await _class.save();
    var deletedEvent = deleteEvent(req.body, res, next); // Delete the event
    res.status(201).json({
        status: 201,
        message: "Event Deleted",
        deletedEvent,
    });
});
