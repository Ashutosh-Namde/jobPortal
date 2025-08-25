import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Nav from "../share/Nav";
import axios from "axios";
import { API } from "../utils/context";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "../../redux/jobSlice";
import { toast } from "sonner";
import store from "../../redux/store";

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${API}/application/applyJob/${jobId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [
            ...singleJob.applications,
            { applicant: user?._id },
          ],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(error, "error in apply job");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${API}/job/singleJob/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log("error in get single job", error);
        toast.error(error.response?.data?.message || "Error fetching job");
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div>
      <Nav />
      <div className="max-w-7xl mx-auto my-8 px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-bold text-xl md:text-2xl">
              {singleJob?.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <Badge className="text-blue-700 font-bold" variant="ghost">
                {singleJob?.position} Positions
              </Badge>
              <Badge className="text-[#F83002] font-bold" variant="ghost">
                {singleJob?.jobType}
              </Badge>
              <Badge className="text-[#7209b7] font-bold" variant="ghost">
                {singleJob?.salary} LPA
              </Badge>
            </div>
          </div>

          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`rounded-lg w-full md:w-auto ${
              isApplied
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[#7209b7] hover:bg-[#5f32ad]"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>

        {/* Job Description Section */}
        <h1 className="border-b-2 border-b-gray-300 font-medium py-4 mt-6">
          Job Description
        </h1>
        <div className="my-4 space-y-3 text-sm md:text-base">
          <p className="font-bold">
            Role:{" "}
            <span className="pl-2 font-normal text-gray-800">
              {singleJob?.title}
            </span>
          </p>
          <p className="font-bold">
            Location:{" "}
            <span className="pl-2 font-normal text-gray-800">
              {singleJob?.location}
            </span>
          </p>
          <p className="font-bold">
            Description:{" "}
            <span className="pl-2 font-normal text-gray-800">
              {singleJob?.description}
            </span>
          </p>
          <p className="font-bold">
            Experience:{" "}
            <span className="pl-2 font-normal text-gray-800">
              {singleJob?.experience} yrs
            </span>
          </p>
          <p className="font-bold">
            Salary:{" "}
            <span className="pl-2 font-normal text-gray-800">
              {singleJob?.salary} LPA
            </span>
          </p>
          <p className="font-bold">
            Total Applicants:{" "}
            <span className="pl-2 font-normal text-gray-800">
              {singleJob?.applications?.length}
            </span>
          </p>
          <p className="font-bold">
            Posted Date:{" "}
            <span className="pl-2 font-normal text-gray-800">
              {singleJob?.createdAt?.split("T")[0]}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
