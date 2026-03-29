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
            status:{
                type: Boolean,
                default: false
            }
        }
    ]
},{timestamps:true});

const Split = mongoose.models.splits || mongoose.model('splits', splitSchema);

export default Split;