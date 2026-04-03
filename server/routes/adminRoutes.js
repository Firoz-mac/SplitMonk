import express from 'express';
import { getLogs } from '../controllers/AdminControllers.js';
import authUser from '../middleware/authUser.js';

const adminRouter = express.Router();

adminRouter.get('/get', authUser, getLogs)

export default adminRouter;