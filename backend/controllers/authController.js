import User from "../models/UserModel.js";
import jwt from 'jsonwebtoken'

const generateToken = (user) => {
    return jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
}

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({
                status: false,
                error: 'All fields  are required'
            })
        }
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({
                status: false,
                error: 'Email already registered'
            })
        }

        const user = await User.create({
            name, email, password
        })
        const token = generateToken(user)

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })

    } catch (err) {
        console.error('REGISTER ERROR:', err)
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                status: false,
                error: 'All fields  are required'
            })
        }

        const user = await User.findOne({email}).select('+password')

        if(!user){
            return res.status(401).json({
                success: false,
                error: 'Invalid email or password'
            })
        }

        const isMatched = await user.comparePassword(password)

        if(!isMatched){
            return  res.status(401).json({
                success: false,
                error: 'Invalid email or password'
            })
        }

        const token = generateToken(user)

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })


    } catch (err) {
        console.error('LOGIN ERROR:', err)
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}


export const getUser = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password')

        res.status(200).json({
            success: true,
            user
        })
    }catch(err){
        console.error('GET USER ERROR:', err)
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}