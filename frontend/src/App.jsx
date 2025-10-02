import React from 'react'
import {BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NavBar from './components/NavBar'

const App = () => {
  return (
    <div className='bg-gray-100 h-screen'>
      <Router>
        <header>
          <NavBar />
        </header>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Signup />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App