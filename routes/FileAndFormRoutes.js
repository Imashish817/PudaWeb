import { error } from 'console';
import express from 'express';
const router = express.Router();
import multer from  'multer'
import path from 'path'
import FileAndFormController from '../controllers/FileAndFormController.js';

import checkUserAuth from '../middlewares/auth-middleware.js';
const storage = multer.diskStorage({
            destination: (req,file,cb)=>{
                cb(null,"./Image");
            },
            filename: (req,file,cb) =>{
                console.log(file);
                cb(null,Date.now()+ path.extname(file.originalname))
            },
        });
const  fileFilter =(req, file, cb)=>{
            if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' ||file.mimetype === 'image/jpg')
            {
                cb(null, true)
            }
            else{
                cb(null, false)
            }
                     
          }
const upload = multer({ storage:storage ,limits: {
    fieldSize: 1024*1025*5},
    fileFilter: fileFilter,
 })

router.use('/upload',checkUserAuth)
router.post('/upload',upload.single('WrittenApplication'), FileAndFormController.UploadFile)

export default router