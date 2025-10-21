const express = require("express");

const app = express();

// Method 01 --> Using try and catch
app.use("/getUserdata",(req,res,next)=>{
    try{
        throw new Error("Random error");
        res.send("User Data sent");
    }catch(err){
        res.status(500).send("Something went wrong")
    }
});

// Method 02 --> Using root route handler
app.use("/cart",(req,res,next)=>{
    throw new Error("Random error");
    res.send("User Data sent");
});

app.use("/cart",(err,req,res,next)=>{
    if(err){
        res.status(500).send("Something went wrong");
    }
})
app.listen(7777,()=>{
    console.log("Server started successfully at port 7777");
})