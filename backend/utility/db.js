import mongoose from "mongoose";

const main = async()=>{
    const Mongo_url = process.env.MONGO_URL;
    try{
        await mongoose.connect(Mongo_url);
        console.log("Connected to MongoDB");
    }catch(err){
        console.log(err);
    }
}

export default main;