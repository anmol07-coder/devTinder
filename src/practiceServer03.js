const express = require("express");

const app = express();

// The request will match /namaste , /namaste/hello
// and etc etc etc...

// This all will show the use of ?
app.use(/^\/nam(a)?ste$/, (req, res) => {
  res.send("Namaste to my server");
});

app.post(/^\/a(b)?c$/,(req,res)=>{
    res.send("This works with both ac as well as abc");
});

// Now we will see the use of +
app.get(/^\/h(e)+llo$/,(req,res)=>{
    res.send("This will be matched by hello,heello,heeello...");
})

// Now we will see the use of *
app.get(/^\/te.*st$/,(req,res)=>{
    res.send("Anything written between te and st")
});

// Grouping things together
app.get(/^\/uv(w)?(x)?yz$/,(req,res)=>{
    res.send("Here w and x are optional separately");
});

app.get(/^\/mn(op)?qr$/,(req,res)=>{
    res.send("Here op is optional");
});


// regex in routes
app.get(/a/,(req,res)=>{
    res.send("Here all the paths with a are matched");
});

// Ending with particlular term
app.get(/.*fly$/,(req,res)=>{
    res.send("Ending with fly");
});

// Dynamic routes
app.get("/users/:name/:age/:id",(req,res)=>{
    console.log(req.params);
    console.log(req.params.name);
    res.send("This is an example of dynamic routes");
});

// Seeing some dynamic userid and dynamic names in routing
app.get("/users",(req,res)=>{
    console.log(req.query);
    res.send("Hello user how are you")
})

// This request will match everything /helo , /1234 , /wsxcv and etc etc etc...
app.use("/",(req,res)=>{
    res.send("Welcome to my server");
});

app.listen(3000,()=>{
    console.log("Server started successflly at port 3000...");
});