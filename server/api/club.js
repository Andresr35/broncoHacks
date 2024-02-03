const express = require("express");
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
  getClubPosts,
} = require("../controllers/clubController");

router.get("/:userID", getClubs);
router.post("/", postClub);
router.put("/", updateClub);
router.delete("/", deleteClub);
router.post("/:id/:userID", addUserToClub);
router.delete("/:id/:userID", removeUserFromClub);
router.post("/:id/:userID", addAdminToClub);
router.delete("/:id/:userID", removeAdminFromClub);
router.get("/:id/admins", getAdmins);
router.get("/:id/members", getClubMembers);
router.get("/:id/events", getClubEvents);
router.get("/:id/posts", getClubPosts);

module.exports = router;
