import React from "react";
import Jobcard from "../share/Jobcard";
import FilterCard from "../share/FilterCard";
import Nav from "../share/Nav";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { setSearchJobByText, setSearchQuery } from "../../redux/jobSlice";

// const jobarray = [1,2,3,4,5,3,3,3,3,3,3,3,3,6,7,8]

const Jobs = () => {
  const { allJobs, searchQuery,searchJobByText } = useSelector((store) => store.job);
  // console.log(allJobs,"job")
  const [filter, setfilter] = useState(allJobs);
    const [query, setquery] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // const setSearchHandeler = () => {
  //   dispatch(setSearchQuery(query))
  //   // navigate("/browse")
  // }

  const handleInputChange = (e) => {
  const value = e.target.value;
  setquery(value);
  dispatch(setSearchJobByText(value)); // sirf input pe dispatch
};
  
useEffect(() => {

   let filtered = allJobs;

     if (typeof searchJobByText === "string" && searchJobByText.length > 0) {

    // Agar string hai → simple search
    filtered = filtered.filter(
      (job) =>
        job.title.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job.description.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job.location.toLowerCase().includes(searchJobByText.toLowerCase())
    );
    // setfilter(filteredJob);
  }

  if (Array.isArray(searchQuery) && searchQuery.length > 0) {
    // Agar array hai → multiple filters ka check
     filtered = filtered.filter((job) => {
      return searchQuery.some((query) =>
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.description.toLowerCase().includes(query.toLowerCase()) ||
        job.location.toLowerCase().includes(query.toLowerCase())
      );
    });
    // setfilter(filteredJob);
  } 
  

    setfilter(filtered);

}, [allJobs, searchQuery,query,searchJobByText]);


  // useEffect(() => {
  //   if (searchQuery) {
  //     const filteredJob = allJobs.filter((job) => {
  //       return (
  //         job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //         job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //         job.location.toLowerCase().includes(searchQuery.toLowerCase())
  //       );
  //       //  job.salary.includes(searchQuery.toLowerCase())
  //     });
  //     setfilter(filteredJob);
  //   } else {
  //     setfilter(allJobs);
  //   }
  // }, [allJobs, searchQuery]);
  return (
    <div className="fixed h-full w-full">
      <Nav />
       {/* Search Bar */}
      <div className='w-full flex items-center justify-end mt-3 p-2 mb-5'>
        <div className='flex w-full sm:w-3/4 md:w-2/3 lg:w-2/9 shadow-lg border border-gray-200 rounded-full overflow-hidden'>
          <input
            type="text"
            onChange={handleInputChange}
            className='flex-grow p-2 pl-4 outline-none text-sm sm:text-base'
            placeholder='Find your dream jobs'
          />
          {/* <Button
           
            className="rounded-none h-10 w-10 sm:w-16 bg-blue-800 flex items-center justify-center"
          >
            <Search className='w-5 h-5 sm:w-6 sm:h-6' />
          </Button> */}
        </div>
      </div>

      <div className="flex justify-center ">
        {/* //filter */}

        <div className="w-[20%] flex justify-center">
          <FilterCard />
        </div>

        <div className="flex items-center justify-center w-full gap-5 h-[calc(100vh-160px)] flex-wrap overflow-y-scroll">
          {/* //jobcards */}
          {filter.map((data) => (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <Jobcard id={data.id} job={data} />
            </motion.div>
          ))}
        </div>
       
      </div>
    </div>
  );
};

export default Jobs;
