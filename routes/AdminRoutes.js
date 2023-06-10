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

router.use('/Approve',checkUserAuth);
router.post('/Approve',AdminController.ApproveFile)

router.use('/sendtoPatwari',checkUserAuth);
router.post('/sendtoPatwari',AdminController.SendtoPatwari)

router.use('/sendtoAccounts',checkUserAuth);
router.post('/sendtoAccounts',AdminController.SendtoAccounts)

router.use('/usersToBookAppointment',checkUserAuth);
router.get('/usersToBookAppointment',AdminController.UserstoBookAppointment)

router.use('/BookAppointment',checkUserAuth);
router.post('/BookAppointment',AdminController.BookAppointment)

router.use('/RejectFile',checkUserAuth);
router.post('/RejectFile',AdminController.RejectFile)


export default router