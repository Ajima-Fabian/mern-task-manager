import mongoose, { Mongoose } from "mongoose"
import Contact from "../models/contactModel.js"

export const add_controller = async (req, res) => {
    const { firstname, middlename, surname, phonenumber, address } = req.body

    if (!firstname || !middlename || !surname || !phonenumber || !address) {
        return res.status(400).json({ error: 'All fields are required!' })
    }

    try {
        const newContact = await Contact.create({ firstname, middlename, surname, phonenumber, address })
        res.status(201).json(newContact)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Something went wrong!' })
    }
}

export const fetchContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 })
        res.status(200).json(contacts)
    } catch (err) {
        res.status(401).json({ error: "Unabble to handle request" })
    }
}

export const deleteContact = async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(401).json({ error: "You must provide an id!" })
    }

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid Object Id" })
    }

    try {
        const deletedContact = await Contact.findByIdAndDelete(id)

        if (!deletedContact) {
            return res.status(400).json({ error: "Contact does not exist" })
        }

        res.status(200).json({ message: "Contact removed successfully" })

    } catch (err) {
        res.status(500).json({ error: "Something went wrong!" })
    }
}

export const updateContact = async (req, res) => {
    const { id } = req.params
    const updates = req.body

    if (!id) {
        return res.status(400).json({ error: "Request id not found!" })
    }

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ error: "Object id is invalid" })
    }

    try {
        const updatedContact = await Contact.findByIdAndUpdate(id, { $set: updates }, { new: true, runValidators: true })

        if (!updatedContact) {
            return res.status(400).json({ error: "No contact found!" })
        }

        res.status(200).json(updatedContact)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Something went wrong!" })
    }

}