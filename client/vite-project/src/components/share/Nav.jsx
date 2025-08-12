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

const Nav = () => {
  const user = false;

  const navigate = useNavigate();
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
          <li>Home</li>
          <li>Jobs</li>
          <li>Browse</li>
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
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <h1>Ashutosh MERN Stack</h1>
                <p className="text-sm text-gray-500">
                  Lorem ipsum sit amet consectetur.
                </p>
              </div>
            </div>
            <div className="flex items-center ">
              <User2 />
              <Button variant="link">View Profile</Button>
            </div>
            <div className="flex items-center">
               <LogOut className="ml-1 h-5 w-5" />
            <Button variant="link">Logout</Button>
            </div>
             
          </PopoverContent>
        </Popover>
        }
      </div>
    </div>
  );
};

export default Nav;
