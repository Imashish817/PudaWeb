import express from 'express';
const router = express.Router();
import FileAndFormController from '../controllers/FileAndFormController.js';
import upload from '../middlewares/FileUploadMiddleware.js';
import checkUserAuth from '../middlewares/auth-middleware.js';


router.use('/upload',checkUserAuth)
router.use('/ApplicationsForm',checkUserAuth)
router.post('/upload',upload.single('WrittenApplication'), FileAndFormController.UploadFile)
router.post('/ApplicationsForm1',upload.single('ApplicationsForm1'), FileAndFormController.UploadApplicationsForm1)
router.post('/ApplicationsForm2',upload.single('ApplicationsForm2'), FileAndFormController.UploadApplicationsForm2)
router.post('/ApplicationsForm3',upload.single('ApplicationsForm3'), FileAndFormController.UploadApplicationsForm3)
// router.get(`/file`,FileAndFormController.GetFile)

export default router;