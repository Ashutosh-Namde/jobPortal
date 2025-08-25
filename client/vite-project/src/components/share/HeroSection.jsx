import { Search } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '../../redux/jobSlice'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const HeroSection = () => {
  const [query, setquery] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate() 

  const setSearchHandeler = ()=>{
    console.log(query);
    dispatch(setSearchQuery(query))
    navigate("/browse")
  }
 

  return (
    <div className='flex items-center justify-center flex-col mt-7 gap-4'>
        <h1 className='w-fit px-4 py-1 text-red-500 font-semibold bg-gray-100 rounded-full'>No. 1 Job Hunt Website</h1>
        <h1 className='text-5xl font-bold mt-1 text-center'><span>Search, Apply & <br /> Get Your </span> <span className='text-blue-800'>Dream Jobs</span></h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate ducimus earum deleniti.</p>
       <div className='w-full flex items-center  justify-center
       mt-3 '>
         <input type="text" onChange={(e)=>{setquery(e.target.value)}} className='w-[40%]  p-1.5 border rounded-full px-3' placeholder='Find your dream jobs' />
        <Button onClick={setSearchHandeler} className="rounded-r-full  absolute right-[430px] bg-blue-800 " >
            <Search className=''/>
        </Button>
       </div>
    </div>
  )
}

export default HeroSection