import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    action:{
        type:String,
        enum: ["SPLIT_CREATED", "PAYMENT_DONE", "LOGIN", "LOGOUT"],
    },
    createdAt:{
        type:Date,
        default: Date.now,
        expires: 86400
    }
});

const log = mongoose.model.logs || mongoose.model('logs', logSchema);
export default log;
