import UserModel from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'
dotenv.config()
class UserController {
  static userRegistration = async (req, res) => {
    const { Name, MobileNo,AadharNo, Password, Password_Confirmation, tc ,UserType} = req.body
    const user = await UserModel.findOne({ AadharNo: AadharNo })
    console.log(user)
    if (user) {
      res.status(403).send({ "status": "failed", "message": "Aadhar No already exists" })
    } else {
      if (Name && MobileNo && AadharNo && Password && Password_Confirmation && tc && UserType) {
        if (Password === Password_Confirmation) {
          try {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(Password, salt)
            const doc = new UserModel({
              Name: Name,
              AadharNo: AadharNo,
              Password: hashPassword,
              MobileNo: MobileNo,
              UserType: UserType,
            })
            await doc.save()
            const saved_user = await UserModel.findOne({ AadharNo: AadharNo })
            // Generate JWT Token
            const token = jwt.sign({ userID: saved_user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
            res.status(201).send({ "status": "success", "message": "Registration Success", "token": token })
          } catch (error) {
            console.log(error)
            res.status(500).send({ "status": "failed", "message": "Unable to Register" })
          }
        } else {
          res.status(403).send({ "status": "failed", "message": "Password and Confirm Password doesn't match" })
        }
      } else {
        res.status(403).send({ "status": "failed", "message": "All fields are required" })
      }
    }
  }

  static userLogin = async (req, res) => {
    try {
      const { AadharNo,MobileNo, Password } = req.body
      if (AadharNo && Password && MobileNo) {
        const user = await UserModel.findOne({ AadharNo: AadharNo })
        if (user != null) {
          const isMatch = await bcrypt.compare(Password, user.Password)
          if ((user.AadharNo === AadharNo && user.MobileNo ===MobileNo) && isMatch) {
            // Generate JWT Token
            const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
            res.status(200).send({ "status": "success", "message": "Login Success", "token": token, "Name": user.Name, "AadharNo": user.AadharNo, "MobileNo": user.MobileNo, "UserType":user.UserType, "SignedApplication":user.FilePath, "SignedDoc":user.URLPath })
          } else {
            res.status(401).send({ "status": "Unauthorized", "message": "Email, Mobile No, Password is not Valid" })
          }
        } else {
          res.status(401).send({ "status": "failed", "message": "You are not a Registered User" })
        }
      } else {
        res.status(401).send({ "status": "failed", "message": "All Fields are Required" })
      }
    } catch (error) {
      console.log(error)
      res.status(500).send({ "status": "failed", "message": "Unable to Login" })
    }
  }

 

  static loggedUser = async (req, res) => {
    res.send({ "user": req.user })
  }

  // static sendUserPasswordResetEmail = async (req, res) => {
  //   const { email } = req.body
  //   if (email) {
  //     const user = await UserModel.findOne({ email: email })
  //     if (user) {
  //       const secret = user._id + process.env.JWT_SECRET_KEY
  //       const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '15m' })
  //       const link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${token}`
  //       console.log(link)
  //       // // Send Email
  //       // let info = await transporter.sendMail({
  //       //   from: process.env.EMAIL_FROM,
  //       //   to: user.email,
  //       //   subject: "GeekShop - Password Reset Link",
  //       //   html: `<a href=${link}>Click Here</a> to Reset Your Password`
  //       // })
  //       res.send({ "status": "success", "message": "Password Reset Email Sent... Please Check Your Email" })
  //     } else {
  //       res.send({ "status": "failed", "message": "Email doesn't exists" })
  //     }
  //   } else {
  //     res.send({ "status": "failed", "message": "Email Field is Required" })
  //   }
  // }

  // static userPasswordReset = async (req, res) => {
  //   const { Password, Password_confirmation } = req.body
  //   const { id, token } = req.params
  //   const user = await UserModel.findById(id)
  //   const new_secret = user._id + process.env.JWT_SECRET_KEY
  //   try {
  //     jwt.verify(token, new_secret)
  //     if (Password && Password_confirmation) {
  //       if (Password !== Password_confirmation) {
  //         res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
  //       } else {
  //         const salt = await bcrypt.genSalt(10)
  //         const newHashPassword = await bcrypt.hash(Password, salt)
  //         await UserModel.findByIdAndUpdate(user._id, { $set: { Password: newHashPassword } })
  //         res.send({ "status": "success", "message": "Password Reset Successfully" })
  //       }
  //     } else {
  //       res.send({ "status": "failed", "message": "All Fields are Required" })
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     res.send({ "status": "failed", "message": "Invalid Token" })
  //   }
  // }

  // static changeUserPassword = async (req, res) => {
  //   const { Password, Password_confirmation } = req.body
  //   if (Password && Password_confirmation) {
  //     if (Password !== Password_confirmation) {
  //       res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
  //     } else {
  //       const salt = await bcrypt.genSalt(10)
  //       const newHashPassword = await bcrypt.hash(Password, salt)
  //       await UserModel.findByIdAndUpdate(req.user._id, { $set: { Password: newHashPassword } })
  //       res.send({ "status": "success", "message": "Password changed succesfully" })
  //     }
  //   } else {
  //     res.send({ "status": "failed", "message": "All Fields are Required" })
  //   }
  // }
}

export default UserController;