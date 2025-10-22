const mongoose = require("mongoose");

const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://tyagiji2005_db_user:PZveDCcomMn0EcMK@namastenode.lukvh7v.mongodb.net/devTinder");
};

module.exports = connectDB;