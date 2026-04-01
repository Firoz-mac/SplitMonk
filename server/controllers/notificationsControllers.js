import Notifications from "../models/Notifications.js"

//get notifications : /api/notifications/get
export const getNotifications = async (req, res)=>{
    try {
        const userId = req.userId; 
        const notifications = await Notifications.find({userId: userId}).sort({ createdAt:-1 });
        return res.status(200).json({
            success:true,
            notifications
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}