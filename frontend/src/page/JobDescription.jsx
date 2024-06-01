import React, {useState} from 'react';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useParams } from 'react-router-dom';
import defaultLogo from '../assets/logo.png';
import defaultPhoto from '../assets/employerPhoto/default.jpeg';
// const jobs = [
//     {
//       "rid": 1,
//       "user": {
//         "uid": "1",
//         "logo": "src/assets/employerLogo/AltairaServicesLogo.png",
//         "uname": "Altaira Services",
//         "rating": 4.5,
//       },
//       "title": "Kitchenhands, Experienced in Aged Care",
//       "content": `Altaira are seeking Kitchen Hands with experience in aged care to work within reputable aged care facilities (nursing homes) across Adelaide metropolitan and SA regional areas.

//       Must be familiar with:
      
//       diet types
//       diet textures
//       fluid consistencies
//       reading resident food and fluid care plans
//       plating food in a neat and appealing manner
//       Why join us?
      
//       High hourly rate
//       You choose when and where you want to work with our flexible and easy to use online system
//       Variety and quantity of shifts - AM PM ND and weekends
//       24/7 support from our clinical team - help is only ever a call away
//       Excellent clients with good systems and support
//       We specialise in aged care and can provide additional training if you would like to further develop your aged care career
//       Free Training for mandatory annual updates
//       Access to mental health and wellness initiatives
//       Invaluable ongoing support and encouragement.
//       `,
//       "hourly wage": "$29 – $32",
//       "location": "Adelaide SA",
//       "type": "Barista",
//       "photo": "src/assets/employerPhoto/AltairaServices.jpeg",
//     }
//     ,
//     // {
//     //     "rid": 2,
//     //     "user": {
//     //       "uid": "2",
//     //       "logo": "src/assets/employerLogo/PaniniBrothersLogo.jpeg",
//     //       "uname": "Panini Brother",
//     //       "rating": 4,
//     //     },
//     //     "title": 'Baristas and Cafe all-rounders, Retail Bakery Staff',
//     //     "content": `Looking for super stars to work at our very busy bakery/cafe at Newton. The successful applicants will need to have following attributes. 
//     //     Genuine job seeking applicants only.
//     //     Immediate Start
//     //     Professional Customer Service with a smile
//     //     A quick learner
//     //     Skilled coffee makers
//     //     Highly Organised
//     //     Highly Skilled
//     //     Motivated
//     //     Reliable and Committed
//     //     Great Communicator
//     //     High standard of Presentation essential
//     //     Able to Open and Close
//     //     Able to work Weekends
//     //     Multiple Positions
//     //     Please upload your resume and ring Lisa on 0439372946 to discuss further. If no answer please leave a message.`,
//     //     "hourly wage": "$30 – $32",
//     //     "location": "Adelaide SA",
//     //     "type": "All-rounders",
//     //     "photo": "",
//     //   },
//     //   {
//     //     "rid": 3,
//     //     "user": {
//     //       "uid": "3",
//     //       "logo": "src/assets/employerLogo/WHSmithAustraliaLogo.png",
//     //       "uname": "WH Smith Australia",
//     //       "rating": 4.5,
//     //     },
//     //     "title": 'Kitchenhands, Experienced in Aged Care',
//     //     "content": `Altaira are seeking Kitchen Hands with experience in aged care to work within reputable aged care facilities (nursing homes) across Adelaide metropolitan and SA regional areas.

//     //     Must be familiar with:
        
//     //     diet types
//     //     diet textures
//     //     fluid consistencies
//     //     reading resident food and fluid care plans
//     //     plating food in a neat and appealing manner
//     //     Why join us?
        
//     //     High hourly rate
//     //     You choose when and where you want to work with our flexible and easy to use online system
//     //     Variety and quantity of shifts - AM PM ND and weekends
//     //     24/7 support from our clinical team - help is only ever a call away
//     //     Excellent clients with good systems and support
//     //     We specialise in aged care and can provide additional training if you would like to further develop your aged care career
//     //     Free Training for mandatory annual updates
//     //     Access to mental health and wellness initiatives
//     //     Invaluable ongoing support and encouragement.`,
//     //     "hourly wage": "$29 – $32",
//     //     "location": "Adelaide SA",
//     //     "type": "Kitchen & Sandwich Hands (Hospitality & Tourism)",
//     //     "photo": "",
//     //   },
//   ]
const reviews = [
    {
        id: 1,
        pros: ['good pay', 'good manager'],
        cons: ['long commute'],
        rating: 4.5
    },
    {
        id: 2,
        pros: ['good staff meal'],
        cons: ['low pay rate'],
        rating: 4.2
    },

]

const jobs = [
    {   
        "id": 1,
        "title": "Banner Menu for Bubble Tea",
        "company": "Agile Engine",
        "description": "We are seeking a graphic designer to create an eye-catching menu banner for our bubble tea shop, similar to popular brands such as Gong Cha. The banner will be prominently displayed and should include photoshopped images of our drinks with various toppings. We need this project completed within three weeks and require multiple revisions to ensure the final product meets our expectations. All necessary resources will be provided upon request.",
        "minWage": 25,
        "maxWage": 27,
        "location": "Remote",
        "tags": ["Design", "Graphic Design", "Menu Design", "Adobe Photoshop"],
        "posted": "1 day ago",
        "proposals": "5 to 10",
        "paymentVerified": true,
        "spent": "$1K+",
        "clientRating": 4.5,
        "favorited": false,
        "photo": "",
        "logo": ""
    },
    {
        "id": 2,
        "title": "Wix Web Designer",
        "company": "GreatStudio",
        "description": "GreatStudio is looking for a talented Wix web designer to overhaul our corporate website. The goal is to enhance visual appeal and improve mobile responsiveness. The ideal candidate will bring innovative design ideas that align with our brand's vision and user experience goals. This is a high-priority project with the potential for future collaboration on additional digital design tasks.",
        "minWage": 32,
        "maxWage": 35,
        "location": "Remote",
        "tags": ["Wix", "Web Design", "Web Development"],
        "posted": "13 minutes ago",
        "proposals": "less than 5",
        "paymentVerified": false,
        "spent": "$0",
        "clientRating": 2.5,
        "favorited": true,
        "photo": "",
        "logo": ""
    },
    {
        "id": 3,
        "title": "Mobile App Developer",
        "company": "InnovateStart",
        "description": "InnovateStart requires a skilled mobile app developer to lead the creation of a new social networking platform for iOS and Android. The project involves integrating various APIs, ensuring high usability, and maintaining a secure app environment. Experience with React Native or Flutter is highly desirable. We value innovative problem-solving skills and the ability to deliver on tight deadlines.",
        "minWage": 35,
        "maxWage": 45,
        "location": "Sydney",
        "tags": ["Mobile Development", "React Native", "Flutter", "API"],
        "posted": "3 days ago",
        "proposals": "10 to 20",
        "paymentVerified": true,
        "spent": "$3K+",
        "clientRating": 4.8,
        "favorited": true,
        "photo": "",
        "logo": ""
    },
    {
        "id": 4,
        "title": "SEO Specialist",
        "company": "MarketingGurus",
        "description": "MarketingGurus is in search of an SEO Specialist to enhance our company’s online presence. The specialist will be responsible for conducting keyword research, optimizing meta tags, building links, and reporting on SEO performance monthly. A successful candidate will demonstrate a track record of improving Google rankings and driving traffic growth.",
        "minWage": 25,
        "maxWage": 30,
        "location": "Adelaide",
        "tags": ["SEO", "Digital Marketing", "Google Analytics"],
        "posted": "2 hours ago",
        "proposals": "less than 10",
        "paymentVerified": true,
        "spent": "$1K+",
        "clientRating": 4.2,
        "favorited": false,
        "photo": "",
        "logo": ""
    },
    {
        "id": 5,
        "title": "Content Writer for Tech Blog",
        "company": "TechTrendz",
        "description": "TechTrendz is seeking a dynamic content writer to contribute articles on emerging technology trends. The writer should be able to engage a tech-savvy audience through a conversational tone while thoroughly researching topics. The ability to meet deadlines and adapt content to reader feedback is essential.",
        "minWage": 25,
        "maxWage": 28,
        "location": "Sydney",
        "tags": ["Writing", "Content Creation", "Technology"],
        "posted": "1 day ago",
        "proposals": "20 to 30",
        "paymentVerified": true,
        "spent": "$500",
        "clientRating": 3.3,
        "favorited": true,
        "photo": "",
        "logo": ""
    },
    {
        "id": 6,
        "title": "Freelance Data Analyst",
        "company": "DataWise",
        "description": "DataWise is looking for a freelance data analyst to turn complex data into actionable insights that can help shape business strategy. The candidate should be proficient in SQL and Python and have experience using data visualization tools like Tableau. The role requires someone who can work independently and communicate findings clearly to non-technical team members.",
        "minWage": 25,
        "maxWage": 32,
        "location": "Perth",
        "tags": ["Data Analysis", "SQL", "Python"],
        "posted": "5 days ago",
        "proposals": "15 to 25",
        "paymentVerified": false,
        "spent": "$2K+",
        "clientRating": 4.0,
        "favorited": false,
        "photo": "",
        "logo": ""
    },
    {
        "id": 7,
        "title": "Video Editor for YouTube Channel",
        "company": "StreamVid",
        "description": "StreamVid is searching for a creative video editor to craft engaging content for our gaming and tech review YouTube channel. The ideal candidate will have expertise in Adobe Premiere Pro and After Effects and a passion for video storytelling. This role involves close collaboration with content creators to produce videos that captivate and inform our audience.",
        "minWage": 27,
        "maxWage": 30,
        "location": "Adelaide",
        "tags": ["Video Editing", "YouTube", "Adobe Premiere", "After Effects"],
        "posted": "8 hours ago",
        "proposals": "5 to 15",
        "paymentVerified": true,
        "spent": "$3K+",
        "clientRating": 4.5,
        "favorited": false,
        "photo": "",
        "logo": ""
    },
    {
        "id": 8,
        "title": "Customer Support",
        "company": "HelpDesk",
        "description": "HelpDesk is hiring a Customer Support Specialist to handle inquiries and resolve issues reported by our clients. This remote position involves managing orders, processing returns, and escalating complex issues to relevant departments. The successful candidate will have excellent problem-solving skills and a customer-first attitude.",
        "minWage": 25,
        "maxWage": 30,
        "location": "Brisbane",
        "tags": ["Customer Service", "Communication", "Problem Solving"],
        "posted": "2 days ago",
        "proposals": "less than 5",
        "paymentVerified": false,
        "spent": "$250",
        "clientRating": 3.8,
        "favorited": true,
        "photo": "",
        "logo": ""
    },
    {
        "id": 9,
        "title": "WordPress Developer",
        "company": "WebInnovate",
        "description": "WebInnovate requires an experienced WordPress developer to create custom themes and plugins tailored to our clients' needs. The role demands deep knowledge of PHP, CSS, and JavaScript. The developer will work closely with our design team to ensure that all projects align with user experience and branding strategies.",
        "minWage": 30,
        "maxWage": 45,
        "location": "Sydney",
        "tags": ["WordPress", "PHP", "Web Development"],
        "posted": "6 days ago",
        "proposals": "10 to 20",
        "paymentVerified": true,
        "spent": "$0",
        "clientRating": 4.9,
        "favorited": false,
        "photo": "",
        "logo": ""
    },
    {
        "id": 10,
        "title": "Social Media Manager",
        "company": "BrandBuild",
        "description": "BrandBuild is on the lookout for a Social Media Manager to oversee our online presence across various platforms. This role involves creating engaging content, managing daily posts, and interacting with our community to enhance brand visibility and customer engagement.",
        "minWage": 35,
        "maxWage": 45,
        "location": "Melbourne",
        "tags": ["Social Media", "Content Management", "Digital Marketing"],
        "posted": "3 hours ago",
        "proposals": "less than 10",
        "paymentVerified": true,
        "spent": "$3K+",
        "clientRating": 4.3,
        "favorited": false,
        "photo": "",
        "logo": ""
    },
    {
        "id": 11,
        "title": "Kitchenhands, Experienced in Aged Care",
        "company": "Altaira Services",
        "description": `Altaira are seeking Kitchen Hands with experience in aged care to work within reputable aged care facilities (nursing homes) across Adelaide metropolitan and SA region
        
        Must be familiar with
        fluid consistencies
        reading resident food and fluid care plans
        plating food in a neat and appealing manner
        Why join us?
        High hourly rate
        You choose when and where you want to work with our flexible and easy to use online system
        Variety and quantity of shifts - AM PM ND and weekends
        24/7 support from our clinical team - help is only ever a call away
        Excellent clients with good systems and support
        We specialise in aged care and can provide additional training if you would like to further develop your aged care career
        Free Training for mandatory annual updates
        Access to mental health and wellness initiatives
        Invaluable ongoing support and encouragement.`,
        "minWage": 25,
        "maxWage": 32,
        "location": "Adelaide",
        "tags": ["Customer Service"],
        "posted": "3 hours ago",
        "proposals": "less than 10",
        "paymentVerified": true,
        "spent": "$3K+",
        "clientRating": 4.3,
        "favorited": false,
        "photo": "src/assets/employerPhoto/AltairaServices.jpeg",
        "logo": ""
    }
]


const JobDescription = () => {
    const {jobid} =  useParams();
    console.log(jobid)
    const job = jobs.find(item => item.id == jobid);
    console.log(job)

    const copyUrlToClipboard = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl).then(() => {
            alert("URL successfully copied to clipboard. Send it to your friends now!");
        }).catch(err => {
            console.error("Failed to copy: ", err);
        })
    }
    return (
        <div id='jobDescription' className='flex flex-row mt-5 font-sans'>
            <div id='jobDetails' className='basis-2/3 mx-10'>
                <div id='title'>
                     <h1 id='jobtitle' className='text-2xl font-bold'>{job.title}</h1>
                </div>
                <div id='employerInfo' className='flex flex-row'>
                    <div id='employeeLogo' className='basis-2/3 flex-1'>
                        {job.logo ? 
                            <img 
                                key={job.id}
                                src={job.logo}
                                alt="Employer Logo"
                                width={200}
                                height={100}
                            /> : 
                            <img 
                                key={0}
                                src={defaultLogo}
                                alt="defaultLogo"
                                width={200}
                                height={100}
                            />
                        }
                    </div>
                    <div id='textInfo' className='basis-2/3 flex-1 flex flex-col justify-items-start'>
                        <div id='name' className='flex flex-row justify-between'>
                                <p>{job.company}</p>
                            <div className='flex flex-row'>
                                <Rating name="half-rating-read" defaultValue={job.clientRating} precision={0.5} readOnly />
                                {job.clientRating}
                            </div>
                        </div> 
                        <div id='wage'>
                            <span>Hourly wage: </span>
                            {`${job.minWage} - ${job.maxWage} AUD`}
                        </div>
                        <div id='location'>
                            <span>Location: </span>
                            {job.location}
                        </div>
                    </div>
                </div>
                <div id='employeerPhoto' className='mt-10'>
                    {job.photo == null ? 
                        <img key={job.id} src={defaultPhoto} alt="Default" />
                        : <img key={job.id} src={job.photo} alt="photo" />
                    }
                </div>
                <div id='jobDetails' className='mt-10 text-justify'>
                    {job.description}
                </div>
                <div id='review' className='mt-10 text-justify'>
                    <div className='text-lg font-semibold border-b border-b-zinc-600'>Review</div>
                    {!reviews ? (
                        <p>No reviews yet. Be the first to rate the employer!</p>
                    ) : (
                        reviews.map((item) => (
                            <div id={item.id} className='border-b border-b-zinc-300 mt-2'>
                                Rating: {item.rating}
                                <div className=''>
                                    Pros: {item.pros.map((item) => (
                                        <div className='ml-5'>- {item}</div>
                                    ))}
                                </div>
                                <div className=''>
                                    Cons: {item.cons.map((item) => (
                                        <div className='ml-5 mb-2'>- {item}</div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div id='apply' className='basis-1/3 mx-10 rounded-md border-2 border-slate-400 h-3/4 items'>
                <div className='p-2'>
                <Stack direction="column" spacing={2}>
                    <Button variant="contained">Apply</Button>
                    <Button variant="contained" onClick={copyUrlToClipboard}>
                        Refer to my friend
                    </Button>
                </Stack>
                </div>

            </div>        
        </div>
    )
}
export default JobDescription