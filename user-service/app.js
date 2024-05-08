const express= require('express')
const app = express()
require('dotenv').config()

//connecting db
const dbConnect = require("./config/dbConnect.js");
dbConnect();

app.use(express.json())

app.use("/user", require("./routes/routes.js"));

const PORT = process.env.PORT || 3001
app.listen(PORT,()=>console.log(`User service started running in the port: ${PORT}`))
