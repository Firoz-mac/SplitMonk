import jwt from 'jsonwebtoken';

const authUser = async (req, res, next)=>{
    
    let token = req.cookies.splitzyToken;

    if(!token) { 
        const authHeader = req.headers.authorization;
        if(authHeader && authHeader.startsWith('Bearer ')){
            token = authHeader.substring(7);
            console.log('Token found in Authorization header');
        }
    }

    if(!token){
        console.log('No token found in cookies or headers');
        return res.json({
            success : false,
            message: 'Not authorized - No token provided'
        });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if(tokenDecode.id){
            req.userId=tokenDecode.id;
            console.log('User authenticated:', tokenDecode.id);
            next();
        }else{
            return res.status(401).json({
                success : false,
                message: 'Not authorized'
            });
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export default authUser;