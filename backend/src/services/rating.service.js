const httpStatus = require('http-status');
const RatingModel = require('../models/rating.model');
const ApiError = require('../utils/ApiError');

const addNewRating = async (ratingInfo, user) => {
  const model = new RatingModel({ ...ratingInfo, raterId: user._id, fromEmployee: user.role === 'employee' });
  const savedModel = await model.save();
  return savedModel._id;
};

const findRatings = async (searchInfo = {}, options = { page: 1, limit: 10 }) => {
  const { recipientId, applicationId, updatedStart, updatedEnd } = searchInfo;
  const filter = {};
  if (recipientId) {
    filter.destId = recipientId;
  }
  if (applicationId) {
    filter.applicationId = applicationId;
  }
  const dateFilter = {};
  if (updatedStart) {
    dateFilter.$gte = new Date(updatedStart).toISOString();
  }
  if (updatedEnd) {
    dateFilter.$lte = new Date(updatedEnd).toISOString();
  }
  Object.assign(filter, dateFilter);
  const ratingList = await RatingModel.paginate(filter, options);
  return ratingList;
};

const calcRatingById = async (recipientId) => {
  const result = await RatingModel.aggregate([
    {
      $match: { recipientId },
    },
    {
      $group: {
        _id: '$recipientId',
        avgRating: { $avg: '$rate' },
      },
    },
  ]);
  if (result.length > 0) {
    return result[0].avgRating;
  }
  return 0;
};

module.exports = {
  addNewRating,
  findRatings,
  calcRatingById,
};
