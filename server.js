require("dotenv").config({path : "./config.env"});

const path = require("path");
const express = require("express");
const connectDB = require("./config/db");
const app = express();
const cors = require('cors');
const twilio = require('twilio'); 
const errorHandler =  require("./middleware/error")
//connect DB

connectDB();

// Checking where ARe we Loading Our App

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/frontend/build")))

    app.get("/",(req,res)=>{
        res.sendFile(path.join(__dirname,"frontend","build","index.html"));
    })
}else{
    app.get("/",(req,res)=>{
        res.send("Development")
    })
}



app.use(express.json());
app.use("/api/auth/",require("./routes/auth"));
app.use("/api/private/",require("./routes/private"));

//twilio sms
app.use(cors()); //Blocks browser from restricting any data
const accountSid = 'AC9c085b4baf13c4905adea26a036fc837';
const authToken = '296e49520332d38de3e0769197ddaa3c'; 
const client = new twilio(accountSid, authToken);
//Twilio 
app.post('/send-text', (req, res) => {
    //Welcome Message
    

    const { recipient, textmessage } = req.body;
    
    //Send Text
    client.messages.create({
        body: textmessage,
        to: `${recipient}`,  // Text this number
        from: '+13156599321' // From a valid Twilio number
    }).then((message) => console.log(message.body));

    res.send('Hello to the Twilio Server')
})
//twilio sms

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

