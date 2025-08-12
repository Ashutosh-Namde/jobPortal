import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Nav from "../share/Nav";
import {RadioGroup, RadioGroupItem} from '../ui/radio-group'
import {Button} from "../ui/button"
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "../utils/context";
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from "../../redux/authSlice";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";


const Login = () => {

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
     const [role, setrole] = useState("")


     const {loading} = useSelector(store=>store.auth)
     const dispatch = useDispatch()

    const handleClickHandeler = async()=>{
     try {
       dispatch(setLoading(true))
       const result = await axios.post(`${API}/user/login` ,
        {
          email,password,role
        },{
    
    withCredentials:true
  })
  console.log(result.data , "data");
   if(result.data.success){
      toast.success(result.data.message)
    }
     } catch (error) {
      console.log("error" , error);
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
        <h1 className=" text-xl font-semibold">Login</h1>
        <form onSubmit={(e)=>{e.preventDefault()}} action="" className="w-full ">
          <div className="mt-5">
            <Label className="">Email:</Label>
            <Input className="mt-2" onChange={(e)=>{setemail(e.target.value)}} value={email} placeholder="namdevashutosh@gmail.com"></Input>
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

export default Login;
