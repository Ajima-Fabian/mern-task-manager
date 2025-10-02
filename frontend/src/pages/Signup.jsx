import React from 'react'

const Signup = () => {
  return (
    <div className='max-w-md w-full mx-auto mt-10 shadow-md py-5 px-7'>
        <h1 className='text-center text-3xl font-bold text-blue-600'>Create new account</h1>

        <form className='flex flex-col space-y-4 mt-4'>
            <input type="text" placeholder='Enter email' className='outline-0 ring ring-blue-600 py-2 px-4 focus:border-0 focus:ring-2 focus:ring-blue-500 rounded-md'/>
            <input type="text" placeholder='Enter password' className='outline-0 ring ring-blue-600 py-2 px-4 focus:ring-2 focus:ring-blue-500 rounded-md'/>
            <button className='text-lg p-2 bg-blue-600 rounded-md font-bold text-white hover:border-blue-600 hover:text-blue-600 hover:border hover:bg-white transition duration-300 tracking-wider'>Create</button>
        </form>
    </div>
  )
}

export default Signup