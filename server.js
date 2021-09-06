require("dotenv").config({path : "./config.env"});

const express = require("express");
const connectDB = require("./config/db");
const app = express();
const errorHandler =  require("./middleware/error")
//connect DB

connectDB();

app.use(express.json());
app.use("/api/auth/",require("./routes/auth"));
app.use("/api/private/",require("./routes/private"));

//MIDDLEWARE
//errorHandler MiddleWare should be last
app.use(errorHandler);

const PORT = process.env.PORT || 5000;


const server = app.listen(PORT,()=>{
    console.log(`Server Running on port no = ${PORT}`);
})

//for error handling

process.on("unhandledRejection",(err,promise) =>{
    console.log(`Logged Error : ${err}`);
    server.close(() => process.exit(1));
})

