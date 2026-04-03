import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import userRouter from './routes/userRoutes.js';
import connectCloudinary from './config/cloudinary.js';
import expensesRouter from './routes/expensesRoutes.js';
import searchRouter from './routes/searchRoutes.js';
import splitRouter from './routes/splitRoutes.js';
import balanceRouter from './routes/balanceRoutes.js';
import notificationsRouter from './routes/notificationsRoutes.js';
import http from 'http';
import { Server } from 'socket.io';
import logRouter from './routes/logRoutes.js';

const app=express();
const port = process.env.PORT || 4000;

await connectDB();
await connectCloudinary()

//allow origins
const allowedOrigins=['http://localhost:5173', 'http://127.0.0.1:5173', 'https://splitzy-three.vercel.app/']

//middleware config
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true
}));


const server = http.createServer(app);
//socket.io setup
const io = new Server(server, {
    cors:{
        origin: allowedOrigins,
        credentials:true
    }
});

io.on('connection', (socket)=>{
    console.log("User connected:", socket.id);

    //join room
    socket.on('join', (userId)=>{
        socket.join(userId);
        console.log('Joined Room:', userId)
    });

    socket.on('disconnect', ()=>{
        console.log("User disconnected:", socket.id);
    });
});

export {io};

app.get('/',(req,res)=>{
    res.send('api is working');
});

app.use('/api/user', userRouter);
app.use('/api/expense', expensesRouter);
app.use('/api/search', searchRouter);
app.use('/api/split', splitRouter);
app.use('/api/balance', balanceRouter);
app.use('/api/notifications', notificationsRouter);
app.use('/api/logs', logRouter);

server.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`)
});