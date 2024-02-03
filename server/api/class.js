const express = require("express");
const router = express.Router();

const {
    getClasses,
    postClass,
    updateClass,
    deleteClass,
    getAllStudents,
    getProfessor,
    getStudySessions,
    addStudySession,
    deleteStudySession
  } = require("../controllers/classController");
    router.get("/:userID", getClasses);
    router.post("/", postClass);
    router.put("/", updateClass);
    router.delete("/", deleteClass);
    router.get("/:classId/students", getAllStudents);
    router.get("/:classId/professor", getProfessor);
    router.get("/:classId/studySessions", getStudySessions);
    router.post("/:classId/studySessions", addStudySession);
    router.delete("/:classId/studySessions", deleteStudySession);
  
  module.exports = router;