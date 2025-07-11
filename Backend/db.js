const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Atlas connected");
    }
    catch(err){
        console.error("Mongodb connection errror:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;