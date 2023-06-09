
import UserModel from '../models/User.js'
class AdminController{

    static GetUnverifiedUsersForOps= async (req,res)=>{
        console.log(req.query.aadharno)
        let result=[];
        if(req.user.UserType === "2")
        {
            const a=await UserModel.find({"$and":[{"Files.IsAproved":"1"}],UserType: "1"}) .select('-Password')
            console.log(a);
            const Files=[];
            a.forEach((user)=>{
                let Name= user.Name;
                let AadharNo= user.AadharNo;
                let MobileNo= user.MobileNo;
                user.Files.forEach((File)=>{
                    console.log(File)
                    if(File.IsAproved ==='1')
                    {
                        console.log(File._doc)
                        const URLPaths=[File?.SignedAplication,File?.ApplicationsForm1,File?.ApplicationsForm2,File?.ApplicationsForm3,File?.ApplicationsForm4]
                        let oneFile= {"Name":Name,"AadharNo":AadharNo,"MobileNo":MobileNo,URLPaths}
                        Files.push(oneFile);
                        console.log(oneFile)
                    }
                });
                
            })
            res.status(200).send({"data":Files})
        }
        else{
            res.status(401).send({ "status": "Failed", "message": "Insufficient Permissions." });
        }
    }

    static GetUnverifiedUsersForCon= async (req,res)=>{
        console.log(req.query.aadharno)
        let result=[];
        if(req.user.UserType === "3")
        {
            const a=await UserModel.find({"$and":[{"Files.IsAproved":"2"}],UserType: "1"}) .select('-Password')
            console.log(a);
            const Files=[];
            a.forEach((user)=>{
                let Name= user.Name;
                let AadharNo= user.AadharNo;
                let MobileNo= user.MobileNo;
                user.Files.forEach((File)=>{
                    console.log(File)
                    if(File.IsAproved ==='2')
                    {
                        const URLPaths=[File?.SignedAplication,File?.ApplicationsForm1,File?.ApplicationsForm2,File?.ApplicationsForm3,File?.ApplicationsForm4]
                        let oneFile= {"Name":Name,"AadharNo":AadharNo,"MobileNo":MobileNo,URLPaths}
                        Files.push(oneFile);
                    }
                });
                
            })
            res.status(200).send({"data":Files})
        }
        else{
            res.status(401).send({ "status": "Failed", "message": "Insufficient Permissions" });
        }
    }

    static GetUnverifiedUsersForPat= async (req,res)=>{
        console.log(req.query.aadharno)
        let result=[];
        if(req.user.UserType === "4")
        {
            const a=await UserModel.find({"$and":[{"Files.IsAproved":"3"}],UserType: "1"}) .select('-Password')
            console.log(a);
            const Files=[];
            a.forEach((user)=>{
                let Name= user.Name;
                let AadharNo= user.AadharNo;
                let MobileNo= user.MobileNo;
                user.Files.forEach((File)=>{
                    console.log(File)
                    if(File.IsAproved ==='3')
                    {
                        const URLPaths=[File?.SignedAplication,File?.ApplicationsForm1,File?.ApplicationsForm2,File?.ApplicationsForm3,File?.ApplicationsForm4]
                        let oneFile= {"Name":Name,"AadharNo":AadharNo,"MobileNo":MobileNo,URLPaths}
                        Files.push(oneFile);
                    }
                });
                
            })
            res.status(200).send({"data":Files})
        }
        else{
            res.status(401).send({ "status": "Failed", "message": "Insufficient Permissions" });
        }
    }

    static GetUnverifiedUsersForAcc= async (req,res)=>{
        console.log(req.query.aadharno)
        let result=[];
        if(req.user.UserType === "4")
        {
            const a=await UserModel.find({"$and":[{"Files.IsAproved":"3"}],UserType: "1"}) .select('-Password')
            console.log(a);
            const Files=[];
            a.forEach((user)=>{
                let Name= user.Name;
                let AadharNo= user.AadharNo;
                let MobileNo= user.MobileNo;
                user.Files.forEach((File)=>{
                    console.log(File)
                    if(File.IsAproved ==='3')
                    {
                        const URLPaths=[File?.SignedAplication,File?.ApplicationsForm1,File?.ApplicationsForm2,File?.ApplicationsForm3,File?.ApplicationsForm4]
                        let oneFile= {"Name":Name,"AadharNo":AadharNo,"MobileNo":MobileNo,URLPaths}
                        Files.push(oneFile);
                    }
                });
                
            })
            res.status(200).send({"data":Files})
        }
        else{
            res.status(401).send({ "status": "Failed", "message": "Insufficient Permissions" });
        }
    }
}

export default AdminController;
