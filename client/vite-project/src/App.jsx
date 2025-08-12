import React from 'react'
import Nav from './components/share/Nav'
import { Route, Routes } from 'react-router-dom'
import Login from './components/auth/Login'
import Home from './components/pages/Home'
import Signup from './components/auth/Signup'

const App = () => {
  return (
    <div className=''>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
   
    </div>
  )
}

export default App