import mongoose from "mongoose";
import User from "../models/UserModel.js";

export const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const existingAdmin = await User.findOne({
            email: process.env.ADMIN_EMAIL
        });

        if (existingAdmin) {
            console.log("Admin already exists");
            process.exit(0);
        }

        await User.create({
            name: "Admin",
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
            role: "admin"
        });

        console.log("Admin created successfully");
        process.exit(0);

    } catch (error) {
        console.error("Error creating admin:", error.message);
        process.exit(1);
    }
};
