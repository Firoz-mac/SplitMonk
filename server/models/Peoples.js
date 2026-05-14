import mongoose from "mongoose";

const peoplesSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    person:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    totalBalance:{
        type: Number,
        default: 0
    },
    totalSplits:{
        type: Number,
        default: 0
    },
    lastSplitAt:{
        type: Date,
        default: Date.now
    }

}, {timestamps:true});

peoplesSchema.index({ userId: 1, person: 1 }, { unique: true });

const Peoples = mongoose.models.Peoples || mongoose.model('Peoples', peoplesSchema);
export default Peoples;