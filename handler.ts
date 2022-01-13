const AWS = require("aws-sdk");
const express = require("express");
const serverless = require("serverless-http");

const app = express();

const TABLE = process.env.TASKS_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

app.use(express.json());

const makeParamsGet = (Key) => ({
  TableName: TABLE,
  Key
})

const makeParamsPost = (Item) => ({
  TableName: TABLE,
      Item
})

app.get('/tasks-get', async (req, res) => {
  const params = makeParamsGet({})
  const tasks = await dynamoDbClient.scan(params).promise();
  res.json({tasks});

})

app.post('/tasks-create', async (req, res) => {
  const { title, desc, taskId } = req.body;

  const params = makeParamsPost({title, desc, taskId})
  await dynamoDbClient.put(params).promise();
  res.json({ title, desc,taskId });
})

app.put('/tasks-edit', async (req, res) => {
  const { title, desc, taskId } = req.body;

  const params = {
    TableName: TABLE,
    Key: taskId,
    Item: {
      title,
      desc,
      taskId
    }
  }
  await dynamoDbClient.put(params).promise();
  res.json({ title, desc,taskId });
})

app.delete('/tasks-remove', async (req, res) => {
  const { taskId } = req.body;

  const params = {
    TableName: TABLE,
    Key: {
      taskId
    },
  }

  await dynamoDbClient.delete(params).promise();
  res.json({ taskId });
})

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
