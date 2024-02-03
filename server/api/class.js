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
    router.get("/:id/students", getAllStudents);
    router.get("/:id/professor", getProfessor);
    router.get("/:id/studySessions", getStudySessions);
    router.post("/:id/studySessions", addStudySession);
    router.delete("/:id/studySessions", deleteStudySession);
  
  module.exports = router;