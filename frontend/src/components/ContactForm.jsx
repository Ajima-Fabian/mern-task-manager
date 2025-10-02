import React, { useState } from 'react'

const ContactForm = () => {
  const [contact, setContact] = useState({
    firstname: "",
    middlename: "",
    surname: "",
    phonenumber: "",
    address: ""
  })
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const {name, value} = e.target
    setContact(prev => ({...prev, [name]: value}))
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    setError(null)
    
    try{
      const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(contact)
    })

    const data = await res.json()

    if(!res.ok){
      setError(data.error)
    }

    console.log(data)
    } catch(err){
      console.log(err)
    }

    setContact({
      firstname: "",
      middlename: "",
      surname: "",
      phonenumber: "",
      address: ""
    })
  }
  return (
    <div>
        <h1 className='text-center text-3xl font-bold tracking-wide text-blue-600'>Contact Manager</h1>

        <form className='mt-5 space-y-5 flex flex-col' onSubmit={handleSubmit}>
            <input type="text" placeholder='Enter Firstname...' className='outile-0 p-2 focus:outline-0 ring rounded ring-blue-500 focus:ring-blue-600 focus:ring-2' onChange={handleChange} value={contact.firstname} name='firstname'/>
            <input type="text" placeholder='Enter Middlename' className='outile-0 p-2 focus:outline-0 ring rounded ring-blue-500 focus:ring-blue-600 focus:ring-2' onChange={handleChange} value={contact.middlename} name='middlename'/>
            <input type="text" placeholder='Enter Surname' className='outile-0 p-2 focus:outline-0 ring rounded ring-blue-500 focus:ring-blue-600 focus:ring-2' onChange={handleChange} value={contact.surname} name='surname'/>
            <input type="text" placeholder='Enter Phone Number' className='outile-0 p-2 focus:outline-0 ring rounded ring-blue-500 focus:ring-blue-600 focus:ring-2' onChange={handleChange} value={contact.phonenumber} name='phonenumber'/>
            <input type="text" placeholder='Enter Address' className='outile-0 p-2 focus:outline-0 ring rounded ring-blue-500 focus:ring-blue-600 focus:ring-2' onChange={handleChange} value={contact.address} name='address'/>
            <button type='submit' className='border-blue-600 border p-2 rounded text-blue-600 tracking-wider font-bold text-lg hover:text-white hover:bg-blue-500 transition duration-300'>Add to contact</button>
            {error && <div className='text-center text-red-600 font-bold tracking-wide'>{error}</div>}
        </form>
    </div>
  )
}

export default ContactForm