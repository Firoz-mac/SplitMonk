import mongoose from "mongoose";

const splitSchema = new mongoose.Schema({
    createdBy:{
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
    splitType:{
        type: String,
        enum: ['equal', 'unequal'],
        default: 'equal'
    },
    participants: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'users'
            },
            amount:{
                type: Number,
                required:true
            },
            paid:{
                type: Boolean,
                default: false
            }
        }
    ],
    settlements:[
        {
            from:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            },
            to:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            },
            amount: Number
        }
    ]
},{timestamps:true});

const Split = mongoose.models.splits || mongoose.model('splits', splitSchema);

export default Split;