const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

require("dotenv").config();

const cors = require("cors");
app.use(cors());

const USER_PORT = process.env.USER_PORT || 3001;
app.use(
  "/api/user",
  createProxyMiddleware({
    target: `http://localhost:${USER_PORT}`,
    changeOrigin: true,
  })
);

const MESSAGE_PORT = process.env.MESSAGE_PORT || 3002;
app.use(
  "/api/message",
  createProxyMiddleware({
    target: `http://localhost:${MESSAGE_PORT}`,
    changeOrigin: true,
  })
);

const CHATROOM_PORT = process.env.CHATROOM_PORT || 3003;
app.use(
  "/api/chatroom",
  createProxyMiddleware({
    target: `http://localhost:${CHATROOM_PORT}`,
    changeOrigin: true,
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`API gateway is running at http://localhost:${PORT}/`)
);
