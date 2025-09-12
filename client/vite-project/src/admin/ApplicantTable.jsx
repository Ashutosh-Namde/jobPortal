import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit2, MoreHorizontal } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { API } from "../components/utils/context";
import { Badge } from "../components/ui/badge";
import useGetApplicantsAll from "../components/hooks/useGetApplicantsAll";
import { useEffect } from "react";

const shortListingStatus = ["Accepted", "Rejected"];

const ApplicantTable = () => {
  // const {getAllApplicants} = useGetApplicantsAll()
  useGetApplicantsAll()
  let newStatus ;
  let newId;
  const {allApplicants} = useSelector(store=>store.applicant)
  // console.log(allApplicants);

  const statusHandeler = async(id,status)=>{
    newStatus = status
    newId = id
try {
  const res = await axios.post(`${API}/application/updateStatus/${id}`,{status},{withCredentials:true})
  // console.log(res.data);
  if(res.data.success){
    toast.success(res.data.message);
     await getAllApplicants()
  }


  
} catch (error) {
  console.log("error in staus update ",error);
  toast.error(error.response.data.message)
  
}
  }
// useEffect(() => {
//   if(newId && newStatus){
//     statusHandeler(newId, newStatus)
//   }
// }, [newId, newStatus])

  
  return (
    <div>
      <Table>
        <TableCaption>A list of Applicants</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className={"text-right"}>Action</TableHead>
          </TableRow>
        </TableHeader>
{allApplicants && allApplicants?.applications?.map((item)=>(
 <>
          <TableBody>
            <TableCell>{item?.applicant?.fullname}</TableCell>
            <TableCell> {item?.applicant?.email}</TableCell>
            <TableCell>{item?.applicant?.phoneNumber}</TableCell>
           <TableCell >
                                    {
                                        item.applicant?.profile?.resume ? <a className="text-blue-600 cursor-pointer" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a> : <span>NA</span>
                                    }
                                </TableCell>
            <TableCell>{item?.applicant?.createdAt.split("T")[0]}</TableCell>
            <TableCell className={"text-right cursor-pointer"}>
  {(!item?.status || item?.status === "pending") ? (
    <Popover>
      <PopoverTrigger>
        <MoreHorizontal className="text-right cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="w-32">
        <div className="flex flex-col items-center gap-2 w-fit cursor-pointer">
          {shortListingStatus.map((data, idx) => (
            <div key={idx} onClick={() => statusHandeler(item?._id, data)}>
              <span>{data}</span>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  ) : (
    <div className="flex gap-2 justify-end ">
    <Badge className={`${item?.status ===  "rejected" ? "bg-red-600":item?.status==="pending"?"bg-gray-500":"bg-green-700"}`}>{item?.status}</Badge> 


      <Popover>
      <PopoverTrigger>
        <MoreHorizontal className="text-right cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="w-32">
        <div className="flex flex-col items-center gap-2 w-fit cursor-pointer">
          {shortListingStatus.map((data, idx) => (
            <div key={idx} onClick={() => statusHandeler(item?._id, data)}>
              <span>{data}</span>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
    </div>
  )}
</TableCell>
          </TableBody>
        </>
))}
       
      </Table>
    </div>
  );
};

export default ApplicantTable;
