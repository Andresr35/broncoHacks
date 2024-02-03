const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../jwt");
const userRouter = require("./users");
const postRouter = require("./post");
const classRouter = require("./class");
const eventRouter = require("./event");
const clubRouter = require("./club");

router.get("/", (req, res, next) => {
  res.send("Welcome to serene Book API!");
});

router.use("/users", userRouter);

router.use("/class", classRouter);
router.use("/event", eventRouter);
router.use("/club", clubRouter);
router.use(authenticateToken);
router.use("/posts", postRouter);

module.exports = router;
