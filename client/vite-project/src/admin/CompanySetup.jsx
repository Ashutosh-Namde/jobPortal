import React, { useEffect, useState } from 'react'
import Nav from '../components/share/Nav'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { API } from '../components/utils/context'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../redux/authSlice'
import useGetSingleCompany from '../components/hooks/useGetSingleCompany'
import store from '../redux/store'

const CompanySetup = () => {
     const params = useParams()
    const companyId = params.id
    
    useGetSingleCompany(companyId)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [input, setinput] = useState({
        name:"",
        description:"",
        website:"",
        location:"",
        file:""
    })
   
    const {loading} = useSelector(store=>store.auth)
    const {singleCompany} = useSelector(store=>store.company)

    useGetSingleCompany(companyId)
    const changeEventHandeler = async (e) => {
        setinput({...input,[e.target.name]:e.target.value})
    }
    const changeFileHandeler = async (e) => {
        const file = e.target.files?.[0]
        setinput({...input,file})
    }
    const submitHandeler = async (e) => {
        e.preventDefault();
        // console.log(input);
        const formData = new FormData()

        formData.append("name",input.name)
        formData.append("description",input.description)
        formData.append("location",input.location)
        formData.append("website",input.website)
        if(input.file){
            formData.append("file", input.file)
        }
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${API}/company/update/${companyId}`,formData,
                {
                    headers:{"Content-Type":"multipart/form-data"},
                    withCredentials:true
                }
            )
            // console.log(res.data,"updatedata");
            navigate("/admin/companies")
            
        } catch (error) {
            console.log("error in update company data " , error);
            toast.error(error.response.data.message)
            
        }
        finally{
            dispatch(setLoading(false))
        }
        
    }
// console.log(singleCompany,"singlecompany");

    useEffect(()=>{
     setinput({
          name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
     })
    },[singleCompany])

  return (
    <div>
        <Nav/>
        <div className='max-w-3xl mx-auto  '>
          <div className='flex items-center gap-5 text-xl font-semibold pl-10'>
              <Button onClick={()=>{navigate("/admin/companies")}} className={"border"} variant={Outlet}><ArrowLeft/><span>Back</span></Button>
            <h1>Company Setup</h1>
          </div>
          <form onSubmit={submitHandeler} action="" >
            <div className='mt-10 grid grid-cols-2 '>
             <div className='mb-4'>
                 <label htmlFor="">Company Name</label>
            <input type="text" readOnly onChange={changeEventHandeler} name='name' value={input.name}  className='border flex w-[90%] rounded-md p-1.5 '  />
             </div>
             <div className='mb-4'>
                 <label htmlFor="">Description</label>
            <input type="text" onChange={changeEventHandeler} name='description' value={input.description} className='border flex w-[90%] rounded-md p-1.5'  />
             </div>
             <div className='mb-4'>
                 <label htmlFor="">Website</label>
            <input type="text" onChange={changeEventHandeler} name='website' value={input.website} className='border flex w-[90%] rounded-md p-1.5'  />
             </div>
             <div className='mb-4'>
                 <label htmlFor="">Location</label>
            <input type="text" onChange={changeEventHandeler} name='location' value={input.location} className='border flex w-[90%] rounded-md p-1.5'  />
             </div>
             <div>
                 <label htmlFor="">Logo</label>
            <input type="file" onChange={changeFileHandeler}   className='border flex w-[90%] rounded-md p-1.5'  />
             </div>
             </div>
     {loading ? <Button className={"w-full mt-5"}><Loader2 className="mr-2 h-4 w-4 animate-spin"/>please wait</Button> : 
          <Button type="submit" className="w-full mt-5">Update</Button>
         }
          </form>
                      
        </div>
    </div>
  )
}

export default CompanySetup