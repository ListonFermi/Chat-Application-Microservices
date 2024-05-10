const amqp = require("amqplib");
const userCollection = require("../models/userModel");

async function startConsumer() {
  try {
    // Connect to RabbitMQ server
    const connection = await amqp.connect("amqp://rabbitmq:5672");
    const channel = await connection.createChannel();

    // Declare exchange
    const exchangeName = "user_signup_exchange";
    await channel.assertExchange(exchangeName, "direct", { durable: false });

    // Declare queue
    const queueName = "user_signup_queue";
    await channel.assertQueue(queueName, { exclusive: false });

    // Bind queue to exchange
    await channel.bindQueue(queueName, exchangeName, "");

    // Start consuming messages
    console.log("Waiting for signup messages. To exit press CTRL+C");
    channel.consume(
      queueName,
      (msg) => {
        const userData = JSON.parse(msg.content.toString());
        console.log("Received signup message:", userData);
        userCollection
          .create(userData)
          .then(() =>
            console.log(
              "Usersignup data added to the message service db successfully"
            )
          );
        // Process the signup message here
      },
      { noAck: true }
    );
  } catch (error) {
    console.error("Error occurred:", error.message);
  }
}

module.exports = startConsumer;
