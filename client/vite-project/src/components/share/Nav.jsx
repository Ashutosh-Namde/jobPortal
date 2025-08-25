import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { LogOut, User2, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { API } from "../utils/context";
import { setUser } from "../../redux/authSlice";

const Nav = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const result = await axios.delete(`${API}/user/logout`, {
        withCredentials: true,
      });
      if (result) {
        dispatch(setUser(null));
        toast.success(result.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log("error in logout", error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="h-16 w-full flex items-center justify-between px-4 md:px-20 shadow-sm border-b">
      {/* Logo */}
      <h1 onClick={() => navigate("/")} className="cursor-pointer">
        <span className="text-2xl font-bold text-blue-950">JOB</span>
        <span className="text-xl font-semibold text-red-700">PORTAL</span>
      </h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        <ul className="flex gap-6 text-gray-700 font-medium">
          {user && user.role === "recruiter" ? (
            <>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/admin/jobs"}>Jobs</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/jobs"}>Jobs</Link>
              </li>
              <li>
                <Link to={"/browse"}>Browse</Link>
              </li>
            </>
          )}
        </ul>

        {!user && (
          <div className="flex gap-2">
            <Link to="/login">
              <Button className="bg-white text-black border-2 hover:border-blue-800 hover:bg-white">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-blue-700 hover:bg-blue-800">SignUp</Button>
            </Link>
          </div>
        )}

        {user && (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  className="object-cover"
                  src={user?.profile?.profilePhoto}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    className="object-cover"
                    src={user?.profile?.profilePhoto}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <h1>{user?.fullname}</h1>
                  <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
                </div>
              </div>

              {user && user.role === "student" && (
                <div className="flex items-center mt-2">
                  <User2 />
                  <Link to={"/viewprofile"}>
                    <Button variant="link">View Profile</Button>
                  </Link>
                </div>
              )}

              <div className="flex items-center">
                <LogOut className="ml-1 h-5 w-5" />
                <Button onClick={logoutHandler} variant="link">
                  Logout
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg border-t p-4 flex flex-col gap-4 md:hidden z-50">
          <ul className="flex flex-col gap-3 text-gray-700 font-medium">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link onClick={() => setMobileOpen(false)} to={"/"}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link onClick={() => setMobileOpen(false)} to={"/admin/jobs"}>
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link onClick={() => setMobileOpen(false)} to={"/"}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link onClick={() => setMobileOpen(false)} to={"/jobs"}>
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link onClick={() => setMobileOpen(false)} to={"/browse"}>
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          {!user && (
            <div className="flex flex-col gap-2">
              <Link to="/login" onClick={() => setMobileOpen(false)}>
                <Button className="bg-white text-black border-2 hover:border-blue-800 hover:bg-white w-full">
                  Login
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setMobileOpen(false)}>
                <Button className="bg-blue-700 hover:bg-blue-800 w-full">
                  SignUp
                </Button>
              </Link>
            </div>
          )}

          {user && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    className="object-cover"
                    src={user?.profile?.profilePhoto}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>{user?.fullname}</span>
              </div>
                 <div className="flex items-center mt-2">
                  <User2 />
                  <Link to={"/viewprofile"}>
                    <Button variant="link">View Profile</Button>
                  </Link>
                </div>
              <Button
                onClick={() => {
                  logoutHandler();
                  setMobileOpen(false);
                }}
                variant="link"
              >
                Logout
              </Button>
          
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Nav;
