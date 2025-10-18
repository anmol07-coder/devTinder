const express = require("express");

const app = express();

// Handling multiple route handlers
app.use("/users",(req,res,next)=>{
    console.log("Handling the route handler 1");
    next();
},  (req,res,next)=>{
    console.log("Handling the route handler 2");
    res.send("This is the response from the server");
});

// What if we dont use next in the first route handler
app.use("/namaste",(req,res,next)=>{
    console.log("Handling the route handler 01");
    res.send("Response 1");
},(req,res,next)=>{
    console.log("Handling the route handler 02");
    res.send("Response 2");
});

// What if we does not send any response
app.use("/Hello",(req,res,next)=>{
    // There must be a response
});

// What if the first route handler sends the response
app.use("/radhe",(req,res,next)=>{
    console.log("Handling the route handler 01");
    res.send("Radhe Radhe");
    next();
},(req,res,next)=>{
    console.log("Handling the route handler 02");
    res.send("Radhe Radhe again");
});

// One spicy case
app.use("/test",(req,res,next)=>{
    console.log("Handling the route handler 01");
    next();
    res.send("Testing 01");
},(req,res,next)=>{
    console.log("Handling the route handler 02");
    res.send("Testing 02");
});

// One more spicy case
app.use("/love",(req,res,next)=>{
    console.log("Handling the route handler 01");
    next();
},(req,res,next)=>{
    console.log("Handling the route handler 02");
    next();
});

// We can also wrap multiple route handlers in arrays
app.use("/response",[(req,res,next)=>{
    console.log("Handling the route handler 01");
    next();
},(req,res,next)=>{
    console.log("Handling the route handler 02");
    next();
}],(req,res,next)=>{
    console.log("Handling the route handler 03");
    next();
},(req,res,next)=>{
    console.log("Handling the route handler 04");
    res.send("Response");
});

// We can also handle multiple route handlers independently
app.use("/new",(req,res,next)=>{
    console.log("Handling the route handler 01");
    next();
});

app.use("/new",(req,res,next)=>{
    console.log("Handling the route handler 02");
    res.send("Response")
});


app.listen(7777,()=>{
    console.log("Server started successfully at port 7777...");
});