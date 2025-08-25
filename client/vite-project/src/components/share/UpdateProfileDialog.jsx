import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Label } from '../ui/label'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../ui/button'
import { toast } from "sonner";
import axios from 'axios'
import { API } from '../utils/context'
import { setUser } from '@/redux/authSlice'
import { setLoading } from '../../redux/authSlice'
import { Loader2 } from 'lucide-react'




const UpdateProfileDialog = ({open,setopen}) => {
  const {user } = useSelector(store=>store.auth)
     const {loading} = useSelector(store=>store.auth)

const [input, setinput] = useState({
  fullname:user?.fullname,
  email:user?.email,
  phoneNumber:user?.phoneNumber,
 bio : user?.profile?.bio,
 skills:user?.profile?.skills?.map(skill=>skill),
 resume:user?.profile?.resume
})
const dispatch = useDispatch()
const changeEventHandeler = (e)=>{
  setinput({...input,[e.target.name]:e.target.value})
  // console.log(input);
  
}
    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setinput({ ...input, file })
    }
const onSubmitHandeler = async(e)=>{
   dispatch(setLoading(true))
  e.preventDefault()
  const formData = new FormData()
   formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
// console.log(inp÷ut);

        try {
          const res = await axios.post(`${API}/user/profile/update`,formData,{
            headers:{'Content-Type': 'multipart/form-data'},
            withCredentials:true
          })
          if(res.data.success){
             dispatch(setUser(res.data.user));
            toast.success(res.data.message)
          }
        } catch (error) {
          console.log(error,"error in update profile");
          toast.error(error.response.data.message)
          
        }
        finally{
           dispatch(setLoading(false))
        }
        setopen(false);
        console.log(input.file);
        
}

// console.log(input,"input");

  return (
    <div>
        <Dialog open={open}>
  <DialogContent onInteractOutside={()=>setopen(false)}>
    <DialogHeader>
      <DialogTitle>Update Profile</DialogTitle>
    </DialogHeader>
   <form className="space-y-4 " onSubmit={onSubmitHandeler}>
  <div className="flex items-center gap-4">
    <Label htmlFor="name" className="w-28">Name</Label>
    <input id="name" value={input.fullname} onChange={changeEventHandeler}  name="fullname" className="flex-1 border p-2 rounded-lg border-gray-400" type="text" />
  </div>

  <div className="flex items-center gap-4">
    <Label htmlFor="email" className="w-28">Email</Label>
    <input id="email" name="email" onChange={changeEventHandeler}  value={input.email} className="flex-1 border p-2 rounded-lg border-gray-400" type="email" />
  </div>

  <div className="flex items-center gap-4">
    <Label htmlFor="number" className="w-28">Number</Label>
    <input id="number" name="phoneNumber" onChange={changeEventHandeler} value={input.phoneNumber}  className="flex-1 border p-2 rounded-lg border-gray-400" type="text" />
  </div>

  <div className="flex items-center gap-4">
    <Label htmlFor="bio" className="w-28">Bio</Label>
    <input id="bio" name="bio" onChange={changeEventHandeler}  value={input.bio} className="flex-1 border p-2 rounded-lg border-gray-400" type="text" />
  </div>

  <div className="flex items-center gap-4">
    <Label htmlFor="skills" className="w-28">Skills</Label>
    <input id="skills" name="skills" onChange={changeEventHandeler}  value={input.skills} className="flex-1 border p-2 rounded-lg border-gray-400" type="text" />
  </div>

  <div className="flex items-center gap-4">
    <Label htmlFor="file" className="w-28">Resume</Label>
    <input id="file" name="file" type="file" onChange={fileChangeHandler} accept="application/pdf" className="flex-1 border p-2 rounded-lg border-gray-400" />
    
  </div>
   {loading ? <Button className={"w-full mt-5"}><Loader2 className="mr-2 h-4 w-4 animate-spin"/>please wait</Button> : 
          <Button type="submit"  className="w-full mt-5">Update</Button>
         }
</form>

  </DialogContent>
</Dialog>
    </div>
  )
}

export default UpdateProfileDialog