const {
  DynamoDBClient,
  CreateTableCommand,
} = require("@aws-sdk/client-dynamodb");
const { v4: uuidv4 } = require("uuid");

const client = new DynamoDBClient({ region: "us-west-2" });

const params = {
  TableName: "Messages",
  KeySchema: [
    { AttributeName: "messenger", KeyType: "HASH" }, //Partition key
    { AttributeName: "created", KeyType: "RANGE" }, //Sort key
  ],
  AttributeDefinitions: [
    { AttributeName: "messenger", AttributeType: "S" },
    { AttributeName: "created", AttributeType: "N" },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
};

function createTable() {
  const createTableCommand = new CreateTableCommand(params);

  client
    .send(createTableCommand)
    .then((data) => {
      console.log(
        "Created table. Table description JSON:",
        JSON.stringify(data, null, 2)
      );
    })
    .catch((err) => {
      console.error(
        "Unable to create table. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    });
}
