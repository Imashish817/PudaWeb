
import UserModel from '../models/User.js'
class AdminController{

    static GetUnverifiedUsers= async (req,res)=>{
        console.log(req.query.aadharno)
        if(req.user.UserType === "Admin")
        {
            const a=await UserModel.find({"FilePath":{$exists:true}  ,UserType:"Normal" })
            res.send({"data":a})
        }
        else{
            res.status(401).send({ "status": "Failed", "message": "Insufficient Permissions" });
        }
    }
    static verifyUser= async (req,res)=>{

    }
}

export default AdminController;
