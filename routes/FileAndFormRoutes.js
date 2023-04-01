import express from 'express';
const router = express.Router();
import FileAndFormController from '../controllers/FileAndFormController.js';
import upload from '../middlewares/FileUploadMiddleware.js';
import checkUserAuth from '../middlewares/auth-middleware.js';


router.use('/upload',checkUserAuth)
router.post('/upload',upload.single('WrittenApplication'), FileAndFormController.UploadFile)
// router.get(`/file`,FileAndFormController.GetFile)

export default router;