import React, {useState} from 'react';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const defaultPhoto =  "src/assets/employerPhoto/default.jpeg";
const jobs = [
    {
      "rid": 1,
      "user": {
        "uid": "1",
        "logo": "src/assets/employerLogo/AltairaServicesLogo.png",
        "uname": "Altaira Services",
        "rating": 4.5,
      },
      "title": "Kitchenhands, Experienced in Aged Care",
      "content": `Altaira are seeking Kitchen Hands with experience in aged care to work within reputable aged care facilities (nursing homes) across Adelaide metropolitan and SA regional areas.

      Must be familiar with:
      
      diet types
      diet textures
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
      Invaluable ongoing support and encouragement.
      `,
      "hourly wage": "$29 – $32",
      "location": "Adelaide SA",
      "type": "Barista",
      "photo": "src/assets/employerPhoto/AltairaServices.jpeg",
    }
    ,
    // {
    //     "rid": 2,
    //     "user": {
    //       "uid": "2",
    //       "logo": "src/assets/employerLogo/PaniniBrothersLogo.jpeg",
    //       "uname": "Panini Brother",
    //       "rating": 4,
    //     },
    //     "title": 'Baristas and Cafe all-rounders, Retail Bakery Staff',
    //     "content": `Looking for super stars to work at our very busy bakery/cafe at Newton. The successful applicants will need to have following attributes. 
    //     Genuine job seeking applicants only.
    //     Immediate Start
    //     Professional Customer Service with a smile
    //     A quick learner
    //     Skilled coffee makers
    //     Highly Organised
    //     Highly Skilled
    //     Motivated
    //     Reliable and Committed
    //     Great Communicator
    //     High standard of Presentation essential
    //     Able to Open and Close
    //     Able to work Weekends
    //     Multiple Positions
    //     Please upload your resume and ring Lisa on 0439372946 to discuss further. If no answer please leave a message.`,
    //     "hourly wage": "$30 – $32",
    //     "location": "Adelaide SA",
    //     "type": "All-rounders",
    //     "photo": "",
    //   },
    //   {
    //     "rid": 3,
    //     "user": {
    //       "uid": "3",
    //       "logo": "src/assets/employerLogo/WHSmithAustraliaLogo.png",
    //       "uname": "WH Smith Australia",
    //       "rating": 4.5,
    //     },
    //     "title": 'Kitchenhands, Experienced in Aged Care',
    //     "content": `Altaira are seeking Kitchen Hands with experience in aged care to work within reputable aged care facilities (nursing homes) across Adelaide metropolitan and SA regional areas.

    //     Must be familiar with:
        
    //     diet types
    //     diet textures
    //     fluid consistencies
    //     reading resident food and fluid care plans
    //     plating food in a neat and appealing manner
    //     Why join us?
        
    //     High hourly rate
    //     You choose when and where you want to work with our flexible and easy to use online system
    //     Variety and quantity of shifts - AM PM ND and weekends
    //     24/7 support from our clinical team - help is only ever a call away
    //     Excellent clients with good systems and support
    //     We specialise in aged care and can provide additional training if you would like to further develop your aged care career
    //     Free Training for mandatory annual updates
    //     Access to mental health and wellness initiatives
    //     Invaluable ongoing support and encouragement.`,
    //     "hourly wage": "$29 – $32",
    //     "location": "Adelaide SA",
    //     "type": "Kitchen & Sandwich Hands (Hospitality & Tourism)",
    //     "photo": "",
    //   },
  ]

const JobDescription = () => {
    return (
        <div id='jobDescription' className='flex flex-row mt-5 font-sans'>
            <div id='jobDetails' className='basis-2/3 mx-10'>
                <div id='title'>
                    {jobs.map((item) => (
                    <h1 id='jobtitle' className='text-2xl font-bold'>{item.title}</h1>
                    ))}
                </div>
                <div id='employerInfo' className='flex flex-row'>
                    <div id='employeeLogo' className='basis-2/3 flex-1'>
                        {jobs.map((item) => (
                            <img 
                                key={item.rid}
                                src={item.user.logo}
                                alt={item.user.uname}
                                width={200}
                                height={100}
                            />
                        ))}
                    </div>
                    <div id='textInfo' className='basis-2/3 flex-1 flex flex-col justify-items-start'>
                        <div id='name' className='flex flex-row justify-between'>
                            {jobs.map((item) => (
                                <p>{item.user.uname}</p>
                            ))}
                            <div className='flex flex-row'>
                                {jobs.map((item) => (
                                    <Rating name="half-rating-read" defaultValue={item.user.rating} precision={0.5} readOnly />
                                ))}
                                {jobs.map((item) => (
                                item.user.rating
                                ))}
                            </div>
                        </div> 
                        <div id='wage'>
                            <span>Hourly wage: </span>
                            {jobs.map((item) => (
                                item['hourly wage']
                            ))}
                        </div>
                        <div id='location'>
                            <span>Location: </span>
                            {jobs.map((item) => (
                                item.location
                            ))}
                        </div>
                    </div>
                </div>
                <div id='employeerPhoto' className='mt-10'>
                    {jobs.map((item) => (
                        item.photo == null ? 
                        <img key={item.rid} src={defaultPhoto} alt="Default" />
                        : <img key={item.rid} src={item.photo} alt={item.title} />
                    ))}
                </div>
                <div id='jobDetails' className='mt-10 text-justify'>
                    {jobs.map((item) => (
                        item.content
                    ))}
                </div>
            </div>
            <div id='apply' className='basis-1/3 mx-10 rounded-md border-2 border-slate-400 h-3/4 items'>
                <div className='p-2'>
                <Stack direction="column" spacing={2}>
                    <Button variant="contained">Apply</Button>
                    <Button variant="contained" href="#contained-buttons">
                        Refer to my friend
                    </Button>
                </Stack>
                </div>

            </div>        
        </div>
    )
}
export default JobDescription