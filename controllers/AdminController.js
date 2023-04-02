
import UserModel from '../models/User.js'
class AdminController{

    static GetUnverifiedUsers= async (req,res)=>{
        console.log(req.query.aadharno)
        let result=[];
        if(req.user.UserType === "Admin")
        {
            const a=await UserModel.find({"FilePath":{$exists:true}  ,UserType:"Normal" })
            
            a.forEach(user => {
                let userObj={
                    Name: user.Name,
                    AadharNo: user.AadharNo,
                    UserType: user.UserType,
                    FilePath: user.FilePath,
                    URLPath: user.URLPath,
                    MobileNo: user.MobileNo,
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
