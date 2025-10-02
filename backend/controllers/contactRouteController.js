import Contact from "../models/contactModel.js"

export const add_controller = async( req, res) => {
    const { firstname, middlename, surname, phonenumber, address} = req.body

    if(!firstname || !middlename || !surname || !phonenumber || !address){
        return res.status(400).json({error: 'All fields are required!'})
    }

    try{
        const newContact = await Contact.create({firstname, middlename, surname, phonenumber, address})
        res.status(201).json({newContact})
    } catch(err) {
        console.log(err)
        res.status(500).json({error: 'Something went wrong!'})
    }
}