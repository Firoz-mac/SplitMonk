import User from "../models/User.js";
import mongoose from "mongoose";

//search users : /api/search/get
export const searchUsers = async (req, res) => {
    try {
        let { query } = req.query;
        const userId = req.userId;
        
        query = query.trim();

        const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        const data = await User.find({ userName: { $regex: safeQuery, $options: 'i' }, _id: { $ne: new mongoose.Types.ObjectId(userId) } }).select('userName email profileImg');
        return res.status(200).json({
            success: true,
            data
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}