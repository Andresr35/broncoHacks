const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

AWS.config.update({
  region: 'us-west-2', // replace with your AWS region
  accessKeyId: 'your-access-key-id',
  secretAccessKey: 'your-secret-access-key',
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const TableName = 'your-dynamodb-table-name';

const createUser = async (name, email, password, age, gender, bio, picture) => {
  const userId = uuidv4();
  const lastUpdated = new Date();

  const params = {
    TableName,
    Item: {
      userId,
      name,
      email,
      password,
      age,
      gender,
      bio,
      picture,
      lastUpdated: lastUpdated.toISOString(),
      friendRequests: [], // DynamoDB doesn't require defining an empty array
      friends: [], // DynamoDB doesn't require defining an empty array
    },
  };

  try {
    await dynamoDB.put(params).promise();
    return userId;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create user');
  }
};

module.exports = {
  createUser,
};
