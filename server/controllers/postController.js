const AWS = require('aws-sdk');
const asyncHandler = require('express-async-handler');

AWS.config.update({
  region: 'us-west-2', // replace with your AWS region
  accessKeyId: 'your-access-key-id',
  secretAccessKey: 'your-secret-access-key',
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.deleteComment = asyncHandler(async (req, res, next) => {
  const { commentID } = req.params;
  const tokenUserID = req.userID;

  const params = {
    TableName: 'your-dynamodb-table-name',
    Key: {
      commentID: commentID,
    },
  };

  try {
    await dynamoDB.delete(params).promise();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', status: 500 });
  }
});

exports.addComment = asyncHandler(async (req, res, next) => {
  const { postID } = req.params;
  const { message, userID } = req.body;
  const tokenUserID = req.userID;

  // Perform DynamoDB operations to add a comment
  // ...

  res.status(201).json({
    message: 'Comment was created!',
    status: 201,
    newPost: {}, // Update with relevant data
  });
});

exports.handleLike = asyncHandler(async (req, res, next) => {
  const { postID } = req.params;
  const { userID } = req.body;
  const tokenUserID = req.userID;

  // Perform DynamoDB operations to handle like
  // ...

  res.status(200).json({
    message: 'Post like handled',
    status: 200,
    newPost: {}, // Update with relevant data
  });
});

exports.deletePost = asyncHandler(async (req, res, next) => {
  const { postID } = req.params;
  const tokenUserID = req.userID;

  const params = {
    TableName: 'your-dynamodb-table-name',
    Key: {
      postID: postID,
    },
  };

  try {
    await dynamoDB.delete(params).promise();
    res.status(200).json({
      message: 'Post was deleted',
      status: 200,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', status: 500 });
  }
});

exports.addPost = asyncHandler(async (req, res, next) => {
  const { message, userID, title } = req.body;
  const tokenUserID = req.userID;

  // Perform DynamoDB operations to add a post
  // ...

  res.status(201).json({
    message: 'Post was created!',
    status: 201,
    newPost: {}, // Update with relevant data
  });
});
