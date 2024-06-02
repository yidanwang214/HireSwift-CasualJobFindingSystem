const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const jobSchema = mongoose.Schema(
  {
    title: {
      type: 'String',
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      required: false,
      trim: true,
    },
    categoryId: {
      type: 'Number',
      default: 0,
    },
    description: {
      type: 'String',
      required: true,
      trim: true,
    },
    ownerId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: 'String',
      enum: ['Opening', 'Closed', 'In progress', 'Finished'],
      required: true,
      default: 'Opening',
    },
    salaryStart: {
      type: 'Number',
      required: true,
    },
    salaryEnd: {
      type: 'Number',
      required: true,
    },
    location: {
      type: 'String',
      required: true,
      trim: true,
    },
    contact: {
      type: 'String',
      required: true,
      trim: true,
    },
    image: {
      type: 'String',
      trim: true,
    },
  },
  { timestamps: true }
);

jobSchema.plugin(toJSON);
jobSchema.plugin(paginate);

jobSchema.index({ title: 'text', description: 'text' });
jobSchema.index({ tags: 1, status: 1 });

const JobModel = mongoose.model('Job', jobSchema);

module.exports = JobModel;
