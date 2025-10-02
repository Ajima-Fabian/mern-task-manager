import { useEffect, useState } from 'react'

const ContactList = () => {

    const [data, setData] = useState(null)

    const fetchContacts = async () => {
        try {
            const res = await fetch("/api/contact")
            const data = await res.json()

            if (res.ok) {
                setData(data)
                console.log(data)
            }

            if (!res.ok) {
                throw Error("Unable to fetch contacts")
            }

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchContacts()
    }, [])

    return (
        <div className='mt-10'>
            {
                data?.map(d => (
                    <div key={d._id} className='border-b p-2'>
                        <p className='text-xl text-gray-800 font-bold tracking-wide'>Firstname: {d.firstname}</p>
                        <p className='text-xl text-gray-800 font-bold tracking-wide'>Middlename: {d.middlename}</p>
                        <p className='text-xl text-gray-800 font-bold tracking-wide'>Surname: {d.surname}</p>
                        <p className='text-lg text-gray-800 font-bold tracking-wide'>Number: {d.phonenumber}</p>
                        <p className='text-lg text-gray-800 font-bold tracking-wide'>Address: {d.address}</p>
                    </div>
                    ))
            }
        </div>
    )
}

export default ContactList