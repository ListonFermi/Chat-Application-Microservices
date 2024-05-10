const amqp = require('amqplib');

module.exports = async function publishSignupMessage(userData) {
    try {
        // Establish connection to RabbitMQ
        const connection = await amqp.connect('amqp://rabbitmq:5672');

        const channel = await connection.createChannel();

        // Declare exchange
        const exchangeName = 'user_signup_exchange';
        await channel.assertExchange(exchangeName, 'direct', { durable: false });

        // Publish message
        const message = JSON.stringify(userData);
        await channel.publish(exchangeName, '', Buffer.from(message));

        console.log('Message published to RabbitMQ: ', userData);

        // Close connection
        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('Error publishing message to RabbitMQ:', error);
    }
}