
import UserModel from '../models/User.js'
class AdminController{

    static GetUnverifiedUsers= async (req,res)=>{
        console.log(req.query.aadharno)
        let result=[];
        if(req.user.UserType === "Admin")
        {
            const a=await UserModel.find({"Files.IsAproved":"1"  ,UserType:"Normal" })
            console.log(a);
            a.forEach(user => {
                let userObj={
                    Name: user.Name,
                    AadharNo: user.AadharNo,
                    UserType: user.UserType,
                    MobileNo: user.MobileNo,
                    Files:user.Files
                };
                result.push(userObj);
              });
            res.status(200).send({"data":result})
        }
        else{
            res.status(401).send({ "status": "Failed", "message": "Insufficient Permissions" });
        }
    }
    static verifyUser= async (req,res)=>{

    }
}

export default AdminController;
