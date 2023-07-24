import { configDotenv } from 'dotenv';
import express from 'express'
import { userRouter } from './routes/userRouter.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

export const app = express();
app.use(express.json());
app.use(cookieParser())
// app.use(cors({
//     origin:[process.env.FRONTEND_URL],
//     methods:["GET","POST","PUT","DELETE"],
//     credentials:true,
// }))
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}))
app.use('/user',userRouter)

configDotenv({ path: './database/config.env' });

app.get('/',(req,res)=>{
    res.send("Nice Api is Working...")
})