import express from 'express';
import { addSplit, getSplits, removeSplit } from '../controllers/splitControllers.js';
import authUser from './../middleware/authUser.js';

const splitRouter = express.Router();

splitRouter.post('/add',authUser, addSplit);
splitRouter.get('/get', authUser, getSplits);
splitRouter.delete('/remove/:id', authUser, removeSplit);
export default splitRouter;