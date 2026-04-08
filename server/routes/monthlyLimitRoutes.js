import express from 'express';
import { addLimit, getLimits, removeLimit } from '../controllers/MonthlyLimitControllers.js';
import authUser from '../middleware/authUser.js';

const LimitRouter = express.Router();

LimitRouter.post('/add', authUser, addLimit);
LimitRouter.get('/get', authUser, getLimits);
LimitRouter.delete('/remove/:id', authUser, removeLimit);

export default LimitRouter;