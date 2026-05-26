import dotenv from "dotenv"
import app from "./app.js"
import connectDB from "./config/db.js"
import {createAdmin} from "./utils/createAdmin.js"

dotenv.config()
const PORT = process.env.PORT || 5000

const startServer = async () => {
    try{
        await connectDB()
        await createAdmin()
        app.listen(PORT,() => {
            console.log(`Server running on port: ${PORT}`)
        })
    }catch (err){
        console.error(err.message)
        process.exit(1)
    }
}

startServer()
