import { error } from 'console';
import express from 'express';
const router = express.Router();
import multer from  'multer'
import path from 'path'
import FileAndFormController from '../controllers/FileAndFormController.js';
// import * as multer from 'multer';
import { MulterAzureStorage } from 'multer-azure-blob-storage';

import checkUserAuth from '../middlewares/auth-middleware.js';

const resolveBlobName = (req, file) => {
    return new Promise((resolve, reject) => {
        const blobName = Date.now()+ path.extname(file.originalname);
        resolve(blobName);
    });
};
const azureStorage = new MulterAzureStorage({
    connectionString: "DefaultEndpointsProtocol=https;AccountName=imagesforpuda;AccountKey=nkEMn1y34Dwm2PT06b2EZOXQw27mf5p5NfOdg5WESL+8E3dAa/1wOMwQYLzTCxoiqriPr4pKLfY1+AStXpiyYg==;EndpointSuffix=core.windows.net",
    accessKey: "nkEMn1y34Dwm2PT06b2EZOXQw27mf5p5NfOdg5WESL+8E3dAa/1wOMwQYLzTCxoiqriPr4pKLfY1+AStXpiyYg==",
    accountName: "imagesforpuda",
    containerName: "documents",
    blobName: resolveBlobName ,
    // metadata: resolveMetadata,
    // contentSettings: resolveContentSettings,
    containerAccessLevel: 'blob',
    urlExpirationTime: 60
   
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
const upload = multer({ storage:azureStorage ,limits: {
    fieldSize: 1024*1025*5},
    fileFilter: fileFilter,
 })

router.use('/upload',checkUserAuth)
router.post('/upload',upload.single('WrittenApplication'), FileAndFormController.UploadFile)

export default router