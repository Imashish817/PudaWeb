 
 
import multer from 'multer'
import path from 'path'

    var UploadFile = async (req,re,next) =>{
    const storage = multer.diskStorage({
        destination: (req,file,cb)=>{
            cb(error,"Image");
        },
        filename: (req,file,cb) =>{
            console.log(file);
            cb(error,Date.now()+ path.extname(file.originalname))
        }
    });

    const upload=multer({storage: storage});
   next();

}
export default UploadFile;
