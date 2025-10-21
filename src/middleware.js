const express = require("express");

const app = express();

const {adminAuth,userAuth} = require("./middlewares/auth")
// Middleware vs Route Handler

app.use("/users",(req,res,next)=>{
    console.log("Handling the route handler 1");
    next();//Forward the request to next middleware or route handler
},  (req,res,next)=>{
    console.log("Handling the route handler 2");
    res.send("This is the response from the server"); //This is sending back the response so this is the route handler
});

// This is where we see the practical use of middleware i.e. why and where are we going to use middleware
// We are going to handle Auth Middleware for all GET,POST... requests
app.use("/admin",adminAuth);

app.get("/user",userAuth,(req,res)=>{
    res.send("User data sent");
})
app.get("/admin/getAllData",(req,res,next)=>{
    res.send("All data sent");
});

app.delete("/admin/deleteUser",(req,res,next)=>{
    res.send("Deleted a user");
});

app.listen(7777,()=>{
    console.log("Server started successfully at port 7777...");
});

