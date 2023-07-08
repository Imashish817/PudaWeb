import mongoose from "mongoose";

// Defining Schema
const userSchema = new mongoose.Schema({
  Name: { type: String, required: true, trim: true },
  AadharNo: { type: String, required: true, trim: true },
  Password: { type: String, required: true, trim: true },
  MobileNo: { type: String, required: true, trim: true },
  UserType:{type: String,required:true},
  Files:[
    {
      FileNo: String,
      SignedAplication: [String],
      ApplicationsForm1: [String],
      ApplicationsForm2: [String],
      ApplicationsForm3: [String],
      IsAproved: String,
      ApprovedByops:String,
      ApprovedBycon:String,
      ApprovedByacc:String,
      ApprovedBypat:String,
      AppointmentDate:String,
      breakuprow1: [String],
      breakuprow2: [String],
      breakuprow3: [String]
    }
  ]
})

// Model
const UserModel = mongoose.model("users", userSchema)

export default UserModel