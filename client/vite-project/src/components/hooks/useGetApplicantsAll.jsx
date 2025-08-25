import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { API } from '../utils/context'
import { toast } from 'sonner'
import {  setAllAppliedJob } from '../../redux/jobSlice'
import { useDispatch } from 'react-redux'

const useGetApplicantsAll = () => {
    const dispatch = useDispatch()
  useEffect(()=>{
   const getAllApplicants = async()=>{
   try {
     const res = await axios.get(`${API}/application/get`,{withCredentials:true})
    if(res.data.success){
        console.log(res.data,"data");
        dispatch(setAllAppliedJob(res.data.application))
        toast.success(res.data.success)
        
    }
   } catch (error) {
    console.log("error in get all applicant",error);
    toast.error(error.response.data.message)
    
   }
   }
     getAllApplicants()
  },[])

}

export default useGetApplicantsAll