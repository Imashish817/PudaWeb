import express from 'express';
import AdminController from '../controllers/AdminController.js';
const router = express.Router();
import checkUserAuth from '../middlewares/auth-middleware.js';

router.use('/GetUnverifiedUsersForOps',checkUserAuth);
router.get('/GetUnverifiedUsersForOps',AdminController.GetUnverifiedUsersForOps)

router.use('/GetUnverifiedUsersForCon',checkUserAuth);
router.get('/GetUnverifiedUsersForCon',AdminController.GetUnverifiedUsersForCon)

router.use('/GetUnverifiedUsersForPat',checkUserAuth);
router.get('/GetUnverifiedUsersForPat',AdminController.GetUnverifiedUsersForPat)

router.use('/GetUnverifiedUsersForAcc',checkUserAuth);
router.get('/GetUnverifiedUsersForAcc',AdminController.GetUnverifiedUsersForAcc)
export default router