import Notifications from "../models/Notifications.js"

//get notifications : /api/notifications/get
export const getNotifications = async (req, res)=>{
    try {
        const userId = req.userId; 

        const notifications = await Notifications.find({userId: userId})
            .populate("splitCreatorId", "userName profileImg")
            .sort({ createdAt:-1 });

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

//mark read notification : /api/notifications/read
export const markNotificationsAsRead = async (req, res)=>{
    try {
        const userId = req.userId;
        await Notifications.updateMany(
            {userId: userId, isRead: false},
            {$set: {isRead: true}}
        );

        return res.status(200).json({
            success:true,
            message:"Notifications marked as read"
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}

//handle Request Status for Spli requests : /api/notifications/statusUpdate

export const updateSplitReqStatus = async (req, res)=>{
    try {
        const { id, value } = req.body;
        const userId = req.userId

        if(!id || !value){
            return res.status(400).json({
                success: false,
                message: 'Invalid Action',
            })
        }

        if(!['accepted', 'declined'].includes(value)){
            return res.status(400).json({
                success: false,
                message: 'Invalid Action',
            })
        }

        const notification = await Notifications.findByIdAndUpdate(
            {
                _id: id,
                userId,
                type: 'split_request',
                status: 'pending',
            },
            {
                status: value,
                isRead: true,
            },
            { new: true }
        )

        if(!notification){
            return res.status(404).json({
                success: false,
                message: 'Notification not found',
            })
        }

        return res.status(200).json({
            success: true,
            message:`Split request ${value}`
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}