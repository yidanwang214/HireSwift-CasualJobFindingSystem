const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const ExtInfoModel = require('../models/extInfo.model');
const { getAllRatings, calcRatingById } = require('./rating.service');

const getExtInfoByUserId = async (userId) => {
  const ret = await ExtInfoModel.findOne({ userId })
    .exec()
    .then((r) => {
      if (r) {
        return r.toJSON();
      }
      return null;
    });
  if (!ret) {
    throw new ApiError(httpStatus.NOT_FOUND, 'the user maybe created very early, so no ext info available.');
  }

  ret.ratings = await getAllRatings(userId);
  ret.overallRating = await calcRatingById(userId);
  return ret;
};

const updateExtInfo = async (user, extInfo) => {
  return ExtInfoModel.findOneAndUpdate({ userId: user._id, extInfo }).exec();
};

module.exports = {
  getExtInfoByUserId,
  updateExtInfo,
};
