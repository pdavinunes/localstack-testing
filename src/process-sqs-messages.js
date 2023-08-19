const AWS = require('aws-sdk');

// Set AWS configuration
AWS.config.update({
  region: 'us-east-1', // Replace with your desired region
  endpoint: 'http://localhost:4566', // LocalStack endpoint
});

const sqs = new AWS.SQS();
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const queueUrl = 'http://localhost:4566/000000000000/my-queue'; // Replace with your queue URL
const tableName = 'MyTable'; // Replace with your DynamoDB table name

const processMessage = async (message) => {
  const messageBody = message.Body;
  console.log('Processing message:', messageBody);

  // Store the message in DynamoDB
  const params = {
    TableName: tableName,
    Item: {
      id: message.MessageId,
      messageData: messageBody,
      timestamp: Date.now(),
    },
  };

  try {
    await dynamoDB.put(params).promise();
    console.log('Message stored in DynamoDB');
  } catch (error) {
    console.error('Error storing message in DynamoDB:', error);
  }
};

const receiveMessages = async (numMessages) => {
  const params = {
    QueueUrl: queueUrl,
    MaxNumberOfMessages: numMessages,
  };

  try {
    const result = await sqs.receiveMessage(params).promise();
    if (result.Messages) {
      for (const message of result.Messages) {
        await processMessage(message);

        // Delete the processed message from the queue
        await sqs
          .deleteMessage({
            QueueUrl: queueUrl,
            ReceiptHandle: message.ReceiptHandle,
          })
          .promise();
        console.log('Message deleted from SQS');
      }
    } else {
      console.log('No messages found in the queue');
    }
  } catch (error) {
    console.error('Error receiving messages:', error);
  }
};

// Set the number of messages to receive
const numMessagesToReceive = 10;

receiveMessages(numMessagesToReceive)
  .then(() => console.log('Message processing completed'))
  .catch((error) => console.error('Error in message processing:', error));
