import Log from "../models/Log.js";

//getLogs : /api/logs/get
export const getLogs = async (req, res)=>{
    try {
        const userId = req.userId;
        const adminId = process.env.ADMIN_ID;
        if(userId != adminId){
            return res.status(403).json({
                success:false,
                message: 'Not Authorized'
            });
        }

        const logs = await Log.find().sort({ createdAt: -1 });;

        res.status(200).json({
            success:true,
            logs
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}