import express from 'express';
import {  approveUser, denyUser, getPendingRequests, login, Prof_Data, Registration, Teacher, Timetable, verifyUser, } from '../controllers/controller.js';

const router = express.Router();

router.post('/register',Registration);
router.post('/login',login);
router.get('/timetable',Timetable);
router.get('/prof',Prof_Data);
router.post('/verify',verifyUser);
router.get('/requests',getPendingRequests)
router.post('/approve',approveUser);
router.post('/denyuser',denyUser);
router.get('/teacher',Teacher);


export default router;