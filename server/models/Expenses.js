import mongoose from "mongoose";

const expensesSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    title:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required:true
    },
    category:{
        type: String,
        required: true
    },
    paidTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
}, {timestamps:true});

const Expenses = mongoose.models.expenses || mongoose.model('expenses', expensesSchema);
export default Expenses;