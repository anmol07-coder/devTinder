// Creating our first server with the help of node.js
const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");

const app = express();

app.use(express.json());

// Creating a signup API because first a user must have to signup or we can say crate account on the app

app.post("/signup",async (req,res)=>{
    
    try{
        // Validation of data
        validateSignUpData(req);
        const {firstName, lastName, emailId, password} = req.body;

        // Encryt the password 
        const passwordHash = await bcrypt.hash(password,10);
        console.log(passwordHash);
        
        // Creating new instance of our User model
        const user = new User({
          firstName,
          lastName,
          emailId,
          password : passwordHash,
        });
        await user.save();
        res.send("User added successfully");
    }catch(err){
        res.status(400).send("ERROR : "+err.message);
    }
    
});

app.post("/login", async(req,res)=>{
  try{
    const {emailId, password} = req.body;
    if(!validator.isEmail(emailId)){
      throw new Error("Invalid credentials");
    }

    const user = await User.findOne({emailId : emailId});
    if(!user){
      throw new Erroor("Invalid Credentials")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(isPasswordValid){
      res.send("User login successfully!!");
    }
    else{
      res.status(400).send("Invalid credentials");
    }
  }catch(err){
    res.status(400).send(err.message);
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

app.delete("/user", async (req, res) => {
  try {
    const userId = req.body._id;

    // 1️⃣ Case: No ID provided
    if (!userId) {
      return res.status(400).send("UserId required");
    }

    // 2️⃣ Case: Try deleting user by ID
    const deletedUser = await User.findByIdAndDelete(userId);

    // 3️⃣ Case: ID was valid, but user doesn’t exist in database
    if (!deletedUser) {
      return res.status(404).send("User not found");
    }

    // 4️⃣ Case: Success — user deleted
    return res.send("User deleted successfully");
  } catch (err) {
    // 5️⃣ Case: Invalid ObjectId or other server/database errors
    return res.status(400).send(err.message);
  }
});

app.patch("/user/:userId",async (req,res)=>{
  const userId = req.params?.userId;
  const data = req.body;
  try{
    const ALLOWED_UPDATES = ['password','age','gender','photoUrl','about','skills'];
    const isUpdateAllowed = Object.keys(data).every((k)=>{
      return ALLOWED_UPDATES.includes(k);
    });

    if(!isUpdateAllowed){
      throw new Error("Update not allowed");
    }

    if(req.body.skills.length > 10){
      throw new Error("Update not allowed");
    }
    const user = await User.findByIdAndUpdate({_id:userId},data,{runValidators : true});
    res.send("User updated successfully");
  }
  catch(err){
    res.status(400).send(err.message);
  }
});

connectDB().then(()=>{
    console.log("Database connection established...");
    app.listen(7777,()=>{
    console.log("Server is successfully started at port 7777...")
});
}).catch((err)=>{
    console.log("Database cannot be connected...");
});

