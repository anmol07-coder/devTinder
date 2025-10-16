const express = require("express");

const app = express();

app.use("/namaste",(req,res)=>{
    res.send("Namaste Node");
});

app.use("/hello",(req,res)=>{
    res.send("Hello Node");
});

app.use("/",(req,res)=>{
    res.send("Node");
});

app.listen(7777,()=>{
    console.log("Server started successfully at port 7777...")
})
