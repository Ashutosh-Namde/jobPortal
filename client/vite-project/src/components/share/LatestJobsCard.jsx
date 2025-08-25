import React from 'react'
import { Badge } from '../ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobsCard = ({job}) => {
  const navigate = useNavigate()
  return (
    <div onClick={()=>{navigate(`/description/${job._id}`)}} className='border border-gray-100 p-3 shadow-lg rounded-xl mt-5'>
        <h1>{job?.company?.name}</h1>
        <h4 className='text-gray-400'>India</h4>
        <h1 className='text-xl mt-2 font-semibold'>{job?.title}</h1>
        <p className='text-sm text-gray-400 mt-2'> {job?.description}</p>
<div className='gap-3 flex'>
            <Badge className={`text-blue-500 bg-white border-gray-300 mt-3`}>{job?.position} position</Badge>
        <Badge className={`text-red-500 bg-white border-gray-300 mt-3`}>{job?.jobType}</Badge>
        <Badge className={`text-purple-600 bg-white border-gray-300 mt-3`}>{job?.salary} LPA</Badge>
</div>
    </div>
  )
}

export default LatestJobsCard