const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load message service protobuf
const messageProto = grpc.loadPackageDefinition(
    protoLoader.loadSync('message_service.proto')
);

// Create gRPC client
const client = new messageProto.messages.MessageService(`localhost:${process.env.PORT || 3002}`, grpc.credentials.createInsecure());

// Example usage: add user
client.AddUser({ _id: '123', username: 'john', email: 'john@example.com' }, (error, response) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('User added:', response);
    }
});
