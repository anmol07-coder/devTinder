const express = require("express");

const app = express();

app.use("/namaste/api",(req,res)=>{
    res.send("Namastee to API");
});

app.use("/namaste",(req,res)=>{
    res.send("Namaste Node");
});

app.use("/hello1",(req,res)=>{
    res.send("Hello Node");
});

app.use("/hello/api",(req,res)=>{
    res.send("Helllooo to API");
})

app.use("/",(req,res)=>{
    res.send("Node");
});

app.listen(7777,()=>{
    console.log("Server started successfully at port 7777...")
})
