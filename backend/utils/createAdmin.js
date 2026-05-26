import User from "../models/UserModel.js";

export const createAdmin = async () => {
    try {
        const existingAdmin = await User.findOne({
            email: process.env.ADMIN_EMAIL
        });

        if (existingAdmin) {
            console.log("Admin already exists");
            return;
        }

        await User.create({
            name: "Admin",
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
            role: "admin"
        });

        console.log("Admin created successfully");

    } catch (error) {
        console.error("Error creating admin:", error.message);
    }
};
