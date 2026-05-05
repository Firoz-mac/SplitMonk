import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    splitCreatorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    splitId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "splits",
    },
    message:{
        type:String,
        required: true,
    },
    type:{
        type: String,
        enum: ["split_request", "payment", "info"],
        default: "info",
    },
    status:{
        type: String,
        enum: ["pending", "accepted", "declined", "none"],
        default: "none",
    },
    isRead:{
        type:Boolean,
        default:false
    }

}, {timestamps:true});

const Notifications = mongoose.models.notifications || mongoose.model('notifications', notificationSchema);
export default Notifications;