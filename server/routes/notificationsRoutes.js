import express from 'express';
import { getNotifications, markNotificationsAsRead, updateSplitReqStatus } from '../controllers/notificationsControllers.js';
import authUser from '../middleware/authUser.js';

const notificationsRouter = express.Router();

notificationsRouter.get('/get', authUser, getNotifications);
notificationsRouter.post('/read', authUser, markNotificationsAsRead);
notificationsRouter.post('/statusUpdate', authUser, updateSplitReqStatus);

export default notificationsRouter;