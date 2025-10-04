import React from 'react'
import {Link} from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='flex px-10 py-5 justify-between md:px-[10%] shadow bg-white'>
        <div>
            <h1 className='text-2xl font-bold tracking-wider text-blue-600'><Link to={'/'}>PhoneBook</Link></h1>
        </div>

        <ul className='flex space-x-3'>
            <li className='font-bold tracking-wider text-lg text-blue-600 border border-blue-600 px-2 py-1 rounded-md hover:text-white hover:bg-blue-500 transition duration-200'><Link to={'/login'}>Login</Link></li>
            <li className='font-bold tracking-wider text-lg text-blue-600 border border-blue-600 px-2 py-1 rounded-md hover:text-white hover:bg-blue-500 transition duration-200'><Link to={'/signup'}>Sign up</Link></li>
        </ul>
    </div>
  )
}

export default NavBar