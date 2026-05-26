import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import helmet from "helmet"
import authRoutes from './routes/authRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.disable("x-powered-by")
app.use(morgan("dev"))
app.use(helmet())
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(express.urlencoded({extended: true}))

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/tasks', taskRoutes)

app.get("/", (req, res) => {
    res.json({ message: "API running 🚀" });
});

app.get("/health", (req,res) => {
    res.status(200).json({
        status: "OK",
        uptime: process.uptime()
    })
})

app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: "Route not found"
    })
})

export default app
