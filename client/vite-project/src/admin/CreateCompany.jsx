import React, { useState } from 'react'
import Nav from '../components/share/Nav'
import { Button } from '../components/ui/button'
import { Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { API } from '../components/utils/context'

const CreateCompany = () => {
  const navigate = useNavigate()
  const [companyName, setcompanyName] = useState("")

  // console.log(companyName);
  
  const registerNewCompany = async () => {
    try {
      const res = await axios.post(`${API}/company/register`,{name:companyName},
        {
    headers:{"Content-Type":"application/json"},
withCredentials:true
        })
        // console.log(res.data,"registercompany");
        const companyId = res.data.company._id
        navigate(`/admin/company/${companyId}`)
        
    } catch (error) {
      console.log("error in register new company " , error);
      toast.error(error.response.data.message)
      
    }
  }
  return (
    <div>
        <Nav/>
        <div className='max-w-4xl mx-auto'>
        <div className='my-7'>
            <h1 className='text-3xl font-semibold'>Your Company Name</h1>
            <p className='text-gray-400 text-sm'>What would you like to give your company name? you can change this later.</p>
        </div>
        <div className='my-5'>
            <h1>Comapany Name</h1>
            <input type="text" placeholder="JobHunt, Microsoft etc."
           onChange={(e)=>{setcompanyName(e.target.value)}} 
           className='border w-full p-2 rounded-md text-sm  '/>
        </div>
        <div className=''>
             <Button onClick={()=>{navigate("/admin/companies")}} className={"border"} variant={Outlet}>Cancle</Button>
        <Button onClick={()=>{registerNewCompany()}} className={"mx-5"}>Continue</Button>
        </div>
    </div>
    </div>
  )
}

export default CreateCompany