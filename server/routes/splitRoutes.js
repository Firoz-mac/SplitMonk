import express from 'express';
import { addSplit } from '../controllers/splitControllers.js';

const splitRouter = express.Router();

splitRouter.post('/add', addSplit);

export default splitRouter;