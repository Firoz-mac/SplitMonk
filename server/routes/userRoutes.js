import express from 'express';
import { isAuth, login, logout, register, updateProfile } from '../controllers/userControllers.js';
import authUser from '../middleware/authUser.js';
import { upload } from '../config/multer.js';

const userRouter=express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/is-auth', authUser, isAuth);
userRouter.put('/update-profile', upload.single('profileImg'), authUser, updateProfile);
userRouter.get('/logout', authUser, logout);

export default userRouter;