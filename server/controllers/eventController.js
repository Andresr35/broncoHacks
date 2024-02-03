const asyncHandler = require('express-async-handler');
const Event = require('../models/Event');
const mongoose = require('mongoose');


// Create a new event
exports.postEvent = asyncHandler(async (req, res, next) => {
    const { name, description, type, picture, time, location } = req.body;
    console.log(req.body);
    if (!name || !description || !time || !location || !type)
        return res
            .status(400)
            .json({ status: 400, message: 'Missing required fields' });
    const newEvent = await new Event({
        name,
        description,
        type,
        picture,
        time,
        location,
    });
    await newEvent.save();
    res.status(201).json({
        status: 201,
        message: 'Event Created',
        newEvent,
    });
});

// Update an event
exports.updateEvent = asyncHandler(async (req, res, next) => {
    const { name, description, type, picture, time, location } = req.body;
    if (!name || !description || !time || !location || !type)
        return res
            .status(400)
            .json({ status: 400, message: 'Missing required fields' });
    const updatedEvent = await Event.findByIdAndUpdate(req.params.eventID, {
        name,
        description,
        type,
        picture,
        time,
        location,
    });
    res.status(201).json({
        status: 201,
        message: 'Event Updated',
        updatedEvent,
    });
});

// Delete an event
exports.deleteEvent = asyncHandler(async (req, res, next) => {
    const deletedEvent = await Event.findByIdAndDelete(req.params.eventID);
    res.status(201).json({
        status: 201,
        message: 'Event Deleted',
        deletedEvent,
    });
});

// Get all events of a specific type and that a user is attending
exports.getAllEvents = asyncHandler(async (req, res, next) => {
    const { type } = req.params;
    const events = await Event.find({
        $and: [{ type: type }, { attendees: { $in: [req.params.userId] } }]
    }).exec();
    res.status(200).json({
        status: 200,
        message: 'Success',
        events,
    });
});

// Join an event
exports.joinEvent = asyncHandler(async (req, res, next) => {
    const { eventID, userID } = req.body;
    if (!eventID || !userID)
        return res
            .status(400)
            .json({ status: 400, message: 'Missing required fields' });
    const event = await Event.findById(eventID).exec();
    if (!event)
        return res
            .status(400)
            .json({ status: 400, message: 'Event not found' });
    event.attendees.push(userID);
    await event.save();
    res.status(200).json({
        status: 200,
        message: 'Joined Event',
        event,
    });
});

// Leave an event
exports.leaveEvent = asyncHandler(async (req, res, next) => {
    const { eventID, userID } = req.body;
    if (!eventID || !userID)
        return res
            .status(400)
            .json({ status: 400, message: 'Missing required fields' });
    const event = await Event.findById(eventID).exec();
    if (!event)
        return res
            .status(400)
            .json({ status: 400, message: 'Event not found' });
    event.attendees.pull(userID);
    await event.save();
    res.status(200).json({
        status: 200,
        message: 'Left Event',
        event,
    });
});

