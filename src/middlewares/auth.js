const jwt = require("jsonwebtoken");
const User = require("../models/user");
const adminAuth = (req,res,next)=>{
    console.log("Admin authorization checked");
    const token = 'xyz';
    const isAdminAuthorized = token==='xyz';
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized request");
    }
    else{
        next();
    }
};


const userAuth= (req,res,next)=>{
    console.log("User authorization checked");
    const token = 'xyz';
    const isAdminAuthorized = token==='xyz';
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized request by user");
    }
    else{
        next();
    }
}; 

const userAuth1 = async (req,res,next)=>{
    try{
    const {token} = req.cookies;
    if(!token){
        throw new Error("Token is not validd");
    }
    
    const decodedData = await jwt.verify(token,"Dev@tinder007t");

    const {_id} = decodedData;
    const user = await User.findById(_id);
    if(!user){
        throw new Error("User does not exist");
    }
    req.user = user;
    next();
    }catch(err){
        res.status(400).send("ERROR : "+err.message);
    }
};

module.exports = {
    adminAuth,
    userAuth,
    userAuth1,
};