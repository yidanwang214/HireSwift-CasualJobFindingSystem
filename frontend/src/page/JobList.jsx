import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Divider,
  Box,
  RadioGroup,
  Radio,
  TextField,
} from "@mui/material";
import { FavoriteBorder, Favorite, LocationOn } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { categories } from "../components/JobPublishForm/JobPublish";
import { Link } from "react-router-dom";
import client from "../utils/request";
import axios from "axios";

const hourlyWage = [
  { id: 100, category: "$22 to $24" },
  { id: 101, category: "$25 to $30" },
  { id: 102, category: "$31 to $35" },
  { id: 103, category: "$36+" },
];

const hourlyWageToParams = [
  { salaryStart: 22, salaryEnd: 24 },
  { salaryStart: 25, salaryEnd: 30 },
  { salaryStart: 31, salaryEnd: 35 },
  { salaryStart: 36 },
];

const filterSections = [
  { id: 1, title: "Job Type", data: categories },
  { id: 2, title: "Hourly rate", data: hourlyWage },
];

const truncateDescription = (text, wordLimit) => {
  const words = text.split(/\s+/); // Split the text by any whitespace
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "..."; // Join the first `wordLimit` words and add "..."
  }
  return text;
};

const handleFavoriteChange = (jobId, checked) => {
  if (checked) {
    const fj = localStorage.getItem("favJobs");
    if (fj) {
      localStorage.setItem("favJobs", fj + "," + jobId);
    } else {
      localStorage.setItem("favJobs", jobId);
    }
  } else {
    const fj = localStorage.getItem("favJobs");
    if (fj) {
      const nj = fj
        .split(",")
        .filter((s) => s !== jobId)
        .join(",");
      localStorage.setItem("favJobs", nj);
    }
  }
};

const checkFavorite = (jobId) => {
  const fj = localStorage.getItem("favJobs");
  if (fj) {
    return fj.split(",").some((f) => f === jobId);
  }
  return false;
};

const getFilterChecked = (id, searchParams) => {
  if (id >= 100) {
    if (searchParams.salaryStart) {
      return (
        hourlyWageToParams.findIndex(
          (s) => s.salaryStart === searchParams.salaryStart
        ) ===
        id - 100
      );
    } else {
      return false;
    }
  } else {
    return (
      searchParams.categoryId !== undefined && searchParams.categoryId === id
    );
  }
};

const getFilterDisabled = (id, searchParams) => {
  if (id >= 100) {
    if (searchParams.salaryStart) {
      return (
        hourlyWageToParams.findIndex(
          (s) => s.salaryStart === searchParams.salaryStart
        ) !==
        id - 100
      );
    } else {
      return false;
    }
  } else {
    return (
      searchParams.categoryId !== undefined &&
      searchParams.categoryId !== null &&
      searchParams.categoryId !== id
    );
  }
};

const JobList = () => {
  // Create a state that holds the expansion status of each accordion
  const [expanded, setExpanded] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [searchExpended, setSearchExpended] = useState(true);
  const [searchParams, setSearchParams] = useState({});
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const searchQuery = query.get("search");
    const categoryID = query.get("categoryId");
    setSearchParams((prev) => {
      return {
        ...prev,
        search: searchQuery,
        categoryId: categoryID ? parseInt(categoryID) : undefined,
      };
    });
  }, [location.search]);

  useEffect(() => {
    const ac = new AbortController();
    client
      .post(
        "/jobs/search",
        {
          query: { ...searchParams },
        },
        { signal: ac.signal }
      )
      .then((resp) => {
        setJobs(resp.data);
      })
      .catch((e) => {
        if (axios.isCancel(e)) {
          return;
        }
        console.error(e);
      });
    return () => {
      ac.abort();
    };
  }, [searchParams]);

  const handleFilterChange = (id, checked) => {
    if (checked) {
      if (id >= 100) {
        setSearchParams((prev) => ({
          ...prev,
          ...hourlyWageToParams[id - 100],
        }));
      } else {
        setSearchParams((prev) => ({ ...prev, categoryId: id }));
      }
    } else {
      if (id >= 100) {
        setSearchParams((prev) => ({
          ...prev,
          salaryStart: undefined,
          salaryEnd: undefined,
        }));
      } else {
        setSearchParams((prev) => ({ ...prev, categoryId: undefined }));
      }
    }
  };

  // Set all accordion panels to be expanded by default
  useEffect(() => {
    const allSections = filterSections.map((_, index) => index.toString());
    setExpanded(allSections);
  }, []);

  const handleAccordionChange = (panel) => {
    const currentIndex = expanded.indexOf(panel);
    const newExpanded = [...expanded];

    if (currentIndex === -1) {
      newExpanded.push(panel);
    } else {
      newExpanded.splice(currentIndex, 1);
    }

    setExpanded(newExpanded);
  };

  return (
    <Grid container spacing={2} sx={{ p: 3 }}>
      <Grid item xs={12} md={9}>
        {jobs.length > 0 ? (
          <Typography variant="h6" gutterBottom style={{ marginLeft: "1rem" }}>
            Jobs you might like
          </Typography>
        ) : (
          <Typography variant="h4" gutterBottom style={{ marginLeft: "1rem" }}>
            Sorry, we did not find what you were looking for.
          </Typography>
        )}

        {jobs.map((job, index) => (
          <Box key={index} sx={{ mb: 2, ml: 3, position: "relative" }}>
            <CardContent sx={{ pb: 0 }}>
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                defaultChecked={checkFavorite(job.id)}
                onChange={(e) => handleFavoriteChange(job.id, e.target.checked)}
                sx={{ position: "absolute", top: 16, right: 16 }}
              />
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {<Link to={`/jobdescription/${job.id}`}>{job.title}</Link>}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontSize: 12, marginLeft: 1 }}
                >
                  Posted: {job.createdAt.substring(0, 10)}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontSize: 12, marginLeft: 1 }}
                >
                  Status: {job.status}
                </Typography>
              </div>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Rating
                  name="company-rating"
                  value={parseFloat(job.ownerRating)}
                  readOnly
                  precision={0.5}
                  size="small" // Making the stars smaller to fit in line
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
                <Box sx={{ ml: 1, fontSize: "0.875rem" }}>
                  {job.ownerRating?.toFixed(1)}
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {job.ownerInfo.name}
                </Typography>
                <LocationOn fontSize="small" />
                <Typography variant="body2" color="text.secondary">
                  {job.location}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{ mt: 1 }}
              >
                <VerifiedUserIcon color="success" fontSize="small" />
                <Typography variant="body2" color="text.secondary">
                  Payment verified
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ ml: 2 }}
                >
                  Hourly rate: {`${job.salaryStart} - ${job.salaryEnd}`}
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ mt: 2 }}>
                {truncateDescription(job.description, 50)}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                {job.tags.map((tag, tagIndex) => (
                  <Chip
                    key={tagIndex}
                    label={tag}
                    variant="outlined"
                    size="small"
                  />
                ))}
              </Stack>
              <Typography
                variant="caption"
                display="block"
                sx={{ color: "text.secondary", mt: 1 }}
              >
                Applicants: {job.applicants.length}
              </Typography>
            </CardContent>
            {index !== jobs.length - 1 && (
              <Divider sx={{ mx: "auto", width: "95%", my: 2 }} />
            )}
          </Box>
        ))}
      </Grid>
      <Grid item xs={12} md={3}>
        <Typography variant="h6" gutterBottom style={{ fontSize: "1rem" }}>
          Filters
        </Typography>
        <Accordion
          square
          elevation={0}
          expanded={searchExpended}
          onChange={() => setSearchExpended((prev) => !prev)}
          sx={{
            border: "none",
            boxShadow: "none",
            "&:before": { display: "none" },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography style={{ fontSize: "0.9rem" }}>Search</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ paddingTop: 0, paddingBottom: 0 }}>
            <TextField
              label="Search Pattern"
              variant="standard"
              fullWidth
              value={searchParams.search ?? ""}
              onChange={(e) => {
                const v = e.target.value;
                setSearchParams((prev) => ({
                  ...prev,
                  search: v ? v : undefined,
                }));
              }}
            />
          </AccordionDetails>
        </Accordion>
        {filterSections.map((section, index) => (
          <Accordion
            key={index}
            square
            elevation={0}
            expanded={expanded.includes(index.toString())}
            onChange={() => handleAccordionChange(index.toString())}
            sx={{
              border: "none",
              boxShadow: "none",
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography style={{ fontSize: "0.9rem" }}>
                {section.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ paddingTop: 0, paddingBottom: 0 }}>
              <FormGroup>
                {section.data.map((item) => (
                  <FormControlLabel
                    key={item.category}
                    control={
                      <Checkbox
                        id={(section.id + "_" + item.id).toString()}
                        name={item.category}
                        size="small"
                        onChange={(event) => {
                          handleFilterChange(item.id, event.target.checked);
                        }}
                        checked={getFilterChecked(item.id, searchParams)}
                        disabled={getFilterDisabled(item.id, searchParams)}
                      />
                    }
                    label={item.category}
                    sx={{
                      margin: "0px 0", // Reduced vertical margin
                      "& .MuiTypography-root": {
                        // Targeting the Typography within FormControlLabel
                        fontSize: "0.85rem", // Smaller font size
                      },
                      "& .MuiFormControlLabel-label": {
                        // Targeting the label directly for compact spacing
                        margin: "0 2px", // Adjust horizontal spacing if needed
                      },
                    }}
                  />
                ))}
              </FormGroup>
            </AccordionDetails>
          </Accordion>
        ))}
      </Grid>
    </Grid>
  );
};

export default JobList;
