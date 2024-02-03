const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const { DateTime } = require("luxon");

AWS.config.update({
  region: 'us-west-2', // replace with your AWS region
  accessKeyId: 'your-access-key-id',
  secretAccessKey: 'your-secret-access-key',
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const TableName = 'your-dynamodb-table-name';

const createPost = async (authorId, message, title) => {
  const timestamp = new Date();
  const postId = uuidv4();

  const params = {
    TableName,
    Item: {
      postId,
      authorId,
      timestamp: timestamp.toISOString(),
      message,
      title,
      likes: [], // DynamoDB doesn't require defining an empty array
      comments: [], // DynamoDB doesn't require defining an empty array
    },
  };

  try {
    await dynamoDB.put(params).promise();
    return postId;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create post');
  }
};

module.exports = {
  createPost,
};
