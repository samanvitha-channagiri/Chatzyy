import dotenv from "dotenv"
import express from "express"
import authRoutes from "./routes/auth.route.js";
import {connectDB} from './lib/db.js';
import cookieParser from "cookie-parser";
import cors from "cors"
import messageRoutes from "./routes/message.route.js";
dotenv.config()
import {app,server} from './lib/socket.js'

const PORT=process.env.PORT

app.use(express.json())
app.use(cookieParser())
app.use(cors({
     origin:"http://localhost:5173",
     credentials:true
}))

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)

server.listen(5001,()=>{
    console.log(`Server is roaming on port ${PORT}`);
    connectDB();
    
}) 