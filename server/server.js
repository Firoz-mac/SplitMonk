import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import userRouter from './routes/userRoutes.js';

const app=express();
const port = 4000;
await connectDB();

//allow origins
const allowedOrigins=['http://localhost:5173']

//middleware config
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials:true}));

app.get('/',(req,res)=>{
    res.send('api is working');
});

app.use('/api/user', userRouter);

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`)
})
