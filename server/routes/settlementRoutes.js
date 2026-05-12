import express from 'express';
import { handleSplitRequestAndSettlement } from '../controllers/SettlementControllers.js';
import authUser from '../middleware/authUser.js';

const settlementRouter = express.Router();

settlementRouter.post('/update', authUser, handleSplitRequestAndSettlement);

export default settlementRouter;