import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    }, 
    email:{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    photo:{
        type:String,
        require:true
    },
    createdAt:{
        type:Date,
        require: new Date(Date.now())
    }
});

export const User = new mongoose.model('User',userSchema);