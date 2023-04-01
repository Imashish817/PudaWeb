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
            //update in DB with file name;
            await UserModel.findByIdAndUpdate(req.user._id, { $set: { FilePath: req.file.blobName,URLPath:req.file.url } })
            res.status(200).send({ "status": "Success", "message": "Upload is Completed" });
        }
        
       
    }

}

export default FileAndFromController;