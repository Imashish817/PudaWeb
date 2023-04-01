import express from 'express';
import AdminController from '../controllers/AdminController.js';
const router = express.Router();
import checkUserAuth from '../middlewares/auth-middleware.js';

router.use('/GetUnverifiedUsers',checkUserAuth);
router.get('/GetUnverifiedUsers',AdminController.GetUnverifiedUsers)

export default router