import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Nav from "../share/Nav";
import {RadioGroup, RadioGroupItem} from '../ui/radio-group'
import {Button} from "../ui/button"
import { Form, Link } from "react-router-dom";
import axios from 'axios'
import { API } from "../utils/context";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
const Signup = () => {

    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [phoneNumber, setphoneNumber] = useState("")
    const [password, setpassword] = useState("")
    const [role, setrole] = useState("")
    const [file, setfile] = useState("")

         const {loading} = useSelector(store=>store.auth)
         const dispatch = useDispatch()

    const handleClickHandeler = ()=>{
        console.log(name , email , phoneNumber , password , role , file);
        
    }
const submitHandeler = async (e) => {
   try {
         dispatch(setLoading(true))
  
  e.preventDefault()
  const formdata = new FormData();

  formdata.append("fullname",name)
  formdata.append("email",email)
  formdata.append("phoneNumber",phoneNumber)
  formdata.append("password",password)
  formdata.append("role",role)
  if(file){
  formdata.append("file",file)
    
  }
console.log(`${API}/register`);


   const result = await axios.post(`${API}/user/register` , formdata,{
    Headers:{
      "Content-Type": "multipart/form-data"
    },
    withCredentials:true
  })
  console.log(result.data , "data");
  if(result.data.success){
    toast.success(result.data.message)
  }
  
 } catch (error) {
  console.log("error" , error.message);
  toast.error(error.response.data.message)
 }
   finally{
       dispatch(setLoading(false))
      }

}
  return (
    <div className="flex flex-col items-center justify-center ">
      <Nav />
      <div className="border w-1/2 flex flex-col items-center justify-center mt-5 p-5">
        <h1 className=" text-xl font-semibold">Signup</h1>
        <form onSubmit={submitHandeler} action="" className="w-full ">
          <div className="mt-5">
            <Label className="">FullName:</Label>
            <Input className="mt-2" onChange={(e)=>{setname(e.target.value)}} value={name} placeholder="Ashutosh Namdev"></Input>
          </div>

          <div className="mt-5">
            <Label className="">Email:</Label>
            <Input className="mt-2" onChange={(e)=>{setemail(e.target.value)}} value={email} placeholder="namdevashutosh@gmail.com"></Input>
          </div>

          <div className="mt-5">
            <Label className="">Phone Number:</Label>
            <Input className="mt-2" onChange={(e)=>{setphoneNumber(e.target.value)}} value={phoneNumber}  placeholder="9956741825"></Input>
          </div>

          <div className="mt-5">
            <Label className="">Password:</Label>
            <Input className="mt-2" onChange={(e)=>{setpassword(e.target.value)}} value={password}  placeholder="password"></Input>
          </div>

          <div className=" flex items-center justify-between">
            <RadioGroup className="flex mt-5" defaultValue="option-one">
  <div className="flex items-center space-x-2">
    <Input value="student" type="radio" checked={role=="student"} onChange={(e)=>{setrole(e.target.value)}}  />
    <Label htmlFor="option-one">Student</Label>
  </div>
  <div className="flex items-center space-x-2">
    <Input value="recruiter" type="radio" checked={role=="recruiter"} onChange={(e)=>{setrole(e.target.value)}}  />
    
    <Label htmlFor="option-two">Recruiter</Label>
  </div>
</RadioGroup>
<div className="flex  w-full max-w-sm items-center justify-end gap-3 mt-5">
      <Label htmlFor="picture">Profile</Label>
      <Input className="w-80 cursor-pointer" accept="image/*" value={file} onChange={(e)=>{setfile(e.target.value)}} type="file" />
    </div>
          </div>

    {loading ? <Button className={"w-full mt-5"}><Loader2 className="mr-2 h-4 w-4 animate-spin"/>please wait</Button> : 
          <Button type="submit" onClick={handleClickHandeler} className="w-full mt-5">Submit</Button>
         }
          
          <h4 className="mt-4">Already have an account?<Link to="/login" className="text-blue-800 font-semibold"> Login</Link></h4>
          
        </form>
      </div>
    </div>
  );
};

export default Signup;
