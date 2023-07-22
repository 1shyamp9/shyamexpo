import { configDotenv } from 'dotenv';
import express from 'express'
import { userRouter } from './routes/userRouter.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

export const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:['POST','GET','PUT','DELETE'],
    credential:true
}))

app.use('/api/user',userRouter)

configDotenv({ path: './database/config.env' });