const express = require("express");

const app = express();

// Here we are going to handle the dfifferent types of calls separately
// GET call
app.get("/hello",(req,res)=>{
    res.send({name:"Anmol",age:20});
});

// POST call
app.post("/hello",(req,res)=>{
    // Data to add to the database or post to the database
    res.send("Data is added successfully to the server");
});

// DELETE call
app.delete("/hello",(req,res)=>{
    res.send("Data is deleted successfully");
});

// PUT call
app.put("/hello",(req,res)=>{
    res.send("Data is updated successfully with the help of PUT");
});

// PATCH call 
app.patch("/hello",(req,res)=>{
    res.send("Data is updated successfully with the help of PATCH");
});

app.listen(3000,()=>{
    console.log("Server started successfully at port 3000...");
});