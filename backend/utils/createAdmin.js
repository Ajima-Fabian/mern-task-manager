import mongoose from "mongoose";
import User from "../models/UserModel.js";
import dotenv from 'dotenv'


dotenv.config()

const createAdmin = async () => {
    try{
        await mongoose.connect(process.env.DB_URL_LOCAL)

        const existingAdmin = await User.findOne({email: "admin@gmail.com"})

        if(existingAdmin){
            console.error("Admin already exists")
        }

        await User.create({
            name: "Admin",
            email: "admin@gmail.com",
            password: 'admin1234',
            role: "admin"
        })

        console.log("Admin created")
    } catch(error){
        console.log("Error creating admin")
    }

    process.exit()
}


createAdmin()