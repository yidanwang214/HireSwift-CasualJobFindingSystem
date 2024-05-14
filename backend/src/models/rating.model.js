const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const ratingModel = mongoose.Schema(
  {
    raterId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    applicationId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Application',
    },
    fromEmployee: {
      type: Boolean,
      required: true,
    },
    rate: {
      type: mongoose.Types.Decimal128,
      required: true,
    },
    comment: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

ratingModel.plugin(toJSON);
ratingModel.plugin(paginate);

ratingModel.index({ comment: 'text' });
ratingModel.index({ raterId: 1 });

const RatingModel = mongoose.model('Rating', ratingModel);

module.exports = RatingModel;
