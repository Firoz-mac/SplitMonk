import Split from "../models/Splits.js";

// get how much you owe and you are owed : /api/balance/get
export const getBalance = async (req, res)=>{
    try {
        const userId = req.userId;
        const splits = await Split.find({
            $or :[
                {createdBy: userId},
                {'participants.user': userId}
            ]
        });

        let youOwe = 0;
        let youAreOwed= 0;

        splits.forEach(split=>{
            split.settlements.forEach(s=>{
                if(s.from.toString() === userId.toString()){
                    youOwe+=s.amount
                }

                if(s.to.toString() === userId.toString()){
                    youAreOwed += s.amount;
                }
            });
        });

        return res.status(200).json({
            success:true,
            youOwe,
            youAreOwed
        });


    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
};