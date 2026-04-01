import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    message:{
        type:String,
        required: true,
    },
    type:{
        type:String,
        default: "split"
    },
    isRead:{
        type:Boolean,
        default:false
    }

}, {timestamps:true});

const Notifications = mongoose.model.notifications || mongoose.model('notifications', notificationSchema);
export default Notifications;