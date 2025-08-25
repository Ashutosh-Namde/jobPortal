import React from 'react'
import { Badge } from '../ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobsCard = ({ job }) => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => {
        navigate(`/description/${job._id}`)
      }}
      className="w-full max-w-sm sm:max-w-md lg:max-w-lg border border-gray-100 p-4 shadow-lg rounded-xl mt-5 cursor-pointer hover:shadow-xl transition"
    >
      {/* Company Info */}
      <h1 className="text-base md:text-lg font-medium">{job?.company?.name}</h1>
      <h4 className="text-gray-400 text-xs md:text-sm">India</h4>

      {/* Job Title */}
      <h1 className="text-lg md:text-xl mt-2 font-semibold">{job?.title}</h1>

      {/* Description */}
      <p className="text-xs md:text-sm text-gray-400 mt-2 line-clamp-3">
        {job?.description}
      </p>

      {/* Badges */}
      <div className="gap-2 flex flex-wrap mt-3">
        <Badge className="text-blue-500 bg-white border-gray-300">
          {job?.position} position
        </Badge>
        <Badge className="text-red-500 bg-white border-gray-300">
          {job?.jobType}
        </Badge>
        <Badge className="text-purple-600 bg-white border-gray-300">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  )
}

export default LatestJobsCard
