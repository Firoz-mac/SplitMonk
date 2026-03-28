import Expenses from "../models/Expenses.js";
import mongoose from "mongoose";

//add new expense : /api/expense/add
export const addExpense = async (req, res)=>{
    try {
        let expense = req.body.expense;
        if(!expense){
            return res.status(400).json({
                success:false,
                message: 'Title and Amount are required'
            });
        }

        expense.userId = req.userId;

        const data = await Expenses.create(expense);

        return res.status(201).json({
            success:true,
            message: 'Added new expense',
            data,
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//get all expenses : /api/expense/get
export const getExpenses = async (req, res)=>{
    try {
        let userId = req.userId;
        if(!userId){
            return res.status(401).json({
                success:false,
                message:'Unauthorized'
            });
        }

        const expenses = await Expenses.find({userId}).sort({ createdAt: -1 });
        const total = await Expenses.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        const totalExpenses = total[0]?.total || 0 ;

        return res.status(200).json({
            success:true,
            message: 'fetched all expenses',
            expenses,
            totalExpenses,
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};