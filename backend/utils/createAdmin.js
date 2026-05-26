import mongoose from "mongoose";
import User from "../models/UserModel.js";
import dotenv from "dotenv";

dotenv.config();

const createAdmin = async () => {
    try {
        // use production-safe env
        await mongoose.connect(process.env.MONGO_URI);

        const existingAdmin = await User.findOne({ email: "admin@gmail.com" });

        if (existingAdmin) {
            console.log("Admin already exists");
            process.exit(0);
        }

        await User.create({
            name: "Admin",
            email: "admin@gmail.com",
            password: "admin1234",
            role: "admin"
        });

        console.log("Admin created successfully");
        process.exit(0);

    } catch (error) {
        console.error("Error creating admin:", error.message);
        process.exit(1);
    }
};

createAdmin();
