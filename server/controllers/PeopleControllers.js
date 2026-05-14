import Peoples from "../models/Peoples.js";

export const getPeople =async (req,res)=>{
    try {
        const loggedUserId = req.userId;

        const peoplesData = await Peoples.find({
            userId: loggedUserId
        })
        .populate("person", "userName profileImg")
        .sort({ lastSplitAt: -1 });

        return res.status(200).json({
            success: true,
            peoplesData
        });

        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
        
    }
    
}