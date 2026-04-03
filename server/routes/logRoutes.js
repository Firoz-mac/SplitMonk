import express from 'express';
import { getLogs } from '../controllers/AdminControllers.js';
import authUser from '../middleware/authUser.js';

const logRouter = express.Router();

logRouter.get('/get', authUser, getLogs)

export default logRouter;