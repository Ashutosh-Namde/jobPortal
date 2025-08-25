import React, { useState } from "react";
import Nav from "../components/share/Nav";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { API } from "../components/utils/context";
import { setLoading } from "../redux/authSlice";
import { Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

const companyArray = [];
const CreateJob = () => {
    const {loading} = useSelector(store=>store.auth)
    const {allCompany} = useSelector(store =>store.company)
    const navigate = useNavigate()
  const [input, setinput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: 0,
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const changeEventHandeler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSelectSubmit = (value)=>{
    // console.log(value,"value");
    
    const selectedCompany = allCompany.find((company)=>{
       return company?.name?.toLowerCase() == value
        // console.log(company.name,"company");
        
    })
    // console.log(selectedCompany);
    
    setinput({...input,companyId:selectedCompany._id})
  }
  const submitHandeler = async(e) => {
    setLoading(true)
    e.preventDefault();
     try {
        const res = await axios.post(`${API}/job/post`,input,   {
    headers:{"Content-Type":"application/json"},
withCredentials:true
        })
        if(res.data.success){
            navigate("/admin/jobs")
            toast.success(res.data.message)
            // console.log(res.data);
            
        }
        
     } catch (error) {
        console.log(error,"error in create job");
        toast.error(error.response.data.message)
        
     }
     finally{
        setLoading(false)
     }
  };
  return (
    <div>
      <Nav />
      <div className="max-w-max mx-auto  border border-gray-200 p-5 rounded-lg shadow-xl">
        <form action="" className="grid grid-cols-2" onSubmit={submitHandeler}>
          <div className="flex flex-col p-1">
            <label htmlFor="">Title</label>
            <input
              className="p-1 border rounded-sm"
              value={input.title}
              name="title"
              onChange={changeEventHandeler}
              type="text"
            />
          </div>
          <div className="flex flex-col p-1">
            <label htmlFor="">Description</label>
            <input
              className="p-1 border rounded-sm"
              value={input.description}
              name="description"
              onChange={changeEventHandeler}
              type="text"
            />
          </div>
          <div className="flex flex-col p-1">
            <label htmlFor="">requirements</label>
            <input
              className="p-1 border rounded-sm"
              value={input.requirements}
              name="requirements"
              onChange={changeEventHandeler}
              type="text"
            />
          </div>
          <div className="flex flex-col p-1">
            <label htmlFor="">salary</label>
            <input
              className="p-1 border rounded-sm"
              value={input.salary}
              name="salary"
              onChange={changeEventHandeler}
              type="number"
            />
          </div>
          <div className="flex flex-col p-1">
            <label htmlFor="">location</label>
            <input
              className="p-1 border rounded-sm"
              value={input.location}
              name="location"
              onChange={changeEventHandeler}
              type="text"
            />
          </div>
          <div className="flex flex-col p-1">
            <label htmlFor="">jobType</label>
            <input
              className="p-1 border rounded-sm"
              value={input.jobType}
              name="jobType"
              onChange={changeEventHandeler}
              type="text"
            />
          </div>
          <div className="flex flex-col p-1">
            <label htmlFor="">experience</label>
            <input
              className="p-1 border rounded-sm"
              value={input.experience}
              name="experience"
              onChange={changeEventHandeler}
              type="text"
            />
          </div>

          <div className="flex flex-col p-1">
            <label htmlFor="">position</label>
            <input
              className="p-1 border rounded-sm"
              value={input.position}
              name="position"
              onChange={changeEventHandeler}
              type="number"
            />
          </div>
          {
            allCompany.length > 0 &&(
                    <Select onValueChange={handleSelectSubmit}>
            <SelectTrigger  className="w-[180px] mt-3">
              <SelectValue placeholder="Company" />
            </SelectTrigger>
            <SelectContent>
                {
                    allCompany.map((company)=>(

                        <SelectItem value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                    ))
                }
             
            </SelectContent>
          </Select>
            )
          }
    
<div className="col-span-2">
  {loading ? (
    <Button className="w-full mt-5">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      please wait
    </Button>
  ) : (
    <Button type="submit" className="w-full mt-5">
      Create Job
    </Button>
  )}
</div>
          {allCompany.length == 0 && (
            <h1 className="text-red-400 ">please crate company first</h1>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
