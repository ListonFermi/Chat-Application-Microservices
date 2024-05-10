const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

// Load user service protobuf
const userProto = grpc.loadPackageDefinition(
  protoLoader.loadSync("./gRPc/user_service.proto")
);

// Define gRPC server
const server = new grpc.Server();

// Implement SignUpUser RPC method
server.addService(userProto.users.UserService.service, {
  SignUpUser: (call, callback) => {
    // const { username, email } = call.request;
    console.log(call);

    // Here, you would save the user data to the database
    // For demonstration purposes, we'll just return a response
    const success=true; // Generate user ID
    const message = "User signed up successfully";

    callback(null, { success, message });
  },
});

function sendMessageToMessageService(userData) {
  const messageClient = new messageProto.messages.MessageService('localhost:3002', grpc.credentials.createInsecure());

  // Call the appropriate gRPC method of the Message Service
  messageClient.AddUser(userData, (error, response) => {
      if (error) {
          console.error('Error adding user to Message Service:', error);
      } else {
          console.log('User added to Message Service:', response);
      }
  });
}

// Start the gRPC server
server.bindAsync(
  `localhost:${Number(process.env.PORT) + 1000 || 3001}`,
  grpc.ServerCredentials.createInsecure(),
  () =>
    console.log(
      `User service gRPC server running at localhost:${
        Number(process.env.PORT) + 1000 || 3001
      }`
    )
);

module.exports = server;
