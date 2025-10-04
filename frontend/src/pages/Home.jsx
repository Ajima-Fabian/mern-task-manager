import React, { useReducer } from 'react'
import ContactForm from '../components/ContactForm'
import ContactList from '../components/ContactList'

const Home = () => {


  const reducer = (contact, action) => {
    switch(action.type) {
        case "ADD_CONTACT":
          return [...contact, action.payload];

        case "SET_CONTACT":
          return action.payload

        case "DELETE_CONTACT":
          return contact.filter(c => c._id !== action.payload)

        case "UPDATE_CONTACT":
          return contact.map(c => c._id === action.payload._id ? action.payload : c)

          
          default:
            return contact
    }
  }

  const [contact, dispatch] = useReducer(reducer, [])
  return (
    <div className='mx-auto max-w-sm shadow-md w-full mt-10 p-5 rounded'>
        <ContactForm dispatch={dispatch}/>
        <ContactList dispatch={dispatch} contact={contact}/>
    </div>
  )
}

export default Home