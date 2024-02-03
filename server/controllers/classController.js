const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Class = require("../models/Class");

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