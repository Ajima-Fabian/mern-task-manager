import Task from "../models/TaskModel.js";
import mongoose from "mongoose";


export const createTask = async (req, res) => {
    try{
        const {title, description, status, priority} = req.body
        const task = await Task.create({
            title, description, status, priority, user: req.user._id
        })

        res.status(201).json({
            success: true,
            task
        })
    }catch(err){
        console.error("Unable to create  task", err)
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


export const getTasks = async (req, res) => {
    try{
        let query = {}

        if(req.user.role === "user"){
            query.user = req.user._id
        }

        const tasks = await Task.find(query).sort({createdAt: -1}).populate("user", "name email")

        res.status(200).json({
            success: true,
            count:  tasks.length,
            tasks
        })
    } catch(err){
        console.error("Unable to fetch tasks", err)

        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


export const getTask = async (req, res) => {
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({
                success: false,
                message: "Invalid task ID"
            })
        }

        const task = await Task.findById(req.params.id)

        if(!task){
            return res.status(404).json({
                success: false,
                message: "Task not found"
            })
        }

        if(task.user.toString() !== req.user._id.toString() && req.user.role !== "admin"){
            return res.status(403).json({
                success: false,
                message: "Not authorized"
            })
        }

        res.status(200).json({
            success: true,
            task
        })
    }catch(err){
        console.error("Error fetching task")

        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}



export const updateTask = async (req, res) => {
    try{
        const task = await Task.findById(req.params.id)

        if(!task){
            return res.status(404).json({
                success: false,
                message: "Task not found"
            })
        }

        
        if(task.user.toString() !== req.user._id.toString() && req.user.role !== "admin"){
            return res.status(403).json({
                success: false,
                message: "Not authorized"
            })
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id, req.body, {
                new: true, runValidators: true
            }
        )

        res.status(200).json({
            success: true,
            task: updatedTask
        })

    } catch(err){
        console.error("Unable to update task")

        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


export const deleteTask = async(req, res) => {
    try{
        const task = await Task.findById(req.params.id)

        if(!task){
            return res.status(404).json({
                success: false,
                message: "Task not found"
            })
        }

        if(task.user.toString() !== req.user._id.toString() && req.user.role !== "admin"){
            return res.status(403).json({
                success: false,
                message: "Not authorized"
            })
        }

        await task.deleteOne()

        res.status(200).json({
            success: true,
            message: "Task deleted"
        })
        
    } catch(err){
        console.error("Unable to delete task")

        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}