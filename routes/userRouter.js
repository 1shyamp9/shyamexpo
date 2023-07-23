import express from "express";
import { createUser, deleteUser, updateUser, userLogin, userLogout, userProfile } from "../controller/userController.js";
import { isAuth } from "../middleware/auth.js";

export const userRouter = express.Router();

userRouter.post('/new',createUser);
userRouter.post('/login',userLogin);
userRouter.get('/me',isAuth,userProfile);
userRouter.get('/logout',isAuth,userLogout);
userRouter.get('/delete',isAuth,deleteUser);
userRouter.put('/update',isAuth,updateUser);