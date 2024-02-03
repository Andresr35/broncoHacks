const asyncHandler = require('express-async-handler');
const Club = require('../models/Club');
const mongoose = require('mongoose');

// Get all clubs that a user is in or all clubs with a specific name
exports.getClubs = asyncHandler(async (req, res, next) => {
    const clubs = await Club.find({
        $or: [{ name: req.params.name }, { user: req.params.userID }],
    }).exec();
    return res.status(200).json({ message: 'Success', status: 200, clubs });
});


// Create a new club
exports.postClub = asyncHandler(async (req, res, next) => {
    const { name, clubId, description, picture, meeting_times, meeting_location } = req.body;
    if (!name || !clubId || !description || !meeting_times || !meeting_location)
        res
            .status(400)
            .json({ status: 400, message: 'Missing required fields' });
    try {
        const newClub = await new Club({
            clubId,
            name,
            description,
            picture,
            admins: [req.user._id],
            meeting_times,
            meeting_location,
        });
        await newClub.save();
        res.status(201).json({
            status: 201,
            message: 'Club Created',
            newClub,
        });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({
                status: 400,
                message: 'Duplicate classId',
            });
        }
    }
});

// Update a club
exports.updateClub = asyncHandler(async (req, res, next) => {
    const { name, clubId, description, picture, meeting_times, meeting_location } = req.body;
    if (!name || !clubId || !description || !meeting_times || !meeting_location)
        res
            .status(400)
            .json({ status: 400, message: 'Missing required fields' });
    const admin = await Club.find({ admin: req.params.admins }).exec();
    if (!admin)
        res.status(401).json({ status: 401, message: 'You must be an admin to update this club' });
    else {
        const updatedClub = await Club.findOneAndUpdate({ clubId: res.params.clubId }, {
            clubId,
            name,
            description,
            picture,
            meeting_times,
            meeting_location,
        });
        res.status(201).json({
            status: 201,
            message: 'Club Updated',
            updatedClub,
        });
    }
});

// Delete a club
exports.deleteClub = asyncHandler(async (req, res, next) => {
    const admin = await Club.find({ admin: req.params.admins }).exec();
    if (!admin)
        res.status(401).json({ status: 401, message: 'You must be an admin to delete this club' });
    else {
        const deletedClub = await Club.findByIdAndDelete(req.params.clubID);
        res.status(201).json({
            status: 201,
            message: 'Club Deleted',
            deletedClub,
        });
    }
});

// Add a user to a club
exports.addUserToClub = asyncHandler(async (req, res, next) => {
    const club = await Club.findById(req.params.clubID).exec();
    if (!club)
        res.status(400).json({ status: 400, message: 'Club not found' });
    else {
        club.members.push(req.params.userID);
        await club.save();
        res.status(201).json({
            status: 201,
            message: 'User Added to Club',
            club,
        });
    }
});

// Remove a user from a club
exports.removeUserFromClub = asyncHandler(async (req, res, next) => {
    const club = await Club.findById(req.params.clubID).exec();
    if (!club)
        res.status(400).json({ status: 400, message: 'Club not found' });
    else {
        club.members.pull(req.params.userID);
        await club.save();
        res.status(201).json({
            status: 201,
            message: 'User Removed from Club',
            club,
        });
    }
});

// Add an admin to a club
exports.addAdminToClub = asyncHandler(async (req, res, next) => {
    const club = await Club.findById(req.params.clubID).exec();
    if (!club)
        res.status(400).json({ status: 400, message: 'Club not found' });
    else {
        club.admins.push(req.params.userID);
        await club.save();
        res.status(201).json({
            status: 201,
            message: 'Admin Added to Club',
            club,
        });
    }
});

// Remove an admin from a club
exports.removeAdminFromClub = asyncHandler(async (req, res, next) => {
    const club = await Club.findById(req.params.clubID).exec();
    if (!club)
        res.status(400).json({ status: 400, message: 'Club not found' });
    else {
        club.admins.pull(req.params.userID);
        await club.save();
        res.status(201).json({
            status: 201,
            message: 'Admin Removed from Club',
            club,
        });
    }
});


// Get all admins in a club
exports.getAdmins = asyncHandler(async (req, res, next) => {
    const club = await Club.findById(req.params.clubID).exec();
    if (!club)
        res.status(400).json({ status: 400, message: 'Club not found' });
    else {
        const admins = await club.admins;
        res.status(200).json({
            status: 200,
            message: 'Success',
            admins,
        });
    }
});