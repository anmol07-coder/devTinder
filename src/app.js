// Creating our first server with the help of node.js
const express = require("express");

const app = express();

app.use("/test",(req,res)=>{
    res.send("This is the test case of the server")
})

app.use("/hello",(req,res)=>{
    res.send("Saying hello to the srever");
})

app.use("/",(req,res)=>{
    res.send("Namaste node");
})

app.listen(7777,()=>{
    console.log("Server is successfullt started at port 7777...")
});

