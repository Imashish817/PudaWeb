import UserModel from '../models/User.js'
class AdminController{

    static GetUnverifiedUsersForOps= async (req,res)=>{
        console.log(req.query.aadharno)
        let result=[];
        if(req.user.UserType === "2")
        {
            const a=await UserModel.find({"$and":[{"Files.ApprovedByops":"false"}],UserType: "1"}) .select('-Password')
            console.log(a);
            const Files=[];
            a.forEach((user)=>{
                let Name= user.Name;
                let AadharNo= user.AadharNo;
                let MobileNo= user.MobileNo;
           
                user.Files.forEach((File)=>{
                    console.log(File)
                    if(File.ApprovedByops ==="false")
                    {
                        let FileNo= File.FileNo;
                        console.log(File._doc)
                        const URLPaths=[File?.SignedAplication,File?.ApplicationsForm1,File?.ApplicationsForm2,File?.ApplicationsForm3,File?.ApplicationsForm4]
                        let oneFile= {"Name":Name,"AadharNo":AadharNo,"FileNo":FileNo,"MobileNo":MobileNo,URLPaths}
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
            const a=await UserModel.find({"$and":[{"Files.ApprovedBycon":"false"},{"Files.ApprovedByops":"true"}],UserType: "1"}) .select('-Password')
            console.log(a);
            const Files=[];
            a.forEach((user)=>{
                let Name= user.Name;
                let AadharNo= user.AadharNo;
                let MobileNo= user.MobileNo;
               
                user.Files.forEach((File)=>{
                    console.log(File)
                    let FileNo= File.FileNo;
                    if(File.ApprovedBycon ==="false" && File.ApprovedByops==="true" )
                    {
                        const URLPaths=[File?.SignedAplication,File?.ApplicationsForm1,File?.ApplicationsForm2,File?.ApplicationsForm3,File?.ApplicationsForm4]
                        let oneFile= {"Name":Name,"AadharNo":AadharNo,"FileNo":FileNo,"MobileNo":MobileNo,URLPaths}
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
            const a=await UserModel.find({"$and":[{"Files.ApprovedBypat":"false"},{"Files.ApprovedByops":"true"},{"Files.ApprovedBycon":"true"}],UserType: "1"}) .select('-Password')
            console.log(a);
            const Files=[];
            a.forEach((user)=>{
                let Name= user.Name;
                let AadharNo= user.AadharNo;
                let MobileNo= user.MobileNo;
                
                
                user.Files.forEach((File)=>{
                    console.log(File)
                    let FileNo= File.FileNo;
                    if(File.ApprovedBycon ==="true" && File.ApprovedByops==="true" && File.ApprovedBypat==="false")
                    {
                        const URLPaths=[File?.SignedAplication,File?.ApplicationsForm1,File?.ApplicationsForm2,File?.ApplicationsForm3,File?.ApplicationsForm4]
                        let oneFile= {"Name":Name,"AadharNo":AadharNo,"FileNo":FileNo,"MobileNo":MobileNo,URLPaths}
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
        if(req.user.UserType === "5")
        {
            const a=await UserModel.find({"$and":[{"Files.ApprovedByacc":"false"},{"Files.ApprovedByops":"true"},{"Files.ApprovedBycon":"true"}],UserType: "1"}) .select('-Password')
            console.log(a);
            const Files=[];
            a.forEach((user)=>{
                let Name= user.Name;
                let AadharNo= user.AadharNo;
                let MobileNo= user.MobileNo;
                user.Files.forEach((File)=>{
                    console.log(File)
                    let FileNo= File.FileNo;
                    if(File.ApprovedBycon ==="true" && File.ApprovedByops==="true" && File.ApprovedByacc==="false")
                    {
                        const URLPaths=[File?.SignedAplication,File?.ApplicationsForm1,File?.ApplicationsForm2,File?.ApplicationsForm3,File?.ApplicationsForm4]
                        let oneFile= {"Name":Name,"AadharNo":AadharNo,"FileNo":FileNo,"MobileNo":MobileNo,URLPaths}
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

    static ApproveFile= async(req,res)=>{
        console.log(req.query);
        if(req.user.UserType==="2")
        {
            console.log(req.body);
            const a=await UserModel.updateOne(
                { "Files.FileNo": req.body.FileNo }, 
                { "$set": { "Files.$.ApprovedByops": "true" } }
            )
           
            console.log(a);
            res.status(200).send({ "status": "Success", "message": "Approved by operations team" });
        }
        else if(req.user.UserType==="3")
        {
            console.log(req.body);
            const a=await UserModel.updateOne(
                { "Files.FileNo": req.body.FileNo }, 
                { "$set": { "Files.$.ApprovedBycon": "true" } }
            )
            console.log(a);
            res.status(200).send({ "status": "Success", "message": "Approved by consltant team" });
        }
        else if(req.user.UserType==="4")
        {
            console.log(req.body);
            const a=await UserModel.updateOne(
                { "Files.FileNo": req.body.FileNo },
                { "$set": { "Files.$.ApprovedBypat": "true" ,
                "Files.$.breakuprow1":req.body.breakuprow1,
                "Files.$.breakuprow2":req.body.breakuprow2,
                "Files.$.breakuprow3":req.body.breakuprow3,
            }}
            )
            console.log(a);
            res.status(200).send({ "status": "Success", "message": "Approved by patwari" });
        }
        //bug
        else if(req.user.UserType==="5")
        {
            console.log(req.body);
            const a=await UserModel.updateOne(
                { "Files.FileNo": req.body.FileNo }, 
                { "$set": { "Files.$.ApprovedByacc": "true" } }
            )
            console.log(a);
            res.status(200).send({ "status": "Success", "message": "Approved by Accounts team" });
        }
                else{
            res.status(401).send({ "status": "Failed", "message": "Insufficient Permissions" });

        }

    }
    static SendtoPatwari=async(req, res)=>{
        if(req.user.UserType==="3")
        {
            console.log(req.body);
            const a=await UserModel.updateOne(
                { "Files.FileNo": req.body.FileNo }, 
                { "$set": { "Files.$.ApprovedBycon": "true" } }
            )
            const aa=await UserModel.updateOne(
                { "Files.FileNo": req.body.FileNo },
                { "$set": { "Files.$.ApprovedByacc": "not required" } }
            )
            res.status(200).send({ "status": "Success", "message": "file passed to patwari" });
        }
        else{
            res.status(401).send({ "status": "failed", "message": req.user.UserType });
        }

    }

    static SendtoAccounts=async(req, res)=>{
        if(req.user.UserType==="3")
        {
            console.log(req.body);
            const a=await UserModel.updateOne(
                { "Files.FileNo": req.body.FileNo }, 
                { "$set": { "Files.$.ApprovedBycon": "true" } }
            )
            const aa=await UserModel.updateOne(
                { "Files.FileNo": req.body.FileNo },
                { "$set": { "Files.$.ApprovedBypat": "not required" } }
            )
            console.log(a);
            res.status(200).send({ "status": "Success", "message": "file passed to accounts" });
        }
        else{
            res.status(401).send({ "status": "failed", "message": req.user.UserType });
        }

    }

        static UserstoBookAppointment=async(req, res)=>{
       
            //search for files where ApprovedByops,ApprovedBycon,ApprovedBypat,ApprovedByAcc are true of not required
            if(req.user.UserType === "2")
        {
            const a=await UserModel.find({"$and":[{"Files.ApprovedByops":"true"},{"Files.ApprovedBycon":"true"}],UserType: "1"}) .select('-Password')
            console.log(a);
            const Files=[];
            a.forEach((user)=>{
                let Name= user.Name;
                let AadharNo= user.AadharNo;
                let MobileNo= user.MobileNo;
                user.Files.forEach((File)=>{
                    console.log(File)
                    let FileNo= File.FileNo;
                    if((File.ApprovedBycon ==="true" && File.ApprovedByops==="true") && (File.ApprovedByacc==="true" ||File.ApprovedByacc==="not required") && (File.ApprovedBypat==="true" ||File.ApprovedBypat==="not required"))
                    {
                        const URLPaths=[File?.SignedAplication,File?.ApplicationsForm1,File?.ApplicationsForm2,File?.ApplicationsForm3,File?.ApplicationsForm4]
                        let oneFile= {"Name":Name,"AadharNo":AadharNo,"FileNo":FileNo,"MobileNo":MobileNo,URLPaths,"breakuprow1":File?.breakuprow1,"breakuprow2":File?.breakuprow2,"breakuprow3":File?.breakuprow3}
                        Files.push(oneFile);
                        console.log(oneFile)
                    }
                });
                
            })
            res.status(200).send({"data":Files})
        }
           else{
            res.status(401).send({ "status": "Failed", "message": "Insufficient Permissions" });
           }
           
        }

        static BookAppointment=async(req, res)=>{
            if(req.user.UserType==="2")
        {
            console.log(req.body);
            const a=await UserModel.updateOne(
                { "Files.FileNo": req.body.FileNo }, 
                { "$set": { "Files.$.AppointmentDate":  req.body.date } }
            )
            console.log(a);
            res.status(200).send({ "status": "Success", "message": "Appointment booked on "+req.body.date });
        }

        }
        // static UserstoBookAppointment=async(req, res)=>{
       
        //     //search for files where ApprovedByops,ApprovedBycon,ApprovedBypat,ApprovedByAcc are true of not required
        //     if(req.user.UserType === "2")
        // {
        //     const a=await UserModel.find({"$and":[{"Files.ApprovedByops":"true"},{"Files.ApprovedBycon":"true"}],UserType: "1"}) .select('-Password')
        //     console.log(a);
        //     const Files=[];
        //     a.forEach((user)=>{
        //         let Name= user.Name;
        //         let AadharNo= user.AadharNo;
        //         let MobileNo= user.MobileNo;
        //         user.Files.forEach((File)=>{
        //             console.log(File)
        //             let FileNo= File.FileNo;
        //             if((File.ApprovedBycon ==="true" && File.ApprovedByops==="true") && (File.ApprovedByacc==="true" ||File.ApprovedByacc==="not required") && (File.ApprovedBypat==="true" ||File.ApprovedBypat==="not required") && File?.AppointmentDate === null)
        //             {
        //                 const URLPaths=[File?.SignedAplication,File?.ApplicationsForm1,File?.ApplicationsForm2,File?.ApplicationsForm3,File?.ApplicationsForm4]
        //                 let oneFile= {"Name":Name,"AadharNo":AadharNo,"FileNo":FileNo,"MobileNo":MobileNo,URLPaths}
        //                 Files.push(oneFile);
        //             }
        //         });
                
        //     })
        //     res.status(200).send({"data":Files})
        // }
        //    else{
        //     res.status(401).send({ "status": "Failed", "message": "Insufficient Permissions" });
        //    }
           
        // }

        static RejectFile=async(req, res)=>{
        console.log(req.query);
        if(req.user.UserType==="2")
        {
            console.log(req.body);
            const a=await UserModel.updateOne(
                { "Files.FileNo": req.body.FileNo }, 
                { "$set": { "Files.$.ApprovedByops": "reject" } }
            )
           
            console.log(a);
            res.status(200).send({ "status": "Success", "message": "rejected by operations team" });
        }
        else if(req.user.UserType==="3")
        {
            console.log(req.body);
            const a=await UserModel.updateOne(
                { "Files.FileNo": req.body.FileNo }, 
                { "$set": { "Files.$.ApprovedBycon": "reject" } }
            )
            console.log(a);
            res.status(200).send({ "status": "Success", "message": "rejected by consltant team" });
        }
        else if(req.user.UserType==="4")
        {
            console.log(req.body);
            const a=await UserModel.updateOne(
                { "Files.FileNo": req.body.FileNo },
                { "$set": { "Files.$.ApprovedBypat": "reject" } }
            )
            console.log(a);
            res.status(200).send({ "status": "Success", "message": "rejected by patwari" });
        }
        else if(req.user.UserType===5)
        {
            console.log(req.body);
            const a=await UserModel.updateOne(
                { "Files.FileNo": req.body.FileNo },{"AadharNo": req.body.Aadharno}, 
                { "$set": { "Files.$.IsAproved": "reject" } }
            )
            console.log(a);
            res.status(200).send({ "status": "Success", "message": "rejected by Accounts team" });
        }
                else{
            res.status(401).send({ "status": "Failed", "message": "Insufficient Permissions" });

        }

        }
    
}

export default AdminController;
