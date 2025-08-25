import { createSlice } from "@reduxjs/toolkit";
import { setAllApplicants } from "./applicantsSlice";

const jobSlice = createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        singleJob:null,
        allAdminJobs:[],
        searchJobByText:"",
        allAppliedJob:[],
        searchQuery:""
    },
    reducers:{
     setAllJobs:(state,action)=>{
        state.allJobs = action.payload
     } ,
      setSingleJob:(state,action)=>{
        state.singleJob = action.payload
     }  ,
     setAllAdminJobs:(state,action)=>{
        state.allAdminJobs = action.payload
     }  ,
     setSearchJobByText:(state,action)=>{
        state.searchJobByText = action.payload
     },
     setAllAppliedJob:(state,action)=>{
      state.allAppliedJob = action.payload
     },
     setSearchQuery:(state,action)=>{
      state.searchQuery = action.payload
     }
    }
})

export const{setAllJobs,setSingleJob,setAllAdminJobs,setSearchJobByText,setAllAppliedJob,setSearchQuery} = jobSlice.actions;
export default jobSlice.reducer;