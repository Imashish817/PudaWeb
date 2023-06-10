import UserModel from '../models/User.js'
class FileAndFromController{
    
    static UploadFile = async (req,res) =>{
        const baseUrl=process.env.AZURE_STORAGE_BASE_URL;
        if(!req.files)
        {
            res.status(400).send({ "status": "failed", "message": "Image is Inapporiate" })
        }
        else{
            console.log(req.files);
            console.log(req.user);
            const file={
                FileNo:  Date.now(),
                SignedAplication: baseUrl+req.files.WrittenApplication[0].blobName,
                ApplicationsForm1: baseUrl+req.files.ApplicationsForm1[0].blobName,
                ApplicationsForm2: baseUrl+req.files.ApplicationsForm2[0].blobName,
                IsAproved: "1",
                ApprovedByops:"false",
                ApprovedBycon:"false",
                ApprovedByacc:"false",
                ApprovedBypat:"false",
                //IsAproved=1 --> underprogress
                //IsAproved=0 --> approved
                //IsAproved=2 --> rejected  
            }
            //update in DB with file name;
            await UserModel.findByIdAndUpdate(req.user._id, { $push: { Files:file  } })
            res.status(200).send({ "status": "Success", "message": "Upload is Completed and a new file is created with File No"+ file.FileNo,"file No: " :file.FileNo });
        }
    }


}

export default FileAndFromController;