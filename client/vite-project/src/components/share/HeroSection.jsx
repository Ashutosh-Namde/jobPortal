import { Search } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'

const HeroSection = () => {
  return (
    <div className='flex items-center justify-center flex-col mt-7 gap-4'>
        <h1 className='w-fit px-4 py-1 text-red-500 font-semibold bg-gray-100 rounded-full'>No. 1 Job Hunt Website</h1>
        <h1 className='text-5xl font-bold mt-1 text-center'><span>Search, Apply & <br /> Get Your </span> <span className='text-blue-800'>Dream Jobs</span></h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate ducimus earum deleniti.</p>
       <div className='w-full flex items-center  justify-center
       mt-3 '>
         <input type="text" className='w-[40%]  p-1 rounded-full px-3' placeholder='Find your dream jobs' />
        <Button className="rounded-r-full left-[-10] absolute right-100 bg-blue-800 " >
            <Search className=''/>
        </Button>
       </div>
    </div>
  )
}

export default HeroSection