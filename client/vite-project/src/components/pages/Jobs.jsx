import React from "react";
import Jobcard from "../share/Jobcard";
import FilterCard from "../share/FilterCard";
import Nav from "../share/Nav";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";

// const jobarray = [1,2,3,4,5,3,3,3,3,3,3,3,3,6,7,8]

const Jobs = () => {
  const { allJobs, searchQuery } = useSelector((store) => store.job);
  // console.log(allJobs,"job")
  const [filter, setfilter] = useState(allJobs);

  useEffect(() => {
    if (searchQuery) {
      const filteredJob = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
        //  job.salary.includes(searchQuery.toLowerCase())
      });
      setfilter(filteredJob);
    } else {
      setfilter(allJobs);
    }
  }, [allJobs, searchQuery]);
  return (
    <div className="fixed h-full w-full">
      <Nav />
      <div className="flex justify-center ">
        {/* //filter */}

        <div className="w-[20%] flex justify-center">
          <FilterCard />
        </div>

        <div className="flex items-center justify-center w-full gap-5 h-180 flex-wrap overflow-y-scroll">
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
