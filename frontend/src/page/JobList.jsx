import React, { useState, useEffect } from 'react';
import {
    Typography, Grid, Card, CardContent, Chip, Stack, IconButton,
    Accordion, AccordionSummary, AccordionDetails, Checkbox, FormControlLabel, FormGroup,Divider,Box
} from '@mui/material';
import { FavoriteBorder,Favorite, LocationOn} from '@mui/icons-material'; 
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GppBadIcon from '@mui/icons-material/GppBad';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

const jobs = [
    {
        title: "Banner Menu for Bubble Tea",
        company: "Agile Engine",
        description: "We are seeking a graphic designer to create an eye-catching menu banner for our bubble tea shop, similar to popular brands such as Gong Cha. The banner will be prominently displayed and should include photoshopped images of our drinks with various toppings. We need this project completed within three weeks and require multiple revisions to ensure the final product meets our expectations. All necessary resources will be provided upon request.",
        budget: "$100",
        location: "Remote",
        tags: ["Design", "Graphic Design", "Menu Design", "Adobe Photoshop"],
        posted: "1 day ago",
        proposals: "5 to 10",
        paymentVerified: true,
        spent: "$1K+",
        clientRating: 4.5,
        favorited: false
    },
    {
        title: "Wix Web Designer",
        company: "GreatStudio",
        description: "GreatStudio is looking for a talented Wix web designer to overhaul our corporate website. The goal is to enhance visual appeal and improve mobile responsiveness. The ideal candidate will bring innovative design ideas that align with our brand's vision and user experience goals. This is a high-priority project with the potential for future collaboration on additional digital design tasks.",
        budget: "$1000",
        location: "Remote",
        tags: ["Wix", "Web Design", "Web Development"],
        posted: "13 minutes ago",
        proposals: "less than 5",
        paymentVerified: false,
        spent: "$0",
        clientRating: 2.5,
        favorited: true
    },
    {
        title: "Mobile App Developer",
        company: "InnovateStart",
        description: "InnovateStart requires a skilled mobile app developer to lead the creation of a new social networking platform for iOS and Android. The project involves integrating various APIs, ensuring high usability, and maintaining a secure app environment. Experience with React Native or Flutter is highly desirable. We value innovative problem-solving skills and the ability to deliver on tight deadlines.",
        budget: "$3000",
        location: "Remote",
        tags: ["Mobile Development", "React Native", "Flutter", "API"],
        posted: "3 days ago",
        proposals: "10 to 20",
        paymentVerified: true,
        spent: "$3K+",
        clientRating: 4.8,
        favorited: true
    },
    {
        title: "SEO Specialist",
        company: "MarketingGurus",
        description: "MarketingGurus is in search of an SEO Specialist to enhance our company’s online presence. The specialist will be responsible for conducting keyword research, optimizing meta tags, building links, and reporting on SEO performance monthly. A successful candidate will demonstrate a track record of improving Google rankings and driving traffic growth.",
        budget: "$500",
        location: "USA",
        tags: ["SEO", "Digital Marketing", "Google Analytics"],
        posted: "2 hours ago",
        proposals: "less than 10",
        paymentVerified: true,
        spent: "$1K+",
        clientRating: 4.2,
        favorited: false
    },
    {
        title: "Content Writer for Tech Blog",
        company: "TechTrendz",
        description: "TechTrendz is seeking a dynamic content writer to contribute articles on emerging technology trends. The writer should be able to engage a tech-savvy audience through a conversational tone while thoroughly researching topics. The ability to meet deadlines and adapt content to reader feedback is essential.",
        budget: "$150 per article",
        location: "Remote",
        tags: ["Writing", "Content Creation", "Technology"],
        posted: "1 day ago",
        proposals: "20 to 30",
        paymentVerified: true,
        spent: "$500",
        clientRating: 3.3,
        favorited: true
    },
    {
        title: "Freelance Data Analyst",
        company: "DataWise",
        description: "DataWise is looking for a freelance data analyst to turn complex data into actionable insights that can help shape business strategy. The candidate should be proficient in SQL and Python and have experience using data visualization tools like Tableau. The role requires someone who can work independently and communicate findings clearly to non-technical team members.",
        budget: "$1200",
        location: "Remote",
        tags: ["Data Analysis", "SQL", "Python"],
        posted: "5 days ago",
        proposals: "15 to 25",
        paymentVerified: false,
        spent: "$2K+",
        clientRating: 4.0,
        favorited: false
    },
    {
        title: "Video Editor for YouTube Channel",
        company: "StreamVid",
        description: "StreamVid is searching for a creative video editor to craft engaging content for our gaming and tech review YouTube channel. The ideal candidate will have expertise in Adobe Premiere Pro and After Effects and a passion for video storytelling. This role involves close collaboration with content creators to produce videos that captivate and inform our audience.",
        budget: "$200 per video",
        location: "Remote",
        tags: ["Video Editing", "YouTube", "Adobe Premiere", "After Effects"],
        posted: "8 hours ago",
        proposals: "5 to 15",
        paymentVerified: true,
        spent: "$3K+",
        clientRating: 4.5,
        favorited: false
    },
    {
        title: "Customer Support Specialist",
        company: "HelpDesk",
        description: "HelpDesk is hiring a Customer Support Specialist to handle inquiries and resolve issues reported by our clients. This remote position involves managing orders, processing returns, and escalating complex issues to relevant departments. The successful candidate will have excellent problem-solving skills and a customer-first attitude.",
        budget: "$500 per week",
        location: "Remote",
        tags: ["Customer Service", "Communication", "Problem Solving"],
        posted: "2 days ago",
        proposals: "less than 5",
        paymentVerified: false,
        spent: "$250",
        clientRating: 3.8,
        favorited: true
    },
    {
        title: "WordPress Developer",
        company: "WebInnovate",
        description: "WebInnovate requires an experienced WordPress developer to create custom themes and plugins tailored to our clients' needs. The role demands deep knowledge of PHP, CSS, and JavaScript. The developer will work closely with our design team to ensure that all projects align with user experience and branding strategies.",
        budget: "$2500",
        location: "Remote",
        tags: ["WordPress", "PHP", "Web Development"],
        posted: "6 days ago",
        proposals: "10 to 20",
        paymentVerified: true,
        spent: "$0",
        clientRating: 4.9,
        favorited: false
    },
    {
        title: "Social Media Manager",
        company: "BrandBuild",
        description: "BrandBuild is on the lookout for a Social Media Manager to oversee our online presence across various platforms. This role involves creating engaging content, managing daily posts, and interacting with our community to enhance brand visibility and customer engagement.",
        budget: "$800 per month",
        location: "Canada",
        tags: ["Social Media", "Content Management", "Digital Marketing"],
        posted: "3 hours ago",
        proposals: "less than 10",
        paymentVerified: true,
        spent: "$3K+",
        clientRating: 4.3,
        favorited: false
    },
    {
        title: "E-commerce Specialist",
        company: "EcomSolutions",
        description: "EcomSolutions is seeking an E-commerce Specialist to manage the day-to-day operations of our online store. The role requires expertise in Shopify and WooCommerce, ensuring that our store runs smoothly and efficiently, driving sales, and improving customer experience.",
        budget: "$1200",
        location: "Remote",
        tags: ["E-commerce", "Shopify", "WooCommerce"],
        posted: "1 week ago",
        proposals: "20 to 30",
        paymentVerified: false,
        spent: "$1K+",
        clientRating: 4.1,
        favorited: false
    },
    {
        title: "Graphic Designer for Startup",
        company: "CreativePixels",
        description: "CreativePixels, a rapidly growing startup, is seeking a Graphic Designer to bring fresh ideas and creative solutions to our team. The designer will work on various projects, from digital ads to print media, and must have a solid understanding of Adobe Creative Suite.",
        budget: "$700",
        location: "Remote",
        tags: ["Graphic Design", "Adobe Photoshop", "Creative"],
        posted: "4 days ago",
        proposals: "10 to 15",
        paymentVerified: true,
        spent: "$10K+",
        clientRating: 4.6,
        favorited: false
    }
];

const experienceLevels = [
    { label: "Entry Level"},
    { label: "Intermediate"},
    { label: "Expert"}
];

const jobTypes = [
    { label: "Hourly"},
    { label: "Fixed-Price"}
];

const budgets = [
    { label: "Less than $100"},
    { label: "$100 to $500"},
    { label: "$500 to $1K"},
    { label: "$1K to $5K"},
    { label: "$5K+"}
];

const clientInfo = [
    { label: "My previous clients"},
    { label: "Payment verified"}
];

const clientHistory = [
    { label: "No hires"},
    { label: "1 to 9 hires"},
    { label: "10+ hires"}
];

const projectLengths = [
    { label: "Less than one month"},
    { label: "1 to 3 months"},
    { label: "3 to 6 months"},
    { label: "More than 6 months"}
];

const hoursPerWeek = [
    { label: "Less than 30 hrs/week"},
    { label: "More than 30 hrs/week"}
];

const filterSections = [
    { title: "Experience Level", data: experienceLevels },
    { title: "Job Type", data: jobTypes },
    { title: "Budget", data: budgets },
    { title: "Client Info", data: clientInfo },
    { title: "Client History", data: clientHistory },
    { title: "Project Length", data: projectLengths },
    { title: "Hours per Week", data: hoursPerWeek }
];

const truncateDescription = (text, wordLimit) => {
    const words = text.split(/\s+/);  // Split the text by any whitespace
    if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(" ") + "...";  // Join the first `wordLimit` words and add "..."
    }
    return text;
};

const JobList = () => {
    // Create a state that holds the expansion status of each accordion
    const [expanded, setExpanded] = useState([]);

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
                                    {job.title}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: 12, marginLeft: 1 }}>
                                    Posted: {job.posted}
                                </Typography>
                            </div>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Typography variant="body2" color="text.secondary">
                                    {job.company}
                                </Typography>
                                <Rating
                                    name="company-rating"
                                    value={job.clientRating}
                                    readOnly
                                    precision={0.5}
                                    size="small"  // Making the stars smaller to fit in line
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />
                                <Box sx={{ ml: 1, fontSize: '0.875rem' }}>
                                    {job.clientRating}
                                </Box>
                                <LocationOn fontSize="small" />
                                <Typography variant="body2" color="text.secondary">
                                    {job.location}
                                </Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 1 }}>
                                {job.paymentVerified ? <VerifiedUserIcon color="success" fontSize="small"/> : <GppBadIcon color="disabled" fontSize="small"/>}
                                <Typography variant="body2" color="text.secondary">
                                    Payment verified
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                                    Spent: {job.spent}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                                    Budget: {job.budget}
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
                                Proposals: {job.proposals}
                            </Typography>
                        </CardContent>
                        {index !== jobs.length - 1 && <Divider sx={{ mx: 'auto', width: '95%', my: 2 }} />}  {/* Only add a divider if it's not the last item */}
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
                            <FormGroup>
                                {section.data.map(filter => (
                                    <FormControlLabel
                                        key={filter.label}
                                        control={<Checkbox size="small" />}
                                        label={filter.label}
                                        sx={{
                                            margin: '0px 0', // Reduced vertical margin
                                            '& .MuiTypography-root': { // Targeting the Typography within FormControlLabel
                                                fontSize: '0.85rem', // Smaller font size
                                            },
                                            '& .MuiFormControlLabel-label': { // Targeting the label directly for compact spacing
                                                margin: '0 2px', // Adjust horizontal spacing if needed
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