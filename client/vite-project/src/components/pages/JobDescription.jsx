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
      <div className="max-w-5xl mx-auto my-10 px-4">
        {/* Job Card */}
        <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="font-extrabold text-2xl md:text-3xl text-gray-900">
                {singleJob?.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <Badge className="bg-blue-100 text-blue-700 font-semibold px-3 py-1">
                  {singleJob?.position} Positions
                </Badge>
                <Badge className="bg-red-100 text-red-700 font-semibold px-3 py-1">
                  {singleJob?.jobType}
                </Badge>
                <Badge className="bg-purple-100 text-purple-700 font-semibold px-3 py-1">
                  {singleJob?.salary} LPA
                </Badge>
              </div>
            </div>

            <Button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied}
              className={`rounded-xl px-6 py-3 w-full md:w-auto font-bold text-white transition-all duration-200 ${
                isApplied
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 shadow-md"
              }`}
            >
              {isApplied ? "Already Applied" : " Apply Now"}
            </Button>
          </div>

          {/* Job Details */}
          <div className="mt-8 border-t pt-6 space-y-4 text-gray-700">
            <h2 className="text-lg font-semibold text-gray-900">
              Job Details
            </h2>
            <p>
              <span className="font-bold">Role:</span>{" "}
              <span className="text-gray-800">{singleJob?.title}</span>
            </p>
            <p>
              <span className="font-bold">Location:</span>{" "}
              <span className="text-gray-800">{singleJob?.location}</span>
            </p>
            <p>
              <span className="font-bold">Description:</span>{" "}
              <span className="text-gray-800">{singleJob?.description}</span>
            </p>
            <p>
              <span className="font-bold">Experience:</span>{" "}
              <span className="text-gray-800">
                {singleJob?.experience} yrs
              </span>
            </p>
            <p>
              <span className="font-bold">Salary:</span>{" "}
              <span className="text-gray-800">{singleJob?.salary} LPA</span>
            </p>
            <p>
              <span className="font-bold">Total Applicants:</span>{" "}
              <span className="text-gray-800">
                {singleJob?.applications?.length}
              </span>
            </p>
            <p>
              <span className="font-bold">Posted Date:</span>{" "}
              <span className="text-gray-800">
                {singleJob?.createdAt?.split("T")[0]}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
