import React from 'react'
import Nav from './components/share/Nav'
import { Route, Routes } from 'react-router-dom'
import Login from './components/auth/Login'
import Home from './components/pages/Home'
import Signup from './components/auth/Signup'
import Jobs from './components/pages/Jobs'
import Browse from './components/pages/Browse'
import ViewProfile from './components/pages/ViewProfile'
import JobDescription from './components/pages/JobDescription'
import Companies from './admin/Companies'
import CreateCompany from './admin/CreateCompany'
import CompanySetup from './admin/CompanySetup'
import AdminJobs from './admin/AdminJobs'
import CreateJob from './admin/CreateJob'
import JobSetup from './admin/JobSetup'
import ProtectedRoute from './admin/ProtectedRoute'

const App = () => {
  return (
    <div className=''>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/jobs' element={<Jobs/>}/>
        <Route path='/browse' element={<Browse/>}/>
        <Route path='/viewprofile' element={<ViewProfile/>}/>
        <Route path='/description/:id' element={<JobDescription/>}/>

        //admin
        <Route path='/admin/companies' element={<ProtectedRoute><Companies /></ProtectedRoute>}/>
        <Route path='/admin/company/create' element={<ProtectedRoute><CreateCompany /></ProtectedRoute>}/>
        <Route path='/admin/company/:id' element={<ProtectedRoute><CompanySetup /></ProtectedRoute>}/>
        <Route path='/admin/jobs' element={<ProtectedRoute><AdminJobs/></ProtectedRoute>}/>
        <Route path='/admin/job/create' element={<ProtectedRoute><CreateJob/></ProtectedRoute>}/>

        <Route path='/admin/job/:id' element={<ProtectedRoute><JobSetup/></ProtectedRoute>}/>
        <Route path='/admin/job/:id/applicants' element={<ProtectedRoute><JobSetup/></ProtectedRoute>}/>
      </Routes>
   
    </div>
  )
}

export default App