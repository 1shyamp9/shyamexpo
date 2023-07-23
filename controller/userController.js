import { User } from "../models/userModel.js"
import bcrypt from 'bcrypt'
import { createCookie } from "../utils/feture.js";

export const createUser = async (req, res) => {
    try {
        const { name, email, address, password} = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(404).json({
                success: false,
                message: "User Already Exists",
            })
        }
        const hashPass = await bcrypt.hash(password, 10)
        user = await User.create({ name, email, address, password: hashPass});
        res.status(201).json({
            success: true,
            message: `Created Successfully Welcome ${user.name}`,
            user,
        })
    } catch (error) {
        console.log(error);
    }
}
export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Email and Password Incurrect",
            })
        }
        createCookie(res, user, `Login Successfully Welcome ${user.name}`);
    } catch (error) {
        console.log(error);
    }
}
export const userProfile = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user,
        })
    } catch (error) {
        console.log(error);
    }
}
export const userLogout = async (req, res) => {
    try {
        res.status(200).cookie('userToken', '', {
            httpOnly: false,
            expire: Date.now(),
            sameSite: process.env.NODE_ENV === 'Development' ? 'lax' : 'none',
            secure: process.env.NODE_ENV === 'Development' ? false : true,
        }).json({
            success: true,
            message: "Logout Successfully"
        })
    } catch (error) {
        console.log(error);
    }
}
export const deleteUser = async (req, res) => {
    try {
        const userId = req.user
        const user = await User.findById(userId);
        user.deleteOne();
        res.status(200).cookie('userToken', '', {
            httpOnly: false,
            expire: Date.now(),
            sameSite: process.env.NODE_ENV === 'Development' ? 'lax' : 'none',
            secure: process.env.NODE_ENV === 'Development' ? false : true,
        }).json({
            success: true,
            message: "User Deleted Permanently",
        })
    } catch (error) {
        console.log(error);
    }
}
export const updateUser = async (req, res) => {
    try {
        const { name, email, address} = req.body;
        const userId = req.user
        const user = await User.findByIdAndUpdate(userId, { $set: { name, email, address } });
        res.status(200).json({
            success: true,
            message: "User Updated Successfully",
            user,
        })
    } catch (error) {
        console.log(error);
    }
}