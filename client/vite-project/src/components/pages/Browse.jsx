import React from 'react'
import Nav from '../share/Nav'
import Jobs from './Jobs'
import Jobcard from '../share/Jobcard'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchQuery } from '../../redux/jobSlice'
import { useEffect } from 'react'
import useGetAllJobs from '../hooks/useGetAllJobs'

const Browse = () => {
  useGetAllJobs()
  const {allJobs} = useSelector(state=>state.job)
const dispatch = useDispatch()
   useEffect(()=>{
    return()=>{

      dispatch(setSearchQuery(""))
    }
  })
  return (
    <div className='flex flex-col items-center'>
      <Nav/>
      <div className='max-w-7xl  my-5 '>
       <h1 className=''>Search Result ({allJobs.length})</h1>
      </div >
     <div className='flex gap-8 w-[80%] flex-wrap justify-center items-center' >
       {
        allJobs.map((job,idx)=>(
          <Jobcard job={job} id={idx}/>
        ))
      }
     </div>
    </div>
  )
}

export default Browse