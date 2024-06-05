import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Chip } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import defaultLogo from "../assets/logo.png";
import defaultPhoto from "../assets/employerPhoto/default.jpeg";
import client, { baseUrl } from "../utils/request";
import CopyToClipboardModal from "../components/JobDescription/CopyToClipboardModal";
import { Rate, message, notification } from "antd";
import { useSelector } from "react-redux";

const getButtonTitle = (userInfo, job) => {
  if (job?.status !== "Opening") {
    return "View Only";
  }

  if (!userInfo) {
    return "Apply";
  }

  if (userInfo.role === "employer") {
    return "Unappliable Role";
  }

  if (job.applicants.some((appt) => appt.employeeId === userInfo.id)) {
    return "Pending";
  }

  return "Apply";
};

const getButtonDisabled = (userInfo, job) => {
  if (job?.status !== "Opening") {
    return true;
  }

  if (!userInfo) {
    return false;
  }

  if (userInfo.role === "employer") {
    return true;
  }

  if (job.applicants.some((appt) => appt.employeeId === userInfo.id)) {
    return true;
  }

  return false;
};

const JobDescription = () => {
  const { jobId } = useParams();
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
  const [employerRatings, setEmployerRatings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const userInfo = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();
  const [refreshToken, setRefreshToken] = useState(1.0);

  useEffect(() => {
    if (!job || !job.ownerId) {
      return;
    }
    client
      .get("/rating/getAllRatings", { params: { userId: job.ownerId } })
      .then((resp) => {
        setEmployerRatings(resp.data);
      });
  }, [job]);

  useEffect(() => {
    const getJob = async () => {
      try {
        const response = await client.get(`/jobs/${jobId}`);
        console.log("response: ", response.data);
        let jobData = { ...response.data };
        // jobData.ownerRating = parseFloat((Math.random() * 5).toFixed(1));
        // jobData.applicants = new Array(Math.floor(Math.random() * 100)).fill({
        //   name: "",
        //   age: 0,
        //   position: "",
        // });
        setJob(jobData);
      } catch (error) {
        console.error("All jobs fetching err:", error);
      }
    };
    getJob();
  }, [jobId, refreshToken]);

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
  return (
    <div id="jobDescription" className="flex flex-row mt-5 font-sans">
      <div id="jobDetails" className="basis-2/3 mx-10">
        <div id="title" className="flex flex-row align-middle">
          <h1 id="jobtitle" className="text-2xl font-bold">
            {job?.title}
          </h1>
        </div>
        <div
          id="employerInfo"
          className="flex flex-row"
          style={{ marginTop: "16px" }}
        >
          <div id="employeeLogo" className="flex flex-row basis-2/3 flex-1">
            {job?.logo ? (
              <img
                key={job.id}
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
              <span>{job?.category}</span>
              <span>Posted: {job?.createdAt.substring(0, 10)}</span>
              <span>Status: {job?.status}</span>
              <span>Applicants: {job?.applicants.length}</span>
            </p>
          </div>
          <div
            id="textInfo"
            className="basis-2/3 flex-1 flex flex-col justify-items-start"
          >
            <div id="name" className="flex flex-row justify-between">
              <p className="font-bold">{job?.ownerInfo.name}</p>
              <div className="flex flex-row">
                <Rating
                  name="half-rating-read"
                  style={{ marginRight: "16px" }}
                  value={job?.ownerRating}
                  precision={0.5}
                  readOnly
                />
                {job?.ownerRating?.toFixed(1)}
              </div>
            </div>
            <div id="wage">
              <span>Hourly rate: </span>
              {`${job?.salaryStart} - ${job?.salaryEnd} AUD/hour`}
            </div>
            <div id="location" className="flex flex-row justify-between">
              <span>Location: {job?.location}</span>
              <span>Email: {job?.ownerInfo.email}</span>
            </div>
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              {job?.tags.length ? (
                <>
                  <span>tags: </span>
                  {job?.tags.map((tag, index) => (
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
          {job?.image == null ? (
            <img key={job.id} src={defaultPhoto} alt="Default" />
          ) : (
            <img
              key={job?.id}
              src={baseUrl + `/files/${job.image}`}
              alt="photo"
            />
          )}
        </div>
        <div
          id="jobDetails"
          className="mt-10 text-justify"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {/* <pre>{job?.description}</pre> */}
          {job?.description}
        </div>
        <div id="review" className="mt-10 text-justify">
          <div className="text-lg font-semibold border-b border-b-zinc-600">
            Review
          </div>
          {employerRatings.length === 0 ? (
            <p>No reviews yet. Be the first to rate the employer!</p>
          ) : (
            employerRatings.map((item) => (
              <div
                id={item.id}
                key={item.id}
                className="border-b border-b-zinc-300 mt-2"
                style={{ paddingBottom: "16px" }}
              >
                Rating:
                <Rate
                  allowHalf
                  defaultValue={item.rate}
                  style={{ margin: "0 16px" }}
                />
                {item.rate}
                <div style={{ marginTop: "16px" }}>
                  from <b>{item.rater.name}</b>
                  <div style={{ whiteSpace: "pre-wrap", marginTop: "16px" }}>
                    {item.comment}
                  </div>
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
            <Button
              variant="contained"
              disabled={getButtonDisabled(userInfo, job)}
              onClick={async () => {
                if (!userInfo) {
                  message.warning("Please login first to apply the job");
                  navigate("/login");
                  return;
                }

                if (userInfo.role === "employer") {
                  message.warning("You cannot apply for this job");
                  return;
                }

                try {
                  const resp = await client.post("/applications/submit", {
                    jobId: job.id,
                    note: "",
                  });
                  console.log(resp.data);
                  notification.success({
                    placement: "bottomRight",
                    message: "Applied",
                    description: "Successfully submitted application",
                  });
                  setRefreshToken(Math.random());
                } finally {
                }
              }}
            >
              {getButtonTitle(userInfo, job)}
            </Button>
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
