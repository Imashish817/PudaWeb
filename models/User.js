import mongoose from "mongoose";

// Defining Schema
const userSchema = new mongoose.Schema({
  Name: { type: String, required: true, trim: true },
  AadharNo: { type: String, required: true, trim: true },
  Password: { type: String, required: true, trim: true },
  MobileNo: { type: String, required: true, trim: true },
  UserType:{type: String,required:true},
  FilePath: {type: String},
  URLPath: {type: String},
})

// Model
const UserModel = mongoose.model("users", userSchema)

export default UserModel