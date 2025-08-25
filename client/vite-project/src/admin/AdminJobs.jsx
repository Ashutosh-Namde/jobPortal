import React, { useEffect, useState } from 'react'
import Nav from '../components/share/Nav'
import { Button } from '../components/ui/button'
import CompanyTable from './CompanyTable'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useGetAdminAllJobs from '../components/hooks/useGetAdminAllJobs'
import JobTable from './JobTable'
import { setSearchJobByText } from '../redux/jobSlice'

const AdminJobs = () => {
    
  useGetAdminAllJobs();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [input, setinput] = useState("")

    useEffect(()=>{
      dispatch(setSearchJobByText(input))
    },[input])
  return (
    <div>
        <Nav/>
        <div className='max-w-7xl mx-auto mt-10'>
           <div className='flex justify-between items-center mb-5'>
            <input type="text" className='border pl-4' onChange={(e)=>{setinput(e.target.value)}} placeholder='Filter By Name' />
            <Button onClick={()=>{navigate("/admin/job/create")}}>New Job</Button>
           </div> 
           <JobTable/>
        </div>
    </div>
  )
}

export default AdminJobs