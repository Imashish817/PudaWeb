import UserModel from '../models/User.js'
class FileAndFromController{
    
    static UploadFile = async (req,res) =>{
        if(!req.file)
        {
            res.status(400).send({ "status": "failed", "message": "Image is Inapporiate" })
        }
        else{
            console.log(req.file);
            console.log(req.user);
            const file={
                FileNo:  Date.now(),
                SignedAplication:req.file.url,
                ApplicationsForm1: req.file.ApplicationsForm1,
                ApplicationsForm2: req.file.ApplicationsForm2,
                ApplicationsForm3: req.file.ApplicationsForm3,
                IsAproved: false,
            }
            //update in DB with file name;
            await UserModel.findByIdAndUpdate(req.user._id, { $push: { Files:file  } })
            res.status(200).send({ "status": "Success", "message": "Upload is Completed and a new file is created ","file No: " :file.FileNo });
        }
    }
    static UploadApplicationsForm1= async(req,res)=> {
        if(!req.file)
        {
            res.status(400).send({ "status": "failed", "message": "Image is Inapporiate" })
        }
         else{
            console.log(req.file);
            console.log(req.user);
            try{
                const re=await UserModel.updateOne({"Files.FileNo": req.body.FileNo},{
                    $set:{
                        "Files.$.ApplicationsForm1":req.file.url
                    }
                   })
                    //update in DB with file name;
                    // await UserModel.findByIdAndUpdate(req.user._id, { $set: { Files :file  } })
                    res.status(200).send({ "status": "Success", "message": "Application Form 1 is Submited SuccessFully","file Uploaded:" :req.file.url });
            }
            catch(error){
                res.status(500).send({ "status": "Failed", "message": "Somthing Went Very Worng" });
            }
           
    }
}

static UploadApplicationsForm2= async(req,res)=> {
    if(!req.file)
    {
        res.status(400).send({ "status": "failed", "message": "Image is Inapporiate" })
    }
     else{
        console.log(req.file);
        console.log(req.user);
        try{
            const re=await UserModel.updateOne({"Files.FileNo": req.body.FileNo},{
                $set:{
                    "Files.$.ApplicationsForm2":req.file.url
                }
               })
                //update in DB with file name;
                // await UserModel.findByIdAndUpdate(req.user._id, { $set: { Files :file  } })
                res.status(200).send({ "status": "Success", "message": "Application Form 2 is Submited SuccessFully","file Uploaded:" :req.file.url });
        }
        catch(error){
            res.status(500).send({ "status": "Failed", "message": "Somthing Went Very Worng" });
        }
       
}
}

static UploadApplicationsForm3= async(req,res)=> {
    if(!req.file)
    {
        res.status(400).send({ "status": "failed", "message": "Image is Inapporiate" })
    }
     else{
        console.log(req.file);
        console.log(req.user);
        try{
            const re=await UserModel.updateOne({"Files.FileNo": req.body.FileNo},{
                $set:{
                    "Files.$.ApplicationsForm3":req.file.url
                }
               })
                //update in DB with file name;
                // await UserModel.findByIdAndUpdate(req.user._id, { $set: { Files :file  } })
                res.status(200).send({ "status": "Success", "message": "Application Form 3 is Submited SuccessFully","file Uploaded:" :req.file.url });
        }
        catch(error){
            res.status(500).send({ "status": "Failed", "message": "Somthing Went Very Worng" });
        }
       
}
}

}

export default FileAndFromController;