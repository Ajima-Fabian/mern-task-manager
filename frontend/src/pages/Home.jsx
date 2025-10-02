import React from 'react'
import ContactForm from '../components/ContactForm'
import ContactList from '../components/ContactList'

const Home = () => {
  return (
    <div className='mx-auto max-w-sm shadow-md w-full mt-10 p-5 rounded'>
        <ContactForm />
        <ContactList />
    </div>
  )
}

export default Home