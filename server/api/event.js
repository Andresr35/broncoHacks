const express = require("express");
const router = express.Router();

const {
  getEvent,
  getAllEvents,
  postEvent,
  updateEvent,
  deleteEvent,
  getEventAttendees,
  joinEvent,
  leaveEvent,
} = require("../controllers/eventController");

router.post("/", postEvent);
router.put("/", updateEvent);
router.delete("/", deleteEvent);
router.get("/:userID", getEvent);
router.get("/", getAllEvents);
router.post("/:userID", joinEvent);
router.get("/:eventID/attendees", getEventAttendees);
router.delete("/:userID", leaveEvent);

module.exports = router;
