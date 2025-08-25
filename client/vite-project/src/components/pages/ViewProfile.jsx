import React, { useState } from "react";
import Nav from "../share/Nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {  Contact, Mail, Pen } from "lucide-react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import AppliedJobSection from "../share/AppliedJobSection";
import UpdateProfileDialog from "../share/UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetApplicantsAll from "../hooks/useGetApplicantsAll";

const ViewProfile = () => {
useGetApplicantsAll()
    // const skil÷ls = ["frontend" , "backend","sql","full stack"]
   const [open, setopen] = useState(false)
    const isResume = true
    const {user} = useSelector(store=>store.auth)
  return (
    <div className="w-full">
      <Nav />
      
      <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={()=>{setopen(true)}} className="text-right"  variant="outline"><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            user?.profile?.skills.length !== 0 ?  user?.profile?.skills.map((items, index) => <Badge key={index}>{items}</Badge>) : <span>NA</span>
                        }
                        
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        isResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                    }
                </div>
                
            </div>
            {/* applied job section */}
            <div className="max-w-4xl mx-auto bg-white rounded-2xl"> 
                    <h1 className="font-bold text-xl mb-4">Applied Jobs</h1>
                    <AppliedJobSection/>
                </div>
                <UpdateProfileDialog open={open} setopen={setopen}/>
    </div>
  );
};

export default ViewProfile;
