import MonthlyLimit from "../models/MonthlyLimit.js";

//add new monthly limit : /api/limit/add
export const addLimit = async (req, res)=>{
    try {
        const userId = req.userId;
        const {category, limit} = req.body;

        if(!category || !limit){
            return res.status(400).json({
                success: false,
                message: "missing category or limit"
            })
        }

        const data = await MonthlyLimit.create({category, limit, userId});

        return res.status(201).json({
            success:true,
            message:"New Limit Added",
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//get user monthly limits : /api/limit/get
export const getLimits = async (req, res)=>{
    try {
        const userId = req.userId;
        const now = new Date();
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

        const data = await MonthlyLimit.find({userId, month: monthStart}).sort({ createdAt: -1 });

        return res.status(200).json({
            success:true,
            data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Server Error"
        })
    }
};

//delete monthly limit : /api/limit/remove
export const removeLimit = async (req, res)=>{
    try {
        const userId = req.userId;
        const limitId = req.params.id;
        
        const data = await MonthlyLimit.findOneAndDelete({
            _id:limitId,
            userId
        });

        if(!data){
            return res.status(404).json({
                success:false,
                message: "item not found"
            })
        }

        return res.status(200).json({
            success:true,
            message: "Deleted"
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message: error.message
        });
    }
}