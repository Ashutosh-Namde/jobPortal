import axios from 'axios';
import React, { useEffect } from 'react'
import { toast } from 'sonner';
import { API } from '../utils/context';
import { useDispatch } from 'react-redux';
import { setAllCompany } from '../../redux/companySlice';

const useGetAllCompany = () => {
    const dispatch = useDispatch()
 useEffect(()=>{
    const getAllCompany = async () => {
        try {
            const res = await axios.get(`${API}/company/allCompany`,
               {withCredentials:true,timeout:0}
            )
            if(res.data.success){
              dispatch(setAllCompany(res.data.companies))
            }
            
            
        } catch (error) {
            console.log(error,"error in get all. companies");
            toast.error(error.response.data.message)
            
        }
    }
    getAllCompany()
 },[])
}

export default useGetAllCompany