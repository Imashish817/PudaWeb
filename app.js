import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors';
import connectDB from './config/connectdb.js'
import userRoutes from './routes/userRoutes.js'
import FileRoutes from './routes/FileAndFormRoutes.js'
const app = express()
const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL
import mongoose from 'mongoose';
// CORS Policy
app.use(cors())

// Database Connection
 mongoose.connect("mongodb+srv://imashishjaiswal99:Ashish%401911@cluster0.diwsjm6.mongodb.net/Puda?retryWrites=true&w=majority")
// JSON
app.use(express.json())

// Load Routes
app.use("/api/user", userRoutes)
app.use("/api/File", FileRoutes)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})