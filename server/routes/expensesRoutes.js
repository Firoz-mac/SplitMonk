import express from 'express';
import { addExpense, getExpenses } from '../controllers/expenseControllers.js';
import authUser from '../middleware/authUser.js';

const expensesRouter = express.Router();

expensesRouter.post('/add',authUser, addExpense);
expensesRouter.get('/get', authUser, getExpenses);

export default expensesRouter;