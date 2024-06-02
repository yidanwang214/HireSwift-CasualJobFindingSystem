const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const applicationModel = mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    jobId: {
      type: mongoose.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    note: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Rejected'],
      default: 'Pending',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

applicationModel.plugin(toJSON);
applicationModel.plugin(paginate);

applicationModel.index({ note: 'text' });
applicationModel.index({ employeeId: 1, jobId: 1, status: 1 });

const ApplicationModel = mongoose.model('Application', applicationModel);

module.exports = ApplicationModel;
