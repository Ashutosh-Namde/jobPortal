import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { toast } from "sonner";
import { API } from "../utils/context";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs } from "../../redux/jobSlice";

const useGetAllJobs = () => {
    const dispatch = useDispatch()
    const {searchQuery} = useSelector(store => store.job)
  useEffect(() => {
    const getAllJobs = async () => {
        try {

            const res =await axios.get(`${API}/job/allJobs?keyword=${searchQuery}`)
            if(res.data.success){
                dispatch(setAllJobs(res.data.job))
                // console.log(res.data);
                
            }
          
        } catch (error) {
        console.log("Error in get all jobs:", error);
        // dispatch(setAllJobs([])); // fallback
        dispatch(setAllJobs([])); // purana data hata do

        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    };
getAllJobs()
  }, []);
  
};

export default useGetAllJobs;
