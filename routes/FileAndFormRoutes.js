import express from 'express';
const router = express.Router();
import FileAndFormController from '../controllers/FileAndFormController.js';
import upload from '../middlewares/FileUploadMiddleware.js';
import checkUserAuth from '../middlewares/auth-middleware.js';


router.use('/upload',checkUserAuth)
router.use('/ApplicationsForm',checkUserAuth)
router.post('/upload',upload, FileAndFormController.UploadFile)


export default router;