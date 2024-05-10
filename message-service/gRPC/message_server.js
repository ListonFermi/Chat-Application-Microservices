const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

// Load message service protobuf
const messageProto = grpc.loadPackageDefinition(
  protoLoader.loadSync("./gRPC/message_service.proto")
);

// Define gRPC server
const server = new grpc.Server();

// Implement AddUser RPC method
server.addService(messageProto.messages.MessageService.service, {
  AddUser: (call, callback) => {
    const { _id, username, email } = call.request;

    // Here, you would save the user data to the database (MongoDB in your case)
    // For demonstration purposes, we'll just return a response
    const message = "User added successfully";

    callback(null, { message });
  },
});

// Start the gRPC server
server.bindAsync(
  `localhost:${Number(process.env.PORT) + 1000 || 4002}`,
  grpc.ServerCredentials.createInsecure(),
  () =>
    console.log(
      `Message service gRPC server running at localhost:$${
        Number(process.env.PORT) + 1000 || 4002
      }`
    )
);

module.exports = server;
