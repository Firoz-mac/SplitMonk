import express from 'express';
import { getNotifications, markNotificationsAsRead } from '../controllers/notificationsControllers.js';
import authUser from '../middleware/authUser.js';

const notificationsRouter = express.Router();

notificationsRouter.get('/get', authUser, getNotifications);
notificationsRouter.post('/read', authUser, markNotificationsAsRead);

export default notificationsRouter;