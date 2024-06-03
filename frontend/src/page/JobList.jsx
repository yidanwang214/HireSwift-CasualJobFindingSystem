import React, { useState, useEffect } from 'react';
import {
    Typography, Grid, Card, CardContent, Chip, Stack, IconButton,
    Accordion, AccordionSummary, AccordionDetails, Checkbox, FormControlLabel, FormGroup,Divider,Box
} from '@mui/material';
import { FavoriteBorder,Favorite, LocationOn} from '@mui/icons-material'; 
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { Link, json } from 'react-router-dom';
import {categories} from '../components/JobPublishForm/JobPublish';
import client from "../utils/request";

const hourlyWage = [
    { id: 1, category: "$22 to $24"},
    { id: 2, category: "$25 to $30"},
    { id: 3, category: "$31 to $35"},
    { id: 4, category: "$36+"}
];

const filterSections = [
    { id: 1, title: "Job Type", data: categories },
    { id: 2, title: "Hourly wage", data: hourlyWage },
];

const truncateDescription = (text, wordLimit) => {
    const words = text.split(/\s+/);  // Split the text by any whitespace
    if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(" ") + "...";  // Join the first `wordLimit` words and add "..."
    }
    return text;
};

const JobList = () => {
    const [expanded, setExpanded] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [disabledCheckboxes, setDisabledCheckboxes] = useState({});

    useEffect(() => {
        const allSections = filterSections.map((_, index) => index.toString());
        setExpanded(allSections);

        const initializeCheckboxes = () => {
            let checkboxes = {};
            filterSections.forEach(section => {
                section.data.forEach(item => {
                    checkboxes[`${section.id}_${item.id}`] = false;
                });
            });
            setDisabledCheckboxes(checkboxes);
        };
        initializeCheckboxes();

        // request all jobs from backend
        const getAllJobs = async () => {
            try {
              const response = await client.post('/jobs/list', {
                "query": {},
                "page": 1,
                "limit": 99,
              });
              const updatedJobs = response.data.results.map(job => ({
                ...job,
                ownerRating: (Math.random()*5).toFixed(1)
              }));
              setJobs(updatedJobs);
            } catch (error) {
              console.error('All jobs fetching err:', error);
            }
          };
          getAllJobs(); 
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
    const handleFilter = (sectionId, item, target) => {
        setSelectedFilters((prev) => {
            let tmpFilters = [...prev];
            const isFilterSelected = tmpFilters.some(filter => filter.sectionId === sectionId && filter.categoryId === item.id);
            if (target.checked) { // add the current item to filters
                if (!isFilterSelected) {
                    tmpFilters.push({ sectionId, categoryId: item.id });
                }
                // disable other checkboxes in the same section
                setDisabledCheckboxes(prevDisabled => {
                    let newDisabled = { ...prevDisabled };
                    filterSections.find(section => section.id === sectionId).data.forEach(filterItem => {
                        if (filterItem.id !== item.id) {
                            newDisabled[`${sectionId}_${filterItem.id}`] = true;
                        }
                    });
                    return newDisabled;
                });
            } else { // unselect a checkbox, remove the current item from filters
                tmpFilters = tmpFilters.filter(filter => !(filter.sectionId === sectionId && filter.categoryId === item.id));
                // enable other checkboxes in the same section
                setDisabledCheckboxes(prevDisabled => {
                    let newDisabled = { ...prevDisabled };
                    filterSections.find(section => section.id === sectionId).data.forEach(filterItem => {
                        newDisabled[`${sectionId}_${filterItem.id}`] = false;
                    });
                    return newDisabled;
                });
            }
            
            return tmpFilters;
        }) 
    }
    
    useEffect(() => {
        const getFilteredJobs = async () => {
            let query = {};
            selectedFilters.forEach((filter) => {
                if (filter.sectionId === 1) {
                    query.categoryId = filter.categoryId;
                } else {
                    let salaryStart;
                    let salaryEnd;
                    if (filter.categoryId === 1) {
                        salaryStart = 22;
                        salaryEnd = 24;
                    } else if (filter.categoryId === 2) {
                        salaryStart = 25;
                        salaryEnd = 30;
                    } else if (filter.categoryId === 3) {
                        salaryStart = 31;
                        salaryEnd = 35;
                    } else {
                        salaryStart = 36;
                        salaryEnd = 100;
                    }
                    query.salaryStart = salaryStart;
                    query.salaryEnd = salaryEnd;
                }
            });
            try {
              const response = await client.post('/jobs/list', {
                "query": query,
                "page": 1,
                "limit": 99,
              });
              const updatedJobs = response.data.results.map(job => ({
                ...job,
                ownerRating: (Math.random()*5).toFixed(1)
              }));
              setJobs(updatedJobs);
            } catch (error) {
              console.error('All jobs fetching err:', error);
            }
          };
          getFilteredJobs();
    }, [selectedFilters])

    return (
        <Grid container spacing={2} sx={{ p: 3 }}>
            <Grid item xs={12} md={9}>
                <Typography variant="h6" gutterBottom style={{ marginLeft: '1rem' }}>
                    Jobs you might like
                </Typography>
                {jobs.map((job, index) => (
                    <Box key={index} sx={{ mb: 2, ml: 3, position: 'relative' }}>
                        <CardContent sx={{ pb: 0 }}>
                            <Checkbox
                                icon={<FavoriteBorder />}
                                checkedIcon={<Favorite />}
                                checked={job.favorited} 
                                onChange={() => handleFavoriteChange(index)}
                                sx={{ position: 'absolute', top: 16, right: 16 }}
                            />
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="h6" fontWeight="bold" gutterBottom>
                                    {<Link to={`/jobdescription/${job.id}`}>{job.title}</Link>}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: 12, marginLeft: 1 }}>
                                    Posted: {job.createdAt.substring(0,10)}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: 12, marginLeft: 1 }}>
                                    Status: {job.status}
                                </Typography>
                            </div>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Rating
                                    name="company-rating"
                                    value={parseFloat(job.ownerRating)}
                                    readOnly
                                    precision={0.5}
                                    size="small"  // Making the stars smaller to fit in line
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />
                                <Box sx={{ ml: 1, fontSize: '0.875rem' }}>
                                    {job.ownerRating}
                                </Box>
                                <LocationOn fontSize="small" />
                                <Typography variant="body2" color="text.secondary">
                                    {job.ownerInfo.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {job.location}
                                </Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 1 }}>
                                <VerifiedUserIcon color="success" fontSize="small"/>
                                <Typography variant="body2" color="text.secondary">
                                    Payment verified
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                                    Hourly wage: {`${job.salaryStart} - ${job.salaryEnd}`}
                                </Typography>
                            </Stack>
                            <Typography variant="body2" sx={{ mt: 2 }}>
                                {truncateDescription(job.description, 50)}
                            </Typography>
                            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                                {job.tags.map((tag, tagIndex) => (
                                    <Chip key={tagIndex} label={tag} variant="outlined" size="small" />
                                ))}
                            </Stack>
                            <Typography variant="caption" display="block" sx={{ color: 'text.secondary', mt: 1 }}>
                                Applicants: {job.applicants.length}
                            </Typography>
                        </CardContent>
                        {index !== jobs.length - 1 && <Divider sx={{ mx: 'auto', width: '95%', my: 2 }} />}
                    </Box>
                ))}
            </Grid>
            <Grid item xs={12} md={3}>
                <Typography variant="h6" gutterBottom style={{ fontSize: '1rem' }}>
                    Filters
                </Typography>
                {filterSections.map((section, index) => (
                    <Accordion
                        key={index}
                        square
                        elevation={0}
                        expanded={expanded.includes(index.toString())}
                        onChange={() => handleAccordionChange(index.toString())}
                        sx={{ border: 'none', boxShadow: 'none', '&:before': { display: 'none' } }}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography style={{ fontSize: '0.9rem' }}>{section.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ paddingTop: 0, paddingBottom: 0 }}>
                            <FormGroup id={`formGroup-${section.id}`}>
                                {section.data.map(item => (
                                    <FormControlLabel
                                        key={item.category}
                                        control={
                                            <Checkbox 
                                                id={(section.id + "_" + item.id).toString()}
                                                name={item.category}
                                                size="small"
                                                onChange={(event) => {
                                                    handleFilter(section.id, item, event.target);
                                                }}
                                                disabled={disabledCheckboxes[`${section.id}_${item.id}`] && !selectedFilters.some(filter => filter.sectionId === section.id && filter.categoryId === item.id)}
                                            />
                                        }
                                        label={item.category}
                                        sx={{
                                            margin: '0px 0',
                                            '& .MuiTypography-root': {
                                                fontSize: '0.85rem',
                                            },
                                            '& .MuiFormControlLabel-label': {
                                                margin: '0 2px',
                                            }
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