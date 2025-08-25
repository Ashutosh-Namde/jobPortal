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

const shortListingStatus = ["Accepted", "Rejected"];

const ApplicantTable = () => {

  const {allApplicants} = useSelector(store=>store.applicant)
  console.log(allApplicants);

  const statusHandeler = async(id,status)=>{
try {
  const res = await axios.post(`${API}/application/updateStatus/${id}`,{status},{withCredentials:true})
  console.log(res.data);
  
} catch (error) {
  console.log("error in staus update ",error);
  toast.error(error.response.data.message)
  
}
  }
  
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
              <Popover>
                <PopoverTrigger>
                  <MoreHorizontal className="text-right cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent className="w-32">
                  <div  className="flex flex-col items-center gap-2 w-fit cursor-pointer">
                    {shortListingStatus.map((data, idx) => (
                      <div onClick={()=>{statusHandeler(item?._id,data)}}>
                      <span className="">{data}</span>

                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </TableCell>
          </TableBody>
        </>
))}
       
      </Table>
    </div>
  );
};

export default ApplicantTable;
