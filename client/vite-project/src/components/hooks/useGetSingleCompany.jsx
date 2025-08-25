
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { toast } from "sonner";
import { API } from "../utils/context";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs } from "../../redux/jobSlice";
import { setSingleCompany } from "../../redux/companySlice";

const useGetSingleCompany = (companyId) => {
  const dispatch = useDispatch()
//   console.log(companyId);
  
  useEffect(() => {
    const getSingleCompany = async () => {
        try {

            const res =await axios.get(`${API}/company/single/${companyId}`,{withCredentials:true})
            if(res.data.success){
                dispatch(setSingleCompany(res.data.company))
                console.log(res.data.company,"use effect");
                
            }
          
        } catch (error) {
        console.log("Error in get all jobs:", error);
        // dispatch(setAllJobs([])); // fallback
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    };
getSingleCompany()
  }, [companyId, dispatch]);
  
}

export default useGetSingleCompany