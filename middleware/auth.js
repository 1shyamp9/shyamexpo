import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const isAuth = async(req,res,next) => {
    try {
        const {userToken} = req.cookies;
        if(!userToken){
            return res.status(404).json({
                success:false,
                message:"Please Login First",
            })
        }
        const decoded = await jwt.verify(userToken,process.env.JWT_SECRATE);
        req.user = await User.findById(decoded);
        next(); 
       } catch (error) {
        console.log(error);
    }
}