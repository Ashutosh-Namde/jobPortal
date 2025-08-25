import React from 'react'
import LatestJobsCard from './LatestJobsCard'
import { useSelector } from 'react-redux'
import useGetAllJobs from '../hooks/useGetAllJobs'
import { useNavigate } from 'react-router-dom'

// const listing = [1,2,3,4,5,6,7,8]


const LatestJobs = () => {
  useGetAllJobs();
  const {allJobs} = useSelector(store=>store.job)
  // console.log(allJobs,"jobs");
  const navigate =useNavigate()
  
  return (
    <div className='max-w-7xl mx-auto g mb-5'>
        <h1 className='text-3xl pl-25 font-semibold '><span className='text-blue-500 '> Latests & Top</span> Jobs Opening</h1>
     <div  className='grid grid-cols-3 gap-5 ' >
        {allJobs.length <= 0 ? <span>No Job Available</span>: allJobs?.slice(0,6).map((data)=>(
        <LatestJobsCard key={data.id} job={data}/>
     ))}
     </div>
    </div>
  )
}

export default LatestJobs