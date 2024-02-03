const { PutCommand } = require("@aws-sdk/client-dynamodb");
const Messages = require("./models/Message");

Messages.createTable();


const params = {
    TableName: 'Messages',
    Item: {
        'messenger': { S: 'user1' },
        'created': { N: '1633024800' },  // timestamp
        'reciever': { S: 'user2' },
        'message': { S: 'Hello, world!' }
    }
};

const putCommand = new PutCommand(params);

client.send(putCommand)
    .then((data) => console.log(data))
    .catch((error) => console.error(error));