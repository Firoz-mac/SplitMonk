import express from 'express';
import { searchUsers } from '../controllers/searchControllers.js';
import authUser from '../middleware/authUser.js';

const searchRouter = express.Router();

searchRouter.get('/get',authUser, searchUsers);

export default searchRouter;