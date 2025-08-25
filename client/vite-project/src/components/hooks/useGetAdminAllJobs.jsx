import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { toast } from "sonner";
import { API } from "../utils/context";
import { useDispatch, useSelector } from "react-redux";
import { setAllAdminJobs, setAllJobs } from "../../redux/jobSlice";

const useGetAdminAllJobs = () => {
    const dispatch = useDispatch()
  useEffect(() => {
    const getAllAdminJobs = async () => {
        try {

            const res =await axios.get(`${API}/job/adminjobs`,{withCredentials:true})
            if(res.data.success){
                dispatch(setAllAdminJobs(res.data.job))
                // console.log(res.data.job,"admin");
                
            }
          
        } catch (error) {
        console.log("Error in get all jobs:", error);
        // dispatch(setAllJobs([])); // fallback
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    };
getAllAdminJobs()
  }, []);
  
};

export default useGetAdminAllJobs;
