import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

//register user : /api/user/register
export const register = async (req, res)=>{
    try {
        const {email , userName, password} = req.body;

        //checking missing fields
        const missingFields = [];
        if (!userName?.trim()) missingFields.push("name");
        if (!email?.trim()) missingFields.push("email");
        if (!password?.trim()) missingFields.push("password");

        if(missingFields.length>0){
            return res.json({
                success:false,
                message: `Missing Details: ${missingFields.join(", ")}`
            });
        }

        const isUserAlreadyExisting = await User.findOne({email});

        if(isUserAlreadyExisting){
            return res.json({
                success : false,
                message : 'Email Already Exists'
            })
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({email, userName, password : hashedPassword, profileImg:''})

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '7d'})

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7*24*60*60*1000, //cookie expiration time
        })

        if(user && token){
            return res.json({
                success : true,
                user: {email:user.email, userName: user.userName}
            })
        }

    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        })
    }
}

//login user : /api/user/login
export const login = async (req, res)=>{
    try {
        const {email, password} = req.body;

        //checking missing fields
        const missingFields = [];

        if (!email?.trim()) missingFields.push("email");
        if (!password?.trim()) missingFields.push("email");

        if(missingFields.length>0){
            return res.json({
                success:false,
                message: `Missing Details: ${missingFields.join(", ")}`
            });
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({
                success : false,
                message: 'invalid Email or Password'
            })
        }

        const isPassMatch = await bcrypt.compare(password, user.password);

        if(!isPassMatch){
            return res.status(401).json({
                success : false,
                message: 'invalid Email or Password'
            })
        }

        //creating token
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '7d'})

        res.cookie('userToken', token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7*24*60*60*1000,
        })

        return res.status(200).json({
            success : true,
            user: {email:user.email, name: user.name}
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: error.message
        })
        
    }
}
