// Creating our first server with the help of node.js
const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());

// Creating a signup API because first a user must have to signup or we can say crate account on the app

app.post("/signup",async (req,res)=>{
    const userObj =req.body;

    // Creating new instance of our User model
    const user = new User(userObj);

    // This function will return us a promise
    try{
        await user.save();
        res.send("User added successfully");
    }catch(err){
        res.status(400).send("Error saving the error");
    }
    
})

connectDB().then(()=>{
    console.log("Database connection established...");
    app.listen(7777,()=>{
    console.log("Server is successfully started at port 7777...")
});
}).catch((err)=>{
    console.log("Database cannot be connected...");
});

