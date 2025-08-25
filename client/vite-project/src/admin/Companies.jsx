import React, { useEffect, useState } from 'react'
import Nav from '../components/share/Nav'
import { Button } from '../components/ui/button'
import CompanyTable from './CompanyTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompany from '../components/hooks/useGetAllCompany'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '../redux/companySlice'

const Companies = () => {
  useGetAllCompany();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [input, setinput] = useState("")

    useEffect(()=>{
      dispatch(setSearchCompanyByText(input))
    },[input])
  return (
    <div>
        <Nav/>
        <div className='max-w-7xl mx-auto mt-10'>
           <div className='flex justify-between items-center mb-5'>
            <input type="text" className='border pl-4' onChange={(e)=>{setinput(e.target.value)}} placeholder='Filter By Name' />
            <Button onClick={()=>{navigate("/admin/company/create")}}>New Company</Button>
           </div> 
           <CompanyTable/>
        </div>
    </div>
  )
}

export default Companies