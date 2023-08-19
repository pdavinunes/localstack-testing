const AWS = require('aws-sdk');

// Set AWS configuration
AWS.config.update({
  region: 'us-east-1', // Replace with your desired region
  endpoint: 'http://localhost:4566', // LocalStack endpoint
});

const sqs = new AWS.SQS();

const queueUrl = 'http://localhost:4566/000000000000/my-queue'; // Replace with your queue URL

const getRandomMessage = () => {
  const randomValue = Math.floor(Math.random() * 1000);
  return `Random message: ${randomValue}`;
};

const sendMessage = async () => {
  const params = {
    MessageBody: getRandomMessage(),
    QueueUrl: queueUrl,
  };

  try {
    const result = await sqs.sendMessage(params).promise();
    console.log(`Message sent: ${result.MessageId}`);
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

const sendMessageLoop = async (numMessages, interval) => {
  for (let i = 0; i < numMessages; i++) {
    await sendMessage();
    await new Promise((resolve) => setTimeout(resolve, interval));
  }
};

// Set the number of messages to send and the interval between messages (in milliseconds)
const numMessages = 10;
const interval = 1000; // 1 second

sendMessageLoop(numMessages, interval)
  .then(() => console.log('Message sending completed'))
  .catch((error) => console.error('Error in sending loop:', error));
