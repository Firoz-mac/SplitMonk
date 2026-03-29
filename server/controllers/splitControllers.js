import Split from "../models/Splits.js";

//add split : /api/split/add
export const addSplit = async (req, res) =>{
    try {
        const {title, amount, createdBy, participants} = req.body;

        const formattedParticipants = participants.map((p=>({
            user: p.userId,
            amount: p.amount,
            paid: p.paid || false
        })));

        const settlements = participants.filter(user => user.toString() !== createdBy).map(user =>(
            {
                from: user.user,
                to: createdBy,
                amount: user.amount
            }
        ));

        const data = await Split.create({
            title, amount, createdBy, participants: formattedParticipants, settlements
        });

        return res.status(200).json({
            success:true,
            data
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}