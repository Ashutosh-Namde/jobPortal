import React, { useEffect } from 'react'
import Nav from '../components/share/Nav'
import ApplicantTable from './ApplicantTable'
import axios from 'axios'
import { API } from '../components/utils/context'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import {setAllApplicants} from '../redux/applicantsSlice'

const JobSetup = () => {
  const params = useParams()
  const jobId = params.id
  // console.log(jobId);
  const dispatch = useDispatch()
  const {allApplicants} = useSelector(store => store.applicant)
  // console.log(allApplicants,"app");

  useEffect(()=>{
     
        const fetchAllApplicants = async ()=>{
          try{
      const res = await axios.get(`${API}/application/${jobId}/applicants`,{withCredentials:true})
      if(res.data.success)
        // console.log(res.data);
      dispatch(setAllApplicants(res.data.job))

      
    }
      catch (error) {
     console.log(error,"error in fetch all applicants");
     toast.error(error.response.data.message)
      
     }}
fetchAllApplicants()

  },[])
  
  return (
    <div><Nav/>
    <div className='max-w-7xl mx-auto'>
        <h1>Applicants ({allApplicants?.applications?.length})</h1>
        <ApplicantTable/>
    </div>
    </div>
  )
}

export default JobSetup