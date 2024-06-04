const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const extInfoSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    location: { type: String, trim: true },
    localTime: { type: String, trim: true },
    introduction: { type: String, trim: true },
    title: { type: String, trim: true },
    hourlyRate: { type: 'Number' },
    hoursPerWeek: { type: String, trim: true },
    education: { type: String, trim: true },
    licenses: { type: String, trim: true },
    skills: { type: String, trim: true },
    languages: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
extInfoSchema.plugin(toJSON);
extInfoSchema.plugin(paginate);

/**
 * @typedef ExtInfoModel
 */
const ExtInfoModel = mongoose.model('ExtInfo', extInfoSchema);

module.exports = ExtInfoModel;
