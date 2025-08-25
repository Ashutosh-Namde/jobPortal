import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const shortListingStatus = ["Accepted" ,"Rejected"]
const JobTable = () => {
    // console.log("all company" , allCompany);
    // console.log(searchCompanyByText,"seach");
    const navigate = useNavigate()
    const{allAdminJobs,searchJobByText} = useSelector(store=>store.job)
    const [filterJobData, setfilterJobData] = useState(allAdminJobs)
    console.log(allAdminJobs,"admin2");
    
    useEffect(()=>{
      const filteredJobData = allAdminJobs.length >= 0 && allAdminJobs.filter((job)=>{
        if(!searchJobByText){
            return true
        }
        return job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.title?.toLowerCase().includes(searchJobByText.toLowerCase())
      })
      setfilterJobData(filteredJobData)
    },[allAdminJobs,searchJobByText])
    
    
  return (
    <div>
        <Table>
            <TableCaption>A list of your recent registered companies</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Logo</TableHead>
                    <TableHead>Company Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className={"text-right"}>Action</TableHead>
                </TableRow>
            </TableHeader>
          {
            filterJobData?.map((job)=>(
                <>
                <TableBody>
                <TableCell><Avatar>
                    <AvatarImage src={job?.company?.logo}/>
                    </Avatar></TableCell>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job.title}</TableCell>

                <TableCell>{job.createdAt.split("T")[0]}</TableCell>
                <TableCell className={"text-right"}>
                    <Popover>
                         <PopoverTrigger><MoreHorizontal className='text-right'/></PopoverTrigger>
                                        <PopoverContent  className="w-32">
                                            <div onClick={()=>navigate(`/admin/job/${job._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                               <Edit2  className='w-4' /> 
                                                <span> Edit</span>
                                            </div>
                                             <div onClick={()=> navigate(`/admin/job/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                                                <Eye className='w-4'/>
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                    </Popover>
                </TableCell>
            </TableBody></>
            ))
          }
            
        </Table>
    </div>
  )
}

export default JobTable