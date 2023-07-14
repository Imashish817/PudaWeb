import multer from  'multer'
import path from 'path'
import { MulterAzureStorage } from 'multer-azure-blob-storage';
const resolveBlobName = (req, file) => {
    return new Promise((resolve, reject) => {
        const blobName = Date.now()+ file.originalname;
        resolve(blobName);
    });
};
  const accountName=process.env.AZURE_ACCOUNT_NAME;
const accessKey=process.env.AZURE_ACCESS_KEY;
const accountname=process.env.AZURE_ACCOUNT_NAME;
const containerName=process.env.AZURE_CONTAINER_NAME;

  const azureStorage = new MulterAzureStorage({
    connectionString:`DefaultEndpointsProtocol=https;AccountName=${accountName};AccountKey=${accessKey};EndpointSuffix=core.windows.net`,
    accessKey: accessKey,
    accountName: accountname,
    containerName: containerName,
    blobName: resolveBlobName ,
    containerAccessLevel: 'blob',
    urlExpirationTime: 60
   
});

const  fileFilter =(req, file, cb)=>{
        //console.log(file);
            if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' ||file.mimetype === 'image/jpg' ||file.mimetype === 'application/pdf')
            {
                cb(null, true)
            }
            else{
                cb(null, false)
            }       
          }

const upload = multer({ storage:azureStorage ,limits: {
    fieldSize: 1024*1025*2},
    fileFilter: fileFilter,
 }).fields(
  [
      {
          name:'WrittenApplication',
          maxCount:100
      },
      {
          name: 'ApplicationsForm1', maxCount:100
      },
      {
          name: 'ApplicationsForm2', maxCount:100
      },
      {
        name: 'ApplicationsForm3', maxCount:100
    }
  ]
);

export default upload;
