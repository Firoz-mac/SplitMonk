import jwt from 'jsonwebtoken';

const authUser = async (req, res, next)=>{
    const token = req.cookies.userToken;

    if(!token){
        return res.status(401).json({
            success : false,
            message: 'Not authorized'
        });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if(tokenDecode.id){
            req.userId=tokenDecode.id
        }else{
            return res.status(400).json({
                success : false,
                message: 'Not authorized'
            });
        }

        next();

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export default authUser;