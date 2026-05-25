import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DB_URL_LOCAL)
        console.log("MongoDB connected successfully")
    }catch (err){
        console.error("Database connection failed:", err.message)
        process.exit(1)
    }
}

export default connectDB