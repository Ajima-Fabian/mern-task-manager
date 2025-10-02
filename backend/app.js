import express from 'express'
import { configDotenv } from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import route from './routes/contactRoutes.js'
configDotenv()

const app = express()
const dbUrl = process.env.DB_URL_LOCAL
const port = process.env.PORT
startServer()


app.use(cors())
app.use(express.json())
app.use("/api/contact", route)

async function startServer() {
    try {
        await mongoose.connect(dbUrl)
        console.log('connected to the database.')
        app.listen(port, () => {
            console.log(`server running on localhost: ${port}`)
        })
    } catch(err){
        console.log(err)
        process.exit(1)
    }
}