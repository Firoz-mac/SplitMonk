import Split from "../models/Splits.js";
import Expenses from "../models/Expenses.js";
import Notifications from "../models/Notifications.js";
import User from "../models/User.js";
import { io } from "../server.js";
import Log from "../models/Log.js";

//add split : /api/split/add
export const addSplit = async (req, res) =>{
    try {
        const {title, amount, participants, category, creatorAmount} = req.body;
        const createdBy = req.userId;

        if(!participants || participants.length === 0){
            return res.status(400).json({
                success:false,
                message: "Participants are required",
            });
        }

        let formattedParticipants = participants.map((p=>{
            return {
                user: p._id,
                amount: p.amount,
                paid: p.paid || false
            }
        }));

        const isCreatorIncluded = formattedParticipants.some((p)=> p.user.toString() === createdBy.toString());
        if(!isCreatorIncluded){
            formattedParticipants.push({
                user: createdBy,
                amount: creatorAmount,
                paid: true,
                requestStatus: 'accepted',
            })
        }

        const settlements = formattedParticipants.filter((p) => p.user.toString() !== createdBy.toString()).map((p) =>(
            {
                from: p.user,
                to: createdBy,
                amount: p.amount
            }
        ));

        const data = await Split.create({
            title, amount, category, createdBy, participants: formattedParticipants, settlements,
        });

        const createdUser = await User.findById(createdBy);

        const notifications = formattedParticipants.filter(p=>
            p.user.toString() !== createdBy.toString()
        ).map(p=> ({
            userId: p.user,
            splitCreatorId: createdBy,
            splitId: data._id,
            message: `invited you to join the split "${title}" for ₹${p.amount}`,
            type: 'split_request',
            splitType: 'split',
            status:"pending"
        }));

        await Notifications.insertMany(notifications);

        notifications.forEach(notification=>{
            io.to(notification.userId.toString()).emit('new-notification', notification)
        });

        const log = await Log.create({
            userId: req.userId,
            action: "SPLIT_CREATED",
        });

        return res.status(201).json({
            success:true,
            data
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//get splits : /api/split/get
export const getSplits = async (req, res)=>{
    
    try {
        const userId = req.userId;

        const splits = await Split.find({
            $or: [
                { createdBy: userId },
                { "participants.user": userId }
            ]
        })
        .populate("createdBy", "userName email profileImg")
        .populate("participants.user", "userName email profileImg")
        .sort({ createdAt: -1 });

        res.status(200).json({
            success:true,
            splits
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message:error.message
        });
    }
}

//get splits : /api/split/remove
export const removeSplit = async (req, res)=>{
    
    try {
        const splitId = req.params.id;
        const userId = req.userId;

        if(!splitId){
            return res.status(400).json({
                success:false,
                message: 'Split ID is required'
            })
        }

        const split = await Split.findById(splitId);

        if(!split){
            return res.status(404).json({
                success:false,
                message: 'Split not found'
            })
        }

        if(split.createdBy.toString() !== userId.toString()){
            return res.status(403).json({
                success:false,
                message: 'Not authorized'
            })
        }

        await Split.findByIdAndDelete(splitId);

        return res.status(200).json({
            success:true,
            message: 'Split Removed'
        });
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success:false,
            message:error.message
        });

    }
}

//pay split : /api/split/pay
export const paySplit = async (req, res)=>{
    try {
        const {sender, receiver, title, amount, splitId, type} = req.body;
        
        if(!splitId){
            return res.status(400).json({
                success:false,
                message: 'Split ID is required'
            })
        }

        const split = await Split.findById(splitId);

        if(!split){
            return res.status(404).json({
                success:false,
                message: 'Split not found'
            })
        }

        await Split.findByIdAndUpdate(splitId,{
            $set:{
                "participants.$[elem].paid":true
            },
        }, {
            arrayFilters: [{ "elem.user": sender.userId }],
            returnDocument : 'after'
        });

        const updatedSplit = await Split.findOneAndUpdate(
            {
                _id: splitId,
                "settlements.from": sender.userId,
                "settlements.to": receiver.userId
            },
            {
                $inc:{
                    "settlements.$.amount": -Number(amount)
                }
            },
            { returnDocument: "after" }
        );

        await Expenses.create({
            title: title || "Split Payment",
            amount: Number(amount),
            userId: sender.userId,
            paidTo: receiver.userId
        });

        await Split.updateOne(
            {_id: splitId},
            {
                $pull:{
                    settlements:{
                        amount:{$lte:0}
                    }
                }
            }
        );

        const notification = await Notifications.create({
            userId:receiver.userId,
            message: `${sender.userName || "Someone"} paid you ₹${amount} for "${title}" split`,
            splitType: 'payment'
        });

        if(notification){
            io.to(receiver.userId.toString()).emit("new-notification", notification);
        };

        const log = await Log.create({
            userId: sender.userId,
            action: "PAYMENT_DONE",
        });

        return res.status(200).json({
            success:true,
            message:'Payment Updated'
        })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}