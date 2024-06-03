import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

const RatingHistory = ({ ratings }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const ratingsPerPage = 5;

  const indexOfLastRating = currentPage * ratingsPerPage;
  const indexOfFirstRating = indexOfLastRating - ratingsPerPage;
  const currentRatings = ratings.slice(indexOfFirstRating, indexOfLastRating);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-bold">Rating History</h2>
      <ul className="mt-2">
        {currentRatings.map((rating, index) => (
          <li key={index} className="border-b py-4 flex">
            <img src={rating.profilePic} alt="Profile" className="w-12 h-12 rounded-full mr-4" />
            <div className="flex-grow">
              <p><strong>{rating.jobTitle}</strong> at <strong>{rating.employer}</strong></p>
              <p className="text-sm text-gray-600 mt-1">{rating.comment}</p>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <Rating
                  name="text-feedback"
                  value={parseFloat(rating.rating)}
                  readOnly
                  precision={0.5}
                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
                <Box sx={{ ml: 2 }}>{rating.rating}</Box>
              </Box>
            </div>
          </li>
        ))}
      </ul>
      <Stack spacing={2} className="flex justify-center mt-4">
        <Pagination
          count={Math.ceil(ratings.length / ratingsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          color="primary"
        />
      </Stack>
    </div>
  );
};

export default RatingHistory;
