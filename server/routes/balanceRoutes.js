import express from 'express';
import { getBalance } from '../controllers/getBalance.js';
import authUser from '../middleware/authUser.js';

const balanceRouter = express.Router();

balanceRouter.get('/get', authUser, getBalance);

export default balanceRouter;