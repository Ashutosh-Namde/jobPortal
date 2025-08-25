import React from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { LogOut } from "lucide-react"
import { User2 } from "lucide-react"
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { API } from "../utils/context";
import { setUser } from "../../redux/authSlice";

const Nav = () => {
  // const user = false;
  const {user} = useSelector(store=>store.auth)

  // console.log("user", user);
  

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const logoutHandeler = async()=>{
    try {
      const result = await axios.delete(`${API}/user/logout`,{withCredentials:true})
      if(result){
      dispatch(setUser(null))
      toast.success(result.data.message)
      navigate("/")
      }
    } catch (error) {
      console.log("error in logout" , error);
       toast.error(error.response.data.message)
    
      
    }
  }
  return (
    <div className="h-16 w-full  flex items-center justify-between ">
      <div> 
        <h1 onClick={()=>{navigate("/")}} className="cursor-pointer">
          <span className="text-2xl font-bold pl-20 text-blue-950">JOB</span>
          <span className="text-xl font-semibold text-red-700">PORTAL</span>
        </h1>
      </div>
      <div className="flex pr-20 gap-5 items-center">
        <ul className="flex gap-4">
          {user && user.role =="recruiter"?(
            <>
              <li><Link to={"/"}>Home</Link></li>
          <li><Link to={"/admin/jobs"}>Jobs</Link></li>
            </>
          ):(
            <>
               <li><Link to={"/"}>Home</Link></li>
          <li><Link to={"/jobs"}>Jobs</Link></li>
          <li><Link to={"/browse"}>Browse</Link></li></>
          )
          }
       
        </ul>
        {
          !user && 
          <div className="">
            <Link to="/login">
            <Button className= " mr-2 bg-white text-black  border-2 hover:border-blue-800  hover:bg-white">Login</Button>
            </Link>
            <Link to="/signup">
            <Button className="bg-blue-700 hover:bg-blue-800">SignUp</Button>
            </Link>
          </div>
        }
        {
          user &&
          <Popover>
          <PopoverTrigger asChild>
            <Avatar>
              <AvatarImage className=" object-cover" src={user?.profile?.profilePhoto}/>
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage className=" object-cover" src={user?.profile?.profilePhoto} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <h1>{user?.fullname}</h1>
                <p className="text-sm text-gray-500">
                  {user?.profile?.bio}
                </p>
              </div>
            </div>
            <div className="flex items-center ">
              <User2 />
              <Link to={"/viewprofile"}>
              <Button variant="link">View Profile</Button>
              </Link>
            </div>
            <div className="flex items-center">
               <LogOut className="ml-1 h-5 w-5" />
            <Button onClick={logoutHandeler} variant="link">Logout</Button>
            </div>
             
          </PopoverContent>
        </Popover>
        }
      </div>
    </div>
  );
};

export default Nav;
