const express = require("express");
const app = express();
require("dotenv").config();

const cors = require("cors");
app.use(cors());

//connecting db
const dbConnect = require("./config/dbConnect.js");
dbConnect();

app.use(express.json());

app.use(require("./routes/routes.js"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`User service is running at http://localhost:${PORT}/`)
);

