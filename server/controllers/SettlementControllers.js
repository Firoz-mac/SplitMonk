import Notifications from "../models/Notifications.js";
import Peoples from "../models/Peoples.js";
import Split from "../models/Splits.js";



// settlement and notification status : /api/settlement/update

export const handleSplitRequestAndSettlement = async (req, res)=>{
    try {
        const { value, notificationId, splitId } = req.body;
        const userId = req.userId
        console.log(value, notificationId, splitId);


        //handle notification

        if(!notificationId || !value || !splitId){
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
                _id: notificationId,
                userId,
                type: 'split_request',
                status: 'pending',
            },
            {
                status: value,
                isRead: true,
            },
            { returnDocument: 'after' }
        )

        if(!notification){
            return res.status(404).json({
                success: false,
                message: 'Notification not found',
            })
        }

        const split = await Split.findOneAndUpdate(
            {
                _id:splitId,
                'participants.user':userId,
            },
            {
                $set:{
                    'participants.$.requestStatus': value,
                },
            },
            { returnDocument: 'after' }
        )

        if(!split){
            return res.status(404).json({
                success: false,
                message: 'Something went wrong',
            })
        }

        //handle settlement

        if(value === 'accepted'){
            
            const requestedUser = split.participants.find(
                (participant)=> participant.user.toString() === userId.toString()
            )

            const createrId = split.createdBy.toString();
            const amount = requestedUser.amount;

            const settlement = await Split.findByIdAndUpdate(
                splitId,
                {
                    $push: {
                        settlements: {
                            from: userId,
                            to: createrId,
                            amount
                        }
                    }
                },
                { returnDocument: 'after' }
            );

            if(!settlement){
                return res.status(404).json({
                    success: false,
                    message: 'Something went wrong',
                })
            }

            //creator side

            await Peoples.findOneAndUpdate(
                {
                    userId: createrId,
                    person: userId
                },
                {
                    $inc:{
                        totalSplits: 1,
                        totalBalance: amount
                    },
                    $set:{
                        lastSplitAt: Date.now()
                    }
                },
                {
                    upsert: true,
                    returnDocument: "after"
                }
            );

            // Participant side

            await Peoples.findOneAndUpdate(
                {
                    userId: userId,
                    person: createrId
                },
                {
                    $inc:{
                        totalSplits: 1,
                        totalBalance: -amount
                    },
                    $set:{
                        lastSplitAt: new Date()
                    }
                },
                {
                    upsert: true,
                    returnDocument: "after"
                }
            )

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