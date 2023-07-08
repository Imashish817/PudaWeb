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
           
            let ApplicationsForm1=[];
            let ApplicationsForm2=[];
            let ApplicationsForm3=[];
            let WrittenApplication=[];
            if(req.files?.ApplicationsForm1!=null){
                for(let i=0; i<req.files?.ApplicationsForm1.length; i++){
                    ApplicationsForm1.push( baseUrl+req.files.ApplicationsForm1[i].blobName);
                }
            }
            


            if(req.files?.ApplicationsForm2!=null){
                for(let i=0; i<req.files?.ApplicationsForm2.length; i++){
                    ApplicationsForm2.push( baseUrl+req.files.ApplicationsForm2[i].blobName);
                }
            }
            

            if(req.files?.ApplicationsForm3!=null){
                for(let i=0; i<req.files?.ApplicationsForm3.length; i++){
                    ApplicationsForm3.push( baseUrl+req.files.ApplicationsForm3[i].blobName);
                }  
            }
            

            if(req.files?.WrittenApplication!=null){
                for(let i=0; i<req.files?.WrittenApplication.length; i++){
                    WrittenApplication.push( baseUrl+req.files.WrittenApplication[i].blobName);
                } 
            }
            
            
            const file={
                FileNo:  Date.now(),
                SignedAplication: WrittenApplication,
                ApplicationsForm1:ApplicationsForm1,
                ApplicationsForm2: ApplicationsForm2,
                ApplicationsForm3: ApplicationsForm3,
                IsAproved: "1",
                ApprovedByops:"false",
                ApprovedBycon:"false",
                ApprovedByacc:"false",
                ApprovedBypat:"false",
            }
            //update in DB with file name;
            await UserModel.findByIdAndUpdate(req.user._id, { $push: { Files:file  } })
            res.status(200).send({ "status": "Success", "message": "Upload is Completed and a new file is created with File No"+ file.FileNo,"file No: " :file.FileNo });
        }
    }


}

export default FileAndFromController;