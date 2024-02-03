const express = require('express');
const router = express.Router();

const {
    getClubs,
    postClub,
    updateClub,
    deleteClub,
    addUserToClub,
    removeUserFromClub,
    addAdminToClub,
    removeAdminFromClub,
    getAdmins,
    getClubMembers,
    getClubEvents,
    getClubPosts
  } = require("../controllers/clubController");
    router.get("/", getClubs);
    router.post("/", postClub);
    router.put("/", updateClub);
    router.delete("/", deleteClub);
    router.get("/:clubId/members", getClubMembers);
    router.get("/:clubId/admins", getClubAdmins);
    router.get("/:clubId/posts", getClubPosts);
    router.get("/:clubId/events", getClubEvents);
  
  module.exports = router;