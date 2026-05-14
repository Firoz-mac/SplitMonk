import express from 'express';
import { getPeople } from '../controllers/PeopleControllers.js';
import authUser from '../middleware/authUser.js';

const peopleRouter = express.Router();

peopleRouter.get('/get',authUser, getPeople);

export default peopleRouter;