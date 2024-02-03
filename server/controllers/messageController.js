const asyncHandler = require("express-async-handler");
const Message = require("../models/Message");

exports.getUserMessages = asyncHandler(async (req, res, next) => {
  const messages = await Message.find({
    $or: [{ messenger: req.params.userID }, { receiver: req.params.userID }],
  })
    .populate(["receiver", "messenger"])
    .exec();
  return res.status(200).json({ message: "Success", status: 200, messages });
});

exports.postUserMessages = asyncHandler(async (req, res, next) => {
  const { userID } = req.params;
  const { receiverID, message } = req.body;
  if (!receiverID && !message)
    res
      .status(400)
      .json({ status: 400, message: "Recipient or message is missing" });
  const newMessage = await new Message({
    message,
    receiver: receiverID,
    messenger: userID,
  }).populate(["receiver", "messenger"]);
  await newMessage.save();

  res.status(201).json({
    status: 201,
    message: "Message Created",
    newMessage,
  });
});
