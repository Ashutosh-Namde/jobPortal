import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '../../redux/jobSlice'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
  const [query, setquery] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const setSearchHandeler = () => {
    dispatch(setSearchQuery(query))
    navigate("/browse")
  }

  return (
    <div className='flex items-center justify-center flex-col mt-7 gap-4 px-4'>
      {/* Tagline */}
      <h1 className='w-fit px-4 py-1 text-red-500 font-semibold bg-gray-100 rounded-full text-sm sm:text-base'>
        No. 1 Job Hunt Website
      </h1>

      {/* Heading */}
      <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold mt-1 text-center leading-snug'>
        <span>Search, Apply & <br className='hidden sm:block' /> Get Your </span>
        <span className='text-blue-800'> Dream Jobs</span>
      </h1>

      {/* Sub-text */}
      <p className='text-center text-gray-600 max-w-2xl px-2 text-sm sm:text-base'>
        Your one-stop job portal to explore opportunities, connect with recruiters, and build a successful career with confidence and ease.
      </p>

      {/* Search Bar */}
      <div className='w-full flex items-center justify-center mt-3'>
        <div className='flex w-full sm:w-3/4 md:w-2/3 lg:w-2/5 shadow-lg border border-gray-200 rounded-full overflow-hidden'>
          <input
            type="text"
            onChange={(e) => { setquery(e.target.value) }}
            className='flex-grow p-2 pl-4 outline-none text-sm sm:text-base'
            placeholder='Find your dream jobs'
          />
          <Button
            onClick={setSearchHandeler}
            className="rounded-none h-10 w-12 sm:w-16 bg-blue-800 flex items-center justify-center"
          >
            <Search className='w-5 h-5 sm:w-6 sm:h-6' />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
