import { useEffect, useState } from 'react'
import { Trash, Pencil } from 'lucide-react'

const ContactList = ({ contact, dispatch }) => {
    const [editingContact, setEditingContact] = useState(null)

    const fetchContacts = async () => {
        try {
            const res = await fetch("/api/contact")

            if (!res.ok) {
                throw Error("Unable to fetch contacts")
            }

            const data = await res.json()
            dispatch({ type: "SET_CONTACT", payload: data })
        } catch (err) {
            console.log(err)
        }
    }

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`/api/contact/${id}`, { method: "DELETE" })

            if (!res.ok) {
                throw Error("Unable to perform action")
            }

            const data = await res.json()
            dispatch({ type: "DELETE_CONTACT", payload: id })

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchContacts()
    }, [])

    const cancelEdit = () => {
        setEditingContact(null)
    }

    const handleEditContact = (contact) => {
        setEditingContact({...contact})
    }

    const updateContact = async (id) => {
        try {
            const res = await fetch(`/api/contact/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editingContact)
            })

            if(!res.ok){
                throw Error("Unable to update contact")
            }

            const data = await res.json()
            dispatch({type:"UPDATE_CONTACT", payload: data})
        } catch (err) {
            console.log(err)
        }

        setEditingContact(null)
    }

    const handleInputChange = (field, value) => {
        setEditingContact(prev => ({...prev, [field]: value}))
    }

    return (
        <div className='mt-10'>
            {contact.map(c => (
                <div className='border-b p-2 relative' key={c._id}>
                    {editingContact && editingContact._id === c._id ? (
                        <div className='space-y-3'>
                            <input type="text" onChange={(e) => handleInputChange("firstname", e.target.value)} value={editingContact.firstname} className='bg-white py-1 px-2 w-full rounded-md text-blue-600 text-lg tracking-wide'/>
                            <input type="text" onChange={(e) => handleInputChange("middlename", e.target.value)} value={editingContact.middlename} className='bg-white py-1 px-2 w-full rounded-md text-blue-600 text-lg tracking-wide'/>
                            <input type="text" onChange={(e) => handleInputChange("surname", e.target.value)} value={editingContact.surname}className='bg-white py-1 px-2 w-full rounded-md text-blue-600 text-lg tracking-wide' />
                            <input type="text" onChange={(e) => handleInputChange("phonenumber", e.target.value)} value={editingContact.phonenumber} className='bg-white py-1 px-2 w-full rounded-md text-blue-600 text-lg tracking-wide'/>
                            <input type="text" onChange={(e) => handleInputChange("address", e.target.value)} value={editingContact.address} className='bg-white py-1 px-2 w-full rounded-md text-blue-600 text-lg tracking-wide'/>

                            <div className='text-center space-x-2'>
                                <button onClick={() => updateContact(c._id)} className='border border-blue-600 py-1 px-4 rounded-md text-lg tracking-wide text-blue-600 hover:bg-blue-600 hover:text-white transition duration-300'>Save</button>
                                <button className='border border-blue-600 py-1 px-4 rounded-md text-lg tracking-wide text-blue-600 hover:bg-blue-600 hover:text-white transition duration-300' onClick={cancelEdit}>Cancel</button>
                            </div>
                        </div>
                    ) : (
                        c ? <div>
                            <p className='text-xl text-gray-800 font-bold tracking-wide'>Firstname: {c.firstname}</p>
                            <p className='text-xl text-gray-800 font-bold tracking-wide'>Middlename: {c.middlename}</p>
                            <p className='text-xl text-gray-800 font-bold tracking-wide'>Surname: {c.surname}</p>
                            <p className='text-lg text-gray-800 font-bold tracking-wide'>Number: {c.phonenumber}</p>
                            <p className='text-lg text-gray-800 font-bold tracking-wide'>Address: {c.address}</p>
                            <div className='text-center space-x-2 absolute top-2 right-0 bg-white py-2 px-4 rounded-full'>
                                <button onClick={() => handleDelete(c._id)} className='text-red-500 hover:text-red-600'>{<Trash />}</button>
                                <button className='text-blue-600 hover:text-blue-700' onClick={() => handleEditContact(c)}>{<Pencil />}</button>
                            </div>
                        </div> : <p>No contact added yet</p>
                    )}
                </div>
            ))}
        </div>
    )
}

export default ContactList