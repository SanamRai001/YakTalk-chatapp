const express = require('express');
const cors = require('cors');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

require('dotenv').config();
const Token = process.env.PRIVATE_TOKEN;

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL, 
  credentials: true
}));
app.use(express.json());
app.use(cookieParser()); 

const http = require('http');
const { Server } = require('socket.io');
const { disconnect } = require('process');

//Database
const connectDB = require('./db');
connectDB();
const User = require('./models/user');

const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin: process.env.FRONTEND_URL,
        credentials: true,
        methods:['GET', 'POST']
    }
});

//who are online
const online = {}; //socket.id:username

io.on('connection',(socket)=>{
    console.log("User connected !", socket.id);
    const cookies = cookie.parse(socket.handshake.headers.cookie || "");
    const token = cookies.token;
    if(!token) {
        console.log("No token , so disconnecting");
        return socket.disconnect();
    }
    try{
        const userData = jwt.verify(token, Token);
        const username = userData.name;
        socket.username  = username;
        online[socket.id] = username;
        console.log(`${username} is online`);

        //broadcasting
        io.emit('online', online);
        socket.on('disconnect', ()=>{
            console.log("User disconnected!", socket.id);
            delete online[socket.id];
            socket.broadcast.emit('online',online);
            });
        socket.on('chatMessage', ({msg})=>{
            console.log("Recieved: ", msg);
            io.emit('chatMessage', ({msg, uname:socket.username}));
        });
        socket.on('privateMessage',({id, msg})=>{
            console.log("Received :",msg, " from ", id);
            io.to(id).emit('privateMessage',({msg, uname:socket.username}));
        });
    }
    catch (err){
        console.log("invalid token", err.message);
        return socket.disconnect();
    }
});

const verifyToken = (req, res, next)=>{
    const token = req.cookies.token;
    
    if(!token) return res.status(401).send("Access Denied");
    try{
        const verified = jwt.verify(token, Token);
        req.user = verified;

        next();
    } catch (err){
        return res.status(401).send("Invalid Token");
    }
};


app.get('/chat',verifyToken,(request, respond)=>{
    respond.send("This is websocket server!");

});

// app.post('/login', async(req, res) => {
//   const { name, password } = req.body;

// //   mongodb check of user
//   const user = await User.findOne({name: name});
//   if(!user){
//       return res.status(400).send("User not Found");
//     }
//     const hash_password  = user.password;
//     const isMatch = await bcrypt.compare(password, hash_password);
//     if(!isMatch){
//         return res.status(401).json({error:"Credentials does not match"});
//     }
//       try{
//           const payload = {name};
//           const secret_key = Token;
//           const token = jwt.sign(payload, secret_key);
//           res.cookie("token",token,{
//               httpOnly:true,
//               secure: process.env.NODE_ENV ==='production',
//               sameSite: "None",
//               maxAge:8640000
//           }).send("Logged in");
  
//       }
//       catch(err){
//           console.error(err);
//           res.status(500).send("Server Error");
//       }
 

//   console.log(`${name} : ${password}`);
// });


app.post('/login', async(req, res) => {
    const { name, password } = req.body;
    console.log(`[LOGIN TRACE] 1. Login attempt for user: ${name}`);

    try {
        const user = await User.findOne({name: name});
        if (!user) {
            console.log(`[LOGIN TRACE] 2. User not found: ${name}`);
            return res.status(400).send("User not Found");
        }
        console.log(`[LOGIN TRACE] 3. User found: ${name}`);

        const hash_password = user.password;
        const isMatch = await bcrypt.compare(password, hash_password);
        if (!isMatch) {
            console.log(`[LOGIN TRACE] 4. Password mismatch for user: ${name}`);
            return res.status(401).json({error:"Credentials does not match"});
        }
        console.log(`[LOGIN TRACE] 5. Password matched for user: ${name}`);

        // --- Start of JWT and Cookie Setting Block ---
        console.log(`[LOGIN TRACE] 6. Preparing JWT payload for user: ${name}`);
        const payload = {name};

        // Add this specific check for your JWT secret token
        if (!process.env.PRIVATE_TOKEN) {
            console.error('[LOGIN TRACE] ERROR: PRIVATE_TOKEN is not defined!'); // HIGHLY IMPORTANT
            // Consider sending a specific error response if this happens in production
            return res.status(500).send("Server configuration error: JWT secret missing.");
        }
        const secret_key = process.env.PRIVATE_TOKEN; // Ensure you're using process.env.PRIVATE_TOKEN directly here
        console.log(`[LOGIN TRACE] 7. JWT secret loaded. Length: ${secret_key.length} (to check if it's not empty)`); // Check length, don't log actual secret

        const token = jwt.sign(payload, secret_key);
        console.log(`[LOGIN TRACE] 8. JWT token signed successfully for user: ${name}`); // This must appear if token is valid

        console.log(`[LOGIN TRACE] 9. Attempting to set cookie for user: ${name}`); // This must appear right before res.cookie

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "None",
            maxAge: 8640000 // 100 days
        });
        console.log(`[LOGIN TRACE] 10. Cookie header set for user: ${name}`); // This means res.cookie was called

        res.send("Logged in"); // Send the actual response

        console.log(`[LOGIN TRACE] 11. Response sent for user: ${name}`); // This means the response was successfully sent

    } catch (err) {
        console.error(`[LOGIN TRACE] ERROR: An unhandled exception occurred for user ${name}:`, err.message, err.stack); // More detailed error logging
        res.status(500).send("Server Error");
    }
});

app.post('/signup', async(req, res)=>{
    const {name, password} = req.body;
    const user = await User.findOne({name:name});
    if(user){
        return res.status(401).json({error:"User Exists already"});
    }
    if(password < 8){
        return res.status(400).json({error:"Password must be at least 8 characters"});
    }
    // bcrypt using
    const hash_password = await bcrypt.hash(password, 10);
    const newUser = new User({name, password: hash_password});
    await newUser.save();
    res.status(200).send("Sign UP succesfull!");
});

app.get('/health',(req, res)=>{
    return res.status(200).send("Working Properly");
})

const port = process.env.PORT || 5000; 
server.listen(port, () => console.log(`Server running on http://localhost:${port}`));