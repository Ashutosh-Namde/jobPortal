import {  Bookmark } from 'lucide-react'
import React from 'react'
import { Badge } from '../ui/badge'
import { useNavigate } from 'react-router-dom'

const Jobcard = ({job}) => {
  let navigate = useNavigate();
  const id = "qwertyuiop"

  const  dayAgoFunction = (mongodbTime)=>{
    const createdAt = new Date(mongodbTime)
    const currentDate = new Date()
    const timeDiffrence = currentDate-createdAt;
    return Math.floor(timeDiffrence/(24*60*60*1000))
  }
  return (
    <div className='w-80 border border-gray-200 p-4 shadow-xl rounded-xl '>
      <div className='flex justify-between '>
        <h4 className='text-sm text-gray-400'> {dayAgoFunction(job?.createdAt)=== 0 ? "Today" : `${dayAgoFunction(job?.createdAt)}`} days ago</h4>
      <Bookmark/>
      </div>
      <div className='flex items-center gap-2'>
        <img className='w-10 ' src={job?.company?.logo} alt="" />
        <div>
            <h1>{job?.name}</h1>
            <h4 className='text-xs text-gray-400'>India</h4>
        </div>
      </div>
      <h1 className='font-semibold mt-2'>{job?.title}</h1>
      <p className='text-xs text-gray-400 mt-2'>{job?.description}</p>

      <div className='gap-3 flex'>
            <Badge className={`text-blue-500 bg-white border-gray-300 mt-3`}>{job?.position} position</Badge>
        <Badge className={`text-red-500 bg-white border-gray-300 mt-3`}>{job?.jobType}</Badge>
        <Badge className={`text-purple-600 bg-white border-gray-300 mt-3`}>{job?.salary}LPA</Badge>
</div>
<div className='gap-4 flex text-sm'>
    <button onClick={()=>{navigate(`/description/${job?._id}`)}}   className='px-4 py-2 border-gray-200 border rounded-lg mt-4'>Details</button>
    <button className='px-4 py-2  border bg-purple-700 text-white rounded-lg mt-4'>Save For Later</button>
</div>
    </div>
  )
}

export default Jobcard