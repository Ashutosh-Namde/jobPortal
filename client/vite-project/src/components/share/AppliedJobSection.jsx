import { useSelector } from 'react-redux'
import { Badge } from '../ui/badge'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import React from 'react'

const AppliedJobSection = () => {
    const {allAppliedJob} = useSelector(store => store.job)
    console.log(allAppliedJob,"kk");
    
  return (
    <div>
        <Table>
            <TableCaption>A List of your applied jobs</TableCaption>
                <TableHeader>
<TableHead>Date</TableHead>
<TableHead>Job Role</TableHead>
<TableHead>Company</TableHead>
<TableHead className={"text-right"}>Status</TableHead>
                </TableHeader>
            

            <TableBody>
                {
                    allAppliedJob?.length <=0 ?<span>You not apply any job yet.</span>:allAppliedJob?.map((item,idx)=>(
                        <TableRow>
                            <TableCell>{item?.createdAt.split("T")[0]}</TableCell>
                            <TableCell>{item?.job?.title}</TableCell>
                            <TableCell>{item?.job?.company?.name}</TableCell>
                            <TableCell className={"text-right"}><Badge className={`${item?.status ===  "rejected" ? "bg-red-600":item?.status==="pending"?"bg-gray-500":"bg-green-700"}`}>{item?.status}</Badge></TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>



    </div>
  )
}

export default AppliedJobSection