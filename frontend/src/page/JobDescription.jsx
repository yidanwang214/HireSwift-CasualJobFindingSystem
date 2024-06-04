import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Chip } from "@mui/material";
import { useParams } from "react-router-dom";
import defaultLogo from "../assets/logo.png";
import defaultPhoto from "../assets/employerPhoto/default.jpeg";
import client from "../utils/request";
import CopyToClipboardModal from "../components/JobDescription/CopyToClipboardModal";

const reviews = [
  {
    id: 1,
    pros: ["good pay", "good manager"],
    cons: ["long commute"],
    rating: 4.5,
  },
  {
    id: 2,
    pros: ["good staff meal"],
    cons: ["low pay rate"],
    rating: 4.2,
  },
];

const JobDescription = () => {
  const { jobId } = useParams();
  console.log(jobId);
  const [job, setJob] = useState({
    tags: [],
    categoryId: null,
    status: "",
    ownerId: "",
    title: "",
    description: "",
    location: "",
    contact: "",
    salaryStart: 0,
    salaryEnd: 0,
    createdAt: "",
    updatedAt: "",
    id: "",
    category: "",
    ownerInfo: {},
    ownerRating: 0,
    applicants: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getJob = async () => {
      try {
        const response = await client.get(`/jobs/${jobId}`);
        console.log("response: " + JSON.stringify(response.data));
        let jobData = { ...response.data };
        jobData.ownerRating = parseFloat((Math.random() * 5).toFixed(1));
        jobData.applicants = new Array(Math.floor(Math.random() * 100)).fill({
          name: "",
          age: 0,
          position: "",
        });
        setJob(jobData);
      } catch (error) {
        console.error("All jobs fetching err:", error);
      }
    };
    getJob();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const copyUrlToClipboard = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        setIsModalOpen(true);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  const {
    tags,
    categoryId,
    status,
    ownerId,
    title,
    description,
    location,
    contact,
    salaryStart,
    salaryEnd,
    createdAt,
    updatedAt,
    id,
    category,
    ownerInfo,
    ownerRating,
    applicants,
  } = job;
  return (
    <div id="jobDescription" className="flex flex-row mt-5 font-sans">
      <div id="jobDetails" className="basis-2/3 mx-10">
        <div id="title" className="flex flex-row align-middle">
          <h1 id="jobtitle" className="text-2xl font-bold">
            {title}
          </h1>
        </div>
        <div id="employerInfo" className="flex flex-row">
          <div id="employeeLogo" className="flex flex-row basis-2/3 flex-1">
            {job.logo ? (
              <img
                key={id}
                src={job.logo}
                alt="Employer Logo"
                width={150}
                height={150}
              />
            ) : (
              <img
                key={0}
                src={defaultLogo}
                alt="defaultLogo"
                width={100}
                height={100}
              />
            )}
            <p className="flex flex-col ml-6">
              <span>{category}</span>
              <span>Posted: {createdAt.substring(0, 10)}</span>
              <span>Status: {status}</span>
              <span>Applicants: {applicants.length}</span>
            </p>
          </div>
          <div
            id="textInfo"
            className="basis-2/3 flex-1 flex flex-col justify-items-start"
          >
            <div id="name" className="flex flex-row justify-between">
              <p className="font-bold">{ownerInfo.name}</p>
              <div className="flex flex-row">
                <Rating
                  name="half-rating-read"
                  value={job.ownerRating}
                  precision={0.5}
                  readOnly
                />
                {job.ownerRating}
              </div>
            </div>
            <div id="wage">
              <span>Hourly wage: </span>
              {`${salaryStart} - ${salaryEnd} AUD/hour`}
            </div>
            <div id="location" className="flex flex-row justify-between">
              <span>Location: {location}</span>
              <span>Email: {ownerInfo.email}</span>
            </div>
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              {tags.length ? (
                <>
                  <span>tags: </span>
                  {tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      variant="outlined"
                      size="small"
                    />
                  ))}
                </>
              ) : null}
            </Stack>
          </div>
        </div>
        <div id="employeerPhoto" className="mt-10">
          {job.photo == null ? (
            <img key={id} src={defaultPhoto} alt="Default" />
          ) : (
            <img key={id} src={job.photo} alt="photo" />
          )}
        </div>
        <div id="jobDetails" className="mt-10 text-justify">
          {description}
        </div>
        <div id="review" className="mt-10 text-justify">
          <div className="text-lg font-semibold border-b border-b-zinc-600">
            Review
          </div>
          {!reviews ? (
            <p>No reviews yet. Be the first to rate the employer!</p>
          ) : (
            reviews.map((item) => (
              <div
                id={item.id}
                key={item.id}
                className="border-b border-b-zinc-300 mt-2"
              >
                Rating: {item.rating}
                <div key={`pros${item.id}`}>
                  Pros:{" "}
                  {item.pros.map((item) => (
                    <div className="ml-5">- {item}</div>
                  ))}
                </div>
                <div key={`cons${item.id}`}>
                  Cons:{" "}
                  {item.cons.map((item) => (
                    <div className="ml-5 mb-2">- {item}</div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div
        id="apply"
        className="basis-1/3 mx-10 rounded-md border-2 border-slate-400 h-3/4 items"
      >
        <div className="p-2">
          <Stack direction="column" spacing={2}>
            <Button variant="contained">Apply</Button>
            <Button variant="contained" onClick={copyUrlToClipboard}>
              Refer to my friend
            </Button>
          </Stack>
        </div>
        <CopyToClipboardModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};
export default JobDescription;
