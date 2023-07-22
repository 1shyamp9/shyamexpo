import mongoose from "mongoose";

export const Database = mongoose.connect(process.env.MONGO_URI,{
    dbName : "ShyamExpo"
}).then((c)=>{console.log(`Connected to Database ${c.connection.host}`)}).catch((e)=>{
    console.log(e);
})