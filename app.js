import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors';
import connectDB from './config/connectdb.js'
import userRoutes from './routes/userRoutes.js'
import FileRoutes from './routes/FileAndFormRoutes.js'
import AdminRoutes from './routes/AdminRoutes.js'
const app = express()
const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL
import mongoose from 'mongoose';
// CORS Policy
app.use(cors())
connectDB(DATABASE_URL)

// JSON
app.use(express.json())

// Load Routes
app.use("/api/user", userRoutes)
app.use("/api/File", FileRoutes)
app.use("/api/Admin", AdminRoutes)
app.get("/",(req,res)=>{
  res.send("database url=>", DATABASE_URL,`Server listening at http://localhost:${port}`)
})
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})