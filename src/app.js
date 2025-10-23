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
    
});

app.get("/user1", async (req,res)=>{
    const userEmail = req.body.emailId;
    try{
       const user = await User.find({emailId : userEmail});

       if(user.length === 0){
        res.status(404).send("User not Found");
       }
       else{
        res.send(user);
       }
    }
    catch(err) {
        res.status(400).send(err.message);
    }
});

app.get("/feed",async (req,res)=>{
    try{
        const user = await User.find({});
        res.send(user);
    }catch{
        res.status(400).send("Something went wrong");
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

