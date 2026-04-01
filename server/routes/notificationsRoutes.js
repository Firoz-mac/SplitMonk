import express from 'express';
import { getNotifications } from '../controllers/notificationsControllers.js';
import authUser from '../middleware/authUser.js';

const notificationsRouter = express.Router();

notificationsRouter.get('/get', authUser, getNotifications);

export default notificationsRouter;