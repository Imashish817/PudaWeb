import UserModel from '../models/User.js'
class FileAndFromController{
    
    static UploadFile = async (req,res) =>{
        
        if(!req.files)
        {
            res.status(400).send({ "status": "failed", "message": "Image is Inapporiate" })
        }
        else{
            console.log(req.files);
            console.log(req.user);
            const file={
                FileNo:  Date.now(),
                SignedAplication:req.files.WrittenApplication[0].url,
                ApplicationsForm1: req.files.ApplicationsForm1[0].url,
                ApplicationsForm2: req.files.ApplicationsForm2[0].url,
                IsAproved: "1",
                //IsAproved=1 --> underprogress
                //IsAproved=0 --> approved
                //IsAproved=2 --> rejected  
            }
            //update in DB with file name;
            await UserModel.findByIdAndUpdate(req.user._id, { $push: { Files:file  } })
            res.status(200).send({ "status": "Success", "message": "Upload is Completed and a new file is created ","file No: " :file.FileNo });
        }
    }


}

export default FileAndFromController;