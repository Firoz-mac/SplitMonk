import Split from "../models/Splits.js";

//add split : /api/split/add
export const addSplit = async (req, res) =>{
    try {
        const {title, amount, participants} = req.body;
        const createdBy = req.userId;

        if(!participants || participants.length === 0){
            return res.status(400).json({
                success:false,
                message: "Participants are required",
            });
        }

        let formattedParticipants = participants.map((p=>({
            user: p.userId,
            amount: p.amount,
            paid: p.paid || false
        })));

        const isCreatorIncluded = formattedParticipants.some((p)=> p.user.toString() === createdBy.toString());
        if(!isCreatorIncluded){
            formattedParticipants.push({
                user: createdBy,
                amount: 0,
                paid: true,
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
            title, amount, createdBy, participants: formattedParticipants, settlements,
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
        const {sender, receiver, title, amount, splitId} = req.body;
        
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
                    "settlements.to": receiver.userId
                }
            },
            { returnDocument: "after" }
        );

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